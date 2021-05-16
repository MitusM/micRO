(self["webpackChunkmicro"] = self["webpackChunkmicro"] || []).push([["home"],{

/***/ "./microservices/home/assets/js/index.js":
/*!***********************************************!*\
  !*** ./microservices/home/assets/js/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _sortable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sortable */ "./microservices/home/assets/js/sortable.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/home/assets/scss/index.scss");
/*global _$, secret */

/**
 * Зависимости:
 */







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var delegate = __webpack_require__(/*! delegate */ "./node_modules/delegate/src/delegate.js");




(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.addEventListener('DOMContentLoaded', function () {
            /** Находим все блоки. Превратив NodeList в Array*/
            var block = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.default)(document.querySelectorAll('.block'));
            /**  Превратим NodeList в Array */
            // let arrBlock = Array.prototype.slice.call(block)


            delegate('#content', '.fa-eye', 'click', function (e) {
              /** Элемент на котором наступило событие */
              var el = e.delegateTarget;
              /** Родительский элемент */

              var parent = el.parentElement;

              var data = _objectSpread({}, parent.dataset);

              var view = parent.querySelector('.view');
              var html = view.innerHTML;
              var menuTitle = parent.querySelector('.title-menu-block');
              menuTitle.classList.toggle('view-menu-display');
              var classList = view.classList;

              if (html === '') {
                _$.fetch('/widget/view-widget', {
                  method: 'post',
                  body: _objectSpread({
                    "token": secret
                  }, data)
                }).then(function (done) {
                  if (done.status === 200) {
                    view.innerHTML = done.response.html;
                    classList.toggle('hide');
                  }
                });
              } else {
                classList.toggle('hide');
              }
            }, false);
            /**  */

            (0,_sortable__WEBPACK_IMPORTED_MODULE_4__.default)(block);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ }),

/***/ "./microservices/home/assets/js/sortable.js":
/*!**************************************************!*\
  !*** ./microservices/home/assets/js/sortable.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortableBlock)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*global _$, secret */

function SortableBlock(block) {
  var widget = document.getElementById('widget');
  var length = block.length;
  /** Настройки */

  var group = {
    name: 'shared',
    pull: 'clone' // To clone: set pull to 'clone'

  };
  /** Блок виджетов */

  new sortablejs__WEBPACK_IMPORTED_MODULE_2__.default(widget, {
    group: group,
    onEnd: function onEnd(evt) {
      /** Елемент на который перетащили */
      var to = evt.to;
      /** имя блока в который добавляем виджет */

      var block = to.dataset.block;
      var widget = to.querySelectorAll('.element');
      var arr = Array.prototype.slice.call(widget);

      var obj = (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)({}, block, []);

      var i = 0;

      for (i; arr.length > i; i++) {
        var dataSet = _objectSpread({}, arr[i].dataset);

        obj[block].push(dataSet);
      }

      template();
    }
  });
  /**
  * Обходим блоки
  * @returns {object}
  */

  var update = function update() {
    var obj = {};

    for (var i = 0; i < length; i++) {
      var element = block[i];
      var elementBlock = element.dataset.block;
      /** HTMLCollection в Array */

      var children = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(element.children);
      /** массив в который добавляем элементы блока */


      var arr = [];
      /** объект в котором */

      for (var _i = 0; _i < children.length; _i++) {
        /** DOMStringMap в Object */
        var _block = _objectSpread({}, children[_i].dataset);

        arr.push(_block);
      }

      obj[elementBlock] = arr;
    }

    return obj;
  };
  /**  */


  var ajax = function ajax(body) {
    return _$.fetch('/home/structure-home-page', {
      method: 'post',
      body: body
    }).then(function (done) {
      return done;
    });
  };
  /**  */


  var template = function template() {
    var body = {
      home: update(),
      token: secret
    };
    ajax(body).then(function (done) {
      // console.log(':::[ done ]:::', done)
      return done;
    });
  };
  /** перетаскиваем элемент между Блоками */


  var onEnd = function onEnd(
  /**Event*/
  evt) {
    /** Элемент который перетащили */
    var itemEl = evt.item; // dragged HTMLElement

    /** Елемент на который перетащили */

    var to = evt.to; // target list

    /** Элемент в старом списке */

    var clone = evt.clone;
    /** Удаляем элемент в старом списке */

    clone.remove();

    if (to.id === "widget") {
      itemEl.remove();
    }

    template();
  };
  /** Блоки, в которые перетаскиваем элемент, или между ними */


  for (var i = 0; i < length; i++) {
    var element = block[i];
    new sortablejs__WEBPACK_IMPORTED_MODULE_2__.default(element, {
      group: group,
      onEnd: onEnd
    });
  }

  return;
}

/***/ }),

/***/ "./microservices/home/assets/scss/index.scss":
/*!***************************************************!*\
  !*** ./microservices/home/assets/scss/index.scss ***!
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
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./microservices/home/assets/js/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);