'use srict'
const config = require('./config.json')
const lang = require('./lang.json')
const view = require('../../service/viewsServices')

module.exports = {
  name: 'menu',
  config: config,
  lang: lang,
  function: Menu
}

function Menu (target) {
  if (!(this instanceof Menu)) {
    return new Menu(target);
  }
  /**  */
  this._dir = view(['../','widgets/','menu'])
  /**  */
  this._template = view(['../','widgets/menu/','views', `${target}.njk`])
  // console.log(':::[ this._template ]:::', this._template)
}

Menu.prototype = {

}