'use srict'
const config = require('./config.json')
const lang = require('./lang.json')
const view = require('../../service/viewsServices').dir

class Html {
  constructor(target) {
    /**  */
    this._dir = view(['../', 'widgets/', 'html'])
    /**  */
    this._template = view(['../', 'widgets/html/', 'views', `${target}.njk`])
  }

  async widget() {
    return [{
      title: 'html',
      ask: false
    }]
  }
}

module.exports = {
  name: 'html',
  config: config,
  lang: lang,
  function: Html
}