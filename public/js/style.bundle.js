(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["style"],{

/***/ "./assets/js/Infinite-scroll/src/index.js":
/*!************************************************!*\
  !*** ./assets/js/Infinite-scroll/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, exports, module */
(function () {
  class Infinite {
    /**
     *Creates an instance of Infinite.
     * @memberof Infinite
     */
    constructor() {}

    add() {}

    scroll() {}

    destroy() {}

  }

  window.Infinite = Infinite;

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Infinite;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "./assets/js/Waves/src/js/waves.js":
/*!*****************************************!*\
  !*** ./assets/js/Waves/src/js/waves.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Waves v0.7.6
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2018 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */
;

(function (window, factory) {
  'use strict'; // AMD. Register as an anonymous module.  Wrap in function so we have access
  // to root via `this`.

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      window.Waves = factory.call(window);
      return window.Waves;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that support module.exports, like Node.
  else {}
})(typeof global === 'object' ? global : this, function () {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);
  var toString = Object.prototype.toString;
  var isTouchAvailable = ('ontouchstart' in window); // Find exact position of element

  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function isObject(value) {
    var type = typeof value;
    return type === 'function' || type === 'object' && !!value;
  }

  function isDOMNode(obj) {
    return isObject(obj) && obj.nodeType > 0;
  }

  function getWavesElements(nodes) {
    var stringRepr = toString.call(nodes);

    if (stringRepr === '[object String]') {
      return $$(nodes);
    } else if (isObject(nodes) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
      return nodes;
    } else if (isDOMNode(nodes)) {
      return [nodes];
    }

    return [];
  }

  function offset(elem) {
    var docElem,
        win,
        box = {
      top: 0,
      left: 0
    },
        doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }

    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(styleObj) {
    var style = '';

    for (var prop in styleObj) {
      if (styleObj.hasOwnProperty(prop)) {
        style += prop + ':' + styleObj[prop] + ';';
      }
    }

    return style;
  }

  var Effect = {
    // Effect duration
    duration: 750,
    // Effect delay (check for scroll before showing effect)
    delay: 200,
    show: function (e, element, velocity) {
      // Disable right click
      if (e.button === 2) {
        return false;
      }

      element = element || this; // Create ripple

      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple waves-rippling';
      element.appendChild(ripple); // Get click coordinate and element width

      var pos = offset(element);
      var relativeY = 0;
      var relativeX = 0; // Support for touch devices

      if ('touches' in e && e.touches.length) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      } //Normal case
      else {
          relativeY = e.pageY - pos.top;
          relativeX = e.pageX - pos.left;
        } // Support for synthetic events


      relativeX = relativeX >= 0 ? relativeX : 0;
      relativeY = relativeY >= 0 ? relativeY : 0;
      var scale = 'scale(' + element.clientWidth / 100 * 3 + ')';
      var translate = 'translate(0,0)';

      if (velocity) {
        translate = 'translate(' + velocity.x + 'px, ' + velocity.y + 'px)';
      } // Attach data to element


      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-translate', translate); // Set ripple position

      var rippleStyle = {
        top: relativeY + 'px',
        left: relativeX + 'px'
      };
      ripple.classList.add('waves-notransition');
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.classList.remove('waves-notransition'); // Scale the ripple

      rippleStyle['-webkit-transform'] = scale + ' ' + translate;
      rippleStyle['-moz-transform'] = scale + ' ' + translate;
      rippleStyle['-ms-transform'] = scale + ' ' + translate;
      rippleStyle['-o-transform'] = scale + ' ' + translate;
      rippleStyle.transform = scale + ' ' + translate;
      rippleStyle.opacity = '1';
      var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
      rippleStyle['-webkit-transition-duration'] = duration + 'ms';
      rippleStyle['-moz-transition-duration'] = duration + 'ms';
      rippleStyle['-o-transition-duration'] = duration + 'ms';
      rippleStyle['transition-duration'] = duration + 'ms';
      ripple.setAttribute('style', convertStyle(rippleStyle));
    },
    hide: function (e, element) {
      element = element || this;
      var ripples = element.getElementsByClassName('waves-rippling');

      for (var i = 0, len = ripples.length; i < len; i++) {
        removeRipple(e, element, ripples[i]);
      }

      if (isTouchAvailable) {
        element.removeEventListener('touchend', Effect.hide);
        element.removeEventListener('touchcancel', Effect.hide);
      }

      element.removeEventListener('mouseup', Effect.hide);
      element.removeEventListener('mouseleave', Effect.hide);
    }
  };
  /**
   * Collection of wrapper for HTML element that only have single tag
   * like <input> and <img>
   */

  var TagWrapper = {
    // Wrap <input> tag so it can perform the effect
    input: function (element) {
      var parent = element.parentNode; // If input already have parent just pass through

      if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
        return;
      } // Put element class and style to the specified parent


      var wrapper = document.createElement('i');
      wrapper.className = element.className + ' waves-input-wrapper';
      element.className = 'waves-button-input'; // Put element as child

      parent.replaceChild(wrapper, element);
      wrapper.appendChild(element); // Apply element color and background color to wrapper

      var elementStyle = window.getComputedStyle(element, null);
      var color = elementStyle.color;
      var backgroundColor = elementStyle.backgroundColor;
      wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor);
      element.setAttribute('style', 'background-color:rgba(0,0,0,0);');
    },
    // Wrap <img> tag so it can perform the effect
    img: function (element) {
      var parent = element.parentNode; // If input already have parent just pass through

      if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
        return;
      } // Put element as child


      var wrapper = document.createElement('i');
      parent.replaceChild(wrapper, element);
      wrapper.appendChild(element);
    }
  };
  /**
   * Hide the effect and remove the ripple. Must be
   * a separate function to pass the JSLint...
   */

  function removeRipple(e, el, ripple) {
    // Check if the ripple still exist
    if (!ripple) {
      return;
    }

    ripple.classList.remove('waves-rippling');
    var relativeX = ripple.getAttribute('data-x');
    var relativeY = ripple.getAttribute('data-y');
    var scale = ripple.getAttribute('data-scale');
    var translate = ripple.getAttribute('data-translate'); // Get delay beetween mousedown and mouse leave

    var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 350 - diff;

    if (delay < 0) {
      delay = 0;
    }

    if (e.type === 'mousemove') {
      delay = 150;
    } // Fade out ripple after delay


    var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
    setTimeout(function () {
      var style = {
        top: relativeY + 'px',
        left: relativeX + 'px',
        opacity: '0',
        // Duration
        '-webkit-transition-duration': duration + 'ms',
        '-moz-transition-duration': duration + 'ms',
        '-o-transition-duration': duration + 'ms',
        'transition-duration': duration + 'ms',
        '-webkit-transform': scale + ' ' + translate,
        '-moz-transform': scale + ' ' + translate,
        '-ms-transform': scale + ' ' + translate,
        '-o-transform': scale + ' ' + translate,
        'transform': scale + ' ' + translate
      };
      ripple.setAttribute('style', convertStyle(style));
      setTimeout(function () {
        try {
          el.removeChild(ripple);
        } catch (e) {
          return false;
        }
      }, duration);
    }, delay);
  }
  /**
   * Disable mousedown event for 500ms during and after touch
   */


  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
        allow = false;
      }

      return allow;
    },
    registerEvent: function (e) {
      var eType = e.type;

      if (eType === 'touchstart') {
        TouchHandler.touches += 1; // push
      } else if (/^(touchend|touchcancel)$/.test(eType)) {
        setTimeout(function () {
          if (TouchHandler.touches) {
            TouchHandler.touches -= 1; // pop after 500ms
          }
        }, 500);
      }
    }
  };
  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */

  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentElement) {
      if (!(target instanceof SVGElement) && target.classList.contains('waves-effect')) {
        element = target;
        break;
      }

      target = target.parentElement;
    }

    return element;
  }
  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */


  function showEffect(e) {
    // Disable effect if element has "disabled" property on it
    // In some cases, the event is not triggered by the current element
    // if (e.target.getAttribute('disabled') !== null) {
    //     return;
    // }
    var element = getWavesEffectElement(e);

    if (element !== null) {
      // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
      if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
        return;
      }

      TouchHandler.registerEvent(e);

      if (e.type === 'touchstart' && Effect.delay) {
        var hidden = false;
        var timer = setTimeout(function () {
          timer = null;
          Effect.show(e, element);
        }, Effect.delay);

        var hideEffect = function (hideEvent) {
          // if touch hasn't moved, and effect not yet started: start effect now
          if (timer) {
            clearTimeout(timer);
            timer = null;
            Effect.show(e, element);
          }

          if (!hidden) {
            hidden = true;
            Effect.hide(hideEvent, element);
          }

          removeListeners();
        };

        var touchMove = function (moveEvent) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          hideEffect(moveEvent);
          removeListeners();
        };

        element.addEventListener('touchmove', touchMove, false);
        element.addEventListener('touchend', hideEffect, false);
        element.addEventListener('touchcancel', hideEffect, false);

        var removeListeners = function () {
          element.removeEventListener('touchmove', touchMove);
          element.removeEventListener('touchend', hideEffect);
          element.removeEventListener('touchcancel', hideEffect);
        };
      } else {
        Effect.show(e, element);

        if (isTouchAvailable) {
          element.addEventListener('touchend', Effect.hide, false);
          element.addEventListener('touchcancel', Effect.hide, false);
        }

        element.addEventListener('mouseup', Effect.hide, false);
        element.addEventListener('mouseleave', Effect.hide, false);
      }
    }
  }

  Waves.init = function (options) {
    var body = document.body;
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    if ('delay' in options) {
      Effect.delay = options.delay;
    }

    if (isTouchAvailable) {
      body.addEventListener('touchstart', showEffect, false);
      body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
      body.addEventListener('touchend', TouchHandler.registerEvent, false);
    }

    body.addEventListener('mousedown', showEffect, false);
  };
  /**
   * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
   * waves classes to a set of elements. Set drag to true if the ripple mouseover
   * or skimming effect should be applied to the elements.
   */


  Waves.attach = function (elements, classes) {
    elements = getWavesElements(elements);

    if (toString.call(classes) === '[object Array]') {
      classes = classes.join(' ');
    }

    classes = classes ? ' ' + classes : '';
    var element, tagName;

    for (var i = 0, len = elements.length; i < len; i++) {
      element = elements[i];
      tagName = element.tagName.toLowerCase();

      if (['input', 'img'].indexOf(tagName) !== -1) {
        TagWrapper[tagName](element);
        element = element.parentElement;
      }

      if (element.className.indexOf('waves-effect') === -1) {
        element.className += ' waves-effect' + classes;
      }
    }
  };
  /**
   * Cause a ripple to appear in an element via code.
   */


  Waves.ripple = function (elements, options) {
    elements = getWavesElements(elements);
    var elementsLen = elements.length;
    options = options || {};
    options.wait = options.wait || 0;
    options.position = options.position || null; // default = centre of element

    if (elementsLen) {
      var element,
          pos,
          off,
          centre = {},
          i = 0;
      var mousedown = {
        type: 'mousedown',
        button: 1
      };

      var hideRipple = function (mouseup, element) {
        return function () {
          Effect.hide(mouseup, element);
        };
      };

      for (; i < elementsLen; i++) {
        element = elements[i];
        pos = options.position || {
          x: element.clientWidth / 2,
          y: element.clientHeight / 2
        };
        off = offset(element);
        centre.x = off.left + pos.x;
        centre.y = off.top + pos.y;
        mousedown.pageX = centre.x;
        mousedown.pageY = centre.y;
        Effect.show(mousedown, element);

        if (options.wait >= 0 && options.wait !== null) {
          var mouseup = {
            type: 'mouseup',
            button: 1
          };
          setTimeout(hideRipple(mouseup, element), options.wait);
        }
      }
    }
  };
  /**
   * Remove all ripples from an element.
   */


  Waves.calm = function (elements) {
    elements = getWavesElements(elements);
    var mouseup = {
      type: 'mouseup',
      button: 1
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      Effect.hide(mouseup, elements[i]);
    }
  };
  /**
   * Deprecated API fallback
   */


  Waves.displayEffect = function (options) {
    console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
    Waves.init(options);
  };

  return Waves;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./assets/js/form/index.js":
