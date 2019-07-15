const Gateway = require('micromq/gateway')
const path = require('path')
// const session = require('./core/session')
const {
  loading
} = require('./microservices/index')
const middlewares = require('./core/middlewares')

const microservices = path.join(__dirname, 'microservices')
const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'

var fn = require('funclib')

// === === === === === === === === === === === ===
// NOTE: 1. Подгрузка массива микросервисов и эндпоинтов
// === === === === === === === === === === === ===
const d = loading(microservices)
// fn.log(d, 'd')
// === === === === === === === === === === === ===
// NOTE: 2. подключение gateway - создаем гейтевей
// === === === === === === === === === === === ===
const app = new Gateway({
  microservices: d,
  rabbit: {
    url: rabbitUrl
  },
  requests: {
    timeout: 1000,
  },
})

// === === === === === === === === === === === ===
// NOTE: 3. middlvere - setup route middlewares
// === === === === === === === === === === === ===
// cookieParser - csrf - bodyParser.json - bodyParser.urlencoded
middlewares(app)
// 3.4 
// app.use(async (req, res, next) => {
//   req.microservices = d
//   await next()
// })

// === === === === === === === === === === === ===
// NOTE: 4. подключение эндпоинтов микросервисов
// === === === === === === === === === === === ===
// NOTE: создаем эндпоинт на все методы авторизации
// , csrfProtection
app.all(/^\/(auth)(\/.+$)?/, async (req, res) => {
  await res.delegate('auth');
})

// // NOTE: создаем два эндпоинта /login (авторизация) & /signup (регистрация)
// app.all(['/login', '/signup'], async (req, res) => {
//   // console.log('req:', req)
//   fn.log(req.path, 'path')
//   fn.log(req.method, 'method')
//   fn.log(req.session, 'session')
//   fn.log(req.sessionID, 'sessionID')
//   fn.log(req.cookies, 'cookies')
//   fn.log(req.microservices, 'req.microservices')
//   fn.log(res.delegate, 'res.delegate')
//   // делегируем запрос в микросервис auth
//   await res.delegate('auth')
// })

app.all(/^\/(blog)(\/.+$)?/, async (req, res) => {
  // // console.log('req:', req)
  await res.delegate('blog');
})

// слушаем порт и принимаем запросы
app.listen(process.env.PORT || 7505)