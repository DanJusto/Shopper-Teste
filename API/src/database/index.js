const mysql = require("mysql2");
require('dotenv').config();

const host_db = process.env.HOST;
const user_db = process.env.DB_USER;
const password_db = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

async function dbConnection() {
  const db = mysql.createConnection({
    host: host_db,
    user: user_db,
    password: password_db,
    database: database
  });
  
  return db;
}

module.exports = dbConnection;