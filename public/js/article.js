(self["webpackChunkmicro"] = self["webpackChunkmicro"] || []).push([["article"],{

/***/ "./assets/js/html-formatting/html-formatting/html-formatting.js":
/*!**********************************************************************!*\
  !*** ./assets/js/html-formatting/html-formatting/html-formatting.js ***!
  \**********************************************************************/
/***/ (() => {

/*! htmlFormatting | © 2015 bashkos | https://github.com/WEACOMRU/html-formatting */
var htmlFormatting = function () {
  'use strict';

  var getRule = function getRule(node, valid_elements) {
    var re = new RegExp('(?:^|,)' + node.tagName.toLowerCase() + '(?:,|$)'),
        rules = Object.keys(valid_elements),
        rule = false,
        i;

    for (i = 0; i < rules.length && !rule; i++) {
      if (re.test(rules[i])) {
        rule = valid_elements[rules[i]];
      }
    }

    return rule;
  },
      convert = function convert(node, convert_to) {
    var parent = node.parentNode,
        converted = document.createElement(convert_to);

    if (node.style.cssText) {
      converted.style.cssText = node.style.cssText;
    }

    if (node.className) {
      converted.className = node.className;
    }

    while (node.childNodes.length > 0) {
      converted.appendChild(node.childNodes[0]);
    }

    parent.replaceChild(converted, node);
  },
      checkStyles = function checkStyles(node, valid_styles) {
    var i, re;

    if (typeof valid_styles === 'string' && node.style.length) {
      for (i = node.style.length - 1; i >= 0; i--) {
        re = new RegExp('(?:^|,)' + node.style[i] + '(?:,|$)');

        if (!re.test(valid_styles)) {
          node.style[node.style[i]] = '';
        }
      }

      if (!node.style.cssText) {
        node.removeAttribute('style');
      }
    }
  },
      checkClasses = function checkClasses(node, valid_classes) {
    var i, re;

    if (typeof valid_classes === 'string' && node.classList.length) {
      for (i = node.classList.length - 1; i >= 0; i--) {
        re = new RegExp('(?:^|\\s)' + node.classList[i] + '(?:\\s|$)');

        if (!re.test(valid_classes)) {
          node.classList.remove(node.classList[i]);
        }
      }

      if (!node.className) {
        node.removeAttribute('class');
      }
    }
  },
      isEmpty = function isEmpty(node) {
    var result = true,
        re = /^\s*$/,
        i,
        child;

    if (node.hasChildNodes()) {
      for (i = 0; i < node.childNodes.length && result; i++) {
        child = node.childNodes[i];

        if (child.nodeType === 1) {
          result = isEmpty(child);
        } else if (child.nodeType === 3 && !re.test(child.nodeValue)) {
          result = false;
        }
      }
    }

    return result;
  },
      unpack = function unpack(node) {
    var parent = node.parentNode;

    while (node.childNodes.length > 0) {
      parent.insertBefore(node.childNodes[0], node);
    }
  },
      processText = function processText(node) {
    node.nodeValue = node.nodeValue.replace(/\xa0/g, ' ');
  },
      processNode = function processNode(node, valid_elements, taskSet) {
    var rule;

    if (node.nodeType === 1) {
      rule = getRule(node, valid_elements);

      if (rule) {
        if (typeof rule.valid_elements === 'undefined') {
          process(node, valid_elements);
        } else {
          process(node, rule.valid_elements);
        }

        if (rule.no_empty && isEmpty(node)) {
          taskSet.push({
            task: 'remove',
            node: node
          });
        } else {
          checkStyles(node, rule.valid_styles);
          checkClasses(node, rule.valid_classes);

          if (rule.convert_to) {
            taskSet.push({
              task: 'convert',
              node: node,
              convert_to: rule.convert_to
            });
          } else if (node.id) {
            node.removeAttribute('id');
          }

          if (typeof rule.process === 'function') {
            taskSet.push({
              task: 'process',
              node: node,
              process: rule.process
            });
          }
        }
      } else {
        process(node, valid_elements);

        if (node.hasChildNodes()) {
          taskSet.push({
            task: 'unpack',
            node: node
          });
        }

        taskSet.push({
          task: 'remove',
          node: node
        });
      }
    } else if (node.nodeType === 3) {
      processText(node);
    }
  },
      doTasks = function doTasks(taskSet) {
    var i;

    for (i = 0; i < taskSet.length; i++) {
      switch (taskSet[i].task) {
        case 'remove':
          taskSet[i].node.parentNode.removeChild(taskSet[i].node);
          break;

        case 'convert':
          convert(taskSet[i].node, taskSet[i].convert_to);
          break;

        case 'process':
          taskSet[i].process(taskSet[i].node);
          break;

        case 'unpack':
          unpack(taskSet[i].node);
          break;
      }
    }
  },
      process = function process(node, valid_elements) {
    var taskSet = [],
        i;

    for (i = 0; i < node.childNodes.length; i++) {
      processNode(node.childNodes[i], valid_elements, taskSet);
    }

    doTasks(taskSet);
  };

  return process;
}();

/***/ }),

/***/ "./microservices/article/assets/js/glavred/index.js":
/*!**********************************************************!*\
  !*** ./microservices/article/assets/js/glavred/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");


/* global tinyMCE, glvrd, _$ */

/**
 * Главред
 * @param {string} text Текст который проверяется
 */
var glavred = function glavred(text) {
  /** Блок в котором будет отображаться ин-фа полученная от Главреда */
  // let statsBlock = document.querySelector('.glavred-bar')
  var container = tinyMCE.activeEditor.container; // body = body || tinyMCE.activeEditor.iframeElement.contentWindow.document.getElementById('tinymce')

  /** div в который вставляем результаты проверки Главредом */
  // const glvrdSideBar = '<div id="stats-glavred" class="glavred-bar"></div>'

  container.insertAdjacentHTML('beforeEnd', '<div id="stats-glavred" class="glavred-bar"></div>');
  /** Блок в котором будет отображаться ин-фа полученная от Главреда */

  var statsBlock = document.querySelector('.glavred-bar');
  glvrd.proofread(text, function (resultat) {
    /** В зависимости от оценки устанавливаем подсветку оценки
     * @param {number} score
     * @returns {string} red | orange
     */
    var getScoreColor = function getScoreColor(score) {
      if (score < 5) {
        return 'red';
      }

      if (score < 7.5) {
        return 'orange';
      }

      return 'green';
    };

    if (resultat.status == 'ok') {
      //TODO: Массив стоп-слов можно будет в будущем использовать для сбора статистики
      var num = resultat.fragments.length;
      var offset = 0;

      if (num >= 0) {
        resultat.fragments.forEach(function (fragment) {
          var tagOpen = "<span class=\"hint\" data-glvrd=\"true\" data-style=\"orange\" data-desc=\"".concat(fragment.hint.description, "\" data-name=\"").concat(fragment.hint.name, "\" >");
          var tagClose = '</span>';
          var tagsLength = tagOpen.length + tagClose.length;
          text = text.substring(0, fragment.start + offset) + tagOpen + text.substring(fragment.start + offset, fragment.end + offset) + tagClose + text.substring(fragment.end + offset, text.length);
          offset += tagsLength;
        });
      }
      /**  */


      tinyMCE.activeEditor.setContent('');
      /**  */

      tinyMCE.activeEditor.setContent(text, {
        format: 'raw',
        no_events: true
      });
      /**  */

      var classScore = getScoreColor(resultat.score);
      /** Блок в котором будет отображаться ин-фа полученная от Главреда */

      statsBlock.innerHTML = "<div class=\"glavred\">\n      <div class=\"rule\"></div>\n      <div class=\"stats\"><span class=\"stats-score ".concat(classScore, "\">").concat(resultat.score, "</span> - <span class=\"stats-score-suffix\">\u0431\u0430\u043B\u043B\u043E\u0432</span> \u0438\u0437 10 <br/> \u043F\u043E \u0448\u043A\u0430\u043B\u0435 \u0413\u043B\u0430\u0432\u0440\u0435\u0434\u0430</div>\n      </div>");
      var body = tinyMCE.activeEditor.iframeElement.contentWindow.document.getElementById('tinymce');
      /** элемент в который вставляем описание слова */

      var ruleSelector = document.querySelector('.rule');
      /** Массив блоков с метками Главреда, взятых из текста
       * @type {NodeList}
       */

      var hint = body.querySelectorAll('.hint');

      _$.delegate(body, 'span.hint', 'mouseover', function (e) {
        var target = e.target;
        var data = target.dataset;
        /** устанавливаем класс для выделения блока */

        target.classList.add('highlighted');
        /** вставляем описание слова в блок  */

        ruleSelector.innerHTML = "<div class=\"name\">".concat(data.name, "</div><div class=\"rule-desc\">").concat(data.desc, "</div>");
        /**  */

        hint = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(hint).map(function (elem) {
          /**  */
          if (elem !== target && elem.classList.contains('highlighted')) {
            elem.classList.remove('highlighted');
          }

          return elem;
        });
      });
    } else {
      alert(resultat.message);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (glavred);

/***/ }),

/***/ "./microservices/article/assets/js/htmlformatting/index.js":
/*!*****************************************************************!*\
  !*** ./microservices/article/assets/js/htmlformatting/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_js_html_formatting_html_formatting_html_formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../assets/js/html-formatting/html-formatting/html-formatting */ "./assets/js/html-formatting/html-formatting/html-formatting.js");
/* harmony import */ var _assets_js_html_formatting_html_formatting_html_formatting__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_js_html_formatting_html_formatting_html_formatting__WEBPACK_IMPORTED_MODULE_0__);
/* global tinyMCE */
 //TODO: Исправить путь


/** */

var headerRule = {
  br: {
    process: function process(node) {
      var parent = node.parentNode,
          space = document.createTextNode(" ");
      parent.replaceChild(space, node);
    }
  }
};
/**  */

var validElements = {
  img: {
    valid_styles: "",
    valid_classes: "foto",
    no_empty: false,
    valid_elements: "src,width,height" // process: function (node) {
    // }

  },
  h1: {
    convert_to: "h2",
    valid_styles: "text-align",
    valid_classes: "heading",
    no_empty: true,
    valid_elements: headerRule
  },
  "h2,h3,h4": {
    valid_styles: "text-align",
    valid_classes: "heading",
    no_empty: true,
    valid_elements: headerRule
  },
  p: {
    valid_styles: "text-align",
    valid_classes: "",
    no_empty: true
  },
  a: {
    valid_styles: "",
    valid_classes: "",
    no_empty: true,
    process: function process(node) {
      var host = "http://".concat(window.location.host, "/");

      if (node.href.indexOf(host) !== 0) {
        node.target = "_blank";
      }
    }
  },
  br: {
    valid_styles: "",
    valid_classes: ""
  },
  "blockquote,b,strong,i,em,s,strike,sub,sup,kbd,ul,ol,li,dl,dt,dd,time,address,thead,tbody,tfoot": {
    valid_styles: "",
    valid_classes: "",
    no_empty: true
  },
  "table,tr,th,td": {
    valid_styles: "text-align,vertical-align",
    valid_classes: "",
    no_empty: true
  },
  "embed,iframe": {
    valid_classes: ""
  }
};
/** Форматирование html разметки, по заданным правилам */

var formatting = function formatting() {
  // FIXME:
  var body = tinyMCE.activeEditor.iframeElement.contentWindow.document.getElementById("tinymce");
  console.log(":::[ body  ]:::", body);
  _assets_js_html_formatting_html_formatting_html_formatting__WEBPACK_IMPORTED_MODULE_0___default()(body, validElements);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatting);

/***/ }),

/***/ "./microservices/article/assets/js/index.js":
/*!**************************************************!*\
  !*** ./microservices/article/assets/js/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/article/assets/scss/index.scss");
/* harmony import */ var _upload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upload */ "./microservices/article/assets/js/upload/index.js");
/* harmony import */ var _typograf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./typograf */ "./microservices/article/assets/js/typograf/index.js");
/* harmony import */ var _glavred__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./glavred */ "./microservices/article/assets/js/glavred/index.js");
/* harmony import */ var _htmlformatting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./htmlformatting */ "./microservices/article/assets/js/htmlformatting/index.js");
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tinymce/tinymce */ "./node_modules/tinymce/tinymce.js");
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tinymce_tinymce__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var tinymce_icons_default__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tinymce/icons/default */ "./node_modules/tinymce/icons/default/index.js");
/* harmony import */ var tinymce_icons_default__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(tinymce_icons_default__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tinymce/themes/silver */ "./node_modules/tinymce/themes/silver/index.js");
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _text_pattern__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./text-pattern */ "./microservices/article/assets/js/text-pattern/index.js");
/* eslint-env es6 */










