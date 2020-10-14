const knex = require('../database')
const ConvertHourInMin = require('../utils/convertHoursInMin')

module.exports = {
  async index(req, res) {
    const filters = req.query
    try {
      if (!filters.languages || !filters.week_day || !filters.time) {
        return res.status(400).send({ error: 'Missing filters for search classes' })
      }
      const timeInMinutes = ConvertHourInMin.convertHourInMin(filters.time)

      const classes = await knex('classes')
        .whereExists(function () {
          this.select('*')
            .from('class_schedule')
            .whereRaw('classes.id = class_schedule.classes_id')
            .whereRaw('class_schedule.week_day = ?', [filters.week_day])
            .whereRaw('class_schedule.from <= ?', [timeInMinutes])
            .whereRaw('class_schedule.to > ?', [timeInMinutes])
        })
        .whereExists(function () {
          this.select('*')
            .from('languages')
            .whereRaw('classes.id = languages.classes_id')
            .whereRaw('languages.lang = ?', [filters.languages])
        })
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])

      return res.send(classes)
    } catch (error) {
      console.log(error)
    }
  },

  //Create User ///////////////////////////////////////////////////////////////////////////

  async create(req, res) {
    const { location } = req.file

    const {
      name,
      avatar = location,
      whatsapp,
      technologies,
      cost,
      languages: lang,
      schedule: sched
    } = req.body

    const languages = JSON.parse(lang)
    const schedule = JSON.parse(sched)

    try {
      const trx = await knex.transaction()

      const userLastId = await trx('users')
        .insert({
          name,
          avatar,
          whatsapp
        })
        .returning('id')

      const user_id = userLastId[0]

      const classeLastId = await trx('classes')
        .insert({
          technologies,
          cost,
          user_id
        })
        .returning('id')

      const classes_id = classeLastId[0]

      const classLanguages = languages.map(langItem => {
        return {
          classes_id,
          lang: langItem.lang
        }
      })

      await trx('languages').insert(classLanguages)

      const classSchedule = schedule.map(scheduleItem => {
        return {
          classes_id,
          week_day: scheduleItem.week_day,
          from: ConvertHourInMin.convertHourInMin(scheduleItem.from),
          to: ConvertHourInMin.convertHourInMin(scheduleItem.to)
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return res.send()
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}
