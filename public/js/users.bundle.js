(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users"],{

/***/ "./microservices/users/assets/js/index.js":
/*!************************************************!*\
  !*** ./microservices/users/assets/js/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/users/assets/scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* global Infinite, _$ */




(async () => {
  /**
   * DOMContentLoaded -
   */
  document.addEventListener('DOMContentLoaded', () => {
    // 
    let page = document.querySelector('.page'); // Находим  таблицу со списком пользователей

    let table = document.getElementById('table'); // Находим тело таблицы со списком пользователей

    let tableBody = document.getElementById('table-body'); // ссылка меню добавить пользователя

    let userAnkor = document.getElementById('users-create'); // 

    new Infinite().scroll({
      url: '/users/',
      method: 'post'
    }, function (data) {
      let obj = JSON.parse(data);
      page.innerHTML = obj.page;
    });
    /**
     * Вешаем обработчик на всю таблицу с целью делегирования события
     */

    tableBody.addEventListener('click', e => {
      // console.log('e.target', e.target)
      let target = e.target;

      let dataAttr = _$.data(target);

      console.log('dataAttr', dataAttr);
    });
    /** 
     * Добавление нового пользователя 
     */

    userAnkor.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation(); // console.log(':::[ e ]:::', e)
      // console.log(':::[ table ]:::', table)
      // let tableClassList = table.classList

      let slideLeft = 'zoomOutLeft';

      if (table.classList.contains(slideLeft)) {
        table.classList.remove(slideLeft);
        table.classList.add('zoomIn');
      } else {
        table.classList.add(slideLeft);
      }
    });
  });
})();

/***/ }),

/***/ "./microservices/users/assets/scss/index.scss":
/*!****************************************************!*\
  !*** ./microservices/users/assets/scss/index.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/users/assets/scss/index.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/users/assets/scss/index.scss":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/users/assets/scss/index.scss ***!
  \***************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./microservices/users/assets/js/index.js","runtime","vendors"]]]);