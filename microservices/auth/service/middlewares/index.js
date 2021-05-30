// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')

module.exports = (app) => {
  // 1 Парсим куки
  app.use(cookieParser())
  // 2 CSRF 
  app.use(csrf())

  // app.use(async (req, res, next) => {
  //   console.log('-----------------------------------------')
  //   console.log('⚡ req.sessionID', req.sessionID)
  //   console.log('-----------------------------------------')
  //   next()
  // })

  // app.use(async (req, res, next) => {
  //   if (req.cookies.sid && !req.sessionID) {
  //     let cookies = req.cookies.sid
  //     let val = cookies.slice(2).split('.')
  //     req.sessionID = val[0]
  //   }
  //   await next()
  // })

  return app
}