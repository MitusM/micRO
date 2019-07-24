const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
module.exports = (app) => {
  // 1 Парсим куки
  app.use(cookieParser())
  // 2 CSRF 
  app.use(csrf())

  // 3 Тело запроса
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  return app
}