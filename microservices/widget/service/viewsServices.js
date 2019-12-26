'use strict'
const path = require('path')
// eslint-disable-next-line no-unused-vars
var fn = require("funclib")

module.exports = function (html) {
  html = html || ['../views/', 'html']
  return path.join(__dirname, ...html)
}