const { Router } = require( 'express');

const passengers = require('./passenger');
const flights = require('./flight');
const planes = require('./plane');
const passengers_flights = require('./passengers_flights');


const router = new Router();

router.use('/info', (req, res) => res.send('Here we go!'));
router.use('/passengers', passengers);
router.use('/flights', flights);
router.use('/planes', planes);
router.use('/passengers-flights', passengers_flights);

module.exports = router;
