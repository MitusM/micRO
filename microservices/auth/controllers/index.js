const Auth = new(require('../service/authServices'))

module.exports = (app) => {
  // === === === === === === === === === === === ===
  // подключение эндпоинтов микросервиса
  // === === === === === === === === === === === ===
  app.get("/auth/login", Auth.getTemplateLogin)

  app.post("/auth/login", async (req, res) => {
    const body = req.body
    if (req.session.csrfSecret === body.token) {
      const authorize = await res.app.ask('users', {
        server: {
          action: 'authorize',
          meta: {
            ...body
          }
        }
      })

      let user = authorize.response.user
      if (!user) {
        res.end({
          status: 403
        })
      } else {
        Auth.setAuth(req.sessionID, user).then(done => done)
        res.end({
          status: 200
        })
      }
    }
  })

  app.get("/auth/signup", async (req, res) => {
    await res.json(req.session)
  })

  return app
}