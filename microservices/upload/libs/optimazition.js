'use strict'
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')

const mkDir = require('./mkDir')

const arrFiles = (file, folder) => file.reduce((arr, obj) => {
    return arr.concat(folder + obj.name)
}, [])

/**
 * 
 * @param {array} file ['images/*.{jpg,png}']
 * @param {string} folder директория в которой сохраняем оптимизированные фото
 */
const optimazition = (file, folder) => {
    try {
        let filesArr = arrFiles(file, folder)
        return imagemin(filesArr, {
            destination: mkDir(folder),
            plugins: [
                imageminMozjpeg({
                    progressive: true,
                    arithmetic: false
                }),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        })
    } catch (error) {
        // FIXME: Нужен обработчик ошибок
        console.log('error::optimazition', error)
    }
}

module.exports.optimazition = optimazition