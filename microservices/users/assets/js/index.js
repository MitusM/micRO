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
    // 
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
      // console.log(':::[ e ]:::', e)
      // console.log(':::[ table ]:::', table)
      // let tableClassList = table.classList
      let slideLeft = 'zoomOutLeft'
      if (table.classList.contains(slideLeft)) {
        table.classList.remove(slideLeft)
        table.classList.add('zoomIn')
      } else {
        table.classList.add(slideLeft)
      }
    })

  })
})()