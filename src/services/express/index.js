const express = require( 'express');
const cors = require( 'cors');
const compression = require( 'compression');
const morgan = require( 'morgan');
const bodyParser = require( 'body-parser');

module.exports = (apiRoot, routes) => {
  console.log("routes", routes)
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);

  return app;
};
