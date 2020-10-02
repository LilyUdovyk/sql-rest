const { Router }  = require('express');
const { index }  = require('./controller');

const router = new Router()

router.get('/', index)

// router.get('/:id', show)

// router.post('/', create)

// router.put('/:id', update)

// router.delete('/:id', destroy)

module.exports = router
