'use strict'
const path = require('path')
// eslint-disable-next-line no-unused-vars
var fn = require("funclib")

module.exports = function (html) {
  html = html || 'html'
  return path.join(__dirname, '../views/', html)
}