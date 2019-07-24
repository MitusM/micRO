'use strict'
// var fn = require('funclib')

module.exports = (app) => {
  app.on('error', (err, req, res) => {
    // fn.log(err, 'err:blog')
    res.status(err.status || 500);
    res.json({
      error: err.message || 'Server error'
    })
  })
  
  
  app.use(async (req, res, next) => {
    try {
      await next();
    } catch (err) {
      res.status(err.status || 500)
      res.json({
        error: err.message || 'Server error'
      })
      app.emit('error', err, req, res)
    }
  })
  return app
}