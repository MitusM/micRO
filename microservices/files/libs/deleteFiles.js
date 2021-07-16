const fs = require('fs')
// const {
//     access
// } = require('fs/promises');
const {
    constants
} = require('fs');

function isFileExists(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, constants.F_OK | constants.R_OK, err => {
            if (!err) return resolve(true);
            if (err.code === 'ENOENT') return resolve(false);
            reject(err);
        });
    });
}


const deleteFile = async (file) => {
    try {
        //* === === === === === === === === === === === ===
        const isFileExt = await isFileExists(file)
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
                reject({
                    ok: false
                })
            }

        })

        //     // if (isFileExists) {

        //     // }
        //     // let unlink = await promises.unlink(file).then(done => {
        //     //         return {
        //     //             ok: true
        //     //         }
        //     //     }).catch(error => {
        //     //         return {
        //     //             error: error,
        //     //             ok: false
        //     //         }
        //     //     })

        //     // let unlink = await promisify(fs.unlink, [file])
        //     // console.log('⚡ unlink', unlink)

        //* === === === === === === === === === === === ===

        // return new Promise((resolve, reject) => {

        //     fs.access(file, constants.R_OK | constants.W_OK, (err) => {
        //         // console.log(err ? 'no access!' : 'can read/write');
        //         if (err) {
        //             resolve({
        //                 error: err,
        //                 ok: false
        //             })
        //         } else {
        //             fs.unlink(file, (err) => {
        //                 if (err) {
        //                     reject({
        //                         error: err,
        //                         ok: false
        //                     })
        //                 } else {
        //                     resolve({
        //                         ok: true
        //                     })
        //                 }
        //             })
        //         }
        //     })
        // })

    } catch (error) {
        return {
            ok: false,
            error: error
        }
    }

}

/**
 * Удаление массива файлов.
 * @param {array} arr массив с файлами на удаление. Каждый путь до файла должен быть абсолютным
 * @returns Promise
 */
module.exports = async (arr) => {
    try {
        let arrPromise = []
        let length = arr.length
        for (let i = 0; i < length; i++) {
            let file = arr[i]
            arrPromise.push(deleteFile(file))
        }
        // return await Promise.all(arrPromise).then(del => del).catch(error => error)
        return await Promise.all(arrPromise).then(del => del.every(bool => bool === true)).catch(error => error)

    } catch (error) {
        // console.log('cannot access::error', error);
        return error
    }

}