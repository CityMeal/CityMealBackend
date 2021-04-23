
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('username').notNullable()
    table.string('city')
    table.string('zipcode').notNullable()
    table.string('address')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
