/* global Infinite, _$ */
'use strict'
import '../scss/index.scss'

(async () => {
  // function data (e, attr, val) {
  //   let element = e.target || e
  //   let data = !attr ? element.dataset : (!val ? element.dataset[attr] : element.dataset[attr] = val)
  //   return data
  // }

  /**
   * DOMContentLoaded -
   */
  document.addEventListener('DOMContentLoaded', () => {
    let page = document.querySelector('.page')
    let table = document.getElementById('table-body')

    new Infinite().scroll({
      url: '/users/',
      method: 'post'
    }, function (data) {
      let obj = JSON.parse(data)
      // console.log('_data', obj)
      page.innerHTML = (obj.page)
    })

    table.addEventListener('click', (e) => {
      // console.log('e.target', e.target)
      let target = e.target
      let dataAttr = _$.data(target)
      console.log('dataAttr', dataAttr)
    })

  })
})()