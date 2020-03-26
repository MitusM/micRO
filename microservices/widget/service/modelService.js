'use strict'
const mongoose = require('mongoose')
const schemaService = require('../service/schemaService')(mongoose)
/**
 * @constructor
 * @this  {Widget}
 */
class Widget {
  constructor() {}

  /**
   *
   * @param {object} meta Объект с данными какие виджеты использованы в каком блоке на главной странице
   * @param {object} meta.list  Объект
   * @param {string} meta.list._id  индитификатор в базе home.homes
   * @param {object} meta.list.home  Объект в котором находятся блоки сайта и в кождом массив из используемых виджетов.
   * @param {object} widgets Объект со всеми виджетами
   * @param {object} widgets[name [name] - динамическое имя объекта Объект с данными виджета
   * @param {object} widgets[name.config конфиг виджета
   * @param {object} widgets[name.lang языковые константы виджета
   * @param {function} widgets[name.function метод виджета
   */
  async home(meta, widgets, res) {
    const obj = {}
    const list = meta.list.home
    for (const key in list) {
      /** массив в который добавляем элементы блока */
      const arr = []
      const block = list[key];
      if (block.length > 0) {
        for (const item in block) {
          /** Объект в котором находиться виджет из блока { name: 'menu', id: '5e317616246ca035caae1def', ask: 'false' } */
          const unit = block[item];
          /** имя виджета используемого в блоке */
          let name = unit.name
          /**  */
          let { response } = await new widgets[name].function().html(unit, res)
          arr.push(response)
        }
      }
      obj[key] = arr
    }
    return obj
  }

  static widget() {
    return this
  }
}
schemaService.loadClass(Widget)
module.exports = mongoose.model('widget', schemaService);