/** Default icons are required for TinyMCE 5.3 or above **/


/** A theme is also required **/




(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
  'use strict';

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.addEventListener('DOMContentLoaded', function () {
            /** Очищаем текст от вставок Главреда
             * @param {string} text - очищаемый текст
             */
            var removeMarkup = function removeMarkup(text) {
              var reg = /(<span[^>]*data-glvrd="true"[^>]*>)(.+?)(<\/span>)/g;

              if (text) {
                return text.replace(reg, '$2');
              }

              return text;
            };

            function dpr() {
              console.log(window.devicePixelRatio);
            }

            dpr(); //************************
            //*
            //************************

            tinymce_tinymce__WEBPACK_IMPORTED_MODULE_7___default().init({
              skin: 'oxide',
              // skin: 'lightgray',
              selector: 'textarea#post-article',
              height: '480',
              // placeholder: 'Type here...',
              language: 'ru',
              content_css: '/public/css/article.css',
              content_css_cors: true,
              block_formats: 'Paragraph=p; Header 2=h2; Header 3=h3',
              branding: false,
              spellchecker_languages: '+Russian=ru,Ukrainian=uk,English=en',
              spellchecker_rpc_url: 'http://speller.yandex.net/services/tinyspell',
              // eslint-disable-next-line no-useless-escape
              spellchecker_word_separator_chars: "\\s!\"#$%&()*+,./:;<=>?@[]^_{|}\xA7\xA9\xAB\xAE\xB1\xB6\xB7\xB8\xBB\xBC\xBD\xBE\xBF\xD7\xF7\xA4\u201D\u201C",
              draggable_modal: true,
              document_base_url: "".concat(!window.location.origin ? "".concat(window.location.protocol, "//").concat(window.location.host) : window.location.origin, "/"),
              // eslint-disable-next-line max-len
              toolbar1: 'print preview media | insertfile undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image | emoticons | spellchecker | code template insert',
              toolbar2: 'customDateButton | restoredraft | charmap | mysidebar | typograf |  glavred | format | toc | searchreplace',
              plugins: [// eslint-disable-next-line max-len
              'advlist autolink lists link charmap print preview hr anchor searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table directionality emoticons template paste textpattern spellchecker autoresize tabfocus insertdatetime charmap image imagetools toc quickbars textpattern'],
              //autosave
              // autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
              // autosave_interval: '20s',
              // autosave_restore_when_empty: true,
              //TODO: Расширить список правил, для автоматического форматирования текста
              formats: {
                // Changes the default format for h1 to have a class of heading
                h1: {
                  block: 'h2',
                  classes: 'heading'
                }
              },
              browser_spellcheck: true,
              //* ****************************
              //* ********** IMAGES **********
              //* ****************************
              // images_upload_handler: function (blobInfo, success, failure) {
              //   console.log(blobInfo.blob());
              //   success('url');
              // },
              images_upload_handler: function images_upload_handler(blobInfo, success, failure) {
                console.log('================================');
                console.log(':::[ blobInfo  ]:::', blobInfo);
                console.log(':::[ success  ]:::', success);
                console.log(':::[ failure  ]:::', failure);
                var xhr;
                var formData;
                xhr = new XMLHttpRequest();
                xhr.withCredentials = true; // xhr.open('POST', 'postAcceptor1.php');

                xhr.open('POST', '/upload/article');

                xhr.onload = function () {
                  var json;

                  if (xhr.status != 200) {
                    failure("HTTP Error: ".concat(xhr.status));
                    return;
                  }

                  json = JSON.parse(xhr.responseText);

                  if (!json || typeof json.location != 'string') {
                    failure("Invalid JSON: ".concat(xhr.responseText));
                    return;
                  }

                  success(json.location);
                };

                formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                console.log(':::[ blobInfo.blob()  ]:::', blobInfo.blob());
                console.log(':::[ blobInfo.filename()  ]:::', blobInfo.filename());
                xhr.send(formData);
              },
              file_picker_types: 'file image media',
              images_upload_base_path: '/some/basepath',
              images_upload_credentials: true,
              // TODO: Добавить список изображений из статьи
              // image_list: "/mylist.php",
              image_list: [{
                title: 'главред',
                value: '/public/images/pipe-1.png',
                alt: 'главред1'
              }, {
                title: 'обои',
                value: 'https://images.wallpaperscraft.ru/image/pejzazh_art_luna_127187_3840x2160.jpg',
                alt: 'обои1'
              }],

              /** role="presentation" */
              a11y_advanced_options: true,

              /**  */
              // <figure class="image">
              //  <img src="url" alt="" />
              //  <figcaption>Caption</figcaption>
              // </figure>
              image_caption: true,

              /** add custom styles, spacing and borders to images. */
              image_advtab: true,
              file_picker_callback: function file_picker_callback(callback, value, meta) {
                // console.log(':::[ callback, value, meta  ]:::', callback, value, meta)
                console.log(':::[ value ::file_picker_callback ]:::', value);
                console.log(':::[ meta ::file_picker_callback ]:::', meta);
                console.log(':::[ callback ::file_picker_callback ]:::', callback); // Provide file and text for the link dialog

                if (meta.filetype == 'file') {
                  callback('mypage.html', {
                    text: 'My text'
                  });
                } // Provide image and alt text for the image dialog


                if (meta.filetype == 'image') {
                  callback('myimage.jpg', {
                    alt: 'My alt text'
                  });
                } // Provide alternative source and posted for the media dialog


                if (meta.filetype == 'media') {
                  callback('movie.mp4', {
                    source2: 'alt.ogg',
                    poster: 'image.jpg'
                  });
                }
              },
              // imagetools_cors_hosts: ['mydomain.com', 'otherdomain.com'],
              imagetools_proxy: 'proxy.php',

              /**  */
              imagetools_fetch_image: function imagetools_fetch_image(img) {
                console.log(':::[ img:imagetools_fetch_image  ]:::', img);
                return new (tinymce_tinymce__WEBPACK_IMPORTED_MODULE_7___default().util.Promise)(function (resolve) {
                  // Fetch the image and return a blob containing the image content
                  resolve(new Blob(img, {
                    type: 'image/png'
                  })); // resolve(img);
                });
              },
              quickbars_insert_toolbar: 'quickimage quicktable | pagebreak',
              quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
              imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
              // save_enablewhendirty: true,
              // save_oncancelcallback: function () { console.log('Save canceled'); },

              /** Правила форматирования текста
               * TODO: Расширить список правил, для автоматического форматирования текста
               */
              textpattern_patterns: _text_pattern__WEBPACK_IMPORTED_MODULE_10__.default,
              paste_postprocess: function paste_postprocess(plugin, args) {
                console.log('paste_postprocess', args); // args.node.setAttribute('id', '42');
                // htmlFormatting(args.node, valid_elements)
              },
              setup: function setup(editor) {
                editor.ui.registry.addContextToolbar('textselection', {
                  predicate: function predicate(node) {
                    console.log(':::[ node  ]:::', node);
                    return !editor.selection.isCollapsed();
                  },
                  items: 'bold italic underline | copy | blockquote | formatselect | quicklink',
                  // | typograf  glavred
                  position: 'selection',
                  scope: 'node'
                }); // editor.ui.registry.addContextToolbar('imageselection', {
                //   predicate: function (node) {
                //     return node.nodeName === 'P';
                //   },
                //   items: 'quicklink quickimage',
                //   position: 'node'
                // });
                //************************************
                //* Главред
                //************************************

                editor.ui.registry.addButton('glavred', {
                  text: 'Главред',
                  tooltip: 'Проверить текст на стоп-слова',
                  image: '/images/typograf.png',
                  onSetup: function onSetup() {
                    var scriptLoader = new (tinymce_tinymce__WEBPACK_IMPORTED_MODULE_7___default().dom.ScriptLoader)();
                    scriptLoader.load('https://api.glvrd.ru/v1/glvrd.js');
                    scriptLoader.loadQueue(function () {});
                  },
                  onAction: function onAction() {
                    var content = removeMarkup(editor.getContent().toString().trim());

                    if (content !== '') {
                      (0,_glavred__WEBPACK_IMPORTED_MODULE_5__.default)(content);
                    }
                  }
                }); //* ************************************
                //* ТИПОГРАФ
                //* ************************************

                editor.ui.registry.addButton('typograf', {
                  text: 'Типограф',
                  image: 'http://micro.loc/public/images/pipe-1.png',
                  tooltip: 'Типографирование текста',
                  onAction: function onAction() {
                    var tiny = _typograf__WEBPACK_IMPORTED_MODULE_4__.default.execute(editor.getContent());
                    tinymce_tinymce__WEBPACK_IMPORTED_MODULE_7___default().activeEditor.setContent(tiny);
                  }
                }); //* **********************************
                //*
                //* **********************************

                editor.ui.registry.addButton('format', {
                  text: 'Форматирование текста',
                  tooltip: 'Форматирование html разметки, по заданным правилам',
                  onAction: function onAction() {
                    (0,_htmlformatting__WEBPACK_IMPORTED_MODULE_6__.default)(editor.getContent());
                  }
                });
              }
            });
          }); // DOMContentLoaded

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ }),

