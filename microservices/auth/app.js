'use strict'
const MicroMQ = require('micromq')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const error = require('./error')

const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'

var fn = require('funclib')
// === === === === === === === === === === === ===
// NOTE: 1. подключение gateway - создаем микросервис авторизации
// === === === === === === === === === === === ===
const app = new MicroMQ({
  name: 'auth',
  rabbit: {
    url: rabbitUrl
  }
})
// === === === === === === === === === === === ===
// NOTE: 2. Перехват и обработка ошибок
// === === === === === === === === === === === ===
error(app)
// === === === === === === === === === === === ===
// NOTE: 3. middlvere - setup route middlewares
// === === === === === === === === === === === ===
// 3.1 Парсим куки
app.use(cookieParser())
// 3.2 CSRF 
app.use(csrf())

// 3.3 Тело запроса
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//  res
app.action('auth', async (meta, res) => {
  return {auth: true}
});

// === === === === === === === === === === === ===
// NOTE: 4. подключение эндпоинтов микросервиса
// === === === === === === === === === === === ===
// NOTE: Авторизация.  async
app.get('/auth/login', (req, res) => {
  fn.log(req.path, 'path')
  fn.log(req.method, 'method')
  // fn.log(req.session, 'session')
  // fn.log(req.sessionID, 'sessionID')
  // fn.log(req.cookies, 'cookies')
  // fn.log(req.cookies.sid, 'cookie sid')
  fn.log(req.params, 'params')
  fn.log(req.body, 'body')
  fn.log(req.query, 'query')
  res.json(req.session)
})

app.post('/auth/login', (req, res) => {
  fn.log(req.path, 'path')
  fn.log(req.method, 'method')
  fn.log(req.params, 'params')

  // await 
  res.json({
    auth: true
  })
})

// NOTE: Регистрация.
app.get('/auth/signup', async (req, res) => {
  console.log(req, 'req')
  fn.log(req.session, 'session')
  fn.log(req.auth, 'auth')
  await res.json(req.session)
})

app.start()