const knex = require('../database')

module.exports = {
  async create(req, res) {
    const { user_id } = req.body

    await knex('connections').insert({
      user_id
    })
    return res.status(201).send()
  },

  async index(req, res) {
    const totalConnections = await knex('connections').count('* as total')

    const { total } = totalConnections[0]

    return res.status(200).send({ total })
  }
}
