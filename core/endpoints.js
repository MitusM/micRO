'use strict'
var fn = require('funclib')

module.exports = (app, arrRouter) => {

  arrRouter.forEach(router => {
    // fn.log(router, 'router')
    let all = router.endpoints.all
    let nameServices = all.name
    let path = all.path
    app.all(new RegExp(path), async (req, res) => {
      await res.delegate(nameServices)
    })
  })
  return app
}

// NOTE: создаем эндпоинт на все методы авторизации
// // , csrfProtection
// app.all(/^\/(auth)(\/.+$)?/, async (_req, res) => {
//   await res.delegate('auth');
// })

// // // NOTE: создаем два эндпоинта /login (авторизация) & /signup (регистрация)
// // app.all(['/login', '/signup'], async (req, res) => {
// //   await res.delegate('auth')
// // })

// app.all(/^\/(blog)(\/.+$)?/, async (_req, res) => {
//   // // console.log('req:', req)
//   await res.delegate('blog');
// })


// app.all(/^\/(users)(\/.+$)?/, async (_req, res) => {
//   // // console.log('req:', req)
//   await res.delegate('users');
// })