/*!*********************************!*\
  !*** ./assets/js/form/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* global _$, csrf */

/** 
 * Зависимости: _$.attr, _$.each, _$.create, _$.has
 */

/**
 * [[Description]] extends Core
 * @class Form
 */

class Form {
  /**
   * [[Description]]
   * @param {[[Type]]} form   [[Description]]
   * @param {[[Type]]} option [[Description]]
   */
  constructor(selector, option) {
    this._form = typeof selector === 'string' ? document.forms[selector] : typeof selector === 'object' ? selector : null;
    this.element();

    if (option) {
      this._options = option;
      this.initForm();
    }
  }
  /**
   * [[Description]]
   * @memberof Form
   */


  get isForm() {
    return this._form;
  }

  get elements() {
    return this._element || this.element();
  }
  /**
   * Устанавливаем атрибуты на форму
   * @param   {object} options не обязательный параметр исли он был передан в new Form('id-form',{...})
   * @returns {object} this для цепочки вызовов
   * @memberof Form
   */


  initForm(options) {
    // let form = this._form
    let obj = this._options ? this._options : options; // _$.each(obj, (elem, key) => {
    //   form.setAttribute(key, elem)
    // })

    _$.attr(this._form, obj);

    return this;
  } // /**
  //  * [[Description]]
  //  * @param   {object|string} selector [[Description]]
  //  * @returns {this}          this
  //  */
  // form (selector, bool = false) {
  //   this._form = typeof (selector) === 'string' ? document.forms[selector] : (typeof (selector) === 'object' ? selector : null)
  //   if (bool) this.element()
  //   return this
  // }

