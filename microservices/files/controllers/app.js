'use strict'

const Images = new(require('../libs/FRTcloud/src/images/index'))({
  jpgQuality: 70,
})


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
  app.get('/files/', async (req, res) => {
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
       * @example {
         fieldname: 'file',
         path: '/public/images/article/original/5365-14.jpg',
         isAbsolute: '{absolutePath}/public/images/article/original/5365-14.jpg',
         folder: '/public/images/article/original/',
         basename: '14.jpg',
         mimeType: 'image/jpeg',
         encoding: '7bit'
       }
       */
      const files = req.body.files
      /** Папка в которую был загружен файл */
      let arr = []
      let originalName

      let i = 0
      let length = files.length
      let fileFolder

      for (i; i < length; i++) {
        // Получаем данные по файлу из массива
        let file = files[i]
        /**  */
        originalName = file.newName

        /** Папка в которую был загружен файл */
        let folder = file.folder
        fileFolder = folder
        /** Абсолютный путь до файла */
        const absolutePathFile = file.isAbsolute
        /** Определяем размер изображения */
        const {
          width
        } = await Images.size(absolutePathFile)
        /** Массив с размерами для уменьшенных копий включая сам размер изображения */
        const responsive = [480, 768, 1024, 1280, 2700, width]
        /** Reteniva array @2x */
        const reteniva = [960, 1536, 2048, 2560]
        /** Фильтруем массив, оставляя только меньшие размеры, чем размер изображения*/
        const minResponsive = Images.util.minFilter(responsive, width)
        const reteniva2x = Images.util.minFilter(reteniva, width)
        /** 
         * Делаем уменьшенные копии оригинального изображения. 
         * Масштабируя их относительно ширины изображения
         **/
        // FIXME: folder + '../resize/' - вынести в настройки
        const img = await Images.resizeW(minResponsive, absolutePathFile, folder + '../resize/')
        /** Делаем копии изображения под Reteniva */
        const imgReteniva = await Images.resizeW(reteniva2x, absolutePathFile, folder + '../resize/', true, true)
        arr.push(...img, ...imgReteniva)
      }

      /** Оптимизируем изображения */
      optimization(fileFolder, arr)

      res.status(200).json({
        status: 200,
        message: 'The file is loaded successfully', // Файл загружен успешно 
        /** Из массива в объект где ключ элемента объекта ширина изображения */
        files: Images.util.arrayToObject(arr, 'width'),
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
      let ok = await Images.deleteArrayFiles(body)

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

async function optimization(fileFolder, arr) {
  // FIXME: fileFolder + '../resize/' - вынести в настройки
  /** Папка в которую будут записаны оптимизированные файлы */
  let resolve = Images.resolve(fileFolder, '../resize/')
  /** Создаём массив с файлами для оптимизации. К именам файлов добавляем абсолютный путь */
  let arrFiles = Images.util.arrFiles(arr, resolve)
  /** Оптимизируем уменьшенные копии изображения */
  return await Images.option({
    jpgQuality: 70,
  }).optimazition(arrFiles, resolve)
}