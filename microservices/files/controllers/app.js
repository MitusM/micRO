'use strict'
// const lang = require('../lang/ru.json')
// const root = require('app-root-path').path
// const path = require('path')
const deleteFiles = require('../libs/deleteFiles')

const req = require('app-root-path').require
const config = req('/core/upload/config/upload.json')

const File = require('../libs/path/file')

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

  // === === === === === === === === === === === ===
  //  ******************* POST *********************
  // === === === === === === === === === === === ===
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
  app.post('/upload/:microservise', async (req, res) => {
    try {
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
      let originalName

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
        /**  */
        originalName = file.newName
        /** Папка в которую был загружен файл */
        let folder = file.folder
        /** Папка в которой были созданы уменьшенные копии изображений */
        let resizeFolder = new File().absolute(folder, '../resize')
        let arrayResize = await resize(file, (folder)).then(resizeFiles => resizeFiles).catch(error => error)
        arr.push(...arrayResize)
        /** 
         * @returns {array} [{
           data: < Buffer ff d8 ff e0 00 10 4 a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 08 06 06 07 06 05 08 07 07 07 09 09 08 0 a 0 c 14 0 d 0 c 0b 0b 0 c 19 12 13 0 f...55739 > ,
           sourcePath: '/home/misha/web/micRO/public/images/article/resize/960_f51736c86256f-f52c0bb2675be963306a429aef5d55a4@2x.jpg',
           destinationPath: '/home/misha/web/micRO/public/images/article/resize/960_f51736c86256f-f52c0bb2675be963306a429aef5d55a4@2x.jpg'
         },{...}]
         */
        await optimazition(arrayResize, resizeFolder)
      }

      await res.status(200).json({
        status: 200,
        text: 'ok',
        files: arrayToObject(arr),
        name: originalName
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

  // === === === === === === === === === === === ===
  //  ****************** DELETE ********************
  // === === === === === === === === === === === ===
  app.delete('/files/:endpoint(.*)', async (req, res) => {
    /** Проверка csrf в middleware */
    try {
      /** Данные в теле запроса */
      let body = req.body.files
      let ok = await new File().deleteArrayFiles(body)
      if (ok) {
        res.status(200).json({
          status: 200,
          body: req.body
        })
      } else {
        new Error('Что-то пошло не так. ')
      }
    } catch (error) {
      let status = error.status || 500
      res.status(status).json({
        status: status,
        error: error.message
      })
    }
  })

  return app
}