  /**
   * Хэш-таблица с элементами формы {name или type элемента: элемент}
   * @returns {object} элементы формы {name или type элемента: элемент}
   * @memberof Form
   */


  element() {
    let fieldsObj = {};
    let name;

    let _;

    let _name;

    let objName;
    let form = this._form;

    _$.each(form, elem => {
      name = elem.getAttribute('name');
      objName = name || elem.getAttribute('type');
      _ = objName.indexOf('[');

      if (_ > -1) {
        _name = objName.replace(/\[/ig, '-').replace(/\]/ig, '');
      } else {
        _name = objName;
      }

      fieldsObj[_name] = elem;
    });

    this._element = fieldsObj;
    return this;
  }
  /**
   * Сброс полей формы в исходное состояние
   * @returns this
   * @memberof Form
   */


  reset() {
    this._form.reset();

    return this;
  }
  /**
   * Установливаем фокус на элемент
   * @param  {object} element
   * @param  {boolean} scroll true по умолчинию т.е. прокрутка страницы до элементы формы, на котором устанавливается курсор (фокус)
   * @memberof Form
   */


  focus(element, scroll = true) {
    element.focus();
    if (scroll) element.scrollIntoView();
    return this;
  }
  /**
   *
   *
   * @param {*} bool
   * @memberof Form
   */


