const mongoose = require('mongoose')
const authSchema = require('./authSchemaService')(mongoose)

class Auth {
  constructor() {}

  static getToken(token) {
    return this.findOne({
      'session.csrfSecret': token
    }).select("session.csrfSecret")
  }

  /** Записываем в сесию, что пользователь авторизирован */
  static async setAuthorized(id, user) {
    // findOneAndUpdate updateOne
    // session.auth = true
    // console.log(':::[ session ]:::', session)
    return await this.findByIdAndUpdate({
        _id: id
      }, {
        $set: {
          "auth": true,
          "session.auth": true,
          "session.user": user,
          "user": user
        }
      }, {
        upsert: true,
        new: true
      })
      .then(done => done).catch(err => {
        console.log(':::[ err ]:::', err)
        return err
      })

  }

  static setSession(id, update) {
    return this.findByIdAndUpdate({
      _id: id
    }, update, {
      upset: true,
      new: true
    }).then(done => done).catch(err => {
      console.log(':::[ err ]:::', err)
      return err
    })
  }

  static getSession(id) {
    return this.findOne({
      _id: id
    })
  }


}

authSchema.loadClass(Auth)
module.exports = mongoose.model('session', authSchema)