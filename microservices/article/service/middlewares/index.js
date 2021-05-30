const cookieParser = require('cookie-parser')
const csrf = require('csurf')

module.exports = (app) => {
  // 1 Парсим куки
  app.use(cookieParser())
  // 2 CSRF
  app.use(csrf())

  app.all(['/article/(.*)'], async (req, res, next) => {
    /** проверяем есть ли запись в сессии auth: true, если нет отдаем страницу авторизации */
    console.log('-----------------------------------------')
    console.log('⚡ req.user', req.user)
    console.log(' === === === === === === === === === === === ===')
    console.log('⚡ req.sessionID', req.sessionID)
    console.log(' === === === === === === === === === === === ===')
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

      // .write({
      //   server: {
      //     action: 'user_aut',
      //     meta: {
      //       // TODO: нет необходимости есть в сессии
      //       csrf: req.session.csrfSecret,
      //       session: req.session
      //     }
      //   }
      // })

      // await res.json({
      //   server: {
      //     action: 'user_aut',
      //     meta: {
      //       userId: 1,
      //       amount: 500,
      //     },
      //   },
      // });
    } else { // если есть идем дальше...
      next()
    }
  })

  return app
}