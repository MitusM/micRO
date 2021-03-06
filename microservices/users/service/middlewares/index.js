const cookieParser = require('cookie-parser')
const csrf = require('csurf')
module.exports = (app) => {
  // 1 Парсим куки
  app.use(cookieParser())
  // 2 CSRF 
  app.use(csrf())

  app.all([
    "/users/",
    "/users/id-:id?.html",
    "/users/:page?-:number?.html",
    "/users/info-:id",
    "/users/create"
  ], async (req, res, next) => {
    if (!req.session.auth) {
      const redirect = await res.app.ask('auth', {
        server: {
          action: 'redirect',
          meta: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            session: req.session
          }
        }
      })
      res.end(redirect.response)
    } else {
      next()
    }
  })

  return app
}