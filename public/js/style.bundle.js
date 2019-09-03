(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["style"],{

/***/ "./assets/js/Infinite-scroll/src/extend.js":
/*!*************************************************!*\
  !*** ./assets/js/Infinite-scroll/src/extend.js ***!
  \*************************************************/
/*! exports provided: extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
let extend = function () {
  let merged = {};
  Array.prototype.forEach.call(arguments, function (obj) {
    for (let key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (!obj.hasOwnProperty(key)) return;
      merged[key] = obj[key];
    }
  });
  return merged;
};



/***/ }),

/***/ "./assets/js/Infinite-scroll/src/index.js":
/*!************************************************!*\
  !*** ./assets/js/Infinite-scroll/src/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend */ "./assets/js/Infinite-scroll/src/extend.js");
/* global define, Sizes, _$ */


(function () {
  'use strict';

  let defSettings = {
    container: 'infinite-container',
    more: 'infinite-more-link',
    loadingClass: 'infinite-loading',
    dataLoader: 'ball-auto',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  };

  let initArguments = options => {
    return {
      options: typeof options === 'function' || options === undefined ? defSettings : Object(_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(defSettings, options)
    };
  };

  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function json(response) {
    return response.json();
  }

  function storage(json) {
    _$.localStorage.setItem('userPage', json);
  }

  class Infinite {
    /**
     *Creates an instance of Infinite.
     * @memberof Infinite
     */
    constructor(settings) {
      this._size = Sizes();
      this._settings = settings ? initArguments(settings).options : null;
      this._container = settings ? settings.container : document.querySelector('.infinite-container');
      this._pageHeight = this._size.size.height;
    }

    add(data) {
      storage(data.paginate);

      this._container.insertAdjacentHTML('beforeEnd', data.html);

      this._pageHeight = Sizes().size.height;
    }

    scroll(settings, fn) {
      let init = typeof settings !== 'function' ? initArguments(settings, fn) : initArguments(this._settings, fn);
      let options = init.options;
      let heightView = this._size.view.height;
      let bool = false;

      let preloader = _$.Preloader(options);

      let Bottom = () => {
        let startPosition = window.pageYOffset;
        let positionViewBottom = startPosition + heightView;

        if (positionViewBottom === this._pageHeight) {
          let body = JSON.parse(_$.localStorage.getItem('userPage'));
          let next = body.next;
          preloader.insert().show();
          fetch(init.options.url, {
            method: options.method,
            headers: options.headers,
            body: JSON.stringify({
              "page": next
            })
          }).then(status).then(json).then(data => {
            preloader.hide();

            if (next > 0 && next <= body.pages) {
              this.add(data);
              if (fn) fn(data.paginate);
            } else if (body.page === body.pages) {
              // данные все отображены
              if (!bool) {
                bool = true;

                _$.message('info', {
                  title: 'Список пользователей',
                  message: 'Данных больше нет',
                  position: 'topCenter'
                });
              }
            }
          }).catch(function (error) {
            console.log('Request failed', error);

            _$.message('error', {
              title: 'Ошибка',
              message: error,
              position: 'topCenter'
            });
          });
        }
      };

      document.addEventListener('scroll', Bottom);
    }

    destroy() {}

  }

  window.Infinite = Infinite;

  if (typeof define === 'function' && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
    define('Infinite', [], function () {
      return Infinite;
    });
  } else if (typeof exports !== 'undefined' && !exports.nodeType) {
    if ( true && !module.nodeType && module.exports) {
      // eslint-disable-next-line no-global-assign
      exports = module.exports = Infinite;
    }

    exports.default = Infinite;
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./assets/js/index.js":
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ "./assets/scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _package__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./package */ "./assets/js/package.js");
/* harmony import */ var _package__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_package__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _smooth_scroll_js_src_sizes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./smooth-scroll-js/src/sizes */ "./assets/js/smooth-scroll-js/src/sizes.js");
/* harmony import */ var _smooth_scroll_js_src_sizes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_smooth_scroll_js_src_sizes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./smooth-scroll-js/src/index */ "./assets/js/smooth-scroll-js/src/index.js");
/* harmony import */ var _smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Infinite_scroll_src_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Infinite-scroll/src/index */ "./assets/js/Infinite-scroll/src/index.js");
/* harmony import */ var cart_localstorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cart-localstorage */ "./assets/node_modules/cart-localstorage/index.js");
/* harmony import */ var localStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! localStorage */ "./assets/node_modules/localStorage/lib/localStorage.js");
/* harmony import */ var localStorage__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(localStorage__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _system_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./system/index */ "./assets/js/system/index.js");
/* harmony import */ var _system_message__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./system/message */ "./assets/js/system/message.js");
/* harmony import */ var _system_preloader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./system/preloader */ "./assets/js/system/preloader.js");
/* harmony import */ var _system_preloader__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_system_preloader__WEBPACK_IMPORTED_MODULE_9__);
/* eslint-disable no-global-assign */

 // 
