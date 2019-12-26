/** Языковые константы  */
const lang = require('../lang/ru.json')
const widgetList = require('../widgets/app')
const widgets = widgetList().getAllFiles().read()

// import widget from '../widgets/app'

module.exports = (app) => {
  'use strict'
  // === === === === === === === === === === === ===
  // подключение эндпоинтов микросервиса
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
    // console.log(':::[ req.params ]:::', req.params)
    const name = req.params.name
    const target = req.params.target

    const options = res.app.options
    const config = options.config
    const dirTemplate = options.dirTemplate

    const widgetRequireObject = widgets._read
    const widget = widgetRequireObject[name].function(target)
    console.log(':::[ w ]:::', widget)

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
            widgetTemplate: widget._template
          }
        }
      }
    })
    return await res.end(template.response.html)
  })

  return app
}