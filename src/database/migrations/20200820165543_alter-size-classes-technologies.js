exports.up = function (knex) {
  return knex.raw('alter table ?? alter column ?? type varchar(600)', ['classes', 'technologies'])
}

exports.down = function (knex) {
  return knex.raw('alter table ?? alter column ?? type varchar(255)', ['classes', 'technologies'])
}
