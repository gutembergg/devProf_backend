exports.up = function (knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary()
    table.string('technologies').notNullable()
    table.decimal('cost').notNullable()

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('classes')
}
