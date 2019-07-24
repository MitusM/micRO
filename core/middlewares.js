'use strict'
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const session = require('./session')
// var csrfProtection
module.exports = (app) => {
  csrf({
    cookie: true
  })
  // 3.1 Session
  session(app)
  // 3.1 Парсим куки
  app.use(cookieParser())
  // 3.2 CSRF 
  app.use(csrf())
  // 3.3 Тело запроса
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  return app
}