  disabled(bool) {
    let button = this._element.submit || this._element.button;
    console.log('button', button);
    button.disabled = bool || false;
    return this;
  }

  validate(element, option) {
    let target = element.target ? element.target : element;
    let val = this.val(target);
    let rules = option.rules;
    let func = rules.validator;
    let min = rules.min ? val.length >= rules.min : true;
    let max = rules.max ? val.length <= rules.max : true;
    let validateFunction = func ? _$.validator[func](val) : true;
    return val && min && max && validateFunction ? this.error(target) : this.error(target, option.lang);
  }

  validateForm(val, params) {
    let bool = Object.keys(val).map(key => {
      /** Для необязательных полей устанавливаем значение в true */
      let valid = true;

      if (key !== 'submit' && key !== 'button') {
        /** Находим элемент в конфиге */
        let args = params[key];
        /** Проверка на то являтся элемент обязательным */

        let required = _$.has(args, 'required') ? args.required : false;
        /** Находим правила установленные для элемента */

        let rules = args.rules;
        /** Если поле обязательное и на него установлены правила, проверим значение элемента формы с учётом правил */

        if (required && rules) {
          /** Находим элемент */
          let element = this.elements[key];
          valid = key === 'token' ? true : this.validate(element, {
            // eslint-disable-next-line no-undef
            lang: lang.error[key],
            rules: rules,
            validator: rules.validator || false
          });
        }

        return valid;
      }
    }) // Removing undefined values from Array
    .filter(item => {
      return item !== undefined;
    }) // проверим все ли элементы массива true
    .every(item => {
      return item === true;
    });
    return bool;
  }
  /**
   * Получение всех элементов формы в виде хэш - таблицы. Где ключём является значение атрибута name или type элемента
   * @param {string|object} selector id или class формы
   * @returns {Promise}
   * @memberof Admin
   */


