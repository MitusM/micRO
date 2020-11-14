'use strict'
// const lang = require('../lang/ru.json')

const {
  resize
} = require('../libs/')

const {
  optimazition
} = require('../libs/optimazition')


const arrayToObject = (arr) => {
  return arr.reduce((obj, item) => {
    return (obj[item.width] = item, obj)
  }, {})
}

// const appRoot = require('app-root-path').path

module.exports = (app) => {
  // === === === === === === === === === === === ===
  // подключение эндпоинтов микросервиса
  // === === === === === === === === === === === ===

  // === === === === === === === === === === === ===
  //* Admin dashboard
  // === === === === === === === === === === === ===

  // === === === === === === === === === === === ===
  //  ******************** GET *********************
  // === === === === === === === === === === === ===
  app.get('/upload/', async (req, res) => {
    res.end({
      status: 200
    })
  })

  app.post('/upload/', async (req, res) => {
    console.log('req', req)
  })


  // === === === === === === === === === === === ===
  // ******************** POST *********************
  // === === === === === === === === === === === ===
  app.post('/upload/:microservise(.*)', async (req, res) => {
    const files = req.body.files
    let folder = req.body.folder
    let arr
    try {
      let i = 0
      let length = files.length

      for (i; i < length; i++) {
        arr = await resize(files[i], folder)
        let obj = arrayToObject(arr)
        files[i].images = obj
      }

      await res.status(200).json({
        status: 200,
        text: 'Thinking...',
        files
        // fields: fields
      })
    } catch (e) {
      // FIXME: Нужен обработчик ошибок
      console.log('<:::[ e  ]:::>', e)
    }
  })
  return app
}