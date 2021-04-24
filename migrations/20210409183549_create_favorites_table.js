
exports.up = function (knex) {
  return knex.schema.createTable('favorites', function (table) {
    table.increments('id')
    table.integer('location_id').unsigned().notNullable()
    table.integer('user_id').unsigned().notNullable()
    table.timestamps(true, true)

    table.foreign('location_id').references('id').inTable('locations').onDelete('CASCADE')
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('favorites')
}
