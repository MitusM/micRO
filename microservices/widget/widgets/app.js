/* eslint-disable no-prototype-builtins */
'use strict'
const path = require('path')
const fs = require('fs')

function getAllFiles(dir) {

  dir = dir || path.join(__dirname)
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory() && file !== 'node_modules';
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []).filter(file => path.parse(file).base === 'index.js')
}

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
  }
}

module.exports =  Widget