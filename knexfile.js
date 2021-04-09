// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'citymeal',
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'citymeal',
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
    client: 'postgresql',
    connection: {
      database: 'citymeal',
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
  }

};
