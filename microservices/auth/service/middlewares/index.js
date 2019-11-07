// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')

module.exports = (app) => {
  // 1 Парсим куки
  app.use(cookieParser())
  // 2 CSRF 
  app.use(csrf())

  app.use(async (req, res, next) => {
    if (req.cookies.sid && !req.sessionID) {
      let cookies = req.cookies.sid
      let val = cookies.slice(2).split('.')
      req.sessionID = val[0]
    }
    await next()
  })

  // session(app)
  // 3 Тело запроса
  // app.use(bodyParser.json())
  // app.use(bodyParser.urlencoded({
  //   extended: true
  // }))
  return app
}