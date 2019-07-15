'use strict'
const MicroMQ = require('micromq')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const error = require('./error')

const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'

var fn = require('funclib')
// === === === === === === === === === === === ===
// NOTE: 1. подключение gateway - создаем микросервис 
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['auth'],
  name: 'blog',
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

app.get('/blog/:id.html', async (req, res) => {

  const { status, response } = await app.ask('auth', {
    server: {
      action: 'auth',
      meta: {
        amount: 250,
      },
    },
  })

  fn.log(status, 'status')
  fn.log(response, 'response')

  res.json({
    ok: true
  })
})

app.start()