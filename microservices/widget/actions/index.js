
const widget = require('../widgets/app')
module.exports = (app) => {
  'use strict'
  app.action('widgetList', async (meta, res) => {
    await res.end({widget: widget()})
  })
}