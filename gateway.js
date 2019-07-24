
const Gateway = require('micromq/gateway')
const path = require('path')
const {
  loading
} = require('./microservices/index')
const middlewares = require('./core/middlewares')
const endpoints = require('./core/endpoints')

const microservices = path.join(__dirname, 'microservices')
const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'

var fn = require('funclib')

// === === === === === === === === === === === ===
// 1. Подгрузка массива микросервисов и эндпоинтов
// === === === === === === === === === === === ===
// TODO: придумать название переменной
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
    timeout: 1000,
  },
})

// === === === === === === === === === === === ===
// 3. middlvere - setup route middlewares
// === === === === === === === === === === === ===
// cookieParser - csrf - bodyParser.json - bodyParser.urlencoded
middlewares(app)

// === === === === === === === === === === === ===
// 4. подключение эндпоинтов микросервисов
// === === === === === === === === === === === ===
endpoints(app, array.router)

// слушаем порт и принимаем запросы
app.listen(process.env.PORT || 7505)