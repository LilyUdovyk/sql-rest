const mysql = require('mysql2');
const { host, user, password, database } = require('../../../config');
  
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });
  
  module.exports = connection;