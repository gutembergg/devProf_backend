require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3333

const routes = require('./routes')

const app = express()

// Middlewares ////////////////////////////////////////////////////////////////////////

app.use(express.json())
app.use(cors({ origin: 'https://devprof-backend.herokuapp.com' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes)

///////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server lintens port ${PORT}`)
})
