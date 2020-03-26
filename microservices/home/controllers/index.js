/** Языковые константы  */
const lang = require('../lang/ru.json')
const modelHome = require('../service/modelService')
const {
  homeStructure
} = require('../service/viewsServices')

module.exports = (app) => {
  'use strict'
  // ***********************************************
  //* подключение эндпоинтов микросервиса - HOME -
  // ***********************************************

  // === === === === === === === === === === === ===
  // GET
  // === === === === === === === === === === === ===
  /* Главная страница сайта */
  app.get('/', async (req, res) => {
    /**  */
    const {
      response
    } = await res.app.ask('widget', {
      server: {
        action: 'home',
        meta: {
          list: await modelHome.select()
        }
      }
    })

    const options = res.app.options
    const config = options.config
    const dirTemplate = options.dirTemplate

    const template = await res.app.ask('render', {
      // TODO: Продумать название обьекта ✅
      server: {
        action: 'html',
        meta: {
          dir: dirTemplate,
          page: config.template,
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

  //* === === === === === === === === === === === ===
  //* Admin dashboard
  //* === === === === === === === === === === === ===
  app.get('/home/', async (req, res) => {
    const options = res.app.options
    const config = options.config
    const dirTemplate = options.adminTemplate

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
    const config = options.config
    const dirTemplate = options.dirTemplate
    const adminTemplate = options.adminTemplate

    /** Получаем блоки сайта и виджеты расположеные в них в виде объекта */
    const block = await modelHome.select()

    /** Получаем все доступные виджеты в виде объекта */
    const {
      response
    } = await res.app.ask('widget', {
      server: {
        action: 'list',
        meta: {}
      }
    })

    let structure = await homeStructure(block, {
      dir: adminTemplate,
      page: 'block-create.njk'
    }, res)

    const template = await res.app.ask('render', {
      server: {
        action: 'html',
        meta: {
          dir: [adminTemplate, dirTemplate],
          page: config.get[2].template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            ...response,
            ...structure
          }
        }
      }
    })

    return await res.end(template.response.html)
  })

  // === === === === === === === === === === === ===
  //  POST, PUT, DELETE
  // === === === === === === === === === === === ===
  app.post('/home/structure-home-page', async (req, res) => {
    const body = req.body
    let response
    let status

    if (req.session.csrfSecret === req.body.token) {
      response = await modelHome.createOrUpdate(body)
      status = 200
    } else {
      status = 403
    }
    return await res.end({
      status,
      response
    })
  })

  return app
}