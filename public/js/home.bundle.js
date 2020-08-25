(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home"],{

/***/ "./microservices/home/assets/js/index.js":
/*!***********************************************!*\
  !*** ./microservices/home/assets/js/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sortable */ "./microservices/home/assets/js/sortable.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/home/assets/scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/*global _$, secret */

/**
 * Зависимости:
 */


var delegate = __webpack_require__(/*! delegate */ "./microservices/home/node_modules/delegate/src/delegate.js");




(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    /** Находим все блоки. Превратив NodeList в Array*/
    let block = [...document.querySelectorAll('.block')];
    /**  Превратим NodeList в Array */
    // let arrBlock = Array.prototype.slice.call(block)

    delegate('#content', '.fa-eye', 'click', function (e) {
      /** Элемент на котором наступило событие */
      let el = e.delegateTarget;
      /** Родительский элемент */

      let parent = el.parentElement;
      let data = {
        /** DOMStringMap в Object */
        ...parent.dataset
      };
      let view = parent.querySelector('.view');
      let html = view.innerHTML;
      let menuTitle = parent.querySelector('.title-menu-block');
      menuTitle.classList.toggle('view-menu-display');
      let classList = view.classList;

      if (html === '') {
        _$.fetch('/widget/view-widget', {
          method: 'post',
          body: {
            "token": secret,
            ...data
          }
        }).then(done => {
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

    Object(_sortable__WEBPACK_IMPORTED_MODULE_0__["default"])(block);
  });
})();

/***/ }),

/***/ "./microservices/home/assets/js/sortable.js":
/*!**************************************************!*\
  !*** ./microservices/home/assets/js/sortable.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SortableBlock; });
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
/*global _$, secret */

function SortableBlock(block) {
  let widget = document.getElementById('widget');
  let length = block.length;
  /** Настройки */

  let group = {
    name: 'shared',
    pull: 'clone' // To clone: set pull to 'clone'

  };
  /** Блок виджетов */

  new sortablejs__WEBPACK_IMPORTED_MODULE_0__["default"](widget, {
    group: group,
    onEnd: function (evt) {
      /** Елемент на который перетащили */
      let to = evt.to;
      /** имя блока в который добавляем виджет */

      let block = to.dataset.block;
      let widget = to.querySelectorAll('.element');
      let arr = Array.prototype.slice.call(widget);
      let obj = {
        [block]: []
      };
      let i = 0;

      for (i; arr.length > i; i++) {
        let dataSet = { ...arr[i].dataset
        };
        obj[block].push(dataSet);
      }

      template();
    }
  });
  /**
  * Обходим блоки
  * @returns {object}
  */

  let update = () => {
    const obj = {};

    for (let i = 0; i < length; i++) {
      const element = block[i];
      const elementBlock = element.dataset.block;
      /** HTMLCollection в Array */

      const children = [...element.children];
      /** массив в который добавляем элементы блока */

      const arr = [];
      /** объект в котором */

      for (let i = 0; i < children.length; i++) {
        /** DOMStringMap в Object */
        let block = { ...children[i].dataset
        };
        arr.push(block);
      }

      obj[elementBlock] = arr;
    }

    return obj;
  };
  /**  */


  let ajax = function (body) {
    return _$.fetch('/home/structure-home-page', {
      method: 'post',
      body: body
    }).then(done => {
      return done;
    });
  };
  /**  */


  let template = () => {
    let body = {
      home: update(),
      token: secret
    };
    ajax(body).then(done => {
      // console.log(':::[ done ]:::', done)
      return done;
    });
  };
  /** перетаскиваем элемент между Блоками */


  let onEnd =
  /**Event*/
  evt => {
    /** Элемент который перетащили */
    var itemEl = evt.item; // dragged HTMLElement

    /** Елемент на который перетащили */

    let to = evt.to; // target list

    /** Элемент в старом списке */

    let clone = evt.clone;
    /** Удаляем элемент в старом списке */

    clone.remove();

    if (to.id === "widget") {
      itemEl.remove();
    }

    template();
  };
  /** Блоки, в которые перетаскиваем элемент, или между ними */


  for (let i = 0; i < length; i++) {
    const element = block[i];
    new sortablejs__WEBPACK_IMPORTED_MODULE_0__["default"](element, {
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

var update = api(content, options);



module.exports = content.locals || {};

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