const express = require('express')
const routes = require('./routes')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3333

const app = express()

// Middlewares ////////////////////////////////////////////////////////////////////////

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes)

///////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server lintens port ${PORT}`)
})
