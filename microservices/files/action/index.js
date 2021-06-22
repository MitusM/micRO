
module.exports = (app) => {
  'use strict'

  app.action('list',  async (meta, res)=> {
    res.end({ok: 200})
  })
  return app
}