// eslint-disable-next-line no-unused-vars

 // Size - 

 // Scroll -
// eslint-disable-next-line no-unused-vars

 //

 // 

 // localStorage -

 //

 // Message -

 // Preloader - 
// eslint-disable-next-line no-unused-vars

(function (window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    let hamburger = document.getElementById('toggle');
    let body = document.querySelector('body');
    hamburger.addEventListener('click', e => {
      e.preventDefault();
      body.classList.toggle('sidebar-collapse');
    });
    new _smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_3___default.a().all({
      speed: 1500,
      easing: 'liner',
      header: '.navbar-fixed',
      bottom: 0
    });
  });
  _package__WEBPACK_IMPORTED_MODULE_1___default.a.localStorage = localStorage__WEBPACK_IMPORTED_MODULE_6___default.a;
  _package__WEBPACK_IMPORTED_MODULE_1___default.a.cartStorage = {
    list: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["list"],
    get: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["get"],
    add: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["add"],
    remove: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["remove"],
    update: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["update"],
    total: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["total"],
    destroy: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["destroy"],
    exists: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["exists"],
    subtotal: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["subtotal"],
    onChange: cart_localstorage__WEBPACK_IMPORTED_MODULE_5__["onChange"]
  };
  _package__WEBPACK_IMPORTED_MODULE_1___default.a.data = _system_index__WEBPACK_IMPORTED_MODULE_7__["data"];
  _package__WEBPACK_IMPORTED_MODULE_1___default.a.message = _system_message__WEBPACK_IMPORTED_MODULE_8__["message"];
  _package__WEBPACK_IMPORTED_MODULE_1___default.a.Preloader = _system_preloader__WEBPACK_IMPORTED_MODULE_9___default.a;
})(window);

/***/ }),

/***/ "./assets/js/package.js":
/*!******************************!*\
  !*** ./assets/js/package.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable no-global-assign */

/* global define, _$ */
(function (window) {
  if (window.Package) {
    _$ = {};
  } else {
    window._$ = {};
  } // Check for jQuery
  // _$.jQueryLoaded = !!window.jQuery

})(window); // AMD


if (true) {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return _$;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // Common JS
} else {}

/***/ }),

/***/ "./assets/js/smooth-scroll-js/src/index.js":
/*!*************************************************!*\
  !*** ./assets/js/smooth-scroll-js/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable no-prototype-builtins */

/* eslint-disable no-undef */

