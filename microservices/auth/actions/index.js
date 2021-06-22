const config = require('../config/config.json')
// const views = require('../views/load')
const service = require('../service/servicelayer')
/** Языковые константы  */
const lang = require('../lang/ru.json')
// === === === === === === === === === === === ===
// Местоположение (директория) шаблона
// === === === === === === === === === === === ===
// TODO: ???
// let dirTemplate = views()
// === === === === === === === === === === === ===
//
// === === === === === === === === === === === ===
const Auth = new(require('../service/authServices'))(config)
module.exports = (app) => {
  'use strict'
  app.action('login', async (meta, res) => {
    const auth = await Auth.setAuth(meta.id, meta.session)
    res.json({
      ...auth
    })
  })

  app.action('token', async (meta, res) => {
    const ses = await Auth.getToken(meta.token, res)
    res.json({
      ...ses.session
    })
  })

  app.action('redirect', async (meta, res) => {
    //! NOTE: Если через метод то в микросервисе отваливается авторизация
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
            csrf: meta.csrf, // TODO: нет необходимости есть в сессии
            config: config.get.args,
            lang: lang
          }
        }
      }
    }, res.app)
    return await res.end(template.response.html)
  })
}