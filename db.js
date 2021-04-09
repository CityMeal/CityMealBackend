const knexfile = require('./knexfile')
const pg = require('pg-promise')()

//access variables in env file with dotenv dependency
require('dotenv').config()

const db = pg({
  "host": process.env.HOST,
  "port": process.env.DBPORT,
  "database": "citymeal",
  "user": process.env.PGNAME,
  "password": process.env.PGPASSWORD
})

module.exports = db;