/* eslint-disable no-console */
(function () {
  'use strict';

  let fixedHeader;
  let headerHeight;
  let animationInterval;
  let siblingNavigation = null;
  let parentElement = null;
  let doc = document;
  let win = window;
  let body = doc.body;
  let docElement = doc.documentElement;
  /** Default settings */

  let settings = {
    // Selectors
    header: null,
    topOnEmptyHash: true,
    // Speed & Duration
    speed: 1000,
    speedAsDuration: false,
    durationMax: null,
    durationMin: null,
    clip: true,
    offset: 0,
    // Easing
    easing: 'easeInOutCubic',
    customEasing: false,
    // History
    updateURL: false,
    // true
    popstate: true,
    // Custom Events
    emitEvents: true,
    tracking: true,
    // отслеживаем попадание в область просмотра один раз
    // up and down buttons
    buttonClass: 'button-navigation',
    top: 100,
    bottom: 100,
    // navigation
    navigation: 'bottom'
  };

  let qerySelector = name => doc.querySelector(name);

  let floor = Math.floor;
  let max = Math.max;
  let min = Math.min;
  let ArrayProtoSlice = Array.prototype.slice;

  let $$ = selector => {
    return ArrayProtoSlice.call(!selector ? [] : doc.querySelectorAll(selector));
  };

  let isNumber = el => Object.prototype.toString.call(el) === '[object Number]';

  let isArray = function (obj) {
    return Array.isArray(obj);
  };

  let requestAnimationFrameShim = callback => {
    win.setTimeout(callback, 1000 / 60);
  };

  let requestAnimationFrame = function (callback) {
    var requestFn = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || requestAnimationFrameShim;
    requestFn.call(win, callback);
  };

  let extend = function () {
    let merged = {};
    Array.prototype.forEach.call(arguments, function (obj) {
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) return;
        merged[key] = obj[key];
      }
    });
    return merged;
  };

  let initArguments = (options, fn) => {
    return {
      options: typeof options === 'function' || options === undefined ? settings : extend(settings, options),
      fn: typeof options === 'function' ? options : fn
    };
  };

  let insert = (element, html) => element.insertAdjacentElement('afterBegin', html);

  let eventScroll = fn => doc.addEventListener('scroll', fn);

  var escapeCharacters = function (id) {
    if (id.charAt(0) === '#') {
      id = id.substr(1);
    }

    var string = String(id);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);

    while (++index < length) {
      codeUnit = string.charCodeAt(index);

      if (codeUnit === 0x0000) {
        throw new InvalidCharacterError('Invalid character: the input contains U+0000.');
      }

      if (codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit === 0x007F || index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 || index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002D) {
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      }

      if (codeUnit >= 0x0080 || codeUnit === 0x002D || codeUnit === 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
        result += string.charAt(index);
        continue;
      }

      result += '\\' + string.charAt(index);
    }

    return '#' + result;
  };

  let size = new Sizes();
  let viewportHeight = size.view.height;
  let heightBody = size.size.height;
  console.log('heightBody', heightBody);
  let positionTopClient = heightBody - viewportHeight;

  let getHeaderHeight = function (header) {
    return !header ? 0 : Sizes().getHeight(header) + header.offsetTop;
  };

  let getEasing = function (settings, time) {
    let pattern; // Default Easing Patterns

    if (settings.easing === 'easeInQuad') pattern = time * time;
    if (settings.easing === 'easeOutQuad') pattern = time * (2 - time);
    if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
    if (settings.easing === 'easeInCubic') pattern = time * time * time;
    if (settings.easing === 'easeOutCubic') pattern = --time * time * time + 1;
    if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
    if (settings.easing === 'easeInQuart') pattern = time * time * time * time;
    if (settings.easing === 'easeOutQuart') pattern = 1 - --time * time * time * time;
    if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * --time * time * time * time;
    if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time;
    if (settings.easing === 'easeOutQuint') pattern = 1 + --time * time * time * time * time;
    if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * --time * time * time * time * time;
    if (settings.customEasing) pattern = settings.customEasing(time);
    return pattern || time;
  };

  var updateURL = function (anchor, isNum, options) {
    if (isNum) return;
    if (!history.pushState || !options.updateURL) return;
    history.pushState({
      Scroll: JSON.stringify(options),
      anchor: anchor.id
    }, document.title, anchor === document.documentElement ? '#top' : '#' + anchor.id);
  };

  var getEndLocation = function (anchor, headerHeight, offset, clip) {
    var location = 0;

    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }

    location = max(location - headerHeight - offset, 0);

    if (clip) {
      location = min(location, heightBody - win.innerHeight);
    }

    return location;
  };

  let emitEvent = function (type, options, anchor, toggle) {
    if (!options.emitEvents || typeof win.CustomEvent !== 'function') return;
    let event = new CustomEvent(type, {
      bubbles: true,
      detail: {
        anchor: anchor,
        toggle: toggle
      }
    });
    document.dispatchEvent(event);
  };

  let cancelScroll = function (noEvent) {
    cancelAnimationFrame(animationInterval);
    animationInterval = null;
    if (noEvent) return;
    emitEvent('scrollCancel', settings);
  };

  let adjustFocus = function (anchor, endLocation, isNum) {
    if (anchor === 0) {
      body.focus();
    }

    if (isNum) return;
    anchor.focus();

    if (doc.activeElement !== anchor) {
      anchor.setAttribute('tabindex', '-1');
      anchor.focus();
      anchor.style.outline = 'none';
    }

    win.scrollTo(0, endLocation);
  };

  let getSpeed = function (distance, settings) {
    let speed = settings.speedAsDuration ? settings.speed : Math.abs(distance / 1000 * settings.speed);
    if (settings.durationMax && speed > settings.durationMax) return settings.durationMax;
    if (settings.durationMin && speed < settings.durationMin) return settings.durationMin;
    return speed;
  };

  let cancelPosition = function (startPosition, endLocation, fn) {
    var currentPosition = win.pageYOffset;

    if (currentPosition === endLocation || (startPosition < endLocation && viewportHeight + currentPosition) >= heightBody) {
      if (fn) fn(currentPosition);
      return true;
    }

    return false;
  };

  let animateScroll = function (anchor, toggle, options, fn) {
    let init = initArguments(options, fn);
    let _settings = init.options;
    let isNum = isNumber(anchor);
    let anchorElem = isNum || !anchor.tagName ? null : anchor;
    if (!isNum && !anchorElem) return;
    let startPosition = win.pageYOffset;

    if (_settings.header && !fixedHeader) {
      fixedHeader = qerySelector(_settings.header);
    }

    headerHeight = getHeaderHeight(fixedHeader);
    let endPosition = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt(typeof _settings.offset === 'function' ? _settings.offset(anchor, toggle) : _settings.offset, 10), _settings.clip);
    console.log('__endPosition', endPosition);
    let distance = endPosition - startPosition;
    let speed = getSpeed(distance, _settings);
    let timeLapsed = 0;
    let start, percent, position;

    var stopAnimateScroll = function (endLocation) {
      return cancelPosition(startPosition, endLocation, function () {
        cancelScroll(true);
        adjustFocus(anchor, endLocation, isNum);
        emitEvent('scrollStop', _settings, anchor, toggle);
        start = null;
        animationInterval = null;
      });
    };

    var loopAnimateScroll = function (timestamp) {
      if (!start) start = timestamp;
      timeLapsed += timestamp - start;
      percent = timeLapsed / parseInt(speed, 10);
      percent = percent > 1 ? 1 : percent;
      position = startPosition + distance * getEasing(_settings, percent);
      win.scrollTo(0, floor(position));

      if (!stopAnimateScroll(endPosition)) {
        animationInterval = requestAnimationFrame(loopAnimateScroll);
        start = timestamp;
      } else {
        if (fn) init.fn(anchorElem, endPosition);
      }
    };

    if (win.pageYOffset === 0) {
      win.scrollTo(0, 0);
    }

    updateURL(anchor, isNum, _settings);
    emitEvent('scrollStart', _settings, anchor, toggle);
    cancelScroll(true);
    requestAnimationFrame(loopAnimateScroll);
  };

  let createElement = ({
    element,
    className,
    id
  } = {}) => {
    let el = doc.createElement(element);
    if (className) el.className = className;
    if (id) el.id = id;
    return el;
  };

  let insertButton = (el, name) => {
    let div = createElement({
      element: 'div',
      // TODO: вынести в конфиг
      className: 'button-up-down',
      id: name
    });
    insert(el, div);
    return div;
  };

  let handlerButton = (position, el, settings, fn) => {
    let init = initArguments(settings, fn);

    let clickFunc = () => {
      animateScroll(position, docElement, init.options, init.fn);
    };

    el.addEventListener('click', clickFunc);
  };

  function siblings(element) {
    let ele = element.parentNode;
    let children = ArrayProtoSlice.call(ele.children);
    return children.filter(child => {
      return child !== element;
    });
  }

  let elementRemoveClass = (arr, nameClass) => {
    nameClass = nameClass || 'active';
    return arr.map(el => {
      el.classList.remove(nameClass);
      return el;
    });
  };

  function siblingsParent(element, selector) {
    let toggle = parentElement = parentElement || element.closest(selector);
    let sibling = siblingNavigation = siblingNavigation || siblings(element);
    let last = sibling.slice(-1).pop();
    let sibl = last ? sibling : ArrayProtoSlice.call(toggle.children);
    let parent = last ? element : element.parentNode;
    return {
      sibl,
      parent
    };
  }

  function navigationMenu(element, selector) {
    let {
      sibl,
      parent
    } = siblingsParent(element, selector);
    let elemFilter = sibl.filter(el => el !== parent);
    parent.classList.add('active');
    elementRemoveClass(elemFilter);
    return parent;
  } // function refreh() {
  //   // heightBody = Sizes().size.height
  //   size = Sizes()
  //   viewportHeight = size.view.height
  //   heightBody = size.size.height
  //   console.log('heightBody', heightBody)
  //   positionTopClient = heightBody - viewportHeight
  // }


  let scrollViewButton = (el, top, bottom) => {
    let display;
    let positionTop = docElement.scrollTop;
    let positionBottom = positionTopClient - bottom;
    display = el.id === 'top' ? positionTop < top ? 'none' : 'block' : positionBottom < positionTop ? 'none' : 'block';
    el.setAttribute('style', `display:${display}`); // refreh()
  };

  let navigationScroll = (arr, selector, settings, fn) => {
    let anchor = arr.querySelectorAll('a');
    let init = initArguments(settings, fn);
    let options = init.options;
    let currentActive = null;
    let parentAnkor = null;
    let top = null;
    let bottom = null;

    if (options.header && !fixedHeader) {
      fixedHeader = qerySelector(options.header);
    }

    headerHeight = getHeaderHeight(fixedHeader);
    let positions = ArrayProtoSlice.call(anchor).filter(element => {
      return element.hash !== '';
    }).map(elem => {
      let block = qerySelector(elem.hash);
      let rect = block.getBoundingClientRect();
      return {
        top: floor(rect.top),
        bottom: floor(rect.bottom),
        a: elem,
        block: block
      };
    });
    positions = positions.reverse();

    let ScrollViewNavigation = () => {
      let currentPosition = win.pageYOffset;

      for (var i = 0; i < positions.length; i++) {
        let currentElement = positions[i];
        let viewportTop = currentPosition + headerHeight;
        let viewportBottom = viewportHeight + currentPosition;
        let currentPositonView = options.navigation === 'top' && positionTopClient >= currentElement.top ? viewportTop : viewportBottom;

        if ((currentPosition < currentElement.top && currentPositonView) >= currentElement.top) {
          if (currentActive !== i) {
            currentActive = i;
            top = null;
            bottom = null;
            parentAnkor = navigationMenu(currentElement.a, selector);
            if (init.fn) init.fn(bottom, currentElement.a);
          }

          break;
        }

        if ((currentPosition < currentElement.bottom && viewportTop) >= currentElement.bottom) {
          if (bottom !== i) {
            parentAnkor.classList.remove('active');
            bottom = i;
            currentActive = null;
          }

          break;
        }

        if (currentActive === i && viewportBottom <= currentElement.top) {
          if (top !== i) {
            parentAnkor.classList.remove('active');
            top = i;
            currentActive = null;
          }
        }
      }
    };

    ScrollViewNavigation();
    eventScroll(ScrollViewNavigation);
  };
  /*
   * @classdesc [[Description]]
   *
   *
   */


  class Scroll {
    /**
     *Creates an instance of Scroll.
     * @memberof Scroll
     */
    constructor() {
      this._button = createElement({
        element: 'div',
        className: settings.buttonClass
      });
      this._height = heightBody;
    }
    /**
     * Показывает текущюю позицию на экране
     * Gets the current scroll position of the scroll container.
     * @returns {number}
     */


    get scrollPosition() {
      return body.scrollTop || docElement.scrollTop;
    }
    /**
     * Scrolls the element until it's scroll properties match the coordinates provided.
     * @param {Number} y - The pixel along the vertical axis of the element that you want displayed in the upper left.
     * @param {Object} [settings] - Scroll options
     * @param {Number} [settings.duration]- The amount of time for the animation
     * @param {string} [settings.easing] - The easing function to use
     * @return {Promise}
     */


    to(y, settings, fn) {
      animateScroll(y, docElement, settings, fn);
      return this;
    }
    /**
     * Scroll to an element.
     * @param {HTMLElement} el - The element to scroll to.
     * @param {Object} [settings] - The scroll options
     */


    toElement(el, settings, fn) {
      el = qerySelector(el);
      animateScroll(el, docElement, settings, fn);
      return this;
    }
    /**
     * Прокрутка страницы в верх (в начало)
     * @param   {object} settings The scroll options
     * @returns this
     */


    top(settings, fn) {
      animateScroll(0, docElement, settings, fn);
      return this;
    }
    /**
     * Прокрутка страницы в низ (конец)
     * @param   {object}   settings The scroll options
     * @returns {[[Type]]} [[Description]]
     */


    bottom(settings, fn) {
      animateScroll(this._height, docElement, settings, fn);
      return this;
    }
    /**
     * Кнопка прокрутки страницы в верх
     * @param   {object}   settings The scroll options
     * @param   {function} fn       Функция обратного вызова callback
     * @returns {[[Type]]} [[Description]]
     */


    up(settings, fn) {
      let div = insertButton(body, 'top');
      let init = initArguments(settings, fn);
      scrollViewButton(div, init.top, init.bottom);
      eventScroll(scrollViewButton.bind(this, div, init.top, init.bottom));
      handlerButton(0, div, init.options, init.fn);
      return this;
    }
    /**
     * Кнопка прокрутки страницы в низ
     * @param   {object}   option The scroll options
     * @param   {function} fn     Функция обратного вызова callback
     * @returns {[[Type]]} [[Description]]
     */


    down(settings, fn) {
      let div = insertButton(body, 'bottom');
      let init = initArguments(settings, fn);
      scrollViewButton(div, init.top, init.bottom);
      eventScroll(scrollViewButton.bind(this, div, init.top, init.bottom));
      handlerButton(this._height, div, init.options, init.fn);
      return this;
    }
    /**
     * Установка кнопок прокритки страницы в верх и вниз
     * @param {object}   settings The scroll options
     * @param {function} fn       Функция обратного вызова callback
     */


    all(settings, fn) {
      insert(body, this._button);
      let init = initArguments(settings, fn);
      let divTop = insertButton(this._button, 'top');
      let divBottom = insertButton(this._button, 'bottom');
      let initTop = init.options.top;
      let initBottom = init.options.bottom;
      scrollViewButton(divBottom, initTop, initBottom);

      let displayButton = () => {
        scrollViewButton(divTop, initTop, initBottom);
        scrollViewButton(divBottom, initTop, initBottom);
      };

      let clickHahdler = e => {
        this.refreh();
        let element = e.target;
        let id = element.id;
        this[id](settings, fn);
      };

      scrollViewButton(divTop, initTop, initBottom);

      this._button.addEventListener('click', clickHahdler, false);

      eventScroll(displayButton); // this.refreh()

      return this;
    }
    /**
     * Перерасчёт высоты страницы
     */


    refreh() {
      // heightBody = Sizes().size.height
      size = Sizes();
      viewportHeight = size.view.height;
      heightBody = size.size.height;
      this._height = heightBody;
      positionTopClient = heightBody - viewportHeight;
    }
    /**
     * По мере прокрутки страницы для выбранных элементов происходит срабатывание функции обратного вызова
     * @param   {object}   selector The scroll options
     * @param   {function} fn       Функция обратного вызова callback
     * @returns {[[Type]]} [[Description]]
     */


    view(selector, settings, fn) {
      let init = initArguments(settings, fn);
      let arr = isArray(selector) ? selector : $$(selector);
      let positions = arr.map(elem => {
        let rect = elem.getBoundingClientRect();
        return {
          top: floor(rect.top),
          bottom: floor(rect.bottom),
          elem: elem
        };
      });

      let processScroll = () => {
        let currentPosition = win.pageYOffset;
        let length = positions.length;

        if (length > 0) {
          for (let i = 0; i < positions.length; i++) {
            let currentElement = positions[i];
            let viewportBottom = viewportHeight + currentPosition;

            if ((currentPosition < currentElement.top && viewportBottom) >= currentElement.top) {
              if (init.fn) init.fn(currentElement.elem, positions);
              positions.shift(i);
            }
          }
        } else if (length === 0) {
          doc.removeEventListener('scroll', processScroll);
        }
      };

      processScroll();
      eventScroll(processScroll);
      return this;
    }
    /**
     * Навигационое меню. При клике на пункт меню происходит плавная прокрутка к элементу указанному в анкоре. По мере прокрутки страницы в верх, или в низ, элемент достигший верха просматриваемой области, или пересёкший нижнюю границу просматриваемой области, в зависимости от настроек, происходит добавление класса к ссылке которая указывает на данный элемент, а также роисходит срабатывание функции обратного вызова, в которую будет передан блок и анкор, на котором произошло событие.
     * @param   {string}   selector class или id меню, для организации новигации по сайту
     * @param   {object}   settings The scroll options
     * @param   {function} fn       Функция обратного вызова callback
     * @returns {[[Type]]} [[Description]]
     */


    navigation(selector, settings, fn) {
      const elementArray = $$(selector);

      let clickHandler = e => {
        let element = e.target;

        if (/#/.test(element.href)) {
          e.preventDefault();
          let hash = escapeCharacters(element.hash);
          let anchor = hash === '#' ? docElement : qerySelector(hash);
          animateScroll(anchor, element, settings, fn);
          navigationMenu(element, selector);
        }
      };

      for (let i = 0; i < elementArray.length; i++) {
        elementArray[i].addEventListener('click', clickHandler, false);
        navigationScroll(elementArray[i], selector, settings, fn);
      }

      return this;
    }

  }

  window.Scroll = Scroll;

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Scroll;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "./assets/js/smooth-scroll-js/src/sizes.js":
/*!*************************************************!*\
  !*** ./assets/js/smooth-scroll-js/src/sizes.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable no-undef */
