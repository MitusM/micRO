"use strict"
const MicroMQ = require("micromq")
const error = require("./service/error")
const middlewares = require('./service/middlewares/index')
/** Конфиг */
const config = require('./config/config.json')
require('./service/dbServices')(config.mongoose.uri)

const views = require('./service/viewsServices')
const endpoints = require('./controllers/')
const action = require('./actions/')

// const rabbitUrl = process.env.RABBIT_URL || config.rabbit.url

// === === === === === === === === === === === ===
// 1. подключение gateway - создаем микросервис
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['render', 'users', 'auth', 'widget'],
  name: "home",
  rabbit: {
    url: process.env.RABBIT_URL || config.rabbit.url
  },
  config: config,
  dirTemplate: views(),
  adminTemplate: views(config.adminTemplate)
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
app.start()