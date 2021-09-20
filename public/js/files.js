(self["webpackChunkmicro"] = self["webpackChunkmicro"] || []).push([["files"],{

/***/ "./microservices/files/assets/js/index.js":
/*!************************************************!*\
  !*** ./microservices/files/assets/js/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./microservices/files/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./microservices/files/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dropzone_dist_dropzone_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dropzone/dist/dropzone.css */ "./microservices/files/node_modules/dropzone/dist/dropzone.css");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/files/assets/scss/index.scss");
/* harmony import */ var _libs_FRTcloud_src_assets_js_dropzone_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../libs/FRTcloud/src/assets/js/dropzone.js */ "./microservices/files/libs/FRTcloud/src/assets/js/dropzone.js");






(function () {
  'use strict';

  var lang = {
    ru: {
      dropzone: 'Перетащите изображения в данную область и отпустите, или кликните по ней для начала загрузки файла.',
      message: {
        error: {
          title: 'Во время загрузки произошла ошибка.',
          success: 'Сервер не смог загрузить файл, попробуйте позже.'
        },
        success: {
          title: '',
          done: 'Загрузка прошла успешно.'
        },
        limit: {
          title: '!!!!',
          body: 'Превышен лимит по количеству доступных для загрузки.'
        },
        "delete": {
          title: '',
          body: 'Файл успешно удалён.'
        }
      },
      error: {
        "delete": {
          title: '',
          body: 'Во время удаления произошла ошибка.'
        }
      }
    }
  };
  var message = lang.ru.message;
  var position = 'topCenter';
  var maxfilesexceeded = false;
  var doc = document; // 👣 📽 🎞 ❗️ © ™ 💯 💫 💥 ☑️ ✔️ ⁉️ ‼️

  doc.addEventListener('DOMContentLoaded', /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var files, folder, clickFiles, csrf, dropzoneAdd, addFilesAndFolder, uploadFile, fileRename, deleteFile, settings;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            settings = function _settings(data) {};

            deleteFile = function _deleteFile(data) {
              try {
                var element;
                var name = data.name;

                _$.fetch('/files/delete/misha', {
                  method: 'delete',
                  body: {
                    files: [data.path],
                    fields: {
                      csrf: csrf()
                    }
                  }
                }).then(function (done) {
                  if (done.status === 200) {
                    _$.message('success', {
                      title: message["delete"].title,
                      message: message["delete"].body,
                      position: position
                    });

                    element = doc.getElementById(name);
                    element.classList.add('fadeOutUp');
                    setTimeout(function () {
                      element.remove();
                    }, 600);
                  } else {
                    new Error(lang.ru.error["delete"].body);
                  }
                })["catch"](function (error) {
                  return error;
                });
              } catch (err) {
                console.log('⚡ err::deleteFile', err);
              }
            };

            fileRename = function _fileRename(data) {};

            /** ul files */
            clickFiles = doc.querySelector('#files');

            csrf = function csrf() {
              return doc.querySelector('meta[name=csrf-token]').getAttributeNode('content').value;
            };
            /** Dropzone add */


            dropzoneAdd = doc.querySelector('.files-panel-container-add');
            /** Icon add new file and folder */

            addFilesAndFolder = doc.getElementById('icon-add');
            addFilesAndFolder.addEventListener('click', function (e) {
              var target = e.target;
              var that = this; // меню добавления файла или папки

              var children = that.children[1]; // показываем меню добавления файла или папки

              children.classList.toggle('display-view');

              if (target.classList[0] === 'add-files-text') {
                dropzoneAdd.classList.add('display-view');
              }
            });
            /** Папки */
            // _$.delegate('#folders', 'div', 'click', function (e) {
            //   console.log(e.delegateTarget);
            // }, false);

            /** Файлы */
            // _$.tippy('.menu-outline', {
            //   content: '<strong>Bolded content</strong>',
            //   allowHTML: true,
            //   trigger: 'click',
            // });

            /** 
             * 
             */

            clickFiles.addEventListener('click', function (e) {
              var target = e.target;
              var parent = target.offsetParent;

              if (parent) {
                // if parent exists and is not a click menu svg 
                var classList = parent.classList[0]; // если клик произошёл не на меню файла, выделяем li в котором находится файл

                if (classList !== 'files-panel-item-menu__icon' && classList !== 'files-panel-item-menu') {
                  parent.classList.toggle('files-click');
                }
              }
            });
            /** 
             ** Меню файла. 
             * Показываем меню файла.
             */

            _$.delegate('ul', '.menu-outline', 'click', function (e) {
              var target = e.target;
              var parentNode = target.parentNode;
              var children = parentNode.children[1];
              children.classList.toggle('display-view');
            });

            _$.delegate('ul', 'span', 'click', function (e) {
              var target = e.target;
              var parent = target.offsetParent;
              var data;
              var id;

              if (parent) {
                data = target.dataset;
                id = target.id;

                switch (id) {
                  case 'menu-file-rename':
                    {
                      fileRename(data);
                      break;
                    }

                  case 'menu-file-delete':
                    {
                      deleteFile(data);
                      break;
                    }

                  case 'menu-file-settings':
                    {
                      settings(data);
                      break;
                    }

                  default:
                    {
                      break;
                    }
                }
              }
            });

            console.log('⚡ user', user);
            /**
             * Загружаем файлы
             */

            uploadFile = (0,_libs_FRTcloud_src_assets_js_dropzone_js__WEBPACK_IMPORTED_MODULE_4__.Upload)({
              url: '/files/upload/misha',
              acceptedFiles: 'image/*',
              lang: lang
            }).on('success', function (file, response) {
              // Если файл успешно загружен удалим превью из Dropzone
              if (response.status === 201) {
                clickFiles.insertAdjacentHTML('afterbegin', response.file);
                uploadFile.removeFile(file);
              }
            }); // _$.delegate('#files', 'li', 'mouseover', function (e) {
            //   // console.log('⚡ e', e)
            //   let target = e.target
            //   console.log('❗️ target', target)
            // })

            /** Показываем меню файла */
            // clickFiles.onmouseover = function (e) {
            // let target = e.target
            // let localName = target.localName
            // if (localName === 'figure') {
            //   console.log('-----------------------------------------')
            //   console.log('❗️ target', target)
            //   console.log('⚡ localName', localName)
            //   let parentElement = target.parentElement
            //   let firstElementChild = target.firstElementChild
            //   console.log('⚡ parentElement', parentElement)
            //   console.log('💥 firstElementChild', firstElementChild)
            // }
            //   menuFilesView(e)
            // }
            // /** Скрываем меню файла */
            // clickFiles.onmouseout = function (e) {
            // let target = e.target
            // console.log('👣 target', target)
            //   menuFilesView(e)
            // }
            // function menuFilesView(e) {
            //   let target = e.target
            //   console.log('⚡ e.type', e.type)
            //   let type = e.type
            //   let localName = target.localName
            //   console.log('❗️ target', target)
            //   if (localName === 'figure') {
            //     // console.log('-----------------------------------------')
            //     // console.log('⚡ localName', localName)
            //     let parentElement = target.parentElement
            //     let firstElementChild = target.firstElementChild
            //     if (type === "mouseover") firstElementChild.classList.add('display-view')
            //     if (type === "mouseout") firstElementChild.classList.remove('display-view')
            //   }
            // }

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))); // DOMContentLoaded
})();

