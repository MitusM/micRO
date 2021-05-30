'use strict'
const session = require('../session/')
const mongoStore = require('connect-mongo')

module.exports = (app) => {
  // app.use(cookieParser())
  // TODO: Перенести в конфиг
  app.use(session({
    secret: 'wuxHK8j2m2DiOkbFb8TzaqHm',
    name: 'sid',
    resave: false, // не сохранять сеанс, если он не изменен
    saveUninitialized: true,
    cookie: {
      "path": "/",
      "httpOnly": false,
      "secure": false,
      // "maxAge": 36000000
      "maxAge": 1000 * 60 * 60 * 24 * 14 // expires in 14 days
    },

    store: mongoStore.create({
      mongoUrl: "mongodb://localhost:27017/micRO",
      collectionName: 'sessions',
      stringify: false, // Если true, connect-mongo будет сериализовать сеансы, используя их JSON.stringify перед их установкой, и десериализовать их с помощью JSON.parse при их получении. Это полезно, если вы используете типы, которые MongoDB не поддерживает.
      // autoRemove: 'interval',
      // autoRemoveInterval: 100, // В минутах. По умолчанию 
      ttl: 14 * 24 * 60 * 60 // save session for 14 days
    })
  }))
  return app
}