'use strict'
const path = require('path')

function dir(html) {
  html = html ? ['../views/html', html] : ['../views/', 'html']
  return path.join(__dirname, ...html)
}
/**
 * Оформление данных в html
 * @param {object} res
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

/**
 *
 * @param {*} meta
 * @param {object} render - обьект данных
 * @param {object|Array} render.dir - директория или масиив с директориями html шаблона
 * @param {object} render.page - страница
 * @param {object} render.data - данные выводимые на странице
 * @param {*} res
 */
async function homeStructure(meta, render, res) {
  const obj = {}
  const list = meta.home
  for (const key in list) {
    /** массив в который добавляем элементы блока */
    const arr = []
    const block = list[key];
    if (block.length > 0) {
      for (const item in block) {
        /** Объект в котором находиться виджет из блока { name: 'menu', id: '5e317616246ca035caae1def', ask: 'false' } */
        const unit = block[item];
        let {
          response
        } = await html(res, {
          ...render,
          data: {
            ...unit
          }
        })
        arr.push(response)
      }
    }
    obj[key] = arr
  }
  return obj
}

module.exports = {
  dir: dir,
  html: html,
  homeStructure: homeStructure
}