// const fs = require('fs')
// const {
//     constants
// } = require('fs')
const root = require('app-root-path').path
const path = require('path')


class Base {
    constructor(options) {
        if (options) this.options = options
        this.root = root
    }

    /**
     * Перевод из относительного пути в абсолютный
     * @param {string} pathFiles относительный путь до файла.
     * @returns {string}
     */
    absolute(...segments) {
        let home = root.split('/')
        const parts = [...home, ...segments].reduce((parts, segment) => {
            // Remove leading slashes from non-first part.
            if (parts.length > 0) {
                segment = segment.replace(/^\//, '')
            }
            // Remove trailing slashes.
            segment = segment.replace(/\/$/, '')
            return parts.concat(segment.split('/'))
        }, [])
        const resultParts = []
        for (const part of parts) {
            if (part === '.') {
                continue
            }
            if (part === '..') {
                resultParts.pop()
                continue
            }
            resultParts.push(part)
        }
        return resultParts.join('/')
        // return path.join(this.root, resultParts.join('/'))
    }

    /**
     * Проверяем являться путь абсолютным
     * @param {string} pathFiles путь до файла
     * @returns {boolean}
     */
    isAbsolute(pathFiles) {
        return path.isAbsolute(pathFiles)
    }

    // joinPath(...segments) {
    //     const parts = segments.reduce((parts, segment) => {
    //         // Remove leading slashes from non-first part.
    //         if (parts.length > 0) {
    //             segment = segment.replace(/^\//, '')
    //         }
    //         // Remove trailing slashes.
    //         segment = segment.replace(/\/$/, '')
    //         return parts.concat(segment.split('/'))
    //     }, [])
    //     const resultParts = []
    //     for (const part of parts) {
    //         if (part === '.') {
    //             continue
    //         }
    //         if (part === '..') {
    //             resultParts.pop()
    //             continue
    //         }
    //         resultParts.push(part)
    //     }
    //     // console.log('⚡ resultParts', resultParts)
    //     return resultParts.join('/')
    // }
}

module.exports = Base