const modelUser = require('../service/modelService')
const validator = require('validator')
module.exports = (app) => {
  'use strict'
  // TODO: 📝 вынести в action
  /** 
   * 
   */
  app.action("authorize", async (meta, res) => {
    let auth = validator.isEmail(meta.username) // проверяем пришёл e-mail или логин
    let criteria = (auth) ? 'email' : 'username' // авторизация по логину или паролю
    modelUser.loginAdmin({
      [criteria]: meta.username
    }, meta.password).then(user => {
      let done = user ? {
        user
      } : false
      res.end(done)
      return user
    })
  })

}