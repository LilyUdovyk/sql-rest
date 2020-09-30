const { Router } = require( 'express');

const router = new Router();

router.use('/info', (req, res) => res.send('Here we go!'));

module.exports = router;
