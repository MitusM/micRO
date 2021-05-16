(self["webpackChunkmicro"] = self["webpackChunkmicro"] || []).push([["users"],{

/***/ "./microservices/users/assets/js/index.js":
/*!************************************************!*\
  !*** ./microservices/users/assets/js/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scss/index.scss */ "./microservices/users/assets/scss/index.scss");
/* global Infinite, _$, lang, config, secret */






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/** 
 * Зависимости: _$.Dialog, _$.Form, _$.data, _$.toBoolean
 */

(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /**
           * DOMContentLoaded -
           */
          document.addEventListener('DOMContentLoaded', function () {
            /** Подгрузка списка пользователей поткруткой страницы в низ */
            new Infinite().scroll({
              url: '/users/',
              method: 'get'
            }, function (data) {
              var obj = JSON.parse(data);
              page.innerHTML = obj.page;
            });
            var doc = document;
            var arrSlice = Array.prototype.slice; // 

            var page = document.querySelector('.page');
            /** Находим  таблицу со списком пользователей */

            var table = document.getElementById('table');
            /** Находим тело таблицы со списком пользователей */

            var tableBody = document.getElementById('table-body'); // ссылка меню добавить пользователя

            var userAnkor = document.getElementById('users-create');
            /** диалоговое окно добавления нового пользователя -> установим обработчик на кнопку закрытия окна */

            var newUserModal = new _$.Dialog('#add').initClose();
            /** убираем таблицу */

            var tableClose = function tableClose(classSelector) {
              table.classList.remove(classSelector);
              table.classList.add('zoomIn');
            };
            /** форма добавить нового пользователя */
            // TODO: второй параметр true нужен ли?


            var newUserForm = new _$.Form('form-user__add', true);
            /** получаем все элементы формы в виде хэш-таблицы */

            var elements = newUserForm.elements;
            /** Диалоговое окно добавить, редактировать пользователя */

            var modal = newUserModal.element;
            /**  */

            var dialog = new _$.Dialog('#dialog');
            /** Открытие диалогового окна */

            var modalOpen = function modalOpen() {
              return modal.setAttribute('open', '');
            };
            /** Всплывающее сообщение  */


            var message = function message(success, title, _message) {
              _$.message('success', {
                title: title,
                message: _message,
                position: 'topCenter'
              });
            };

            var deleteUser = function deleteUser(attr) {
              var id = attr.id;
              dialog // 
              .header("Удалить пользователя").show(function (bool) {
                if (_$.toBoolean(bool)) {
                  _$.fetch("/users/", {
                    method: 'delete',
                    body: {
                      "id": id
                    }
                  }).then(function (done) {
                    if (done.status === 201) {
                      message('success', lang.message.sucs_title, done.response);
                      var elem = doc.getElementById("line-id_".concat(id));
                      elem.classList.add('fadeOutLeft'); // TODO: 

                      setTimeout(function () {
                        elem.remove();
                      }, 500);
                    }
                  });
                }
              });
            };
            /**  */


            var lock = function lock(attr) {
              var id = attr.id;
              var value = attr.value;
              var title = value === "true" ? lang.dialog.title_block : lang.dialog.title_unblock;
              dialog // 
              .header(title).show(function (bool) {
                if (_$.toBoolean(bool)) {
                  _$.fetch("/users/", {
                    method: 'put',
                    body: {
                      "id": id,
                      "target": "block",
                      "block": attr.value,
                      "token": secret
                    }
                  }).then(function (done) {
                    if (done.status === 201) {
                      var success = done.response;
                      message('success', lang.message.sucs_title, success.text);
                      var line = doc.getElementById("line-id_".concat(success.user._id));
                      /** Находим все элементы в строке таблицы соответствующие нашей задаче */

                      var icon = line.querySelectorAll(".".concat(attr.task));
                      /** Передодим из NodeList в array */

                      var iconChildren = arrSlice.call(icon);
                      iconChildren.map(function (elem) {
                        /** Передодим дочерние элементы из HTMLCollection в array */
                        var children = arrSlice.call(elem.children)
                        /** Перебираем дочерние элименты */
                        ;
                        (children || []).forEach(function (child) {
                          /** Если элимент соответствует нашей цели отобразим элемент а не соответствующий скрываем */
                          child.className === attr.target ? child.setAttribute('style', 'display: inline') : child.setAttribute('style', 'display: none');
                        });
                      });
                    } else {// TODO:❓
                    }
                  });
                }
              });
            };
            /**  */


            var update = function update(attr) {
              var id = attr.id;
              var slideLeft = 'zoomOutLeft';

              if (table.classList.contains(slideLeft)) {
                // закрываем диалоговое окно
                tableClose(slideLeft); //

                newUserModal.close(); // 
              } else {
                // окрываем диалоговое окно
                _$.fetch("/users/info-".concat(id), {
                  method: 'get'
                }).then(function (data) {
                  var user = data.user;
                  newUserForm.elementValue(user);
                });

                table.classList.add(slideLeft);
                newUserModal // покажем диалоговое окно
                .header("Редактировать пользователя").show(function (bool) {
                  tableClose(slideLeft);

                  if (_$.toBoolean(bool)) {
                    newUserForm.isVal().then(function (val) {
                      _$.fetch("/users/", {
                        "method": 'put',
                        "body": _objectSpread({
                          "id": id,
                          "target": attr.target
                        }, val)
                      }).then(function (done) {
                        var response = done.response;

                        if (done.status === 201) {
                          message('success', lang.message.sucs_title, response.text);
                          var line = doc.getElementById("line-id_".concat(response.user._id));

                          for (var elem in response.user) {
                            var e = line.querySelector(".".concat(elem));
                            var text = void 0;

                            if (e) {
                              text = e.innerText;
                              e.innerText = response.user[elem];
                            } else if (e === 'block') {//
                            }

                            line.classList.add('zoomIn');
                          }
                        }
                      });
                    });
                  } else {//
                  }
                });
              }
            };
            /**
             * Вешаем обработчик на всю таблицу с целью делегирования события
             */


            tableBody.addEventListener('click', function (e) {
              var target = e.target;

              var dataAttr = _$.data(target);

              console.log('dataAttr', dataAttr);
              var task = dataAttr.task;

              switch (task) {
                case 'delete':
                  deleteUser(dataAttr);
                  break;

                case 'lock':
                  lock(dataAttr);
                  break;

                case 'update':
                  update(dataAttr);
                  break;

                default:
                  break;
              }
            });
            /** 
             * Добавление нового пользователя 
             */

            userAnkor.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
              var slideLeft = 'zoomOutLeft';

              if (table.classList.contains(slideLeft)) {
                // закрываем диалоговое окно
                tableClose(slideLeft); //

                newUserModal.close(); // 
              } else {
                // окрываем диалоговое окно
                table.classList.add(slideLeft);
                newUserModal // покажем диалоговое окно
                .header("Добавить нового пользователя") // установим заголовок модального окна
                .show(function (bool) {
                  if (!_$.toBoolean(bool)) {
                    tableClose(slideLeft);
                  } else {
                    tableClose(slideLeft);
                    newUserForm.isVal().then(function (val) {
                      var validate = newUserForm.validateForm(val, config);

                      if (validate) {
                        tableClose(slideLeft);

                        _$.fetch('/users/create', {
                          method: 'post',
                          body: val
                        }).then(function (data) {
                          if (data.status === 200) {
                            var form = newUserForm._form;
                            form.reset();
                            message('success', lang.message.sucs_title, lang.message.success); // Шаблон

                            tableBody.insertAdjacentHTML('afterbegin', data.html);
                          } else {
                            modalOpen();
                            var name = data.response.name;
                            newUserForm.error(elements[name], lang.error.s_it_is_busy);
                          }
                        });
                      } else {
                        modalOpen();
                      }
                    }); // 
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

/***/ "./microservices/users/assets/scss/index.scss":
/*!****************************************************!*\
  !*** ./microservices/users/assets/scss/index.scss ***!
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
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./microservices/users/assets/js/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);