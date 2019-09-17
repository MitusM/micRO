/* global Infinite, _$ */
'use strict'
import '../scss/index.scss'

(async () => {

  /**
   * DOMContentLoaded -
   */
  document.addEventListener('DOMContentLoaded', () => {

    // 
    let page = document.querySelector('.page')
    // Находим  таблицу со списком пользователей
    let table = document.getElementById('table')
    // Находим тело таблицы со списком пользователей
    let tableBody = document.getElementById('table-body')
    // ссылка меню добавить пользователя
    let userAnkor = document.getElementById('users-create')
    // диалоговое окно добавления нового пользователя -> установим обработчик на кнопку закрытия окна
    let newUserModal = new _$.Dialog('#add').initClose()
    // убираем таблицу
    let tableClose = (classSelector) => {
      table.classList.remove(classSelector)
      table.classList.add('zoomIn')
    }
    // форма добавить нового пользователя
    let newUserForm = new _$.Form('form-user__add', true)
    // получаем все элементы формы в виде хэш-таблицы
    let elements = newUserForm.elements
    // 
    // console.log(':::[ newUserForm ]:::', newUserForm)
    new Infinite().scroll({
      url: '/users/',
      method: 'post'
    }, function (data) {
      let obj = JSON.parse(data)
      page.innerHTML = (obj.page)
    })

    /**
     * Вешаем обработчик на всю таблицу с целью делегирования события
     */
    tableBody.addEventListener('click', (e) => {
      // console.log('e.target', e.target)
      let target = e.target
      let dataAttr = _$.data(target)
      console.log('dataAttr', dataAttr)
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
            if (!bool) {
              tableClose(slideLeft)
            } else {
              console.log(':::[ elements ]:::', elements)
              newUserForm.isVal().then(val =>{
                console.log(':::[ val ]:::', val)
                tableClose(slideLeft)
              })
            }
          })
      }

    })

  })
})()