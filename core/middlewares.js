'use strict'
const csrf = require('csurf')
const session = require('./session')

module.exports = (app) => {
  // 3.1 Session
  session(app)
  // 3.2 CSRF
  app.use(csrf())

  return app
}