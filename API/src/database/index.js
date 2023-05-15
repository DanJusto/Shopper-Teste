const mysql = require("mysql2");

async function dbConnection() {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shopperdb'
  });
  
  return db;
}

module.exports = dbConnection;