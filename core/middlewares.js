'use strict'
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const session = require('./session')
// const session = require('express-session')
// var csrfProtection
module.exports = (app) => {
  // csrf({
  //   cookie: true
  // })
  // 3.1 Session
  session(app)
  // 3.1 Парсим куки
  app.use(cookieParser())
  // 3.2 CSRF 
  app.use(csrf())

  return app
}