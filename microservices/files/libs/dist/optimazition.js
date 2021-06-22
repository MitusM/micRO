'use strict'; // const imagemin = require('imagemin')
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminPngquant = require('imagemin-pngquant')

var _imagemin = _interopRequireDefault(require("imagemin"));

var _imageminJpegtran = _interopRequireDefault(require("imagemin-jpegtran"));

var _imageminPngquant = _interopRequireDefault(require("imagemin-pngquant"));

var _mkDir = _interopRequireDefault(require("../mkDir"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

require("@babel/register");

const arrFiles = (file, folder) => file.reduce((arr, obj) => {
  return arr.concat(folder + obj.name);
}, []);
/**
 * 
 * @param {array} file ['images/*.{jpg,png}']
 * @param {string} folder директория в которой сохраняем оптимизированные фото
 */


const optimazition = (file, folder) => {
  try {
    let filesArr = arrFiles(file, folder);
    return (0, _imagemin.default)(filesArr, {
      destination: (0, _mkDir.default)(folder),
      plugins: [ // imageminMozjpeg({
        //     progressive: true,
        //     arithmetic: false
        // }),
        // imageminPngquant({
        //     quality: [0.6, 0.8]
        // })
        (0, _imageminJpegtran.default)(), (0, _imageminPngquant.default)({
          quality: [0.6, 0.8]
        })
      ]
    });
  } catch (error) {
    // FIXME: Нужен обработчик ошибок
    console.log('error::optimazition', error);
    return error
  }
};

module.exports.optimazition = optimazition; // export {
//     optimazition
// }