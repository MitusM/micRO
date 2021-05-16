/* global define */
// (async () => {
'use strict'
let defSettings = {
  loadingClass: 'infinite-loading',
  dataLoader: 'ball-auto'
}

let element = (options) => {
  let div = document.createElement('div')
  div.className = options.loadingClass
  div.setAttribute('data-loader', options.dataLoader)
  return div
}

function Preloader(options) {
  if (!(this instanceof Preloader)) {
    return new Preloader()
  }
  this._div = element(options || defSettings)
}

Preloader.prototype = {
  insert: function () {
    document.body.insertBefore(this._div, document.body.firstChild)
    return this
  },

  show: function () {
    this._div.classList.remove('vizible')
    return this
  },

  hide: function () {
    this._div.classList.add('vizible')
    return this
  },

  toggle: function () {
    console.log('this._div', this._div)
    this._div.classList.toggle('vizible')
    return this
  },

  destroy: function () {

    return this
  }
}

// if (typeof define === 'function' && define.amd) {
//   define('Preloader', [], function () {
//     return Preloader
//   })
// } else if (typeof exports !== 'undefined' && !exports.nodeType) {
//   if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
//     // eslint-disable-next-line no-global-assign
//     exports = module.exports = Preloader
//   }
//   exports.default = Preloader
// }
export default Preloader
// })()