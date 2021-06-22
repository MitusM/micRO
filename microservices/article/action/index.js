const config = require('../config/config.json')
module.exports = (app) => {
  'use strict'
  app.action('upload', async (meta, res) => {
    res.end({
      config: config.upload.config,
      folder: config.upload.folder
    })
  })
  return app
}