'use strict'
const csrf = require('csurf')
const session = require('./session')

module.exports = (app) => {
  // 3.1 Session
  session(app)
  // 3.2 CSRF
  app.use(csrf())

  app.all('/:microservice/:url(.*)', async (req, res, next) => {
    // console.log('-----------------------------------------')
    // console.log('⚡ req.params', req.params)
    // console.log('⚡ req.session.csrfSecret', req.session.csrfSecret)
    // console.log('-----------------------------------------')
    // req.user = {
    //   csrf: 'AgkS8IWLNlLz50zoGg7cPztG',
    //   session: {
    //     csrfSecret: 'AgkS8IWLNlLz50zoGg7cPztG'
    //   }
    // }
    // const redirect = await res.app.ask('auth', {
    //   server: {
    //     action: 'redirect',
    //     meta: {
    //       // TODO: нет необходимости есть в сессии
    //       csrf: req.session.csrfSecret,
    //       session: req.session
    //     }
    //   }
    // })
    // console.log('⚡ await req', await req)
    await next()
  })

  return app
}