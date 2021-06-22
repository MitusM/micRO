'use strict'
const Busboy = require('busboy');

function parsePromise(req) {
  const {
    headers
  } = req;
  const fields = {};

  const busboy = new Busboy({
    headers: headers
  });

  busboy.on('file', (filePromises, fieldname, file, filename, encoding, mimetype) => {
    console.log(':::[ filePromises, fieldname, file, filename, encoding, mimetype  ]:::', filePromises, fieldname, file, filename, encoding, mimetype)
  });

  busboy.on('field', function (fieldname, val) {
    fields[fieldname] = val;
  });

  busboy.on('finish', async function () {
    console.log(':::[ fields  ]:::', fields)
  });

  req.pipe(busboy);


}

async function upload(req) {
  return await parsePromise(req)
}

module.exports = upload