/***/ "./microservices/article/assets/js/text-pattern/index.js":
/*!***************************************************************!*\
  !*** ./microservices/article/assets/js/text-pattern/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//TODO: Расширить список правил, для автоматического форматирования текста
var textPattern = [{
  start: '---',
  replacement: '<hr/>'
}, {
  start: '--',
  replacement: '—'
}, {
  start: '-',
  replacement: '—'
}, {
  start: '(c)',
  replacement: '©'
}, {
  start: '(с)',
  replacement: '©'
}, {
  start: '(tm)',
  replacement: '&trade;'
}, {
  start: '(тм)',
  replacement: '&trade;'
}, {
  start: '//brb',
  replacement: 'Be Right Back'
}, {
  start: '//heading',
  replacement: '<h1 style="color: blue">Heading here</h1> <h2>Author: Name here</h2> <p><em>Date: 01/01/2000</em></p> <hr />'
}, {
  start: '* ',
  cmd: 'InsertUnorderedList'
}, {
  start: '- ',
  cmd: 'InsertUnorderedList'
}, {
  start: '1. ',
  cmd: 'InsertOrderedList',
  value: {
    'list-style-type': 'decimal'
  }
}, {
  start: '1) ',
  cmd: 'InsertOrderedList',
  value: {
    'list-style-type': 'decimal'
  }
}, {
  start: 'a. ',
  cmd: 'InsertOrderedList',
  value: {
    'list-style-type': 'lower-alpha'
  }
}, {
  start: 'a) ',
  cmd: 'InsertOrderedList',
  value: {
    'list-style-type': 'lower-alpha'
  }
}, {
  start: 'i. ',
  cmd: 'InsertOrderedList',
  value: {
    'list-style-type': 'lower-roman'
  }
}, {
  start: 'i) ',
  cmd: 'InsertOrderedList',
  value: {
    'list-style-type': 'lower-roman'
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (textPattern);

/***/ }),

