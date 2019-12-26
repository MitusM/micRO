/*global  */
'use strict'
var delegate = require('delegate')
import MultipleContainers from './draggable'
/** 
 * Зависимости: 
 */
import '../scss/index.scss'

(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    /** Находим все блоки */
    let block = document.querySelectorAll('.block')
    /**  Превратим NodeList в Array */
    let arrBlock = Array.prototype.slice.call(block)
    console.log(':::[ arrBlock ]:::', arrBlock)

    delegate(document.body, '.block', 'click', function (e) {
      console.log(e.delegateTarget);
    }, false);

    let m = MultipleContainers()
    console.log(':::[ MultipleContainers() ]:::', m)


    // delegate('#widget', '.widget-element', 'dragstart', function (e) {
    //   console.log('dragstart', e.delegateTarget);
    // }, false)

    // delegate(document.body, '.block', 'dragend', function (e) {
    //   console.log(e.delegateTarget);
    // }, false);

    // new dragdrop.start((dom, api) => {
    //   // console.log(':::[ dom ]:::', dom)
    //   dom.addEventListener('drop', (event) => {
    //     console.log(api);
    //   })
    // });
  })
})()