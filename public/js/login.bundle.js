(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login"],{

/***/ "./microservices/auth/assets/js/index.js":
/*!***********************************************!*\
  !*** ./microservices/auth/assets/js/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/auth/assets/scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_0__);
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
        let validate = loginForm.validateForm(val, config);

        if (validate) {
          _$.fetch('/auth/login', {
            method: 'post',
            body: val
          }).then(done => {
            if (done.status === 403) {
              console.log(':::[ done.status ]:::', done.status);

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

/***/ }),

/***/ "./microservices/auth/assets/scss/index.scss":
/*!***************************************************!*\
  !*** ./microservices/auth/assets/scss/index.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/auth/assets/scss/index.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/auth/assets/scss/index.scss":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/auth/assets/scss/index.scss ***!
  \**************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./microservices/auth/assets/js/index.js","runtime","vendors"]]]);