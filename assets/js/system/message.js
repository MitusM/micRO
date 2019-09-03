let has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
const nativeForEach = Array.prototype.forEach
const breaker = {}
let each = (obj, iterator, context) => {
  if (obj == null) return
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context)
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return
    }
  } else {
    for (var key in obj) {
      if (has(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) return
      }
    }
  }
}

/**
 * [[Description]] show, info, success, warning, error
 * @method message
 * @param {Object} action 	[[Description]] show, info, success, warning, error
 * @param {Object} settings [[Description]]
 * @param {Object} fn     	[[Description]]
 * @return {Object}  [[Description]]
 */
// TODO: Составить описание функциии и добавить какие есть настройки вынести отдельно css 📌
export function message(action, settings, fn) {
  require.ensure(['izitoast'], (require) => {
    let iziToast = require('izitoast')
    let obj = {
      position: settings.position || 'topRight'
    }
    if (fn) {
      obj.onClosing = function () {
        fn()
      }
    }
    // position: 'center', bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    each(settings, (inf, key) => {
      obj[key] = inf
    })
    // settings.forEach((inf, key) => {
    //   obj[key] = inf
    // })
    // for (const key in settings) {
    //   if (settings.hasOwnProperty(key)) {
    //     // const element = settings[key];
    //     // console.log('key', key)
    //     // console.log('element', element)
    //     obj[key] = settings[key];
    //   }
    // }
    console.log('obj', obj)
    iziToast[action](obj)
  }, 'izitoast')
}

// export {message}