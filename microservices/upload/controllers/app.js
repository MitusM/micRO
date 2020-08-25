'use strict'
// const lang = require('../lang/ru.json')
// const path = require('path')
// const gm = require('gm')

const {
  resize
  // optimazition
} = require('../libs/')

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
  app.get('/upload/', async(req, res) => {
    res.end({
      status: 200
    })
  })


  // === === === === === === === === === === === ===
  // ******************** POST *********************
  // === === === === === === === === === === === ===
  app.post('/upload/:microservise(.*)', async(req, res) => {
    const files = req.body.files
    let arr
    try {
      for (let i = 0; i < files.length; i++) {
        arr = await resize(files[i])

        files[i].images = arr
      }

      await res.status(200).json({
        status: 200,
        text: 'Thinking...',
        files
        // fields: fields
      })

    } catch (e) {
      console.log(':::[ e  ]:::', e)
    }
  })
}
