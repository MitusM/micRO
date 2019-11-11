/* global Infinite, _$, lang, config, secret */
'use strict'
import '../scss/index.scss'

/** 
 * Зависимости: _$.Dialog, _$.Form, _$.data, _$.toBoolean
 */
(async () => {

  /**
   * DOMContentLoaded -
   */
  document.addEventListener('DOMContentLoaded', () => {
    /** Подгрузка списка пользователей поткруткой страницы в низ */
    new Infinite().scroll({
      url: '/users/',
      method: 'get'
    }, function (data) {
      let obj = JSON.parse(data)
      page.innerHTML = (obj.page)
    })
    let doc = document
    let arrSlice = Array.prototype.slice
    // 
    let page = document.querySelector('.page')
    /** Находим  таблицу со списком пользователей */
    let table = document.getElementById('table')
    /** Находим тело таблицы со списком пользователей */
    let tableBody = document.getElementById('table-body')
    // ссылка меню добавить пользователя
    let userAnkor = document.getElementById('users-create')
    /** диалоговое окно добавления нового пользователя -> установим обработчик на кнопку закрытия окна */
    let newUserModal = new _$.Dialog('#add').initClose()
    /** убираем таблицу */
    let tableClose = (classSelector) => {
      table.classList.remove(classSelector)
      table.classList.add('zoomIn')
    }
    /** форма добавить нового пользователя */ // TODO: второй параметр true нужен ли?
    let newUserForm = new _$.Form('form-user__add', true)
    /** получаем все элементы формы в виде хэш-таблицы */
    let elements = newUserForm.elements
    /** Диалоговое окно добавить, редактировать пользователя */
    let modal = newUserModal.element
    /**  */
    let dialog = new _$.Dialog('#dialog')
    /** Открытие диалогового окна */
    let modalOpen = () => {
      return modal.setAttribute('open', '')
    }
    /** Всплывающее сообщение  */
    let message = (success, title, message) => {
      _$.message('success', {
        title: title,
        message: message,
        position: 'topCenter'
      })
    }

    let deleteUser = (attr) => {
      let id = attr.id
      dialog // 
        .header("Удалить пользователя")
        .show(bool => {
          if (_$.toBoolean(bool)) {
            _$.fetch("/users/", {
              method: 'delete',
              body: {
                "id": id
              }
            }).then(done => {
              if (done.status === 201) {
                message('success', lang.message.sucs_title, done.response)
                let elem = doc.getElementById(`line-id_${id}`)
                elem.classList.add('fadeOutLeft')
                // TODO: 
                setTimeout(() => {
                  elem.remove()
                }, 500)

              }
            })
          }
        })
    }
    /**  */
    let lock = (attr) => {
      let id = attr.id
      let value = attr.value
      let title = (value === "true") ? lang.dialog.title_block : lang.dialog.title_unblock
      dialog // 
        .header(title)
        .show(bool => {
          if (_$.toBoolean(bool)) {
            _$.fetch("/users/", {
              method: 'put',
              body: {
                "id": id,
                "target": "block",
                "block": attr.value,
                "token": secret
              }
            }).then(done => {
              if (done.status === 201) {
                let success = done.response
                message('success', lang.message.sucs_title, success.text)
                let line = doc.getElementById(`line-id_${success.user._id}`)
                /** Находим все элементы в строке таблицы соответствующие нашей задаче */
                let icon = line.querySelectorAll(`.${attr.task}`)
                /** Передодим из NodeList в array */
                let iconChildren = arrSlice.call(icon)
                iconChildren.map(elem => {
                  /** Передодим дочерние элементы из HTMLCollection в array */
                  let children = arrSlice.call(elem.children)
                  /** Перебираем дочерние элименты */
                  ;(children || []).forEach(child => {
                    /** Если элимент соответствует нашей цели отобразим элемент а не соответствующий скрываем */
                    (child.className === attr.target) ? child.setAttribute('style', 'display: inline'): child.setAttribute('style', 'display: none')
                  })
                })
              } else {
                // TODO:❓
              }
            })
          }
        })
    }

    /**  */
    let update = (attr) => {
      let id = attr.id
      let slideLeft = 'zoomOutLeft'
      if (table.classList.contains(slideLeft)) { // закрываем диалоговое окно
        tableClose(slideLeft) //
        newUserModal.close() // 
      } else { // окрываем диалоговое окно
        _$.fetch(`/users/info-${id}`, {
          method: 'get',
        }).then(data => {
          let user = data.user
          newUserForm.elementValue(user)
        })

        table.classList.add(slideLeft)
        newUserModal // покажем диалоговое окно
          .header("Редактировать пользователя")
          .show(bool => {
            tableClose(slideLeft)
            if (_$.toBoolean(bool)) {
              newUserForm.isVal().then(val => {
                _$.fetch("/users/", {
                  "method": 'put',
                  "body": {
                    "id": id,
                    "target": attr.target,
                    ...val
                  }
                }).then(done => {
                  let response = done.response
                  if (done.status === 201) {
                    message('success', lang.message.sucs_title, response.text)
                    let line = doc.getElementById(`line-id_${response.user._id}`)
                    for (let elem in response.user) {
                      let e = line.querySelector(`.${elem}`)
                      let text
                      if (e) {
                        text = e.innerText
                        e.innerText = response.user[elem]
                      } else if (e === 'block') {
                        //
                      }
                      line.classList.add('zoomIn')
                    }
                  }
                })
              })
            } else {
              //
            }
          })

      }
    }
    /**
     * Вешаем обработчик на всю таблицу с целью делегирования события
     */
    tableBody.addEventListener('click', (e) => {
      let target = e.target
      let dataAttr = _$.data(target)
      console.log('dataAttr', dataAttr)
      let task = dataAttr.task
      switch (task) {
        case 'delete':
          deleteUser(dataAttr)
          break
        case 'lock':
          lock(dataAttr)
          break
        case 'update':
          update(dataAttr)
          break
        default:
          break
      }
    })

    /** 
     * Добавление нового пользователя 
     */
    userAnkor.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      let slideLeft = 'zoomOutLeft'
      if (table.classList.contains(slideLeft)) { // закрываем диалоговое окно
        tableClose(slideLeft) //
        newUserModal.close() // 
      } else { // окрываем диалоговое окно
        table.classList.add(slideLeft)
        newUserModal // покажем диалоговое окно
          .header("Добавить нового пользователя") // установим заголовок модального окна
          .show(bool => {
            if (!_$.toBoolean(bool)) {
              tableClose(slideLeft)
            } else {
              tableClose(slideLeft)
              newUserForm.isVal().then(val => {
                let validate = newUserForm.validateForm(val, config)
                if (validate) {
                  tableClose(slideLeft)
                  _$.fetch('/users/create', {
                    method: 'post',
                    body: val
                  }).then(data => {
                    if (data.status === 200) {
                      let form = newUserForm._form
                      form.reset()
                      message('success', lang.message.sucs_title, lang.message.success)
                      // Шаблон
                      tableBody.insertAdjacentHTML('afterbegin', data.html)
                    } else {
                      modalOpen()
                      let name = data.response.name
                      newUserForm.error(elements[name], lang.error.s_it_is_busy)
                    }
                  })
                } else {
                  modalOpen()
                }
              })
              // 
            }
          })
      }
    })

  }) // DOMContentLoaded
})()