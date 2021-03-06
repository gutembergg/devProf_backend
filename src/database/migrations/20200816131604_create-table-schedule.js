exports.up = function (knex) {
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary()
    table.integer('week_day').notNullable()
    table.integer('from').notNullable()
    table.integer('to').notNullable()

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
  return knex.schema.dropTable('class_schedule')
}
