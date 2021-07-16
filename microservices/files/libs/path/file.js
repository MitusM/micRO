const fs = require('fs')
const {
    constants
} = require('fs')
const root = require('app-root-path').path
const path = require('path')

const Base = require('./base')

// ✨
class Files extends Base {
    constructor(options) {
        super(options)
    }

    /**
     * Проверка существования файла, а так же проверка на то что он не занят другими процессами
     * @param {string} path Абсолютный путь до файлами
     * @returns {Promise} Promise object true - объект существует и доступен false - объекта не существует или он занят другими процессами
     */
    isExists(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, constants.F_OK | constants.R_OK, err => {
                if (!err) return resolve(true);
                if (err.code === 'ENOENT') return resolve(false);
                reject(err);
            });
        });
    }

    /**
     * Удаление файла
     * @param {string} file Абсолютный путь до файла
     * @returns {Promise}
     */
    async delete(file) {
        const isFileExt = await this.isExists(file)
        return new Promise((resolve, reject) => {
            if (isFileExt) {
                fs.unlink(file, (err) => {
                    if (err) {
                        reject({
                            ok: false,
                            error: err
                        })
                    } else {
                        resolve(true)
                    }
                })
            } else {
                reject(false)
            }

        })
    }

    /**
     * Удаление массива файлов.
     * @param {array} arr Массив с файлами. Каждый путь до файла должен быть абсолютным
     * @returns {boolean|Promise} true - Все файлы удалены успешно 
     */
    deleteArrayFiles(arr) {
        let arrPromise = []
        let length = arr.length
        for (let i = 0; i < length; i++) {
            let file = this.absolute(arr[i])
            arrPromise.push(this.delete(file))
        }
        return Promise.all(arrPromise).then(del => del.every(bool => bool === true)).catch(error => error)
    }
}

module.exports = Files