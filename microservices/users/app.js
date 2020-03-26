"use strict"
const MicroMQ = require("micromq")
/** Обработка ошибок */
const error = require("./service/error")
/**  */
// TODO: Переименовать файл
/** middleware */
const middlewares = require('./service/middlewares/index')
/** Конфиг */
const config = require('./config/config.json')
/** Подключаем базу данных */
require('./service/dbServices')(config.mongoose.uri)
/** эндпоинты */
let endpoints = require('./controllers/index')
/**  */
let action = require('./actions/index')
/** Подключение к rabbitmq */
const rabbitUrl = process.env.RABBIT_URL || config.rabbit.url
// eslint-disable-next-line no-unused-vars
// let fn = require("funclib")
// === === === === === === === === === === === ===
// 1. подключение gateway - создаем микросервис авторизации
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['render', 'auth'],
  name: "users",
  rabbit: {
    url: rabbitUrl
  }
})
// === === === === === === === === === === === ===
// 3. Перехват и обработка ошибок
// === === === === === === === === === === === ===
error(app)

// === === === === === === === === === === === ===
// 4. middlvere - setup route middlewares
// === === === === === === === === === === === ===
middlewares(app)

// === === === === === === === === === === === ===
// 5.
// === === === === === === === === === === === ===
action(app)

// === === === === === === === === === === === ===
// 6. подключение эндпоинтов микросервиса
// === === === === === === === === === === === ===
endpoints(app)

app.start()