'use strict'
const Gateway = require('micromq/gateway')
const path = require('path')
// TODO: придумать название переменной
const {
  loading
} = require('./microservices/index')
const middlewares = require('./core/middlewares')

const microservices = path.join(__dirname, 'microservices')
const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'

// eslint-disable-next-line no-unused-vars
// var fn = require('funclib')

// === === === === === === === === === === === ===
// 1. Подгрузка массива микросервисов и эндпоинтов
// === === === === === === === === === === === ===
// TODO: придумать название переменной
// TODO: убрать подгрузку router
const array = loading(microservices)

// === === === === === === === === === === === ===
// 2. подключение gateway - создаем гейтевей
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
// 3. middlvere - setup route middlewares
// === === === === === === === === === === === ===
// cookieParser - csrf - bodyParser.urlencoded
middlewares(app)

// === === === === === === === === === === === ===
// 4. подключение эндпоинтов микросервисов
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
