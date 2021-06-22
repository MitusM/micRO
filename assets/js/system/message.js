/**
 * [[Description]] show, info, success, warning, error
 * @method message
 * @param {Object} action 	[[Description]] show, info, success, warning, error
 * @param {Object} settings [[Description]]
 * @param {Object} fn     	[[Description]]
 * @return {Object}  [[Description]]
 */
// TODO: Составить описание функции и добавить какие есть настройки вынести отдельно css 📌
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
    for (const key in settings) {
      if (settings.hasOwnProperty(key)) {
        obj[key] = settings[key];
      }
    }
    iziToast[action](obj)
  }, 'izitoast')
}