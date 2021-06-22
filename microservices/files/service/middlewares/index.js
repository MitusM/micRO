'use strict'
// const cookieParser = require('cookie-parser')
const csrf = require('csurf')


module.exports = (app) => {
  // app.use(cookieParser())
  // CSRF
  app.use(csrf())

  /** 
   * Проверяем авторизован пользователь в системе. Если не авторизован отдаём страницу авторизации.
   */
  app.all(['/upload/(.*)'], async (req, res, next) => {
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
      await res.end(redirect.response)
    } else {
      await next()
    }
  })



  return app
}