'use strict'
const csrf = require('csurf')
// const session = require('../../../../core/session');
const parseForm = require('./parseForm')


module.exports = (app) => {
  // 1 Session
  // session(app)
  // 2 CSRF
  app.use(csrf())

  // app.use(async (req, res, next) => {
  //   if (req.cookies.sid && !req.sessionID) {
  //     let cookies = req.cookies.sid
  //     let val = cookies.slice(2).split('.')
  //     req.sessionID = val[0]
  //   }
  //   await next()
  // });

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

  /**
   * Загрузка файлов на сервер
   */
  app.post('/upload/:microservise(.*)', async (req, res, next) => {
    // TODO: Добавить проверку csrf
    const endpoint = req.params.microservise
    const {
      response
    } = await res.app.ask(endpoint, {
      server: {
        action: 'upload'
      }
    })
    // 100 * 1024 * 1024 = 104857600

    const {
      files,
      fields
    } = await parseForm(req, response.config)

    req.body = {
      fields: fields,
      files: files,
      folder: response.folder
    }
    next()
  })

  return app
}