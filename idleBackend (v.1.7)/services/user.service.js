
const {User, Role, Queue} = require('./../models');
const bcrypt = require('bcrypt');
const {saltRounds} = require('./../config/config');
const roleService = require('./role.service');
const { static } = require('express');

const findByEmail = (email, loadRole = false) => {
  const findOptions = {where: {email}};
  if (loadRole) {
    findOptions.include = Role;
  }
  return User.findOne(findOptions)
};

const getIds = (models) => {
  var Ids = [];
  for (x in models) {
    Ids.push(models[x].id);
  }
  return Ids;
}

module.exports = {

  //CREATE Operations
  /**
   *
   * @param {{firstname:string, lastname:string, birthdate:string, email:string,password:string,roleName:string}} body
   */
  create: async (body) => {
    const roleName = body.roleName ? body.roleName : 'CUSTOMER';
    const role = await roleService.findByName(roleName)
    const copy = {RoleId: role.id, BusinessId: body.business_id, BranchId: body.branch_id, ...body};
    copy.name = `${body.lastname}, ${body.firstname}`
    copy.birthdate = new Date(body.birthdate);
    copy.password = bcrypt.hashSync(body.password, saltRounds)
    const user = await User.create(copy);
    return user.id;
  },

  //READ Operations
  userExists: async (email) => {
    const user = await findByEmail(email);
    return user; // or user != null
  },
  
  findById: async (id) => {
    const user = await User.findOne({
      where: {id: id},
      attributes: { exclude: ['password'] }
    });
    return user;
  },
  findByEmail,
  /**
   *
   * @param pageNo
   * @param resultsPerPage
   * @returns {Promise<{totalRecords: number, data: [{}]}>}
   */
  findPaginated: async (pageNo, resultsPerPage, businessId) => {
    // TODO: Implement this. Note: make sure password is removed prior to return
    // TODO Completed
    const where = {};
    if (businessId) {
      where.business_id = businessId;
    }
    const pageOffset = resultsPerPage * (pageNo - 1);
    const total_queue_records = await User.count({where});
    const userPaginated = await User.findAll({
      where, 
      offset: pageOffset, 
      limit: resultsPerPage
    })
    return {
      totalRecords: total_queue_records,
      data: userPaginated
    }
  },

  findTellers: async (pageNo, resultsPerPage, businessId) => {
    const pageOffset = resultsPerPage * (pageNo - 1);
    const total_queue_records = await User.count({where: {business_id: businessId}});
    const userPaginated = await User.findAll({
      where: {
        business_id: businessId,
        role_id: 3
      }, 
      offset: pageOffset, 
      limit: resultsPerPage
    })
    return {
      totalRecords: total_queue_records,
      data: userPaginated
    }
  },

  //UPDATE Operations
  update: async (uID, data) => {
    /**
    * @type {{firstname:string, lastname:string, birthdate:string, email:string, password:string}}
    */

    const user = await User.findOne({where: {id: uID}});
    user.BusinessId = data.business_id;
    user.BranchId = data.branch_id;
    user.name = `${data.lastname}, ${data.firstname}`;
    user.birthdate = new Date(data.birthdate);
    user.password = bcrypt.hashSync(data.password, saltRounds);

    await user.save();

    return user.id;
  },

  //DELETE Operations
  deleteUser: async (id) => {
    await User.destroy({where: {id}}).then(async () => {
      const queueIds = getIds(await Queue.findAll({where: {UserId: id}}));
      await Queue.destroy({where:{UserId: id}});
    })
    return;
  }
}
