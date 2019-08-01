const nunjucks = require('nunjucks')
const dateFilter = require('./filter/date')
// eslint-disable-next-line no-unused-vars
var fn = require('funclib')

module.exports = class Render {
  /**
   * 
   * @param {*} app 
   * @param {*} dir 
   */
  constructor(app, dir) {
    this.dir = dir
    this.env = new nunjucks.Environment(new nunjucks.FileSystemLoader(this.dir), {
      // TODO: Вынести в конфиг
      watch: true,
      noCache: true,
      express: app
    })
    this.env.opts.autoescape = false
    this.env.addFilter('date', dateFilter)
    this.app = app
  }

  /**
   * 
   * @param {string} file 
   * @param {object} data 
   */
  render(file, data) {
    return new Promise((resolve, reject) => {
      this.env.render(file, data, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}