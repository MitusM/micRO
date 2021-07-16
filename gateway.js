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

/**
 * Загрузка файлов.
 */
const upload = require('./core/upload')

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
// 5. Connecting and microservice endpoints
// === === === === === === === === === === === ===
app.get('/', async (req, res) => {
  await res.delegate('home');
});

/**  */
app.get('/:microservice-(.*)', async (req, res) => {
  await res.delegate(req.params.microservice);
});

/** 
 * ru: Принимаем запрос на загрузку файла(ов).Проверяем авторизован пользователь, если да то загружаем файлы, если не то даёт ответ со статусом 401. Настройки для загрузки хранятся в конфигурационном файле, в зависимости от resource
 * 
 * en: We accept a request for downloading a file(s). Check the authorized user if yes, you load the files if it does not respond to status 401. The download settings are stored in the configuration file, depending on resource
 */
app.post('/upload/:resource', async (req, res) => {
  if (req.session.auth) {
    try {
      req.body = await upload(req, req.params.resource)
      await res.delegate('files')
    } catch (error) {
      console.log('🌡 Error:upload:gateway', error)
      //! TODO: Вынести отдельно.
      await res.status(503).json({
        code: error.code,
        status: 503,
        message: 'Service Unavailable'
      })
    }
  } else {
    await res.status(403).end({
      message: 'Unauthorized'
    })
  }
})

/**  */
app.all('/:microservice/(.*)', async (req, res) => {
  await res.delegate(req.params.microservice);
});

// We listen to the port and accept requests
app.listen(process.env.PORT || 7505)