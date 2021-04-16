const knexfile = require('./knexfile')
const pg = require('pg-promise')()

//access variables in env file with dotenv dependency
require('dotenv').config()

const db = pg({
  "database": "citymeal",
  "user": process.env.PGUSERNAME,
  "password": process.env.PGPASSWORD
})

module.exports = db;