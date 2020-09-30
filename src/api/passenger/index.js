import { Router } from 'express'
// import { middleware as query } from 'querymen'
// import { middleware as body } from 'bodymen'
import { index, showMe, show, create, update, destroy } from './controller'
import Passenger from './model'

const router = new Router()
// const { email, password, login, firstName, lastName, picture, country, role, flights } = schema.tree

router.get('/',
  // query(),
  index)

router.get('/me',
  showMe)

router.get('/:id',
  show)

router.post('/',
  // body({ email, password, login, firstName, lastName, picture, country }),
  create)

router.post('/admin',
  // body({ email, password, login, firstName, lastName, picture, country, role: { ...firstName, default: admin } }),
  create)

router.put('/:id',
  // body({ email: { ...email, required: false }, firstName: { ...firstName, required: false }, lastName: { ...lastName, required: false }, picture, country: { ...country, required: false },
  //   flights: {
  //     action: { type: String, enum: ['update', 'append'], default: 'append' },
  //     flight: { type: String, required: true } 
  //   }
  // }),
  update)

// router.put('/:id/password',
//   body({ password }),
//   updatePassword)

router.delete('/:id',
  destroy)

export default router
