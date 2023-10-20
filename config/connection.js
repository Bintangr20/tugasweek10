const {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME} = process.env

const { Pool } = require('pg');
const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME
})
console.log(DB_NAME)

module.exports = pool;