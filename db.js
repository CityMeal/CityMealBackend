const knexfile = require('./knexfile')
const pg = require('pg-promise')()

//access variables in env file with dotenv dependency
require('dotenv').config()

const db = pg({

  development: {
    "database": process.env.DB_NAME,
    "user": process.env.PGUSERNAME,
    "password": process.env.PGPASSWORD
  },

  production: {
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  }

});

module.exports = db;