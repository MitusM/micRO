const fs = require('fs')
const path = require('path')
const promis = Symbol()

module.exports = class Directory {
  constructor (dir) {
    this.path = this.isDirectory(dir) ? dir : false
  }
    /**
     * Выводим путь до дирестории
     * @returns {string} путь до дирестории
     */
  get dirName () {
    return this.path
  }

  /**
   * Проверяем существует ли запрошенная директория и является ли директорией
   * @param {String} dir
   * @returns {Boolean}
   */
  isDirectory (dir) {
    dir = dir || this.path
    try {
      return fs.existsSync(dir) && fs.statSync(dir).isDirectory()
    } catch (error) {
      return false
    }
  }

  /**
   * Проверяем существует ли запрошенный файл и является ли файлом
   * @param {String} file путь до файла
   * @returns {Boolean}
   */
  isFile (file) {
    try {
      return fs.existsSync(file) && fs.statSync(file).isFile()
    } catch (error) {
      return false
    }
  }

  /**
   * Получаем список содержимого директории
   * @returns {Array} массив содержимого директории
   */
  getItems () {
    return this[promis](fs.readdir, [this.path])
  }

  /**
   * Список файлов в директории
   * @returns {Array} массив c файлами директории
   */
  // TODO: Фильтрацию по расширению добавить 📌
  async getFiles () {
    let items = await this.getItems()
    return Promise.all(items.map(file => this[promis](fs.stat, [path.join(this.path, file)]).then(stat => {
      if (stat.isFile()) {
        return file
      }
    }).catch(console.error))).then(files => {
      return files.filter(file => file)
    })
  }

  // readFile (pathFile) {
  //   fs.readFile(pathFile, 'utf-8', (err, content) => {
  //     return content
  //   })
  // }

  [promis] (func, args) {
    return new Promise((resolve, reject) => {
      func.apply(null, [...args, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }])
    })
  }
}
