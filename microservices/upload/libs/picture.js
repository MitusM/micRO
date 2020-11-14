const path = require('path');
const sharp = require('sharp');

const picture = (original, folder, name, resolution) => new Promise((resolve, reject) => {
    sharp(original)
        .resize(resolution)
        .toFile(path.join(folder, name))
        .then((info) => {
            resolve({
                ...info,
                name
            });
        }).catch((err) => reject(err));
});
// module.
exports.picture = picture;