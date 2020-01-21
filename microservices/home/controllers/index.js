/** Языковые константы  */
const lang = require('../lang/ru.json')
module.exports = (app) => {
  'use strict'
  // ***********************************************
  //* подключение эндпоинтов микросервиса
  // ***********************************************

  // === === === === === === === === === === === ===
  // GET
  // === === === === === === === === === === === ===
  app.get('/', async (req, res) => {
    const options = res.app.options
    let config = options.config
    let dirTemplate = options.dirTemplate
    const template = await res.app.ask('render', {
      // TODO: Продумать название обьекта ✅
      server: {
        action: 'html',
        meta: {
          dir: dirTemplate,
          page: config.template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang
          }
        }
      }
    })
    return await res.end(template.response.html)
  })

  // === === === === === === === === === === === ===
  // Admin dashboard
  // === === === === === === === === === === === ===
  app.get('/home/', async (req, res) => {
    const options = res.app.options
    let config = options.config
    let dirTemplate = options.adminTemplate

    const {
      response
    } = await res.app.ask('widget', {
      server: {
        action: 'list',
        meta: {}
      }
    })

    const template = await res.app.ask('render', {
      server: {
        action: 'html',
        meta: {
          dir: dirTemplate,
          page: config.get[1].template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            ...response
          }
        }
      }
    })

    return await res.end(template.response.html)
  })

  app.get('/home/structure-home-page.html', async (req, res) => {
    const options = res.app.options
    let config = options.config
    let dirTemplate = options.adminTemplate
    const {
      response
    } = await res.app.ask('widget', {
      server: {
        action: 'list',
        meta: {}
      }
    })
    console.log(':::[ response ]:::', response)
    const template = await res.app.ask('render', {
      server: {
        action: 'html',
        meta: {
          dir: dirTemplate,
          page: config.get[2].template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            ...response
          }
        }
      }
    })
    // console.log(':::[ widget ]:::', response.widget)
    return await res.end(template.response.html)
  })

  return app
}