const express = require('express')

const UserController = require('./controllers/UserController')
const ConnectionController = require('./controllers/ConnectionController')

const routes = express.Router()

routes.post('/users', UserController.create)
routes.get('/users', UserController.index)

routes.post('/connections', ConnectionController.create)
routes.get('/connections', ConnectionController.index)

module.exports = routes
