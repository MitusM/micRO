/* eslint-disable no-prototype-builtins */
'use strict'
const path = require('path')
const fs = require('fs')

function getAllFiles(dir) {

  dir = dir || path.join(__dirname)
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory() && file !== 'node_modules' && file !== 'assets';
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []).filter(file => path.parse(file).base === 'index.js')
}
/** @function */
function Widget(dir) {
  if (!(this instanceof Widget)) {
    return new Widget(dir);
  }
}

Widget.prototype = {

  getAllFiles: function (dir) {
    dir = dir || path.join(__dirname)
    let files = getAllFiles(dir)
    this._files = files
    return this
  },

  read: function () {
    let obj = {}
    let arr = []
    this._files.map(file => {
      let pack = require(file)
      obj[pack.name] = {
        ...pack
      }
      arr.push(pack)
    })
    this._read = obj
    this._arrFiles = arr
    return this
  },

  arr: function () {
    let arr = []
    for (let item in this._read) {
      arr.push(this._read[item])
    }
    this._arrFiles = arr
    return this
  },

  /**
   *
   *
   * @param {object} meta Объект с данными какие виджеты использованы в каком блоке на главной странице
   * @param {object} meta.list  Объект
   * @param {string} meta.list._id  индитификатор в базе home.homes
   * @param {object} meta.list.home  Объект в котором находятся блоки сайта и в кождом массив из используемых виджетов.
   * @callback callback функция обратного вызова
   * @param callback.unit Объект в котором находиться виджет из блока
   */
  home: async function (meta, callback) {
    const obj = {}
    const list = meta.list.home
    for (const key in list) {
      /** массив в который добавляем элементы блока */
      const arr = []
      const block = list[key];
      if (block.length > 0) {
        for (const item in block) {
          /** Объект в котором находиться виджет из блока { name: 'menu', id: '5e317616246ca035caae1def', ask: 'false' } */
          const unit = block[item];
          let response = await callback(unit)
          arr.push(response)
        }
      }
      obj[key] = arr
    }
    return obj
  }
}



module.exports = Widget