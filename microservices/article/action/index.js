// const config = require('../config/config.json')
const req = require('app-root-path').require
const config = req('/core/upload/config/upload.json')
module.exports = (app) => {
  'use strict'
  app.action('upload', async (meta, res) => {
    res.end({
      config: config.article
    })
  })
  return app
}