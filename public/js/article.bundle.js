(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["article"],{

/***/ "./microservices/article/assets/js/index.js":
/*!**************************************************!*\
  !*** ./microservices/article/assets/js/index.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/article/assets/scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tinymce/tinymce */ "./microservices/article/node_modules/tinymce/tinymce.js");
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tinymce_tinymce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tinymce/themes/silver */ "./microservices/article/node_modules/tinymce/themes/silver/index.js");
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tinymce_plugins_paste__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/plugins/paste */ "./microservices/article/node_modules/tinymce/plugins/paste/index.js");
/* harmony import */ var tinymce_plugins_paste__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_paste__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/plugins/link */ "./microservices/article/node_modules/tinymce/plugins/link/index.js");
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tinymce_plugins_hr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tinymce/plugins/hr */ "./microservices/article/node_modules/tinymce/plugins/hr/index.js");
/* harmony import */ var tinymce_plugins_hr__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_hr__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tinymce_plugins_autoresize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tinymce/plugins/autoresize */ "./microservices/article/node_modules/tinymce/plugins/autoresize/index.js");
/* harmony import */ var tinymce_plugins_autoresize__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_autoresize__WEBPACK_IMPORTED_MODULE_6__);
 //  Import TinyMCE

 // A theme is also required

 // import 'tinymce/themes/modern'
//






