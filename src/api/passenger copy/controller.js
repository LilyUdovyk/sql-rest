const { success, notFound } = require('../../services/response');
const { Passenger }  = require('./model');

module.exports.index = ({ body }, res, next) =>
  Passenger.findAll()
    .then(success(res))
    .catch(next)

module.exports.show = ({ params }, res, next) =>
  Passenger.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

module.exports.create = ({ body }, res, next) =>
  Passenger.create(body)
    .then(success(res, 201))
    .catch(next)

module.exports.update = ({ body, params, user }, res, next) =>
  Passenger.updateById(params.id, body)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

module.exports.destroy = ({ params }, res, next) =>
  Passenger.delete(params.id)
    .then(notFound(res))
    .then(success(res, 204))
    .catch(next)