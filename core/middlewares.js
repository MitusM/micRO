
// const bodyParser = require('body-parser')
var multipart = require('connect-multiparty')
// const busboy = require('connect-busboy');


// const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const session = require('./session')
// const session = require('express-session')
// var csrfProtection
module.exports = (app) => {
  'use strict'
  // app.use(bodyParser.json());
  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(bodyParser({defer: true}));
  // csrf({
  //   cookie: true
  // })
  // 3.1 Session
  session(app)
  // 3.1 Парсим куки
  // app.use(cookieParser())
  // 3.2 CSRF
  app.use(csrf())

  app.use(multipart({uploadDir: './upload/'}))
  // default options, no immediate parsing
  // app.use(function(req, res, next) {
  //   // console.log(':::[ req  ]:::', req)
  //   console.log(':::[ req.busboy  ]:::', req.busboy)
  //   if (req.busboy) {
  //     req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
  //       console.log(':::[ ieldname, file, filename, encoding, mimetype  ]:::', fieldname, file, filename, encoding, mimetype)
  //       // ...
  //     });
  //     req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
  //       // ...
  //     });
  //     req.pipe(req.busboy);
  //   }
  //   next()
  //   // etc ...
  // })


  return app
}