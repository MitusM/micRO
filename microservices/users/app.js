"use strict"
const MicroMQ = require("micromq")
/** Обработка ошибок */
const error = require("./service/error")
/**  */
// TODO: Переименовать файл
const service = require('./service/serviceLayer')
/** middleware */
const middlewares = require('./service/middlewares/index')
/** Конфиг */
const config = require('./config/config.json')
/** Шаблоны (папка)*/
const views = require('./service/viewsServices')
/** Подключаем базу данных */
require('./service/dbServices')(config.mongoose.uri)

// const csrf = require('csurf')

/** Подключение к rabbitmq */
const rabbitUrl = process.env.RABBIT_URL || config.rabbit.url
/** Местоположение (директория) шаблона */
let dirTemplate = views()
// eslint-disable-next-line no-unused-vars
let fn = require("funclib")

// === === === === === === === === === === === ===
// 1. подключение gateway - создаем микросервис авторизации
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['render'],
  name: "users",
  rabbit: {
    url: rabbitUrl
  }
})

// === === === === === === === === === === === ===
// 2. Перехват и обработка ошибок
// === === === === === === === === === === === ===
const Users =  new (require('./service/userServices'))(config)

// === === === === === === === === === === === ===
// 3. Перехват и обработка ошибок
// === === === === === === === === === === === ===
error(app)

// === === === === === === === === === === === ===
// 4. middlvere - setup route middlewares
// === === === === === === === === === === === ===
middlewares(app)

// let csrfProtection = csrf()
// === === === === === === === === === === === ===
// 5. 
// === === === === === === === === === === === ===
// TODO: вынести в action
app.action("users", async (meta) => {
  return {
    users: meta
  }
})

// app.post('*', async (req, res) => {
//   console.log('req:*: ', req.body)
// })

// app.enablePrometheus('/users/metrics');
// === === === === === === === === === === === ===
// 6. подключение эндпоинтов микросервиса
// === === === === === === === === === === === ===
// NOTE: Список пользователей
// app.get("/users/list.html", Users.getUsers)
app.get("/users/", async (req, res) => {
  // // console.log('req', req)
  Users.getUsers(req,res)
})

app.get("/users/id-:pid.html", async (req, res) => {
  const template = await service('render', {
    // TODO: Продумать название обьекта
    server: {
      action: 'render',
      meta: {
        dir: dirTemplate,
        page: 'index.njk'
      }
    }
  }, app)

  await res.end(template.response.render)
})

// app.post("/users/list", (req, res) => {
//   fn.log(req.body, 'req.body')
//   res.json({
//     users: true
//   })
// })

app.post("/users/", (req, res) => {
  Users.getUsersList(req, res)
})

app.start()