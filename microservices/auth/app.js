"use strict"
const MicroMQ = require("micromq")
const error = require("./service/error")
const middlewares = require('./service/middlewares/index')
/** Конфиг */
const config = require('./config/config.json')
require('./service/dbServices')(config.mongoose.uri)

const rabbitUrl = process.env.RABBIT_URL || config.rabbit.url
const views = require('./views/load')
const endpoints = require('./controllers/')
const action = require('./actions/')

// eslint-disable-next-line no-unused-vars
// let fn = require("funclib")

// === === === === === === === === === === === ===
// 1. подключение gateway - создаем микросервис авторизации
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['render', 'users'],
  name: "auth",
  rabbit: {
    url: rabbitUrl
  },
  config: config,
  dirTemplate: views()
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


app.start()