'use strict';

const Busboy = require('busboy');
const fs = require('fs');
const os = require('os');
const path = require('path');
const appRoot = require('app-root-path').path

const getDescriptor = Object.getOwnPropertyDescriptor;
/** Директория в которою происходит сохранение файла. Если не установлена то будет использована временная директория системы*/
let saveToFile
/** Массив из MIME-типов данных разрешённых к загрузке */
let mimeTypeLimit
/** true загрузить файлы, false загрузка не будет осуществелена. Выведены будут данные других полей */
let upload

let readStream


function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
      //! TODO:
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir)
}

/**
 * async-busboy
 * @param {Object} req request
 * @param {Boolean} options.upload true загрузить файлы, false загрузка не будет осуществелена. Выведены будут данные других полей
 * @param {Function} options.onFile Функция загрузки файла, заменяющая фунцию по умолчанию
 * @param {String} options.path Директория для сохранение файла. Если не установлена используется временная директория системы
 * @param {Array} options.mimeTypeLimit  Массив из MIME-типы разрешённые к загрузке

 * @param {Object} options.headers
 * @returns {Object}
 * @public
 */
module.exports = function (req, options) {
  options = options || {};
  options.headers = options.headers || req.headers;
  /** Функция загрузки файла, заменяющая фунцию загрузки файла по умолчанию */
  const customOnFile = typeof options.onFile === "function" ? options.onFile : false;
  delete options.onFile;

  saveToFile = options.path || os.tmpdir();
  delete options.path

  mimeTypeLimit = options.mimeTypeLimit ? !Array.isArray(options.mimeTypeLimit) ? [options.mimeTypeLimit] : options.mimeTypeLimit : null;
  delete options.mimeTypeLimit;

  upload = options.upload || false

  readStream = options.readStream || false

  const busboy = new Busboy(options);

  return new Promise((resolve, reject) => {
    const fields = {};
    const filePromises = [];

    req.on('close', cleanup);

    busboy
      .on('field', onField.bind(null, fields))
      .on('file', customOnFile || onFile.bind(null, filePromises))
      .on('close', cleanup)
      .on('error', onError)
      .on('end', onEnd)
      .on('finish', onEnd);

    busboy.on('partsLimit', function () {
      const err = new Error('Reach parts limit');
      err.code = 'Request_parts_limit';
      err.status = 413;
      onError(err);
    });

    busboy.on('filesLimit', () => {
      const err = new Error('Reach files limit');
      err.code = 'Request_files_limit';
      err.status = 413;
      onError(err);
    });

    busboy.on('fieldsLimit', () => {
      const err = new Error('Reach fields limit');
      err.code = 'Request_fields_limit';
      err.status = 413;
      onError(err);
    });

    req.pipe(busboy);

    function onError(err) {
      cleanup();
      return reject(err);
    }

    function onEnd(err) {
      if (err) {
        return reject(err);
      }
      if (customOnFile) {
        cleanup();
        resolve({
          fields
        });
      } else {
        Promise.all(filePromises)
          .then((files) => {
            cleanup();
            resolve({
              fields,
              files
            });
          })
          .catch(reject);
      }
    }

    function cleanup() {
      busboy.removeListener('field', onField);
      busboy.removeListener('file', customOnFile || onFile);
      busboy.removeListener('close', cleanup);
      busboy.removeListener('end', cleanup);
      busboy.removeListener('error', onEnd);
      busboy.removeListener('partsLimit', onEnd);
      busboy.removeListener('filesLimit', onEnd);
      busboy.removeListener('fieldsLimit', onEnd);
      busboy.removeListener('finish', onEnd);
    }
  });
};

function onField(fields, name, val, fieldnameTruncated, valTruncated) {
  // don't overwrite prototypes
  if (getDescriptor(Object.prototype, name)) return;

  // This looks like a stringified array, let's parse it
  if (name.indexOf('[') > -1) {
    const obj = objectFromBluePrint(extractFormData(name), val);
    reconcile(obj, fields);

  } else {
    if (fields.hasOwnProperty(name)) {
      if (Array.isArray(fields[name])) {
        fields[name].push(val);
      } else {
        fields[name] = [fields[name], val];
      }
    } else {
      fields[name] = val;
    }
  }
}