  formElem() {
    return new Promise((resolve, reject) => {
      // TODO: использовать метод для опроса формы по новой, или оставить так
      let form = this.elements; // let form = (this._element) ? this._element : this.element()._element

      if (form) {
        resolve(form);
      } else {
        reject(form);
      }
    });
  }
  /**
   * Устанавливаем значения элементам формы
   *
   * @param {object} obj хэш с данными для формы, где key - должен соответствовать элементу формы
   * @memberof Form
   * @example: _$.elementValue({username: bob})
   * @returns this
   */


  elementValue(obj) {
    this.formElem().then(elements => {
      _$.each(elements, (val, key) => {
        if (_$.has(obj, key)) {
          if (elements[key].type === 'checkbox') {//
          } else {
            val.value = obj[key];
          }
        }
      });
    });
    return this;
  }
  /**
   *
   * @param   {[[Type]]} objSave              [[Description]]
   * @param   {[[Type]]} [elements=this._element] [[Description]]
   * @returns {Promise}
   */


  isVal(objSave, elements) {
    objSave = objSave || {};
    elements = elements || this.elements;

    _$.each(elements, (elem, key) => {
      if (!_$.has(objSave, key)) {
        objSave[key] = this.val(elem);
      }
    });

    return Promise.resolve(objSave);
  }

  formValueElements(objSave, elements) {
    objSave = objSave || {};
    elements = elements || this.elements;
    if (csrf) objSave.csrf = csrf;

    _$.each(elements, (elem, key) => {
      if (!_$.has(objSave, key)) {
        let val = this.val(elem);
        if (val) objSave[key] = val;
      }
    });

    return Promise.resolve(objSave);
  }

  getSelectMultiple_(el) {
    var values = [];

    _$.each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });

    return values.length ? values : null;
  }

  getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }

  getValue(el) {
    var type = el.type;

    if (!type) {
      return null;
    }

    switch (type.toLowerCase()) {
      case 'select-one':
        return this.getSelectSingle_(el);

      case 'select-multiple':
        return this.getSelectMultiple_(el);

      case 'radio':
        return el.checked ? el.value : null;

      case 'checkbox':
        return el.checked ? el.value : null;

      default:
        return el.value ? el.value : null;
    }
  }
  /**
   *
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */


  val(element) {
    return element.type === 'checkbox' ? element.checked : element.value;
  }
  /**
   * Получение значения type элемента
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */


  type(element) {
    return element.target ? element.target.type : element.type;
  }
  /**
   * Получение значения name элемента
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */


  name(element) {
    return element.target ? element.target.name : element.name;
  }

  error(e, text) {
    let span;
    let target = e.target ? e.target : e;
    /** Находим в родительском элементе, первый дочерний элемент, в частности label в него будем подгружать сообщение об ошибке */

    let parent = target.parentNode.childNodes[1];
    /** работа с классом */

    let error = target.classList;
    /** находим span с ошибкой */

    let child = parent.children[0];

    if (typeof arguments[1] === 'string') {
      /** добавляем class error к элементу провалившиму валидацию */
      error.add('error');

      if (parent.childElementCount === 0) {
        span = _$.create('span', {
          class: 'error-text'
        }, text);
        parent.appendChild(span);
      }

      return false;
    } else {
      /** удаляем класс error у поля */
      error.remove('error');

      if (child) {
        // если span обнаружен

        /** удаляем текстовое сообщение */
        child.remove();
      }

      return true;
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Form);

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
/* harmony import */ var cart_localstorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cart-localstorage */ "./assets/node_modules/cart-localstorage/index.js");
/* harmony import */ var localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! localStorage */ "./assets/node_modules/localStorage/lib/localStorage.js");
/* harmony import */ var localStorage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(localStorage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! validator */ "./assets/node_modules/validator/index.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _package__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./package */ "./assets/js/package.js");
/* harmony import */ var _package__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_package__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _smooth_scroll_js_src_sizes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./smooth-scroll-js/src/sizes */ "./assets/js/smooth-scroll-js/src/sizes.js");
/* harmony import */ var _smooth_scroll_js_src_sizes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_smooth_scroll_js_src_sizes__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./smooth-scroll-js/src/index */ "./assets/js/smooth-scroll-js/src/index.js");
/* harmony import */ var _smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Infinite_scroll_src_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Infinite-scroll/src/index */ "./assets/js/Infinite-scroll/src/index.js");
/* harmony import */ var _Infinite_scroll_src_index__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Infinite_scroll_src_index__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _system_message__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./system/message */ "./assets/js/system/message.js");
/* harmony import */ var _system_preloader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./system/preloader */ "./assets/js/system/preloader.js");
/* harmony import */ var _system_preloader__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_system_preloader__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Waves_src_js_waves__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Waves/src/js/waves */ "./assets/js/Waves/src/js/waves.js");
/* harmony import */ var _Waves_src_js_waves__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_Waves_src_js_waves__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _modal___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modal/ */ "./assets/js/modal/index.js");
/* harmony import */ var _modal___WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_modal___WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _form___WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./form/ */ "./assets/js/form/index.js");
/* harmony import */ var _system_attribute__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./system/attribute */ "./assets/js/system/attribute.js");
/* harmony import */ var _system_each__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./system/each */ "./assets/js/system/each.js");
/* harmony import */ var _system_create__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./system/create */ "./assets/js/system/create.js");
/* harmony import */ var _system_extend__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./system/extend */ "./assets/js/system/extend.js");
/* harmony import */ var _system_fetch__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./system/fetch */ "./assets/js/system/fetch.js");
/* harmony import */ var _system_boolean__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./system/boolean */ "./assets/js/system/boolean.js");
/* harmony import */ var delegate__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! delegate */ "./node_modules/delegate/src/delegate.js");
/* harmony import */ var delegate__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(delegate__WEBPACK_IMPORTED_MODULE_19__);

 //



 //

 // Size -

 // Scroll -

 //

 // Message -

 // Preloader -










 // let Dialog = require('./modal/')
