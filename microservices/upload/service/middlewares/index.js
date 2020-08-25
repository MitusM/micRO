'use strict'
const csrf = require('csurf')
const session = require('../../../../core/session');
const parseForm = require('./parseForm')


module.exports = (app) => {
  // 1 Session
  session(app)
  // 2 CSRF
  app.use(csrf())

  app.use(async (req, res, next) => {
    if (req.cookies.sid && !req.sessionID) {
      let cookies = req.cookies.sid
      let val = cookies.slice(2).split('.')
      req.sessionID = val[0]
    }
    await next()
  });

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
      next()
    }
  })

  app.post('/upload/:microservise(.*)', async (req, res, next) => {
    const {
      files,
      fields
    } = await parseForm(req, {
      //TODO: Вынести в настройки микросервиса upload, или настройки должны передоваться от миеросервиса отправившего файл на загрузку
      upload: true,
      path: `/public/images/${req.params.microservise}/original/`,
      limits: {
        fileSize: 100 * 1024 * 1024
      },
      mimeTypeLimit: ['image/jpeg', 'image/jpg', 'image/png', 'image/JPG'],
      // readStream: true
    });
    req.body = {
      fields: fields,
      files: files
    }
    next()
  })

  return app
}