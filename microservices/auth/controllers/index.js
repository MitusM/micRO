const Auth = new(require('../service/authServices'))

module.exports = (app) => {
  // === === === === === === === === === === === ===
  // подключение эндпоинтов микросервиса
  // === === === === === === === === === === === ===
  app.get("/auth/login", Auth.getTemplateLogin)

  //* *****************************************
  //*
  //* *****************************************
  app.post("/auth/login", async (req, res) => {
    const body = req.body
    console.log('================================')
    console.log(':::[ req.session.csrfSecret  ]:::', req.session.csrfSecret)
    console.log(':::[ body.token  ]:::', body.token)
    console.log(':::[ req.session.csrfSecret === body.token  ]:::', req.session.csrfSecret === body.token)
    if (req.session.csrfSecret === body.token) {
      const authorize = await res.app.ask('users', {
        server: {
          action: 'authorize',
          meta: {
            ...body
          }
        }
      })

      let user = await authorize.response.user
      console.log(':::[ user  ]:::', user)
      /**  */
      if (!user) {
        await res.end({
          status: 403
        })
      } else {
        /**  */
        Auth.setAuth(req.sessionID, user).then(done => done)
        await res.end({
          status: 200
        })
      }
    } else {
      res.end({
        status: 403
      })
    }
  })

  app.get("/auth/signup", async (req, res) => {
    await res.json(req.session)
  })

  return app
}