/**
 *
 * @param {*} filePromises
 * @param {*} fieldname
 * @param {*} file
 * @param {*} filename
 * @param {*} encoding
 * @param {*} mimetype
 */
function onFile(filePromises, fieldname, file, filename, encoding, mimetype) {
  const newName = file.tmpName = Math.random().toString(16).substring(2) + '-' + filename;
  /** относительный путь */
  let relativePath = path.join(saveToFile, newName)
  let isAbsolute = mkDirByPathSync(appRoot + saveToFile)
  /** абсолютный путь к файлу */
  let saveTo = path.join(isAbsolute, newName)

  //! TODO:
  if (!upload || (mimeTypeLimit && !mimeTypeLimit.some(type => {
      return type === mimetype;
    }))) {
    return file.resume();
  }

  // Create a write stream of the new file
  const writeStream = fs.createWriteStream(saveTo, {
    mode: "644"
  });

  const filePromise = new Promise((resolve, reject) => writeStream
    .on('open', () => file
      .pipe(writeStream)
      .on('error', reject)
      .on('finish', () => {
        if (readStream) {
          const readStream = fs.createReadStream(saveTo);
          readStream.fieldname = fieldname;
          readStream.filename = filename;
          readStream.transferEncoding = readStream.encoding = encoding;
          readStream.mimeType = readStream.mime = mimetype;
          resolve(readStream);
        } else {
          const stream = {
            fieldname: fieldname,
            path: relativePath,
            // isAbsolute: isAbsolute,
            isAbsolute: appRoot,
            basename: filename,
            newName: newName,
            mimeType: mimetype,
            encoding: encoding,
          }
          resolve(stream)
        }
      })
    )
    .on('error', (err) => {
      file
        .resume()
        .on('error', reject);
      reject(err);
    })
  );
  filePromises.push(filePromise);
}

/**
 *
 * Extract a hierarchy array from a stringified formData single input.
 *
 *
 * i.e. topLevel[sub1][sub2] => [topLevel, sub1, sub2]
 *
 * @param  {String} string: Stringify representation of a formData Object
 * @private
 * @return {Array}
 *
 */
const extractFormData = (string) => {
  const arr = string.split('[');
  const first = arr.shift();
  const res = arr.map(v => v.split(']')[0]);
  res.unshift(first);
  return res;
};

/**
 *
 * Generate an object given an hierarchy blueprint and the value
 *
 * i.e. [key1, key2, key3] => { key1: {key2: { key3: value }}};
 *
 * @param  {Array} arr:   from extractFormData
 * @param  {[type]} value: The actual value for this key
 * @return {[type]}       [description]
 * @private
 *
 */
const objectFromBluePrint = (arr, value) => {
  return arr
    .reverse()
    .reduce((acc, next) => {
      if (Number(next).toString() === 'NaN') {
        return {
          [next]: acc
        };
      } else {
        const newAcc = [];
        newAcc[Number(next)] = acc;
        return newAcc;
      }
    }, value);
};

/**
 * Reconciles formatted data with already formatted data
 *
 * @param  {Object} obj extractedObject
 * @param  {Object} target the field object
 * @return {Object} reconciled fields
 * @private
 *
 */
const reconcile = (obj, target) => {
  const key = Object.keys(obj)[0];
  const val = obj[key];

  // The reconciliation works even with array has
  // Object.keys will yield the array indexes
  // see https://jsbin.com/hulekomopo/1/
  // Since array are in form of [ , , valu3] [value1, value2]
  // the final array will be: [value1, value2, value3] has expected
  if (target.hasOwnProperty(key)) {
    return reconcile(val, target[key]);
  } else {
    return target[key] = val;
  }

};