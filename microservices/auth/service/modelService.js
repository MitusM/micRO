const mongoose = require('mongoose')
const authSchema = require('./authSchemaService')(mongoose)

class Auth {
  constructor() {}

  static getToken(token) {
    return this.findOne({'session.csrfSecret': token})
  }

}

authSchema.loadClass(Auth)
module.exports = mongoose.model('session', authSchema)