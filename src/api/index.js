const { Router } = require( 'express');

const passengers = require('./passenger');
const flights = require('./flight');
const planes = require('./plane');


const router = new Router();

router.use('/info', (req, res) => res.send('Here we go!'));
router.use('/passengers', passengers);
router.use('/flights', flights);
router.use('/planes', planes);


module.exports = router;
