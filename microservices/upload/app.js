"use strict"
const MicroMQ = require("micromq")
const error = require("./service/error")
const middlewares = require('./service/middlewares/index')
const action = require('./action')
const endpoints = require('./controllers/app')

const {
  dir
} = require('./service/viewsServices')
/** Конфиг */
const config = require('./config/config.json')
require('./service/dbServices')(config.mongoose.uri)

// === === === === === === === === === === === ===
// 1. подключение gateway - создаем микросервис
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['render', 'users', 'auth', 'widget', 'article'],
  name: "upload",
  rabbit: {
    url: process.env.RABBIT_URL || config.rabbit.url
  },
  config: config,
  dirTemplate: dir(),
  adminTemplate: dir(config.adminTemplate)
})

// === === === === === === === === === === === ===
// 2. Перехват и обработка ошибок
// === === === === === === === === === === === ===
error(app)

// === === === === === === === === === === === ===
// 3. middlvere - setup route middlewares
// === === === === === === === === === === === ===
middlewares(app)

// === === === === === === === === === === === ===
// 4.
// === === === === === === === === === === === ===
action(app)

// === === === === === === === === === === === ===
// 5.
// === === === === === === === === === === === ===
endpoints(app)

// === === === === === === === === === === === ===
// 6.
// === === === === === === === === === === === ===
// app.start()
app.listen(process.env.PORT || 7501)