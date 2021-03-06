const { success, notFound } = require('../../services/response');
const { Flight }  = require('./model');

module.exports.index = ({ body }, res, next) =>
  Flight.findAll()
    .then(notFound(res))
    .then((flights) => Promise.all(flights.map((flight) => flight.view('full'))))
    .then(success(res))
    .catch(next)

module.exports.show = ({ params }, res, next) =>
  Flight.findById(params.id)
    .then(notFound(res))
    .then((flight) => flight ? flight.view('full') : null )
    .then(success(res))
    .catch(next)

module.exports.create = ({ body }, res, next) =>
  Flight.create(body)
    .then(notFound(res))
    .then((flight) => flight ? flight.view('full') : null )
    .then(success(res, 201))
    .catch(next)

module.exports.update = ({ body, params, user }, res, next) =>
  Flight.updateById(params.id, body)
    .then(notFound(res))
    .then((flight) => flight ? flight.view('full') : null )
    .then(success(res))
    .catch(next)

module.exports.destroy = ({ params }, res, next) =>
  Flight.delete(params.id)
    .then(notFound(res))
    .then(success(res, 204))
    .catch(next)