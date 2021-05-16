// TODO: Переименовать файл
const service = require('./servicelayer')
/** */
const modelAuth = require('./modelService')
/** Языковые константы  */
const lang = require('../lang/ru.json')


class Auth {
  constructor(config) {
    this.config = config
  }


  getToken(token) {
    return modelAuth.getToken(token).then(done => {
      return done
    })
  }

  getSession() {
    // return modelAuth.setAuthorized(id)
  }

  setAuth(id, user) {
    return modelAuth.setAuthorized(id, user).then(done => done)
  }

  async getTemplateLogin(req, res) {
    // console.log(':::[ req ]:::', req)
    const options = res.app.options
    let config = options.config
    let dirTemplate = options.dirTemplate
    const template = await service('render', {
      // TODO: Продумать название объекта ✅
      server: {
        action: 'html',
        meta: {
          dir: dirTemplate,
          page: config.template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            config: config.get.args,
            lang: lang
          }
        }
      }
    }, res.app)
    return await res.end(template.response.html)

  }


}

module.exports = Auth