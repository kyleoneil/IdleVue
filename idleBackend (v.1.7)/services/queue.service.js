const {Business, Branch, Queue, Service, User} = require('./../models');
const Services = require('./service.service');
const userServices = require('./user.service');
const {static} = require('express');
const ServiceError = require('./errors/serviceError');

//const getStatus = ()

module.exports = {
  /**
   *
   * @param {{customer_id:bigint, service_id:bigint}} body
   */
  createQueue: async (body) => {
    const serviceId = body.service_id;
    const userId = body.user_id;
    const service = await Service.findOne({where: {id: serviceId}});
    const customer = await userServices.findById(userId);
    const data = {UserId: customer.id, ServiceId: service.id};
    data.customer_id = body.user_id;
    data.service_id = body.service_id;
    data.queue_number = parseInt(service.last_in_queue) + 1;
    data.status = 1;
    service.last_in_queue++;
    service.save();
    const queue = await Queue.create(data);
    return queue.id;
  },

  findAll: async (pageNo, resultsPerPage, serviceId, status) => {
    const where = {}
    if (serviceId) {
      where.service_id = serviceId;
    }
    if(status) {
      where.status = status;
    }

    //const pageOffset = resultsPerPage * (pageNo - 1);

    const total_queue_records = await Queue.count({where})
    const queuePaginate = await Queue.findAll({
      //offset: pageOffset, 
      //limit: resultsPerPage
      where,
      attributes: {
        exclude: ['updatedAt', 'deletedAt', 'UserId', 'ServiceId']
      },
      include: [
        {
          model: Service,
          attributes: {
            include: [['name', 'service_name']],
            exclude: ['name', 'last_in_queue', 'current_queue', 'createdAt', 'updatedAt', 'deletedAt', 'BranchId']
          }
        },
        {
          model: User,
          attributes: {
            include: [
              ['name', 'user_name'], 
              ['email', 'user_email'], 
              ['birthdate', 'user_birthdate']
            ],
            exclude: [
              'id', 'name', 'email', 'password', 
              'birthdate', 'token', 'lastLogin', 'createdAt', 'deletedAt', 
              'updatedAt', 'RoleId', 'BranchId', 'BusinessId']
          }
        }
      ]
    });

    return {
      totalRecords: total_queue_records,
      data: queuePaginate
    }
  },

  //pageNo, resultsPerPage, 
  getUserQueues: async (userId, status = ['IN_QUEUE', 'IN_PROGRESS']) => {
    //const pageOffset = resultsPerPage * (pageNo - 1);
    const where = {user_id: userId, status};
    const total_queue_records = await Queue.count({where})
    const queuePaginate = await Queue.findAll({
      //offset: pageOffset, 
      //limit: resultsPerPage
      where,
      attributes: {
        exclude: ['id','updatedAt', 'deletedAt', 'UserId', 'ServiceId']
      },
      include: [{
        model: Service,
        attributes: {
          include: [['name', 'service_name']],
          exclude: ['id', 'name', 'last_in_queue', 'current_queue', 'createdAt', 'updatedAt', 'deletedAt', 'BranchId']
        },
        include: [{
          model: Branch,
          attributes: {
            exclude: ['id', 'name', 'createdAt', 'updatedAt', 'deletedAt']
          },
          include: [{
            model: Business,
            attributes: {
              include: [['name', 'business_name']],
              exclude: ['id', 'name', 'createdAt', 'updatedAt', 'deletedAt']
            }
          }]
        }]
      }]
    });

    return {
      totalRecords: total_queue_records,
      data: queuePaginate
    }
  },

  getInProgress: async (serviceId) => {
    const queues = await Queue.findAll({
      where: {
        service_id: serviceId,
        status: 'IN_PROGRESS'
      }
    });

    return (queues) ? queues : 0;
  },

  //UPDATE Operations
  update: async (id, status) => {
    const queue = await Queue.findOne({
      where: {id}
    });
    
    queue.status = status;

    return await queue.save();
  },

  markQueueAsCompleted: async (id) => {
    const queue = await Queue.findOne({where: {id}});
    if (queue.status !== ['IN_PROGRESS']) {
      throw new ServiceError('Queue is not in progress');
    }
    queue.status = 'COMPLETED';
    return queue.save();
  }
};
