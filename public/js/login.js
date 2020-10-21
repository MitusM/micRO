(self["webpackChunkmicro"] = self["webpackChunkmicro"] || []).push([["login"],{

/***/ "./microservices/auth/assets/js/index.js":
/*!***********************************************!*\
  !*** ./microservices/auth/assets/js/index.js ***!
  \***********************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*global _$, config, lang */

/**
 * Зависимости: _$.Form, _$.message
 */



(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = new _$.Form('login', true);
    const elementForm = loginForm._element;
    elementForm.button.addEventListener('click', e => {
      e.preventDefault();
      loginForm.isVal().then(val => {
        console.log(val);
        let validate = loginForm.validateForm(val, config);
        console.log('validate', validate);

        if (validate) {
          _$.fetch('/auth/login', {
            method: 'post',
            body: val
          }).then(done => {
            if (done.status === 403) {
              _$.message('error', {
                title: lang.message.title,
                message: lang.message.success,
                position: 'topCenter'
              });
            } else if (done.status === 200) {
              document.location.reload(true);
            }
          }).catch(err => {
            console.log('::: fetch[ err ]:::', err);
          });
        }
      }).catch(err => {
        console.log('::: isVal[ err ]:::', err);
      });
    });
  });
})();

/***/ })

},
0,[["./microservices/auth/assets/js/index.js","runtime"]]]);