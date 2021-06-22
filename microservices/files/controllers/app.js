'use strict'
// const lang = require('../lang/ru.json')
const root = require('app-root-path').path
const path = require('path')




const {
  resize
} = require('../libs')

const {
  optimazition
} = require('../libs/src/optimazition')


const arrayToObject = (arr) => {
  return arr.reduce((obj, item) => {
    return (obj[item.width] = item, obj)
  }, {})
}
// const log = require('debug')(optimazition)
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
   * ru: После загрузки изображения данный эндроинт принимает запрос для оптимизации изображения. Даёт ответ серверу
   * 
   * en: After loading the image, this endpoint accepts a request to optimize the image. The answer server
   */
  app.post('/upload/:microservise(.*)', async (req, res) => {
    /**
     * @param {array} files массив с объектом данных на изображение
     * @param {string} files.fieldname Имя поля
     * @param {string} files.path относительный путь до загруженного файла (оригинала)
     * @param {string} files.isAbsolute абсолютный путь до корня сайта
     * @param {string} files.folder относительный путь до папки в которую был сохранён оригинал
     * @param {string} files.basename оригинальное имя файлы
     * @param {string} files.newName новое имя файла
     * @param {string} files.mimeType mime тип файла
     * @param {string} files.encoding кодировка
     */
    const files = req.body.files
    /** Папка в которую был загружен файл */
    let arr = []
    try {
      let i = 0
      let length = files.length

      for (i; i < length; i++) {
        // Получаем данные по файлу из массива
        let file = files[i]
        // {
        //   fieldname: 'file',
        //   path: '/public/images/article/original/5385fdbceae65-14.jpg',
        //   isAbsolute: '/home/misha/web/micRO/public/images/article/original/5385fdbceae65-14.jpg',
        //   folder: '/public/images/article/original/',
        //   basename: '14.jpg',
        //   mimeType: 'image/jpeg',
        //   encoding: '7bit'
        // }
        /** Папка в которую был загружен файл */
        let folder = file.folder
        /** Папка в которой были созданы уменьшенные копии изображений */
        let resizeFolder = path.join(root, folder, '../resize')
        let arrayResize = await resize(file, (folder)).then(resizeFiles => resizeFiles).catch(error => error)
        arr.push(...arrayResize)
        // let f =
        await optimazition(arrayResize, resizeFolder)
        // console.log('⚡ f', f)
        // console.log('-----------------------------------------')
        // 
      }
      // console.log('⚡ arr', arr)
      // console.log('⚡ arrayToObject(arr)', arrayToObject(arr))

      await res.status(200).json({
        status: 200,
        text: 'ok',
        files: arrayToObject(arr)
      })
    } catch (e) {
      console.log('🌡 Error:resize', e)
      await res.status(503).json({
        code: e.code,
        status: 503,
        message: 'Service Unavailable'
      })
    }
  })

  return app
}