/***/ "./microservices/article/assets/js/typograf/index.js":
/*!***********************************************************!*\
  !*** ./microservices/article/assets/js/typograf/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var typograf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typograf */ "./node_modules/typograf/dist/typograf.js");
/* harmony import */ var typograf__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typograf__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-env es6 */

/**
 * Типограф
 * NOTE: 1 +- 2 1 <= 2 1 -> 2 (c), (tm) 10 C, 20 F 1/2, 3/4 10x3~=30
 * @param {*} text
 */
// let typograf = (text) => {

var tp = new (typograf__WEBPACK_IMPORTED_MODULE_0___default())({
  locale: ['ru', 'en-US']
});
/** -> → →, <- → ← */

tp.enableRule('common/symbols/arrow'); // 	Добавление ° к C и F

tp.enableRule('common/symbols/cf'); // (c) → ©, (tm) → ™, (r) → ®

tp.enableRule('common/symbols/copy'); // №№ → №

tp.enableRule('ru/symbols/NN'); // Удаление повторяющихся пробелов между символами

tp.enableRule('common/space/delRepeatSpace'); // Пробел после знаков пунктуации

tp.enableRule('common/space/afterPunctuation'); // Пробел перед открывающей скобкой

tp.enableRule('common/space/beforeBracket'); // Удаление лишних пробелов после открывающей и перед закрывающей скобкой

