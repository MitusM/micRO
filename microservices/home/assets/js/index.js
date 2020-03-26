/*global _$, secret */
/**
 * Зависимости:
 */
'use strict'
var delegate = require('delegate')
import SortableBlock from './sortable';
import '../scss/index.scss'

(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    /** Находим все блоки. Превратив NodeList в Array*/
    let block = [...document.querySelectorAll('.block')]
    /**  Превратим NodeList в Array */
    // let arrBlock = Array.prototype.slice.call(block)

    delegate('#content', '.fa-eye', 'click', function (e) {
      /** Элемент на котором наступило событие */
      let el = e.delegateTarget
      /** Родительский элемент */
      let parent = el.parentElement
      let data = {
        /** DOMStringMap в Object */
        ...parent.dataset
      }
      let view = parent.querySelector('.view')
      let html = view.innerHTML
      let menuTitle = parent.querySelector('.title-menu-block')
      menuTitle.classList.toggle('view-menu-display')
      let classList = view.classList

      if (html ==='') {
        _$.fetch('/widget/view-widget', {
          method: 'post',
          body: {
            "token": secret,
            ...data
          }
        }).then(done => {
          if (done.status === 200) {
            view.innerHTML = done.response.html
            classList.toggle('hide')
          }
        })
      } else {
        classList.toggle('hide')
      }

    }, false);

    /**  */
    SortableBlock(block)

  })
})()