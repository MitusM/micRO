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
    // Находим таблицу со списком пользователей
    let table = document.getElementById('table-body')
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
    table.addEventListener('click', (e) => {
      // console.log('e.target', e.target)
      let target = e.target
      let dataAttr = _$.data(target)
      console.log('dataAttr', dataAttr)
    })

  })
})()