tp.enableRule('common/space/bracket'); // Удаление пробела перед %, ‰ и ‱

tp.enableRule('common/space/delBeforePercent'); // Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки

tp.enableRule('ru/typo/switchingKeyboardLayout');
/** != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± */

tp.enableRule('common/number/mathSigns'); // -tp. enableRule('*')

tp.enableRule('ru/money/*');
tp.enableRule('ru/date/*');
tp.enableRule('ru/optalign/*'); // tp.enableRule('ru/punctuation/*')

tp.enableRule('ru/dash/*');
tp.enableRule('common/space/*');
tp.enableRule('common/number/*'); // tp.enableRule('common/html/escape')
//- Разобраться с правилами что-бы в тексте пробелы не заменялись на &nbsp

tp.disableRule('common/nbsp/*'); //BUG: !!! Не удоляет теги из текста
// tp.disableRule('common/html/stripTags')
//-tp.disableRule('common/html/*')
// Неразрывный пробел перед последним словом в предложении, не более 5 символов
// tp.setSetting('common/nbsp/beforeShortLastWord', 'lengthLastWord', 5);
// Вложенные кавычки тоже «ёлочки» для русской типографики

tp.setSetting('common/punctuation/quote', 'ru', {
  left: '«',
  right: '»',
  removeDuplicateQuotes: true
}); // }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tp); // module.exports = tp

