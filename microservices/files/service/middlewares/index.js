'use strict'
// const cookieParser = require('cookie-parser')
const csrf = require('csurf')

// const redirect = async (req, res) => {
//   return await res.app.ask('auth', {
//     server: {
//       action: 'redirect',
//       meta: {
//         csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
//         session: req.session
//       }
//     }
//   })
// }

module.exports = (app) => {
  // app.use(cookieParser())
  // CSRF
  app.use(csrf())

  /** 
   * Проверяем авторизован пользователь в системе. Если не авторизован отдаём страницу авторизации.
   */
  app.all(['/upload/(.*)', '/files/(.*)'], async (req, res, next) => {
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

  app.all(['/upload/(.*)', '/files/(.*)'], async (req, res, next) => {
    let method = req.method
    if (method === 'post' || method === 'delete') {
      if (req.session.csrfSecret === req.body.fields.csrf) {
        await next()
      } else {
        // FIXME: Продумать другой статус ответа, когда не соответствующий csrf
        await res.status(403).json({
          status: 403,
          message: 'Unauthorized'
        })
      }
    } else {
      await next()
    }
  })



  return app
}