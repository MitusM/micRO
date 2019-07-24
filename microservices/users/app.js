"use strict"
const MicroMQ = require("micromq")

const error = require("./service/error")
const service = require('./service/serviceLayer')
const middlewares = require('./service/middlewares/index')

const rabbitUrl = process.env.RABBIT_URL || "amqp://localhost:5672"
const views = require('./service/viewsServices')
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
  name: "users",
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
app.action("users", async (meta) => {
  return {
    users: meta
  }
})

// app.get('*', async (req, res) => {
//   console.log('req:*: ', req)
// })

// === === === === === === === === === === === ===
// 5. подключение эндпоинтов микросервиса
// === === === === === === === === === === === ===
// NOTE: Список пользователей
// TODO: !!! - Как перехватывать запрос /users/
app.get("/users/list.html", async (req, res) => {
  // console.log('req: ', req)
  const template = await service('render', {
    // TODO: Продумать название обьекта
    server: {
      action: 'render',
      meta: {
        dir: dirTemplate,
        page: 'index.html'
      }
    }
  }, app)
  // fn.log(template, 'template')
  await res.end(template.response.render)
})

app.get("/users/id-:pid.html", async (req, res) => {
  // console.log('req: ', req)
  // console.log('path: ', req.path)
  const template = await service('render', {
    // TODO: Продумать название обьекта
    server: {
      action: 'render',
      meta: {
        dir: dirTemplate,
        page: 'index.html'
      }
    }
  }, app)

  await res.end(template.response.render)
})

app.post("/users/", (req, res) => {
  res.json({
    users: true
  })
})

app.start()