// eslint-disable-next-line no-unused-vars

(function (window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // e.preventDefault()
    let hamburger = document.getElementById('toggle');
    let body = document.querySelector('body');

    if (hamburger) {
      hamburger.addEventListener('click', e => {
        e.preventDefault();
        body.classList.toggle('sidebar-collapse');
      });
    }

    new _smooth_scroll_js_src_index__WEBPACK_IMPORTED_MODULE_6___default.a().all({
      speed: 1500,
      easing: 'liner',
      header: '.navbar-fixed',
      bottom: 0
    });
  });
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.localStorage = localStorage__WEBPACK_IMPORTED_MODULE_2___default.a;
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.cartStorage = {
    list: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["list"],
    get: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["get"],
    add: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["add"],
    remove: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["remove"],
    update: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["update"],
    total: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["total"],
    destroy: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["destroy"],
    exists: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["exists"],
    subtotal: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["subtotal"],
    onChange: cart_localstorage__WEBPACK_IMPORTED_MODULE_1__["onChange"]
  };
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.data = _system_attribute__WEBPACK_IMPORTED_MODULE_13__["data"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.attr = _system_attribute__WEBPACK_IMPORTED_MODULE_13__["attr"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.has = _system_each__WEBPACK_IMPORTED_MODULE_14__["has"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.each = _system_each__WEBPACK_IMPORTED_MODULE_14__["each"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.create = _system_create__WEBPACK_IMPORTED_MODULE_15__["create"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.extend = _system_extend__WEBPACK_IMPORTED_MODULE_16__["extend"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.message = _system_message__WEBPACK_IMPORTED_MODULE_8__["message"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.Preloader = _system_preloader__WEBPACK_IMPORTED_MODULE_9___default.a;
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.Dialog = _modal___WEBPACK_IMPORTED_MODULE_11___default.a;
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.Form = _form___WEBPACK_IMPORTED_MODULE_12__["default"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.validator = validator__WEBPACK_IMPORTED_MODULE_3___default.a;
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.fetch = _system_fetch__WEBPACK_IMPORTED_MODULE_17__["ajax"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.toBoolean = _system_boolean__WEBPACK_IMPORTED_MODULE_18__["toBoolean"];
  _package__WEBPACK_IMPORTED_MODULE_4___default.a.delegate = delegate__WEBPACK_IMPORTED_MODULE_19___default.a; // _$.Waves = Waves
})(window);

/***/ }),

/***/ "./assets/js/modal/index.js":
/*!**********************************!*\
  !*** ./assets/js/modal/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */

/**
 * [[Description]]
 * Copyright (c) Wed Jan 31 2018 Mitus M.
 * Licensed under the Apache 2.0 license.
 */
const modal = __webpack_require__(/*! dialog-polyfill */ "./assets/node_modules/dialog-polyfill/dist/dialog-polyfill.esm.js").default; // import modal from 'dialog-polyfill'


const init = Symbol();
const getElement = Symbol();
const promis = Symbol();
/**
 * @class Dialog
 * @classdesc [[Description]]
 */

class Dialog {
  /**
   * [[Description]]
   * @constructs [[Link]]
   * @param {string|object} elem [[Description]]
   */
  constructor(elem) {
    this.elem = typeof elem === 'string' ? document.querySelector(elem) : typeof elem === 'object' ? elem : null;
    if (this.elem) this[init]();
  }
  /**
   * Получение элемента
   */


  get element() {
    return this.elem;
  }
  /**
   * Задаём элемент который будет использован в виде модального или диалогового окна
   */


  set element(elem) {
    this.elem = elem;
  }
  /**
   * Задаем заголовок диалогового или модального окна
   * @param   {string} text Текст заголовка
   * @param   {string} elem class или id, внутри диалогово или модального окна. Если не задан то будет находить по умолчанию .modal-title
   * @returns {object} this
   */


  header(text, elem) {
    elem = elem ? this[getElement](elem) : this[getElement]('.modal-title');
    elem.innerHTML = text;
    return this;
  }
  /**
   * Задаём текст диалогового или модального окна
   * @param   {string} text текст сообщения
   * @param   {string} elem class или id, внутри диалогово или модального окна. Если не задан то будет находить по умолчанию .modal-content
   * @returns {object} this
   */


  content(text, elem) {
    elem = elem ? this[getElement](elem) : this[getElement]('.modal-content');
    elem.innerHTML = text;
    return this;
  }
  /**
   * Показать модальное или диалоговое окно
   * @param   {function} fn функция которая должна быть выполнена в момент открытия диалогового окна
   * @returns {object}   this
   */
  // NOTE: Если не использовать Promise, то при каждом новом клике на кнопку происходит сробатывание предыдщих событий.


  show(cb) {
    this.elem.showModal(); // document.querySelector('._dialog_overlay').addEventListener('click', this.close.bind(this))

    if (cb) {
      // cb(this.elem.returnValue)
      this[promis]().then(val => {
        cb(val);
      });
    }

    return this;
  }
  /**
   * Закрыть модальное или диалоговое окно
   */


  close() {
    if (this.elem.hasAttribute('open')) this.elem.close(false);
  }
  /**
   * Инициализация кнопки закрытия диалогового окна и закрытия по клику по затемнению
   * @returns {object} this
   */
  // TODO: Добавить выбор вывода окна show() или showModal(). Если showModal() то только тогда инициализация overlay 📌


  initClose() {
    this[getElement]('#modal-close').addEventListener('click', this.close.bind(this));
    return this;
  }
  /**
   * Инициализация диалогового или модального окна
   * @private
   */


  [init]() {
    modal.registerDialog(this.elem);
  }
  /**
   * Находим элементы внутри диалогового окна
   * @param {string} selector class или id (.class | #id)
   * @private
   */


  [getElement](selector) {
    return this.elem.querySelector(selector);
  }
  /**
   * Promise
   * @private
   */


  [promis]() {
    return new Promise(resolve => {
      this.elem.addEventListener('close', () => {
        // e.preventDefault()
        // e.stopImmediatePropagation()
        resolve(this.elem.returnValue);
      });
    });
  }

} // window.Dialog = Dialog
// module.exports = Dialog


if (true) {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return Dialog;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

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

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable no-console */

/* global exports, define, module, history, cancelAnimationFrame, CustomEvent, InvalidCharacterError, Sizes*/
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
  }

  let scrollViewButton = (el, top, bottom) => {
    let display;
    let positionTop = docElement.scrollTop;
    let positionBottom = positionTopClient - bottom;
    display = el.id === 'top' ? positionTop < top ? 'none' : 'block' : positionBottom < positionTop ? 'none' : 'block';
    el.setAttribute('style', `display:${display}`);
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
    }
    /**
     * Показывает текущюю позицию на экране
     * Gets the current scroll position of the scroll container.
     * @returns {number}
     */


    get scrollPosition() {
      return body.scrollTop || docElement.scrollTop;
    } // /**
    //  * Размеры просматриваемой области page
    //  * @returns {number}
    //  */
    // get viewPort() {
    //   return size.getViewportAndElementSizes().view
    // }
    // /**
    //  * размер страницы
    //  * @returns {number}
    //  */
    // get page() {
    //   return size.getViewportAndElementSizes().size
    // }

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
      animateScroll(heightBody, docElement, settings, fn);
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
      handlerButton(heightBody, div, init.options, init.fn);
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
        let element = e.target;
        let id = element.id;
        this[id](settings, fn);
      };

      scrollViewButton(divTop, initTop, initBottom);

      this._button.addEventListener('click', clickHahdler, false);

      eventScroll(displayButton);
      return this;
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

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, exports, module */
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

/***/ "./assets/js/system/attribute.js":
/*!***************************************!*\
  !*** ./assets/js/system/attribute.js ***!
  \***************************************/
/*! exports provided: attr, data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr", function() { return attr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
function attr(element, options) {
  this.each(options, (elem, key) => {
    if (key === 'class') {
      element.classList.add(options.class);
    } else {
      element.setAttribute(key, elem);
    }
  });
  return this;
}
/**
 * Создаём обьект с данными, на основании всех (data-*) атрибутов элемента
 * @param   {object}        e    элемент на котором произошло событие
 * @param   {string}        attr не обязательный параметр, если указан то будет получено значение только данного атрибута Например: name
 * @param   {*}             val  не обязательный параметр, если он указан вместе с параметром attr то у переданного атрибута бедет установлено значение val
 * @returns {object|string} Если передан один первый параметр(e) то получим данныне
 */

function data(e, attr, val) {
  let element = e.target || e;
  let data = !attr ? element.dataset : !val ? element.dataset[attr] : element.dataset[attr] = val;
  return data;
}

/***/ }),

/***/ "./assets/js/system/boolean.js":
/*!*************************************!*\
  !*** ./assets/js/system/boolean.js ***!
  \*************************************/
/*! exports provided: toBoolean */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBoolean", function() { return toBoolean; });
function toBoolean(val) {
  "use strict";

  if (typeof val === 'string') {
    val = val.trim().toLowerCase();
  }

  switch (val) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;

    default:
      return false;
  }
}

/***/ }),

