'use strict'
const session = require('../.services/session/index')
const mongoStore = require('connect-mongo')(session)

module.exports = (app) => {
  // app.use(cookieParser())
  // TODO: Перенести в конфиг
  app.use(session({
    secret: 'wuxHK8j2m2DiOkbFb8TzaqHm',
    name: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
      "path": "/",
      "httpOnly": false,
      "secure": false,
      "maxAge": 36000000
    },
    store: new mongoStore({
      url: "mongodb://localhost:27017/micRO",
      collection: 'sessions',
      stringify: false
    })
  }))
  return app
}