// import 'css-loading'
(function () {
  let docElement = document.documentElement;
  let body = document.body;
  let max = Math.max;

  function Sizes() {
    if (!(this instanceof Sizes)) {
      return new Sizes();
    }

    this.view = this.getViewportAndElementSizes().view;
    this.size = this.getViewportAndElementSizes().size;
  }

  Sizes.prototype = {
    isRootContainer: function (el) {
      return el === docElement || el === body;
    },
    getHeight: function (el) {
      return max(el.scrollHeight, el.clientHeight, el.offsetHeight);
    },
    getWidth: function (el) {
      return max(el.scrollWidth, el.clientWidth, el.offsetWidth);
    },
    getSize: function (el) {
      return {
        width: this.getWidth(el),
        height: this.getHeight(el)
      };
    },
    getViewportAndElementSizes: function (el = body) {
      var isRoot = this.isRootContainer(el);
      return {
        view: {
          width: isRoot ? Math.min(window.innerWidth, docElement.clientWidth) : el.clientWidth,
          height: isRoot ? window.innerHeight : el.clientHeight
        },
        size: isRoot ? {
          width: max(this.getWidth(body), this.getWidth(docElement)),
          height: max(this.getHeight(body), this.getHeight(docElement))
        } : this.getSize(el)
      };
    },
    destroy: function () {}
  };
  window.Sizes = Sizes;

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Sizes;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "./assets/js/system/index.js":
/*!***********************************!*\
  !*** ./assets/js/system/index.js ***!
  \***********************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
function data(e, attr, val) {
  let element = e.target || e;
  let data = !attr ? element.dataset : !val ? element.dataset[attr] : element.dataset[attr] = val;
  return data;
}



/***/ }),

