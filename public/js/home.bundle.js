(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home"],{

/***/ "./microservices/home/assets/js/draggable.js":
/*!***************************************************!*\
  !*** ./microservices/home/assets/js/draggable.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultipleContainers; });
/* harmony import */ var _shopify_draggable_lib_sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/draggable/lib/sortable */ "./node_modules/@shopify/draggable/lib/sortable.js");
/* harmony import */ var _shopify_draggable_lib_sortable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shopify_draggable_lib_sortable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shopify_draggable_lib_plugins_resize_mirror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/draggable/lib/plugins/resize-mirror */ "./node_modules/@shopify/draggable/lib/plugins/resize-mirror.js");
/* harmony import */ var _shopify_draggable_lib_plugins_resize_mirror__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shopify_draggable_lib_plugins_resize_mirror__WEBPACK_IMPORTED_MODULE_1__);


const Classes = {
  draggable: 'StackedListItem--isDraggable',
  capacity: 'draggable-container-parent--capacity'
};
function MultipleContainers() {
  const containers = document.querySelectorAll('#MultipleContainers .StackedList');

  if (containers.length === 0) {
    return false;
  }

  const sortable = new _shopify_draggable_lib_sortable__WEBPACK_IMPORTED_MODULE_0___default.a(containers, {
    draggable: `.${Classes.draggable}`,
    mirror: {
      constrainDimensions: true
    },
    plugins: [_shopify_draggable_lib_plugins_resize_mirror__WEBPACK_IMPORTED_MODULE_1___default.a]
  });
  const containerTwoCapacity = 3;
  const containerTwoParent = sortable.containers[1].parentNode;
  let currentMediumChildren;
  let capacityReached;
  let lastOverContainer; // --- Draggable events --- //

  sortable.on('drag:start', evt => {
    currentMediumChildren = sortable.getDraggableElementsForContainer(sortable.containers[1]).length;
    capacityReached = currentMediumChildren === containerTwoCapacity;
    lastOverContainer = evt.sourceContainer;
    containerTwoParent.classList.toggle(Classes.capacity, capacityReached);
  });
  sortable.on('sortable:sort', evt => {
    if (!capacityReached) {
      return;
    }

    const sourceIsCapacityContainer = evt.dragEvent.sourceContainer === sortable.containers[1];

    if (!sourceIsCapacityContainer && evt.dragEvent.overContainer === sortable.containers[1]) {
      evt.cancel();
    }
  });
  sortable.on('sortable:sorted', evt => {
    if (lastOverContainer === evt.dragEvent.overContainer) {
      return;
    }

    lastOverContainer = evt.dragEvent.overContainer;
  });
  return sortable;
}

/***/ }),

/***/ "./microservices/home/assets/js/index.js":
/*!***********************************************!*\
  !*** ./microservices/home/assets/js/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draggable */ "./microservices/home/assets/js/draggable.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/home/assets/scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/*global  */


var delegate = __webpack_require__(/*! delegate */ "./microservices/home/node_modules/delegate/src/delegate.js");


/** 
 * Зависимости: 
 */



(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    /** Находим все блоки */
    let block = document.querySelectorAll('.block');
    /**  Превратим NodeList в Array */

    let arrBlock = Array.prototype.slice.call(block);
    console.log(':::[ arrBlock ]:::', arrBlock);
    delegate(document.body, '.block', 'click', function (e) {
      console.log(e.delegateTarget);
    }, false);
    let m = Object(_draggable__WEBPACK_IMPORTED_MODULE_0__["default"])();
    console.log(':::[ MultipleContainers() ]:::', m); // delegate('#widget', '.widget-element', 'dragstart', function (e) {
    //   console.log('dragstart', e.delegateTarget);
    // }, false)
    // delegate(document.body, '.block', 'dragend', function (e) {
    //   console.log(e.delegateTarget);
    // }, false);
    // new dragdrop.start((dom, api) => {
    //   // console.log(':::[ dom ]:::', dom)
    //   dom.addEventListener('drop', (event) => {
    //     console.log(api);
    //   })
    // });
  });
})();

/***/ }),

/***/ "./microservices/home/assets/scss/index.scss":
/*!***************************************************!*\
  !*** ./microservices/home/assets/scss/index.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/home/assets/scss/index.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/home/assets/scss/index.scss":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/home/assets/scss/index.scss ***!
  \**************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./microservices/home/assets/js/index.js","runtime","vendors"]]]);