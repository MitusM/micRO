'use strict'

const path = require('path')
const sizeOf = require('image-size')

const mkDir = require('./mkDir')
const {
  picture
} = require("./picture")

/**
 * Фильтруем размеры. Оставляем только те что меньше заданного 
 * @param {array} arr массив с размерами по ширине
 * @param {number} width ширина относительно которого фильтруем
 */
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
 * @param {string} folder папка в которую сохраняются фото после ресайзинга
 * @returns {Array} массив из списка файлов нового размера
 */
const resize = async (file, folder) => {
  const originalFile = path.join(file.isAbsolute + file.path)
  const width = sizeOf(originalFile).width
  const writePath = mkDir(path.join(file.isAbsolute, folder))

  try {
    /**  */
    const responsive = [480, 768, 1024, 1280, 2700, width]
    /** Reteniva array @2x */
    const reteniva = [960, 1536, 2048, 2560]
    const resolution = filterResolution(responsive, width).map(w => {
      const name = `${w}_${file.newName}`
      return picture(originalFile, writePath, name, w)
    })
    const reteniva2x = filterResolution(reteniva, width).map(w => {
      const {
        ext,
        name
      } = path.parse(file.newName)
      const fileName2x = `${w}_${name}@2x${ext}`
      return picture(originalFile, writePath, fileName2x, w)
    })
    return Promise.all([...resolution, ...reteniva2x]).catch((e) => e)
  } catch (err) {
    // FIXME: Нужен обработчик ошибок
    console.log(':::[ err  ]:::', err)
  }
}

module.exports = {
  resize
}