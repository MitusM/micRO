// TODO: Переименовать файл
const service = require('./servicelayer')
/** Шаблоны (папка)*/
const views = require('./viewsServices')
/** */
const modelAuth = require('./modelService')

// eslint-disable-next-line no-unused-vars
let fn = require("funclib")


class Auth {
  constructor(config) {
    this.config = config
  }


  getToken(token, res) {
    return modelAuth.getToken(token).then(done => {
      console.log(':::[ done ]:::', done)
      return done
    })
  }

  getSession (id) {

  }

}

module.exports = Auth