
"use strict"
const MicroMQ = require("micromq")

const error = require("./service/error")
const service = require('./service/servicelayer')
const middlewares = require('./service/middlewares/index')

const rabbitUrl = process.env.RABBIT_URL || "amqp://localhost:5672"
const views = require('./views/load')
// eslint-disable-next-line no-unused-vars
let fn = require("funclib")

// === === === === === === === === === === === ===
// Местоположение (директория) шаблона
// === === === === === === === === === === === ===
let dirTemplate = views()

// === === === === === === === === === === === ===
// 1. подключение gateway - создаем микросервис авторизации
// === === === === === === === === === === === ===
const app = new MicroMQ({
  name: "auth",
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
// 4. 
// === === === === === === === === === === === ===
app.action("auth", async (meta) => {
  return {auth: meta}
})

// === === === === === === === === === === === ===
// 5. подключение эндпоинтов микросервиса
// === === === === === === === === === === === ===
// NOTE: Авторизация. 
app.get("/auth/login", async (req, res) => {
  const template = await service('render', {
    // TODO: Продумать название обьекта ✅
    server: {
      action: 'render',
      meta: {
        dir: dirTemplate,
        page: 'login.html'
      }
    }
  }, app)
  // fn.log(template, 'template:auth')
  await res.end(template.response.render)
})

app.post("/auth/login", (req, res) => {
  res.json({
    auth: true
  })
})

// NOTE: Регистрация.
app.get("/auth/signup", async (req, res) => {
  await res.json(req.session)
})

app.start()