/***/ }),

/***/ "./microservices/article/assets/js/upload/index.js":
/*!*********************************************************!*\
  !*** ./microservices/article/assets/js/upload/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dropzone */ "./node_modules/dropzone/dist/dropzone.js");
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dropzone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _picture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./picture */ "./microservices/article/assets/js/upload/picture.js");
/* global tinyMCE */

/* eslint-env es6 */



 // Disabling autoDiscover, otherwise Dropzone will try to attach twice.

(dropzone__WEBPACK_IMPORTED_MODULE_0___default().autoDiscover) = false; //TODO: Настройки drag and drop перенести на страницу настроек так чтобы они были доступны в браузере

var upload = new (dropzone__WEBPACK_IMPORTED_MODULE_0___default())('div#dropzone', {
  url: '/upload/article',
  dictDefaultMessage: 'Drag an image here to upload, or click to select one 1',
  acceptedFiles: 'image/*',
  maxFiles: 5,
  uploadMultiple: false,
  parallelUploads: 1,
  addRemoveLinks: false,
  withCredentials: true,
  timeout: 10000
}); // ────────────────────────────────────────────────────────────────────────────────
//*************************************************************
//** Вызывается, когда загрузка была успешной или ошибочной. */
//*************************************************************

upload.on('complete', function (file, done) {
  //  console.dir(file, done)
  console.log('Вызывается, когда загрузка была успешной или ошибочной.');
  console.log(':::[ file.status::complete  ]:::', file.status);
});
/**  Вызывается непосредственно перед отправкой каждого файла. Получает объект xhr и объекты formData в качестве второго и третьего параметров, поэтому имеется возможность добавить дополнительные данные. Например, добавить токен CSRF */

