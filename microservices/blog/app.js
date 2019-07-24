'use strict'
const MicroMQ = require('micromq')

const error = require('./error')
const service = require('./service/servicelayer')
const middlewares = require('./middlewares/index')

const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'

var fn = require('funclib')
// === === === === === === === === === === === ===
// 1. подключение gateway - создаем микросервис 
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['auth'],
  name: 'blog',
  rabbit: {
    url: rabbitUrl
  }
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
// 4. middlvere - setup route endpoint 
// === === === === === === === === === === === ===
app.get('/blog/:pid.html', async (req, res) => {
  console.log(req)
  const response  = service('auth', {
    server: {
      action: 'auth',
      meta: {
        amount: 250,
      },
    },
  }, app)

  // const template = await service('render', {
  //   server: {
  //     action: 'render',
  //     meta: {
  //       page: 'html'
  //     }
  //   }
  // }, app)
  
  // fn.log({
  //   auth: response,
  //   // template: template
  // }, 'blog')

  // res.json({
  //   auth: response,
  //   // template: template
  // })
  fn.log(response, 'response')
  res.json({ok: true})
})

app.start()