/***/ "./assets/js/system/create.js":
/*!************************************!*\
  !*** ./assets/js/system/create.js ***!
  \************************************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
function create(tag, params, textHtml) {
  params = params || {};
  let elem = document.createElement(tag);

  for (var pr in params) {
    if (pr === 'class' || pr === 'className') {
      elem.className = params[pr];
    } else {
      elem.setAttribute(pr, params[pr]);
    }
  }

  if (textHtml) {
    elem.innerHTML = textHtml;
  }

  return elem;
}

/***/ }),

/***/ "./assets/js/system/each.js":
/*!**********************************!*\
  !*** ./assets/js/system/each.js ***!
  \**********************************/
/*! exports provided: has, each */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "each", function() { return each; });
function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
const nativeForEach = Array.prototype.forEach;
const breaker = {};
function each(obj, iterator, context) {
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
}

/***/ }),

/***/ "./assets/js/system/extend.js":
/*!************************************!*\
  !*** ./assets/js/system/extend.js ***!
  \************************************/
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

/***/ "./assets/js/system/fetch.js":
/*!***********************************!*\
  !*** ./assets/js/system/fetch.js ***!
  \***********************************/
/*! exports provided: ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajax", function() { return ajax; });
/*global _$*/

/**
 * Зависимости: _$.extend
 */
const defSettings = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
};

let initArguments = options => {
  return typeof options === 'function' || options === undefined ? defSettings : _$.extend(defSettings, options); // {
  // options:
  // }
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

function ajax(url, options) {
  options = initArguments(options);
  return fetch(url, {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body)
  }).then(status).then(json).then(data => {
    return data;
  }).catch(function (error) {
    console.log('Request failed', error);

    _$.message('error', {
      title: 'Ошибка',
      message: error,
      position: 'topCenter'
    });
  });
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


    for (const key in settings) {
      if (settings.hasOwnProperty(key)) {
        obj[key] = settings[key];
      }
    }

    iziToast[action](obj);
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

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

// extracted by mini-css-extract-plugin

/***/ })

},[["./assets/js/index.js","runtime","vendors"]]]);