upload.on('sending', function (file, xhr, formData) {
  var csrf = document.querySelector('meta[name=csrf-token]').getAttributeNode('content').value; // BUG: Если добовляется несколько файлов то к каждому файлу добовляется значение
  // FIXME:Ко всем файлам один csrf-token
  //TODO: Ко всем файлам один csrf-token

  formData.append('csrf', csrf);
});
/** Когда файл обрабатывается (поскольку существует очередь, не все файлы обрабатываются немедленно). Это событие ранее называлось файлом обработки. */

upload.on('processing', function (file) {
  console.log(':::[ file :: processing ]:::', file);
});
/** Вызывается для каждого файла, который был отклонен, поскольку количество файлов превышает ограничение maxFiles. */

upload.on('maxfilesexceeded', function (file) {
  // NOTE: Удаляем файлы к загрузки превысившие лимит по колличеству добовляемых к загрузке за один раз
  upload.removeFile(file);
});
/** Файл был успешно загружен. Получает ответ сервера в качестве второго аргумента. */

upload.on('success', function (file, response) {
  /** исходный размер фото */
  var width = file.width; // console.log('width', width)
  //* --------------------------------

  /**кнопка Вставить  */

  var add = dropzone__WEBPACK_IMPORTED_MODULE_0___default().createElement('<button id="add" class="btn btn-default btn-large btn-bloc">Вставить</button>');
  /**  */

  var details = file.previewElement.querySelector('.dz-details');
  /** кнопка Удалить */

  var removeButton = dropzone__WEBPACK_IMPORTED_MODULE_0___default().createElement('<button class="remove btn btn-default btn-large btn-bloc">Удалить файл</button>');
  /**  */

  var preview = file.previewElement;
  /**  */

  var prevImagesObj = response.files[0].images;
  /**  */

  file.images = prevImagesObj;
  /**  */

  preview.appendChild(removeButton);
  details.appendChild(add);
  preview.addEventListener('click', function () {
    var img = (0,_picture__WEBPACK_IMPORTED_MODULE_1__.picture)(file.images, width);
    tinyMCE.activeEditor.execCommand('mceInsertContent', false, img);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (upload); // module.exports = upload

/***/ }),

/***/ "./microservices/article/assets/js/upload/picture.js":
/*!***********************************************************!*\
  !*** ./microservices/article/assets/js/upload/picture.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "picture": () => (/* binding */ picture)
/* harmony export */ });
/* eslint-disable no-prototype-builtins */
var hash = function hash(obj, _int) {
  return obj.hasOwnProperty(_int);
};
/**
 * Создаём элемент picture
 * @param {Object} obj
 * @param {Object} obj.name имя файла
 * @param {Object} obj.size объём изображения
 * @param {Object} obj.width ширина изображения
 * @param {*} width ширина исходного изображения
 */


