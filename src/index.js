const http = require('http');
const express = require( './services/express');
const mysql = require('./services/mysql');
const { port, host, apiRoot } = require('../config');
const api = require('./api');

const app = express(apiRoot, api)
const server = http.createServer(app)

// db initilization
// if (mongo.uri) {
//   mongoose.connect(mongo.uri)
// }

mysql.connect(err => {
  if (err) {
    return console.error("Error: " + err.message);
  }
  else{
    console.log("Connected to DB!");
  }
});


setImmediate(() => {
  server.listen({ port, host }, () => {
    console.log(`Express server listening on http://${host}:${port}`)
  })
})

module.exports = app
