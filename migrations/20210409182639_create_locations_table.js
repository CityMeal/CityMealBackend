
exports.up = function (knex) {
  return knex.schema.createTable('locations', function (table) {
    table.increments('id')
    table.string('api').notNullable()
    table.string('name').notNullable()
    table.string('city').notNullable()
    table.string('siteAddress').notNullable()
    table.string('zip').notNullable()
    table.float('longitude')
    table.float('latitude')
    table.string('accessibility')
    table.string('kosher')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('locations')
}
