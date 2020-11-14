const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const
    mkDir = require('./mkDir');

/**
 * 
 * @param {array} file ['images/*.{jpg,png}']
 * @param {string} folder 
 */
const optimazition = (file, folder) => imagemin(file, {
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
});

module.exports.optimazition = optimazition