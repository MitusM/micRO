const lang = require('../lang/ru.json')

module.exports = (app) => {
  'use strict'

  // === === === === === === === === === === === ===
  // подключение эндпоинтов микросервиса
  // === === === === === === === === === === === ===

  // === === === === === === === === === === === ===
  // GET
  // === === === === === === === === === === === ===
  app.get('/article-:url(.*)', async (req, res) => {
    // url: 'custom-made-cake-work.html'
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
          url: req.path,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            page: req.params.url + '.njk'
          }
        }
      }
    })

    return await res.end(template.response.html)
  });

  //* === === === === === === === === === === === ===
  //* Admin dashboard
  //* === === === === === === === === === === === ===

  app.get('/article/', async (req, res) => {
    // // console.log(':::[ req ]:::', req)
    console.log(':::[ req.path ]:::', req.path)
    const options = res.app.options
    let config = options.config
    let adminTemplate = options.adminTemplate

    const template = await res.app.ask('render', {
      // TODO: Продумать название обьекта ✅
      server: {
        action: 'html',
        meta: {
          dir: adminTemplate,
          page: config.template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            template: 'article.njk',
            page: 'index.njk'
          }
        }
      }
    })

    return await res.end(template.response.html)
  })

  /** Добавление статьи*/
  app.get('/article/create-article.html', async (req, res) => {
    const options = res.app.options
    let config = options.config
    let adminTemplate = options.adminTemplate

    const template = await res.app.ask('render', {
      // TODO: Продумать название обьекта ✅
      server: {
        action: 'html',
        meta: {
          dir: adminTemplate,
          page: config.template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            template: 'create-article.njk',
            page: 'index.njk'
          }
        }
      }
    })

    return await res.end(template.response.html)
  })

  /**  */
  app.get('/article/categories.html', async (req, res) => {
    const options = res.app.options
    let config = options.config
    let adminTemplate = options.adminTemplate

    const template = await res.app.ask('render', {
      // TODO: Продумать название обьекта ✅
      server: {
        action: 'html',
        meta: {
          dir: adminTemplate,
          page: config.template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            template: 'categories.njk',
            page: 'index.njk'
          }
        }
      }
    })

    return await res.end(template.response.html)
  })

  /** Конфиг */
  app.get('/article/config.html', async (req, res) => {
    const options = res.app.options
    let config = options.config
    let adminTemplate = options.adminTemplate

    const template = await res.app.ask('render', {
      // TODO: Продумать название обьекта ✅
      server: {
        action: 'html',
        meta: {
          dir: adminTemplate,
          page: config.template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            template: 'config.njk',
            page: 'index.njk'
          }
        }
      }
    })

    return await res.end(template.response.html)
  })

}