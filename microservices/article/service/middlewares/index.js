const cookieParser = require('cookie-parser')
const csrf = require('csurf')

// var sessions = require("client-sessions");


// const session = require('../../../../core/session')
// var session = require('express-session')
// const OrientoStore = require('connect-oriento')(session)

// var config = {
//   session: {
//     server: "host=localhost&port=2424&username=root&password=23502350&db=frt"
//   }
// }

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

  // app.use(session({
  //   secret: 'SomeSecret',
  //   store: new OrientoStore(config.session)
  // }))

  // app.use(sessions({
  //   cookieName: 'mySession',
  //   requestKey: 'forcedSessionKey', // requestKey overrides cookieName for the key name added to the request object.
  //   secret: 'blargadeeblargblarg', // should be a large unguessable string or Buffer
  //   duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  // }))

  app.all(['/article/(.*)'], async (req, res, next) => {
    /** проверяем есть ли запись в сессии auth: true, если нет отдаем страницу авторизации */
    // console.log('-----------------------------------------')
    // console.log('⚡ req', req)
    console.log('-----------------------------------------')
    console.log('⚡ req.session', req.session)
    console.log('-----------------------------------------')
    if (!req.session.auth) {
      console.log('⚡ !req.session.auth', !req.session.auth)
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