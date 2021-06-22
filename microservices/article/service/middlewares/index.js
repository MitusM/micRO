const cookieParser = require('cookie-parser')
const csrf = require('csurf')

module.exports = (app) => {
  // 1 Парсим куки
  app.use(cookieParser())
  // 2 CSRF
  app.use(csrf())

  app.all(['/article/(.*)'], async (req, res, next) => {
    /** проверяем есть ли запись в сессии auth: true, если нет отдаем страницу авторизации */
    if (!req.session.auth && !req.user) {
      const redirect = await res.app.ask('auth', {
        server: {
          action: 'redirect',
          meta: {
            // TODO: нет необходимости есть в сессии
            csrf: req.session.csrfSecret,
            session: req.session
          }
        }
      })
      /**Отдаём страницу авторизации */
      await res.end(redirect.response)
    } else { // если есть идем дальше...
      next()
    }
  })

  return app
}