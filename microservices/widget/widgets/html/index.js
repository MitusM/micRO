'use srict'
const config = require('./config.json')
const lang = require('./lang.json')
const view = require('../../service/viewsServices')

module.exports = {
  name: 'html',
  config: config,
  lang: lang,
  function: Html
}

function Html(target) {
  if (!(this instanceof Html)) {
    return new Html(target);
  }
  /**  */
  this._dir = view(['../','widgets/','html'])
  /**  */
  this._template = view(['../','widgets/html/','views', `${target}.njk`])
}

Html.prototype = {

}