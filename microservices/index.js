'use strict'
const path = require('path')
const fs = require('fs')
// var fn = require('funclib')

module.exports = {
  loading: loadServices
}

function loadServices (dir, subDir) {
  subDir = subDir || []
  fs.readdirSync(dir).map(item => {
    const iPath = path.join(dir, item)
    const stat = fs.statSync(iPath)
    if (stat.isDirectory() && item !== 'node_modules') {
      loadServices(iPath, subDir)
    } else if (stat.isFile() && item === 'package.json') {
      let pack = require(iPath)
      subDir.push(pack.name)
    }
  })

  return subDir
}