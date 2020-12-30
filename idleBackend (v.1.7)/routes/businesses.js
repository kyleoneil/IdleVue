const router = require('express').Router();
const { restart } = require('nodemon');
const dateUtil = require('./../utils/dateUtil');
const businessService = require('./../services/business.service');
const userService = require('./../services/user.service');
const authService = require('./../services/auth.service');
const errorHandler = require('./errorHandler');

router.post('/', (req, res) => {
    /**
   * @type {{businessname:string}}
   */
    const body = req.body;
    if(!body.businessname) {
        res.status(400).json({message:"Please enter a business name."});
        return;
    }

    return businessService.findBusinessByName(body.businessname).then((exists) => {
        if (exists) {
            res.status(400).json({message: "Business already exists."})
        } else {
            businessService.createBusiness(body)
                .then((business) => res.json({id: business.id, message: "Business registered successfully."}))
                .catch(errorHandler.handleError(res));
        }
    })
})

router.post('/:id/tellers', (req, res) => {
    /**
     * @type {{firstname:string, lastname:string, birthdate:string, email:string,password:string}}
     */
    const roleName = req.user.roleName;
    const body = req.body;
    body.roleName = 'BUSINESS_TELLER';
    body.business_id = req.params.id;

    return authService.isAuthorized(roleName, 'BUSINESS_OWNER').then((result) => {
        if (result && req.user.business_id == body.business_id) {
            if (!body.firstname || !body.lastname || !body.email || !body.password) {
                res.status(400).json({message: "First name, last name, email and password are required."});
                return;
            }
            
            if (body.birthdate && !dateUtil.isValidDateString(body.birthdate)) {
                res.status(400).json({message: "Invalid birthdate format. Should be MM/dd/yyyy."});
                return;
            }
        
            if (body.business_id) {
                businessService.findBusinessById(body.business_id).then((result) => {
                if (!result) {
                    res.status(400).json({message: "Given business is not registered."});
                    return;
                }
            })
            } else if (body.branch_id) {
            branchService.findById(body.branch_id).then((results) => {
                if (!results) {
                    res.status(400).json({message: "Given branch is not registered."});
                    return;
                }
            })
            } else {
                res.status(400).json({message: "Please enter valid business or branch."});
                return;
            }
        
          
            return userService.userExists(body.email).then((exists) => {
                if (exists) {
                    res.status(400).json({message: "User already exists"});
                } else {
                    userService.create(body)
                        .then((user) => res.json({id: user.id, message: "User successfully created."}))
                        .catch(errorHandler.handleError(res));
                }
            })
        } else {
            res.status(400).json({message: "User is not authorized to make changes."});
                return;
        }
    }) 
        
})

router.get('/', (req, res) => {
    let {pageNo, resultsPerPage} = req.query;
    let pgNum = pageNo ? parseInt(pageNo) : 1;
    let pgRes = resultsPerPage ? parseInt(resultsPerPage) : 10;
    return businessService.findBusinesses(pgNum, pgRes)
        .then((results) => res.json(results))
        .catch(errorHandler.handleError(res))
})

router.get('/:id/tellers', (req, res) => {
    let {pageNo, resultsPerPage} = req.query;
    let pgNum = pageNo ? parseInt(pageNo) : 1;
    let pgRes = resultsPerPage ? parseInt(resultsPerPage) : 10;
    return userService.findTellers(pgNum, pgRes, req.params.id)
        .then((results) => res.json(results))
        .catch(errorHandler.handleError(res))
})

router.get('/:id', (req, res) => {
    return businessService.findBusinessById(req.params.id).then((business) => {
        if(!business) {
            res.status(400).json({message:"Error: Business does not exist."});
        } else {
            res.json(business);
        }
    }).catch(errorHandler.handleError(res))
})

router.put('/:id', (req, res) => {
    /**
   * @type {{businessname:string}}
   */

    const roleName = req.user.roleName;
    return authService.isAuthorized(roleName, 'BUSINESS_OWNER').then((result) => {
        if (result) {
            const body = req.body;
            if(!body.businessname) {
                res.status(400).json({message:"Please enter a business name."});
                return;
            }

            return businessService.findBusinessByName(body.businessname).then((exists) => {
                if (exists) {
                    res.status(400).json({message: "Business already exists."})
                } else {
                    businessService.updateBusiness(req.params.id, body.businessname)
                        .then((business) => res.json({id: business.id, message: "Business updated successfully."}))
                        .catch(errorHandler.handleError(res));
                }
            })
        } else {
            res.status(400).json({message: "User is not authorized to make changes."});
            return;
        }
    })
    
})

router.delete('/:id', (req, res) => {
    const roleName = req.user.roleName;
    return authService.isAuthorized(roleName, 'BUSINESS_OWNER').then((result) => {
        if (result) {
            return businessService.deleteBusiness(req.params.id)
                .then(() => res.json({message: "Business deleted successfully."}))
                .catch(errorHandler.handleError(res));
        } else {
            res.status(400).json({message: "User is not authorized to make changes."});
            return;
        }
    })
    
})

module.exports = router;