(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // require.ensure(['tinymce/tinymce', 'tinymce/themes/silver'], (require) => {
    // const tinymce = require('tinymce')
    // require('tinymce/themes/silver')
    //   console.log(':::[ tinemce ]:::', tinymce)
    // tinymce.init({
    //   mode : "exact",
    //   schema: 'html5',
    //   convert_urls: false,
    //   height: 400,
    //   elements: "post_article",
    //   theme: "modern",
    //   toolbar1: "print preview media | insertfile undo redo | cut copy paste | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image | emoticons",
    //   toolbar2: "proofread | typograf  spellchecker html-formatting | pagebreak code template",
    //   image_advtab: true,
    //   inline: false,
    //   language: 'ru',
    //   content_css : "/css/style.css",
    //   paste_as_text: true,
    //   pagebreak_split_block: true,
    //   spellchecker_languages : "+Russian=ru,Ukrainian=uk,English=en",
    //   spellchecker_rpc_url : "http://speller.yandex.net/services/tinyspell",
    //   spellchecker_word_separator_chars : '\\s!"#$%&()*+,./:;<=>?@[\]^_{|}\xa7\xa9\xab\xae\xb1\xb6\xb7\xb8\xbb\xbc\xbd\xbe\u00bf\xd7\xf7\xa4\u201d\u201c',
    //   //-pagebreak_separator: '<!-- [SEPARATOR] -->',
    //   plugins: [
    //       "advlist autolink lists link image charmap print preview hr anchor pagebreak",
    //       "searchreplace wordcount visualblocks visualchars code fullscreen",
    //       "insertdatetime media nonbreaking save table contextmenu directionality",
    //       "emoticons template paste textcolor colorpicker textpattern imagetools spellchecker autoresize"
    //   ]
    // })
    tinymce_tinymce__WEBPACK_IMPORTED_MODULE_1___default.a.init({
      // schema: 'html5',
      skin: 'oxide',
      selector: 'textarea#post-article',
      height: '480',
      language: 'ru',
      content_css: '/article.css',
      block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
      branding: false,
      spellchecker_languages: "+Russian=ru,Ukrainian=uk,English=en",
      spellchecker_rpc_url: "http://speller.yandex.net/services/tinyspell",
      spellchecker_word_separator_chars: '\\s!"#$%&()*+,./:;<=>?@[\]^_{|}\xa7\xa9\xab\xae\xb1\xb6\xb7\xb8\xbb\xbc\xbd\xbe\u00bf\xd7\xf7\xa4\u201d\u201c',
      tabfocus_elements: "somebutton",
      draggable_modal: true,
      toolbar1: "print preview media | insertfile undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image | emoticons | spellchecker | code template insert",
      // toolbar2: " | spellchecker html-formatting | code template insert",
      toolbar2: "customDateButton customInsertButton",
      plugins: ["advlist autolink lists link image charmap print preview hr anchor", "searchreplace wordcount visualblocks visualchars code fullscreen", "insertdatetime media nonbreaking save table directionality", "emoticons template paste textpattern imagetools spellchecker autoresize tabfocus"],
      setup: function (editor) {
        // editor.ui.registry.addMenuButton('insert', {
        //   icon: 'plus',
        //   tooltip: 'Insert',
        //   fetch: (callback) => callback('image link | inserttable')
        // });
        // editor.ui.registry.addButton('myCustomToolbarButton', {
        //   icon: 'plus',
        //   text: 'My Custom Button',
        //   onAction: () => alert('Button clicked!')
        // });
        editor.ui.registry.addButton('customInsertButton', {
          text: 'Главред',
          // image: '/images/pipe-1.png',
          tooltip: 'Проверить текст на стоп-слова',
          onAction: function () {
            editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
          }
        });

        var toTimeHtml = function (date) {
          return '<time datetime="' + date.toString() + '">' + date.toDateString() + '</time>';
        };

        editor.ui.registry.addButton('customDateButton', {
          icon: 'insert-time',
          tooltip: 'Insert Current Date',
          disabled: true,
          onAction: function () {
            editor.insertContent(toTimeHtml(new Date()));
          },
          onSetup: function (buttonApi) {
            var editorEventCallback = function (eventApi) {
              buttonApi.setDisabled(eventApi.element.nodeName.toLowerCase() === 'time');
            };

            editor.on('NodeChange', editorEventCallback);
            /* onSetup should always return the unbind handlers */

            return function (buttonApi) {
              editor.off('NodeChange', editorEventCallback);
            };
          }
        });
        /* example,
        adding a toolbar menu button */
        // editor.ui.registry.addMenuButton('mybutton', {
        //   text: 'My button',
        //   fetch: function (callback) {
        //     var items = [{
        //         type: 'menuitem',
        //         text: 'Menu item 1',
        //         onAction: function () {
        //           editor.insertContent('&nbsp;<em>You clicked menu item 1!</em>');
        //         }
        //       },
        //       {
        //         type: 'nestedmenuitem',
        //         text: 'Menu item 2',
        //         icon: 'user',
        //         getSubmenuItems: function () {
        //           return [{
        //               type: 'menuitem',
        //               text: 'Sub menu item 1',
        //               icon: 'unlock',
        //               onAction: function () {
        //                 editor.insertContent('&nbsp;<em>You clicked Sub menu item 1!</em>');
        //               }
        //             },
        //             {
        //               type: 'menuitem',
        //               text: 'Sub menu item 2',
        //               icon: 'lock',
        //               onAction: function () {
        //                 editor.insertContent('&nbsp;<em>You clicked Sub menu item 2!</em>');
        //               }
        //             }
        //           ];
        //         }
        //       }
        //     ];
        //     callback(items);
        //   }
        // });
        //   editor.ui.registry.addMenuButton('proofread', {
        //     // type: 'button',
        //     tooltip: 'Проверить текст на стоп-слова',
        //     // icon: 'plus',
        //     image : '/images/glvrd-icon.png',
        //     // id: 'proofread',
        //     fetch: (callback) => callback('image link | inserttable')
        //     // onclick : function() {
        //     //     //-editor.windowManager.alert('Hello world!! Selection: ' + editor.selection.getContent({format : 'text'}));
        //     //     var word = editor.getContent().toString().trim();
        //     //     console.log(':::[ word ]:::', word)
        //     //     // post.glavred(word);
        //     //     //-var stop_word = post.glavred(word);
        //     // }
        // });
        // editor.on('NodeChange', function (e) {
        //   if (e.element.nodeName === 'IMG' && e.element.classList.contains('mce-object') === false) {
        //     //-resizeImage($(e.element), e.width, e.height);
        //     console.log(e);
        //   }
        //   // var word = tinyMCE.activeEditor.selection.getNode();
        //   // console.log(':::[ word ]:::', word)
        // });
      }
    }); // },'tinymce')
  }); // DOMContentLoaded
})();

/***/ }),

/***/ "./microservices/article/assets/scss/index.scss":
/*!******************************************************!*\
  !*** ./microservices/article/assets/scss/index.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/article/assets/scss/index.scss");

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

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/article/assets/scss/index.scss":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./microservices/article/assets/scss/index.scss ***!
  \*****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./microservices/article/assets/js/index.js","runtime","vendors"]]]);