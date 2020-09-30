import { success, notFound } from '../../services/response/'
import { Passenger } from '.'
// import { Flight } from '../flight'

export const index = ({ body }, res, next) =>
  Passenger.findAll()
    .then((users) => users.map((user) => user.view(true)))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Passenger.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ body }, res, next) =>
  Passenger.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch(next)

export const update = ({ body, params, user }, res, next) =>
  Passenger.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((user) => user ? user.save() : null )
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Passenger.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)