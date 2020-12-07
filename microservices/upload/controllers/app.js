'use strict'
// const lang = require('../lang/ru.json')
const root = require('app-root-path').path

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
  /** 
   * 
   */
  app.post('/upload/:microservise(.*)', async (req, res) => {
    /**
     * @param {string} file.fieldname Имя поля
     * @param {string} file.path относительный путь до загруженного файла (оригинала)
     * @param {string} file.isAbsolute абсолютный путь до корня сайта
     * @param {string} file.basename оригинальное имя файлы
     * @param {string} file.newName новое имя файла
     * @param {string} file.mimeType mime тип файла
     * @param {string} file.encoding кодировка
     */
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

      let opt = optimazition(arr, root + folder).then(files => {
        console.log('files', files)
      }).catch(err => {
        console.log('err::optimization', err)
      })
      console.log('opt', opt)

      await res.status(200).json({
        status: 200,
        text: 'Thinking...',
        files
      })
    } catch (e) {
      // FIXME: Нужен обработчик ошибок
      console.log('<:::[ e  ]:::>', e)
    }
  })
  return app
}