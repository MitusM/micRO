/* eslint-disable no-global-assign */
import '../scss/index.scss'
import _$ from './package' // 
// eslint-disable-next-line no-unused-vars
import Sizes from './smooth-scroll-js/src/sizes' // Size - 
import Scroll from './smooth-scroll-js/src/index' // Scroll -
// eslint-disable-next-line no-unused-vars
import infinity from './Infinite-scroll/src/index' //
import { list, get, add, remove, update, total, destroy, exists, subtotal, onChange } from 'cart-localstorage' // 
import localStorage from 'localStorage' // localStorage -
import {data} from './system/index' //
import {message} from './system/message' // Message -
import Preloader from './system/preloader'; // Preloader - 

// eslint-disable-next-line no-unused-vars
(function (window) {
  'use strict'
  document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    let hamburger = document.getElementById('toggle')
    let body = document.querySelector('body')
    
    hamburger.addEventListener('click', (e) => {
      e.preventDefault()
      body.classList.toggle('sidebar-collapse')
    })

    new Scroll().all({
      speed: 1500,
      easing: 'liner',
      header: '.navbar-fixed',
      bottom: 0
    })

  })

  _$.localStorage = localStorage
  _$.cartStorage = { list, get, add, remove, update, total, destroy, exists, subtotal, onChange }
  _$.data = data
  _$.message = message
  _$.Preloader = Preloader

})(window)