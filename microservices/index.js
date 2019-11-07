'use strict'
const path = require('path')
const fs = require('fs')
// var fn = require('funclib')

module.exports = {
  loading: loadServices
}

function loadServices(dir, subDir) {
  subDir = subDir || {
    microservices: [],
    router: []
  }

  fs.readdirSync(dir)
    .map((item) => {
      const iPath = path.join(dir, item)
      const stat = fs.statSync(iPath)
      if (stat.isDirectory() && item !== 'node_modules') {
        loadServices(iPath, subDir)
      } else if (stat.isFile() && item === 'package.json') {
        let pack = require(iPath)
        let name = pack.name
        subDir.microservices.push(name)
      }
      return {
        file: item, // файл
        path: iPath // путь до файла
      }
    })
    .filter(item => item.file === 'router.json')
    .map(item => {
       let routerJson = require(item.path)
        let name = routerJson.all.name
        subDir.router.push({name: name, endpoints: routerJson})
        return {name: name, endpoints: routerJson}
    })

  return subDir
}