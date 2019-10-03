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



/** 
 * Зависимости: _$.Dialog, _$.Form, _$.data
 */

(async () => {
  /**
   * DOMContentLoaded -
   */
  document.addEventListener('DOMContentLoaded', () => {
    // 
    let page = document.querySelector('.page'); // Находим  таблицу со списком пользователей

    let table = document.getElementById('table'); // Находим тело таблицы со списком пользователей

    let tableBody = document.getElementById('table-body'); // ссылка меню добавить пользователя

    let userAnkor = document.getElementById('users-create'); // диалоговое окно добавления нового пользователя -> установим обработчик на кнопку закрытия окна

    let newUserModal = new _$.Dialog('#add').initClose(); // убираем таблицу

    let tableClose = classSelector => {
      table.classList.remove(classSelector);
      table.classList.add('zoomIn');
    }; // форма добавить нового пользователя


    let newUserForm = new _$.Form('form-user__add', true); // получаем все элементы формы в виде хэш-таблицы
    // let elements = newUserForm.elements
    // Диалоговое окно добавить, редактировать пользователя

    let modal = newUserModal.element; // console.log(':::[ newUserForm ]:::', newUserForm)

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
      e.stopPropagation();
      let slideLeft = 'zoomOutLeft';

      if (table.classList.contains(slideLeft)) {
        // закрываем диалоговое окно
        tableClose(slideLeft); //

        newUserModal.close(); // 
      } else {
        // окрываем диалоговое окно
        table.classList.add(slideLeft);
        newUserModal // покажем диалоговое окно
        .header("Добавить нового пользователя") // установим заголовок модального окна
        .show(bool => {
          if (!bool) {
            tableClose(slideLeft);
          } else {
            // tableClose(slideLeft)
            newUserForm.isVal().then(val => {
              // eslint-disable-next-line no-undef
              let validate = newUserForm.validateForm(val, config);
              console.log(':::[ validate ]:::', validate);

              if (validate) {
                tableClose(slideLeft);

                _$.fetch('/users/create', {
                  method: 'post',
                  body: val
                }).then(data => {
                  console.log(':::[ data ]:::', data);
                });
              } else {
                modal.setAttribute('open', '');
                console.log(':::[ validate ]:::', validate);
              }
            }); // 
          }
        });
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