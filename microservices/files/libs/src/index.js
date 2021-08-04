const path = require('path')
const Images = require('../cloud/images/index')


module.exports = class Img extends Images {
  constructor(options) {
    super(options)
  }

  //FIXME: вынести в отдельный класс
  /**
   * Изменение изображения до указанного размера
   * @param {Array} resolutionArray width Размер
   * @param {String} file Изображение которое должно быть изменено
   * @param {String} folder Папка в которую сохраняем изменённое изображение
   * @param {boolean} resNewName false Если к имени файла не добавлять ширину изображение. По умолчанию true.
   * @param {boolean} reteniva false не добавлять к имени файла приставку @2х. По умолчанию true.
   * 
   * @example:new Images().resize([400, 600], absolutePathFile.ext, /images)
   */
  // resizePreview
  resizeW(resolutionArray, file, folder, resNewName = true, reteniva = false) {
    /** Папка в которую сохраняем уменьшенные копии */
    // this.absolute(arrayArguments[2])
    const writePath = this.mkDir(path.resolve(this.root + folder))
    let filePromise = []

    for (let i = 0; i < resolutionArray.length; i++) {
      const resolution = resolutionArray[i]
      const {
        ext,
        name
      } = this.name(file)
      const newName = (resNewName) ? (this.newName(name, resolution, reteniva) + ext) : (name + ext)

      let promisesPush = new Promise((resolve, reject) => {
        this.sharp(file)
          .resize(resolution)
          .toFile(path.resolve(writePath, newName))
          .then((info) => {
            resolve({
              ...info,
              name: newName
            });
          }).catch((err) => reject(err));
      })

      filePromise.push(promisesPush)

    }
    return Promise.all(filePromise).catch(error => error)
  }

}