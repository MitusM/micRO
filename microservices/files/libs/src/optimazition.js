'use strict'
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
// require("@babel/register")
// import imagemin from 'imagemin';
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';

const path = require('path')

const mkDir = require('../mkDir')

// [{
//         format: 'jpeg',
//         width: 480,
//         height: 721,
//         channels: 3,
//         premultiplied: false,
//         size: 41923,
//         name: '480_542b007c58b2a-14c213729.jpg'
//     },
//     {
//         format: 'jpeg',
//         width: 682,
//         height: 1024,
//         channels: 3,
//         premultiplied: false,
//         size: 68721,
//         name: '682_542b007c58b2a-14c213729.jpg'
//     }
// ]

const arrFiles = (file, folder) => file.reduce((arr, obj) => {
    return arr.concat(path.join(folder, obj.name))
}, [])

/**
 * 
 * @param {array} file ['images/*.{jpg,png}'] или массив с изображениями для оптимизации
 * @param {string} folder директория в которой сохраняем оптимизированные фото, или папка в котрой расположены изображения для оптимизации
 */
const optimazition = async (file, folder) => {
    try {
        let filesArr = arrFiles(file, folder)
        return await imagemin(filesArr, {
            destination: folder,
            plugins: [
                // imageminMozjpeg({
                //     progressive: true,
                //     arithmetic: false
                // }),
                // imageminPngquant({
                //     quality: [0.6, 0.8]
                // })
                // imageminJpegtran(),
                imageminMozjpeg(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        })
    } catch (error) {
        return error
    }
}

module.exports.optimazition = optimazition
// export {
//     optimazition
// }