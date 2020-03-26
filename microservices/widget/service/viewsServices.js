'use strict'
const path = require('path')

function dir(html) {
  html = html || ['../views/', 'html']
  return path.join(__dirname, ...html)
}
/**
 *
 * @param {object} res - response
 * @param {object} obj - обьект данных
 * @param {object|Array} obj.dir - директория или масиив с директориями html шаблона
 * @param {object} obj.page - страница
 * @param {object} obj.data - данные выводимые на странице
 */
async function html(res, obj) {
  return await res.app.ask('render', {
    server: {
      action: 'html',
      meta: {
        dir: obj.dir,
        page: obj.page,
        data: {
          ...obj.data
        }
      }
    }
  })
}

module.exports = {
  dir: dir,
  html: html
}