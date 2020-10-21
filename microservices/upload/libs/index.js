'use strict'

const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const sizeOf = require('image-size')

const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminPngquant = require('imagemin-pngquant')

const mkDir = (targetDir, {
  isRelativeToScript = false
} = {}) => {
  const sep = path.sep
  const initDir = path.isAbsolute(targetDir) ? sep : ''
  const baseDir = isRelativeToScript ? __dirname : '.'

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir)
    try {
      fs.mkdirSync(curDir)
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir
      }
      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`)
      }
      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err // Throw if it's just the last created dir.
      }
    }

    return curDir
  }, initDir)
}

const optimazition = (file, folder) => imagemin(file, {
  destination: mkDir(folder),
  plugins: [
    imageminMozjpeg({
      progressive: true,
      arithmetic: false
    })
  ]
})


const picture = (original, folder, name, resolution) => new Promise((resolve, reject) => {
  sharp(original)
    .resize(resolution)
    .toFile(path.join(folder, name))
    .then((info) => {
      resolve({
        ...info,
        name
      })
    }).catch((err) => reject(err))
})


const filterResolution = (arr, width) => {
  return arr.filter(w => {
    return w <= width
  })
}

/**
 * Создаем новые изображения
 * @param {string} file.fieldname Имя поля
 * @param {string} file.path относительный путь до загруженного файла (оригинала)
 * @param {string} file.isAbsolute абсолютный путь до корня сайта
 * @param {string} file.basename оригинальное имя файлы
 * @param {string} file.newName новое имя файла
 * @param {string} file.mimeType mime тип файла
 * @param {string} file.encoding кодировка
 * @returns {Array} массив из списка файлов нового размера
 */
const resize = (file) => {
  const originalFile = path.join(file.isAbsolute + file.path)
  const width = sizeOf(originalFile).width
  const writePath = mkDir(path.join(file.isAbsolute, '/public/images/article/resize/'))

  try {
    /**  */
    const responsive = [480, 768, 1024, 1280, 2700, width]
    /** Reteniva array @2x */
    const reteniva = [960, 1536, 2048, 2560]
    const resolution = filterResolution(responsive, width).map(w => {
      // const name = (w <= 2700 && w !== width) ? `${w}w_${file.newName}` : file.newName
      const name = `${w}w_${file.newName}`
      return picture(originalFile, writePath, name, w)
    })
    const reteniva2x = filterResolution(reteniva, width).map(w => {
      const {
        ext,
        name
      } = path.parse(file.newName)
      const fileName2x = `${w}w_${name}@2x${ext}`
      return picture(originalFile, writePath, fileName2x, w)
    })
    return Promise.all([...resolution, ...reteniva2x]).catch((e) => e)
  } catch (err) {
    // FIXME: Нужен обработчик ошибок
    console.log(':::[ err  ]:::', err)
  }
}

module.exports = {
  mkDir,
  resize,
  optimazition
}