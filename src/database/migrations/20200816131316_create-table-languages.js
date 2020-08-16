exports.up = function (knex) {
  return knex.schema.createTable('languages', table => {
    table.increments('id').primary()
    table.string('name').notNullable()

    table
      .integer('classes_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('languages')
}