var picture = function picture(obj, width) {
  'use strict';

  var pictureElem = '<picture>'; // TODO: брать из настроек микросервиса

  var path = '/public/images/article/resize/';
  var name = obj[width].name;
  var img2x = hash(obj, 2700) ? obj[2700].name : name;
  var img768x = hash(obj, 768) ? obj[768].name : name;
  var img960x = hash(obj, 960) ? obj[960].name : name;
  var img1024x = hash(obj, 1024) ? obj[1024].name : name;
  var img1280x = hash(obj, 1280) ? obj[1280].name : name;
  var img2700x = hash(obj, 2700) ? obj[2700].name : name;
  var img1536x = hash(obj, 1536) ? obj[1536].name : name; //* > 480 (phone landscape & smaller)

  pictureElem += "<source srcset=\"".concat(path + obj['480'].name, " 1x, ").concat(path + img960x, " 2x\" media=\"(max-width: 480px)\">"); //* 4k

  pictureElem += "<source srcset=\"".concat(path + img2x, "\" media=\"(min-width: 1920px)\">"); //* FullHD 1080p (desktop)

  pictureElem += "<source srcset=\"".concat(path + img1280x, " 1x, ").concat(path + img2700x, " 2x\" media=\"(min-width: 1024px)\">"); //* 480 - 768 (tablett)

  pictureElem += "<source srcset=\"".concat(path + img768x, " 1x, ").concat(path + img1536x, " 2x\" media=\"(min-width: 480px) and (max-width: 767px)\">"); //* 768 - 1024 (tablet landscape)

  pictureElem += "<source srcset=\"".concat(path + img1024x, " 1x, ").concat(path + img1536x, " 2x\" media=\"(min-width: 768px) and (max-width: 1023px)\">"); // BUG:#8 Описание картинки в alt=""

  pictureElem += "<img src=\"".concat(path + img1280x, "\" alt=\"\" srcset=\"").concat(img2x, " 2x\">");
  pictureElem += '</picture>';
  return pictureElem;
};

/***/ }),

/***/ "./microservices/article/assets/scss/index.scss":
/*!******************************************************!*\
  !*** ./microservices/article/assets/scss/index.scss ***!
  \******************************************************/
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
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./microservices/article/assets/js/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);