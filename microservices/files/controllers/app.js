'use strict'

const Images = new(require('../libs/src/index'))({
  jpgQuality: 70,
})

const Files = require('../libs/FRTcloud/src/index')

const lang = require('../lang/ru.json')

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
    const userSession = req.session.user.username
    const userFotoPath = '/cloud/' + userSession + '/files/'
    const preview = '/cloud/' + userSession + '/resize/'
    const classFiles = new Files()

    const files = await classFiles.files(userFotoPath, 0)
      .map(async (file) => {
        let stat = await classFiles.statFile(file)
        stat.preview = preview + stat.name + '.webp'
        return stat
        // return await classFiles.statFile(file)
      })

    const directory = await classFiles.directory(userFotoPath)
      .map(async (dir) => {
        return await classFiles.statFile(dir)
      })
    // console.log('⚡ directory', directory)
    // console.log('⚡ directory', directory.length)

    // let readDirectory = await new Files().dirFiles('/images/_xxx_')
    // console.log('⚡ readDirectory', readDirectory)

    const options = res.app.options
    const config = options.config
    const adminTemplate = options.adminTemplate

    const template = await res.app.ask('render', {
      // TODO: Продумать название объекта ✅
      server: {
        action: 'html',
        meta: {
          dir: adminTemplate, // directory admin template for templates
          page: config.template, // page admin template for templates
          // data for template
          data: {
            csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
            lang: lang,
            template: './' + req.params.microservice + '.njk',
            url: userFotoPath.split('/'),
            homeFolder: '/images/',
            files: files,
            directory: directory,
            user: req.session.user.username
          }
        }
      }
    })

    res.status(200).end(template.response.html)
  })


  app.get('/files/foto', async (req, res) => {
    try {
      const userSession = req.session.user.username
      const userFotoPath = '/cloud/' + userSession + '/files/'
      const preview = '/cloud/' + userSession + '/resize/'
      const classFiles = new Files()

      const foto = await classFiles.foto(userFotoPath)
        .map(async (file) => {
          let stat = await classFiles.statFile(file)
          stat.preview = preview + stat.name + '.webp'
          return stat
        })
      console.log('⚡ foto', foto)

      // FIXME: Вынести из всех методов в один метод  configuration
      const options = res.app.options
      const config = options.config
      const adminTemplate = options.adminTemplate
      //*------------------------------------------------------------

      const template = await res.app.ask('render', {
        // TODO: Продумать название объекта ✅
        server: {
          action: 'html',
          meta: {
            dir: adminTemplate, // directory admin template for templates
            page: config.template, // page admin template for templates
            // data for template
            data: {
              csrf: req.session.csrfSecret,
              lang: lang,
              // FIXME: Вынести в конфиг
              template: './foto.njk',
              url: userSession, //dirUserFiles.split('/'),
              homeFolder: `/${userSession}`,
              files: foto,
              user: req.session.user.username
            }
          }
        }
      })

      await res.status(200).end(template.response.html)

    } catch (err) {
      console.log('🌡 Error:foto', e)
      await res.status(503).json({
        code: e.code,
        status: 503,
        message: 'Service Unavailable'
      })
    }
  })

  // === === === === === === === === === === === ===
  //  ******************* POST *********************
  // === === === === === === === === === === === ===
  // app.post('/upload/', async (req, res) => {
  //   console.log('req', req)
  // })


  // === === === === === === === === === === === ===
  // ******************** POST *********************
  // === === === === === === === === === === === ===
  /** Загрузка файла пользователя*/
  app.post('/files/upload/:user(.*)', async (req, res) => {
    try {
      const params = req.params.user
      const userSession = req.session.user.username
      let body = req.body
      let filesObj = body.files
      const preview = '/cloud/' + userSession + '/resize/'
      const resize = '/cloud/' + req.params.user + '/resize/'
      if (userSession === params) {
        // body {
        //   fields: {
        //     csrf: 'RVsAmG96pm-OD7PwmT4m'
        //   },
        //   files: [{
        //     fieldname: 'file',
        //     path: '/files/misha/003_413017221.jpg',
        //     isAbsolute: '/home/misha/web/micRO/files/misha/003_413017221.jpg',
        //     folder: '/files/misha',
        //     basename: '003_413017221.jpg',
        //     mimeType: 'image/jpeg',
        //     encoding: '7bit',
        //     newName: '003_413017221.jpg'
        //   }]
        // }
        const image = filesObj[0]
        const classFiles = new Files({
          webQuality: 50
        })
        const resizeImages = await classFiles.resize('365', image.isAbsolute, resize, image.newName)

        const webp = await classFiles.webp([classFiles.resolve(resize + image.newName)], resize)

        let statFile = await classFiles.statFile(image.isAbsolute).then((statFile) => {
          statFile.resize = resizeImages
          statFile.preview = preview + statFile.name + '.webp'
          return statFile
        })
        // console.log('⚡ statFile', statFile)
        // statFile {
        //   create: 2021 - 09 - 05 T10: 47: 10.972 Z,
        //   atime: 2021 - 09 - 05 T10: 47: 10.972 Z,
        //   ctime: 2021 - 09 - 05 T10: 47: 10.996 Z,
        //   mtime: 2021 - 09 - 05 T10: 47: 10.996 Z,
        //   path: '/files/misha/014_413017038.jpg',
        //   name: '014_413017038',
        //   type: 'jpg',
        //   size: '78.67 KB',
        //   height: 554,
        //   width: 1000
        // }

        const options = res.app.options
        const adminTemplate = options.adminTemplate
        const {
          response
        } = await res.app.ask('render', {
          // TODO: Продумать название объекта ✅
          server: {
            action: 'html',
            meta: {
              dir: adminTemplate, // directory admin template for templates
              page: 'li-files-template.njk', // page admin template for templates
              // data for template
              data: {
                csrf: req.session.csrfSecret, // TODO: нет необходимости есть в сессии
                lang: lang,
                item: {
                  ...statFile
                }
              }
            }
          }
        })

        res.status(200).json({
          status: 201,
          message: 'The file is loaded successfully', // Файл загружен успешно 
          file: response.html
        })
      }

    } catch (e) {
      console.log('🌡 Error:upload', e)
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

  app.delete('/files/delete/:user(.*)', async (req, res) => {
    try {
      const params = req.params.user
      const userSession = req.session.user.username
      const body = req.body
      const classFiles = new Files()
      let ok = await classFiles.deleteArrayFiles(body.files)
      if (ok) {
        res.status(200).json({
          status: 200,
          // body: req.body
        })
      }
    } catch (e) {
      console.log('💥 Error::delete:user', e)
      await res.status(503).json({
        code: e.code,
        status: 503,
        message: 'Service Unavailable'
      })
    }
  })

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
        } = await Images.dimensions(absolutePathFile)
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

      //* Test
      let testPath = '/home/misha/web/micRO/images/article/original/'
      let testFile = files[0].isAbsolute
      const stat = await Images.stat(testFile)
      console.log('⚡ stat', stat)

      let isFile = await Images.isFile(testFile)
      console.log('⚡ isFile', isFile)

      let isDirectory = await Images.isDirectory(testFile)
      console.log('⚡ isDirectory', isDirectory)

      let size = await Images.dimensions(testFile)
      console.log('⚡ size', size)

      let sizeStat = await Images.size(testFile)
      console.log('⚡ sizeStat', sizeStat)

      let extFile = await Images.extFile(testFile)
      console.log('⚡ extFile', extFile)

      let statFile = await Images.statImg(testFile)
      console.log('⚡ statFile', statFile)
      //* cancel Test

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