/***/ "./assets/js/system/message.js":
/*!*************************************!*\
  !*** ./assets/js/system/message.js ***!
  \*************************************/
/*! exports provided: message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "message", function() { return message; });
let has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const nativeForEach = Array.prototype.forEach;
const breaker = {};

let each = (obj, iterator, context) => {
  if (obj == null) return;

  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    for (var key in obj) {
      if (has(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) return;
      }
    }
  }
};
/**
 * [[Description]] show, info, success, warning, error
 * @method message
 * @param {Object} action 	[[Description]] show, info, success, warning, error
 * @param {Object} settings [[Description]]
 * @param {Object} fn     	[[Description]]
 * @return {Object}  [[Description]]
 */
// TODO: Составить описание функциии и добавить какие есть настройки вынести отдельно css 📌


function message(action, settings, fn) {
  __webpack_require__.e(/*! require.ensure | izitoast */ "vendors").then((require => {
    let iziToast = __webpack_require__(/*! izitoast */ "./assets/node_modules/izitoast/dist/js/iziToast.js");

    let obj = {
      position: settings.position || 'topRight'
    };

    if (fn) {
      obj.onClosing = function () {
        fn();
      };
    } // position: 'center', bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter


    each(settings, (inf, key) => {
      obj[key] = inf;
    }); // settings.forEach((inf, key) => {
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

    console.log('obj', obj);
    iziToast[action](obj);
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
} // export {message}

/***/ }),

/***/ "./assets/js/system/preloader.js":
/*!***************************************!*\
  !*** ./assets/js/system/preloader.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
(async () => {
  'use strict';

  let defSettings = {
    loadingClass: 'infinite-loading',
    dataLoader: 'ball-auto'
  };

  let element = options => {
    console.log('options', options);
    let div = document.createElement('div');
    div.className = options.loadingClass;
    div.setAttribute('data-loader', options.dataLoader);
    return div;
  };

  function Preloader(options) {
    if (!(this instanceof Preloader)) {
      return new Preloader();
    }

    this._div = element(options || defSettings);
  }

  Preloader.prototype = {
    insert: function () {
      document.body.insertBefore(this._div, document.body.firstChild);
      return this;
    },
    show: function () {
      this._div.classList.remove('vizible');

      return this;
    },
    hide: function () {
      this._div.classList.add('vizible');

      return this;
    },
    toggle: function () {
      console.log('this._div', this._div);

      this._div.classList.toggle('vizible');

      return this;
    },
    destroy: function () {
      return this;
    }
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Preloader;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "./assets/scss/index.scss":
/*!********************************!*\
  !*** ./assets/scss/index.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./assets/scss/index.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./assets/scss/index.scss":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./assets/scss/index.scss ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./assets/js/index.js","runtime","vendors"]]]);