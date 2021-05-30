const Auth = new(require('../service/authServices'))

module.exports = (app) => {
  // === === === === === === === === === === === ===
  //* подключение эндпоинтов микросервиса
  // === === === === === === === === === === === ===
  app.get("/auth/login", Auth.getTemplateLogin)

  //* *****************************************
  //*
  //* *****************************************
  app.post("/auth/login", async (req, res) => {
    console.log('⚡ req', req)
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

      let user = await authorize.response.user
      /**  */
      if (!user) {
        await res.end({
          status: 403
        })
      } else {
        /**  */
        // FIXME: ✍️ Между микросервисами В req не передаётся user
        req.user = user || false
        // FIX: Auth - Добавить
        let auth = await Auth.setAuth(req.sessionID, user, req).then(done => done)
        // auth { n: 1, nModified: 1, ok: 1 }
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