'use strict'

const path = require('path')
const sizeOf = require('image-size')
const root = require('app-root-path').path

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
  return arr.filter(w => w <= width)
}


/**
 * Создание нового названия для уменьшенной копии оригинального изображения. С учётом его размера.
 * @param {string} file.fieldname Имя поля
 * @param {string} file.path относительный путь до загруженного файла (оригинала)
 * @param {string} file.basename оригинальное имя файлы
 * @param {string} file.mimeType mime тип файла
 * @param {string} file.encoding кодировка
 * @param {number} w размер уменьшенного изображение по ширине
 * @param {boolean} reteniva По умолчанию false. Если true то добавление префикса @2x 
 * @returns {string}
 */
function newNameFile(file, w, reteniva = false) {
  reteniva = reteniva ? '@2x' : ''
  const {
    ext,
    name
  } = path.parse(file.path)
  const fileName = `${w}_${name + reteniva}${ext}`
  return fileName
}

/**
 * Создаем новые изображения
 * @param {string} file.fieldname Имя поля
 * @param {string} file.path относительный путь до загруженного файла (оригинала)
 * @param {string} files.isAbsolute абсолютный путь до корня сайта
 * @param {string} files.folder относительный путь до папки в которую был сохранён оригинал
 * @param {string} file.basename оригинальное имя файлы
 * @param {string} file.mimeType mime тип файла
 * @param {string} file.encoding кодировка
 * @param {string} folder папка в которую сохраняются фото после ресайзинга
 * @returns {Array} массив из списка файлов нового размера
 */
const resize = async (file, folder) => {

  const originalFile = file.isAbsolute // path.join(root + file.path)
  const width = sizeOf(originalFile).width
  /** Папка в которую сохраняем уменьшенные копии */
  const writePath = mkDir(path.join(root, folder, '../resize'))

  try {
    /**  */
    const responsive = [480, 768, 1024, 1280, 2700, width]
    const resolution = filterResolution(responsive, width).map(w => {
      return picture(originalFile, writePath, newNameFile(file, w), w)
    })

    /** Reteniva array @2x */
    const reteniva = [960, 1536, 2048, 2560]
    const reteniva2x = filterResolution(reteniva, width).map(w => {
      return picture(originalFile, writePath, newNameFile(file, w, true), w)
    })
    return Promise.all([...resolution, ...reteniva2x]).catch((e) => e)
  } catch (err) {
    return err
  }
}

module.exports = {
  resize
}