const { success, notFound } = require('../../services/response');
const { PassengersFlights }  = require('./model');

module.exports.index = ({ body }, res, next) =>
  PassengersFlights.findAll()
    .then(success(res))
    .catch(next)

module.exports.show = ({ params }, res, next) =>
  PassengersFlights.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

module.exports.create = ({ body }, res, next) =>
  PassengersFlights.create(body)
    .then(success(res, 201))
    .catch(next)

module.exports.update = ({ body, params, user }, res, next) =>
  PassengersFlights.updateById(params.id, body)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

module.exports.destroy = ({ params }, res, next) =>
  PassengersFlights.delete(params.id)
    .then(notFound(res))
    .then(success(res, 204))
    .catch(next)