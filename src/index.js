const http = require('http');
const express = require( './services/express');
const { port, host, apiRoot } = require('../config');
const api = require('./api');

const app = express(apiRoot, api)
const server = http.createServer(app)

// db initilization

setImmediate(() => {
  server.listen({ port, host }, () => {
    console.log(`Express server listening on http://${host}:${port}`)
  })
})

module.exports = app
