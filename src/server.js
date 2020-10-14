require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3333

const routes = require('./routes')

const app = express()

// Middlewares ////////////////////////////////////////////////////////////////////////
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  )
  next()
})

app.use(routes)

///////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server lintens port ${PORT}`)
})
