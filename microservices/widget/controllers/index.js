/** Языковые константы  */
const lang = require('../lang/ru.json')
const widgetList = require('../widgets/app')
const widgets = widgetList().getAllFiles().read()
const widgetRequireObject = widgets._read

module.exports = (app) => {
  'use strict'
  //************************************************
  //* подключение эндпоинтов микросервиса
  //************************************************
  // === === === === === === === === === === === ===
  // GET
  // === === === === === === === === === === === ===
  app.get('/widget/', async (req, res) => {
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
            lang: lang,
            widget: widgets._arrFiles
          }
        }
      }
    })
    return await res.end(template.response.html)
  });

  app.get('/widget/:name/:target.:html', async (req, res) => {
    const name = req.params.name
    const target = req.params.target

    const options = res.app.options
    const config = options.config
    const dirTemplate = options.dirTemplate

    const widget = new widgetRequireObject[name].function(target)
    // console.log(':::[ widgetRequireObject[name] ]:::', widgetRequireObject[name])

    const template = await res.app.ask('render', {
      // TODO: Продумать название обьекта ✅
      server: {
        action: 'html',
        meta: {
          dir: [dirTemplate, widget._dir],
          page: config.get[0].template,
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            /** Объеденим языковые константы микросервиса и виджета */
            lang: {
              ...lang,
              ...widgetRequireObject[name].lang
            },
            widgetTemplate: widget._template,
            menu: await widget.select()
          }
        }
      }
    })
    return await res.end(template.response.html)
  })

  // === === === === === === === === === === === ===
  //  POST, PUT, DELETE
  // === === === === === === === === === === === ===

  /** Создаём меню, или другой блок, давая ему название */
  app.post('/widget/:name/:target', async (req, res) => {
    const name = req.params.name
    const target = req.params.target
    let response
    if (req.session.csrfSecret === req.body.token) {
      response = await new widgetRequireObject[name].function()[target](req.body)
    }
    return await res.end({
      ...response
    })
  })

  app.put('/widget/:name/:target', async (req, res) => {
    const name = req.params.name
    const target = req.params.target
    let response
    if (req.session.csrfSecret === req.body.token) {
      response = await new widgetRequireObject[name].function()[target](req.body)

      console.log(':::[ response ]:::', response)
      let r = (response.status === 201) ? {
        status: response.status,
        ...response._doc,
        response: response.response
      } : {
        status: response.status,
        response: response.response
      }
    
    return await res.end(r)
    }
  })

  app.delete('/widget/:name/:target', async (req, res) => {
    const name = req.params.name
    const target = req.params.target
    let response
    if (req.session.csrfSecret === req.body.token) {
      response = await new widgetRequireObject[name].function()[target](req.body)
    }

    return await res.end({
      ...response
    })
  })

  return app
}