/** Языковые константы  */
const lang = require('../lang/ru.json')
module.exports = (app) => {
  console.log(':::[ app ]:::', app)
  'use strict'
   // === === === === === === === === === === === ===
  // подключение эндпоинтов микросервиса
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
  });
  
  return app
}