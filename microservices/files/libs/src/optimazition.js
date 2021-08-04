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
 * @returns {array} [{
           data: < Buffer ff d8 ff e0 00 10 4 a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 08 06 06 07 06 05 08 07 07 07 09 09 08 0 a 0 c 14 0 d 0 c 0b 0b 0 c 19 12 13 0 f...55739 > ,
           sourcePath: '/home/misha/web/micRO/public/images/article/resize/960_f51736c86256f-f52c0bb2675be963306a429aef5d55a4@2x.jpg',
           destinationPath: '/home/misha/web/micRO/public/images/article/resize/960_f51736c86256f-f52c0bb2675be963306a429aef5d55a4@2x.jpg'
         },{...}]
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