/***/ }),

/***/ "./microservices/files/libs/FRTcloud/src/assets/js/dropzone.js":
/*!*********************************************************************!*\
  !*** ./microservices/files/libs/FRTcloud/src/assets/js/dropzone.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Upload": () => (/* binding */ Upload)
/* harmony export */ });
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dropzone */ "./microservices/files/libs/FRTcloud/node_modules/dropzone/dist/dropzone.js");
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dropzone__WEBPACK_IMPORTED_MODULE_0__);



(dropzone__WEBPACK_IMPORTED_MODULE_0___default().autoDiscover) = false;
function Upload(options) {
  // console.log('💯 options', options)
  var lang = options.lang;
  var message = lang.ru.message;
  var position = 'topCenter' || 0;
  var maxfilesexceeded = false;
  var upload = new (dropzone__WEBPACK_IMPORTED_MODULE_0___default())('div#dropzone', {
    url: options.url,
    dictDefaultMessage: lang.ru.dropzone,
    acceptedFiles: options.acceptedFiles,
    // maxFiles: 3, //* лимит на загрузку файлов. Сколько всего можно загрузить файлов
    uploadMultiple: options.uploadMultiple || false,
    parallelUploads: options.parallelUploads || 1,
    addRemoveLinks: options.addRemoveLinks || true,
    withCredentials: options.withCredentials || true,
    timeout: options.timeout || 600000,
    thumbnailWidth: options.thumbnailWidth || 240,
    thumbnailHeight: options.thumbnailHeight || 240 // previewTemplate: document.querySelector("#tpl").innerHTML

  });
  upload.on('sending', function (file, xhr, formData) {
    var csrf = document.querySelector('meta[name=csrf-token]').getAttributeNode('content').value; // BUG:🐞 Если добавляется несколько файлов то к каждому файлу добавляется значение
    // FIXME: Ко всем файлам один csrf-token
    //TODO: Ко всем файлам один csrf-token

    formData.append('csrf', csrf);
  });
  /** Вызывается для каждого файла, который был отклонен, поскольку количество файлов превышает ограничение maxFiles. */

  upload.on('maxfilesexceeded', function () {
    //* NOTE: Удаляем файлы к загрузки превысившие лимит по количеству добавляемых к загрузке за один раз
    // upload.removeFile(file)
    maxfilesexceeded = true;

    _$.message('error', {
      title: message.limit.title,
      message: message.limit.success,
      position: position
    }); // console.log('maxfilesexceeded===>')

  }); // === === === === === === === === === === === ===
  //* Вызывается, когда загрузка была успешной или ошибочной. */
  // === === === === === === === === === === === ===

  upload.on('complete', function (file) {
    // FIX: DROPZONE - добавить всплывающее сообщение об неудачной или удачной загрузки файла
    if (file.status === 'error' && maxfilesexceeded === false) {
      _$.message('error', {
        title: message.error.title,
        message: message.error.success,
        position: position
      });

      upload.removeFile(file);
    } else if (file.status === 'success') {
      _$.message('success', {
        title: message.success.title,
        message: message.success.done,
        position: position
      });
    }
  });
  return upload;
}

/***/ }),

/***/ "./microservices/files/assets/scss/index.scss":
/*!****************************************************!*\
  !*** ./microservices/files/assets/scss/index.scss ***!
  \****************************************************/
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
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./microservices/files/assets/js/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);