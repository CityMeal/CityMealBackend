
exports.up = function (knex) {
  return knex.schema.createTable('locations', function (table) {
    table.increments('id')
    table.integer('location_id').notNullable()
    table.string('api').notNullable()
    table.string('name').notNullable()
    table.string('city').notNullable()
    table.string('siteAddress').notNullable()
    table.string('zip').notNullable()
    table.string('longitude')
    table.string('latitude')
    table.string('accessibility')
    table.string('kosher')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('locations')
}
