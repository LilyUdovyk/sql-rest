const { success, notFound } = require('../../services/response');
const { Plane }  = require('./model');

module.exports.index = ({ body }, res, next) =>
  Plane.findAll()
    .then(success(res))
    .catch(next)

module.exports.show = ({ params }, res, next) =>
  Plane.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

module.exports.create = ({ body }, res, next) =>
  Plane.create(body)
    .then(success(res, 201))
    .catch(next)

module.exports.update = ({ body, params, user }, res, next) =>
  Plane.updateById(params.id, body)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

module.exports.destroy = ({ params }, res, next) =>
  Plane.delete(params.id)
    .then(notFound(res))
    .then(success(res, 204))
    .catch(next)