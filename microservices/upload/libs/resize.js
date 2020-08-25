'use strict'
const path = require('path');
var sizeOf = require('image-size')
const gm = require('gm')

module.exports = (file) => {
  console.log('================================')
  console.log(':::[ file  ]:::', file.path)
  let originalFile = path.join(file.isAbsolute + file.path) // file.path
  console.log(':::[ originalFile  ]:::', originalFile)
  let dimensions = sizeOf(originalFile)
  let width = dimensions.width
  // let height = dimensions.height
  let writePath = mkDir(path.join(file.isAbsolute, '/public/images/article/big/'))
  if (width > 1280) {
    console.log(dimensions.width, dimensions.height)
    console.log(':::[ writePath  ]:::', writePath)
    gm(originalFile)
      .resizeExact(1280)
      .write(path.join(writePath, file.newName), function (err) {
        if (!err) console.log('done 1280');
      })
  }
}