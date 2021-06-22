const modelUser = require('../service/modelService')
const validator = require('validator')
module.exports = (app) => {
  'use strict'
  // TODO: 📝 вынести в action
  /** 
   * 
   */
  app.action("authorize", async (meta, res) => {
    // Checking E-Mail or Login: проверяем пришёл e-mail или логин
    let auth = validator.isEmail(meta.username)
    // Login or password authorization: авторизация по логину или паролю
    let criteria = (auth) ? 'email' : 'username'
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