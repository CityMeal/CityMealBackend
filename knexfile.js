// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
