const mongoose = require('mongoose')
const authSchema = require('./authSchemaService')(mongoose)

class Auth {
  constructor() {}

  static getToken(token) {
    return this.findOne({
      'session.csrfSecret': token
    }).select("session.csrfSecret")
  }

  /** Записываем в сессию, что пользователь авторизирован */
  static async setAuthorized(id, user, req) {
    // console.log('⚡ req', req)
    // console.log('⚡ id', id)
    // console.log('⚡ user', user)
    // findOneAndUpdate updateOne
    // session.auth = true
    // console.log(':::[ session ]:::', session)
    // return await this.findByIdAndUpdate({
    //     _id: id
    //   }, {
    //     $set: {
    //       "auth": true,
    //       "session.auth": true,
    //       "session.user": user,
    //       "user": user
    //     }
    //   }, {
    //     upsert: true,
    //     new: true,
    //     overwrite: true
    //   })
    //   .then(done => done).catch(err => {
    //     console.log(':::[ err::findByIdAndUpdate ]:::', err)
    //     return err
    //   })
    let ses = this.findOne({
      _id: id
    }).then(done => {
      console.log('⚡ done', done)
    })

    return await this.updateOne({
      _id: id
    }, {
      $set: {
        "auth": true,
        "session.auth": true,
        "session.user": user,
        // "session": {
        //   "auth": true,
        //   "user": user
        // },
        "user": user
      }
    }, {
      upsert: true
    }).then(done => done).catch(err => {
      console.log(':::[ err::findByIdAndUpdate ]:::', err)
      return err
    })

  }

  static setSession(id, update) {
    return this.findByIdAndUpdate({
      _id: id
    }, update, {
      upsert: true,
      new: true
    }).then(done => done).catch(err => {
      console.log(':::[ err::setSession ]:::', err)
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