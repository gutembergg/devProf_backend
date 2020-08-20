exports.up = function (knex) {
  return knex.schema.table('languages', function (table) {
    table.renameColumn('name', 'lang')
  })
}

exports.down = function (knex) {
  return knex.schema.table('languages', function (table) {
    table.dropColumn('lang')
  })
}
