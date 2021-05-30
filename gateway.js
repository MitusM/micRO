'use strict'
// const Gateway = require('micromq/gateway')
const Gateway = require('./core/micromq/gateway')
const path = require('path')
const action = require('./core/action')
// FIXME: Переработать загрузку микросервисов
// TODO: придумать название переменной
const {
  loading
} = require('./microservices/index')
const middlewares = require('./core/middlewares')

const microservices = path.join(__dirname, 'microservices')
const rabbitUrl = process.env.RABBIT_URL || 'amqp://guest:guest@localhost:5672/'

// === === === === === === === === === === === ===
// 1. Загрузка массива микросервисов и эндпоинтов
// === === === === === === === === === === === ===
// FIXME: убрать загрузку router
// TODO: придумать название переменной
const array = loading(microservices)

// === === === === === === === === === === === ===
// 2. подключение gateway
// === === === === === === === === === === === ===
const app = new Gateway({
  microservices: array.microservices,
  rabbit: {
    url: rabbitUrl
  },
  requests: {
    timeout: 5000,
  }
})

// === === === === === === === === === === === ===
// 3. middleware - setup route middlewares
// === === === === === === === === === === === ===
middlewares(app)

// === === === === === === === === === === === ===
// 4. actions
// === === === === === === === === === === === ===
action(app)

// === === === === === === === === === === === ===
// 5. подключение эндпоинтов микросервисов
// === === === === === === === === === === === ===
app.get('/', async (req, res) => {
  await res.delegate('home');
});

app.get('/:microservice-(.*)', async (req, res) => {
  await res.delegate(req.params.microservice);
});

app.all('/:microservice/(.*)', async (req, res) => {
  await res.delegate(req.params.microservice);
});

// слушаем порт и принимаем запросы
app.listen(process.env.PORT || 7505)