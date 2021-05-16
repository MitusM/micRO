(self["webpackChunkmicro"] = self["webpackChunkmicro"] || []).push([["login"],{

/***/ "./microservices/auth/assets/js/index.js":
/*!***********************************************!*\
  !*** ./microservices/auth/assets/js/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/auth/assets/scss/index.scss");
/*global _$, config, lang */

/**
 * Зависимости: _$.Form, _$.message
 */





(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.addEventListener('DOMContentLoaded', function () {
            var loginForm = new _$.Form('login', true);
            var elementForm = loginForm._element;
            elementForm.button.addEventListener('click', function (e) {
              e.preventDefault();
              loginForm.isVal().then(function (val) {
                var validate = loginForm.validateForm(val, config);

                if (validate) {
                  _$.fetch('/auth/login', {
                    method: 'post',
                    body: val
                  }).then(function (done) {
                    // console.log('-----------------------------------------')
                    // console.log('⚡ done', done)
                    // console.log('-----------------------------------------')
                    if (done.status === 403) {
                      _$.message('error', {
                        title: lang.message.title,
                        message: lang.message.success,
                        position: 'topCenter'
                      });
                    } else if (done.status === 200) {
                      document.location.reload(true);
                    }
                  })["catch"](function (err) {
                    console.log('::: fetch[ err ]:::', err);
                  });
                }
              })["catch"](function (err) {
                console.log('::: isVal[ err ]:::', err);
              });
            });
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ }),

/***/ "./microservices/auth/assets/scss/index.scss":
/*!***************************************************!*\
  !*** ./microservices/auth/assets/scss/index.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./microservices/auth/assets/js/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);