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

  app.all(['/article/(.*)'], async (req, res, next) => {
    /** проверяем есть ли запись в сессии auth: true, если нет отдаем страницу авторизации */
    console.log('-----------------------------------------')
    console.log('⚡ req.session', req.session)
    console.log('-----------------------------------------')
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
      /**Отдаём страницу авторизации */
      await res.end(redirect.response)
    } else { // если есть идем дальше...
      next()
    }
  })

  return app
}