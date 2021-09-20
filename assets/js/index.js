import '../scss/index.scss';
import 'tippy.js/dist/tippy.css';

import {
  list,
  get,
  add,
  remove,
  update,
  total,
  destroy,
  exists,
  subtotal,
  onChange
} from 'cart-localstorage';
//
import localStorage from 'localStorage';

import validator from 'validator';

import _$ from './package' //
import './smooth-scroll-js/src/sizes' // Size -
//////////////////////////////////////// 
import {
  default as Scroll
}
from './smooth-scroll-js/src/index' // Scroll -
//////////////////////////////////////// 
import './Infinite-scroll/src/index' //
import {
  message
} from './system/message' // Message -
//////////////////////////////////////// 
import {
  default as Preloader
} from './system/preloader' // Preloader -
//////////////////////////////////////// 
import './Waves/src/js/waves'
////////////////////////////////////////
import Dialog from './modal/'
//////////////////////////////////////// 
import Form from './form/';

import {
  attr,
  data
} from './system/attribute';

import {
  has,
  each
} from './system/each';

import {
  create
} from './system/create';

import {
  extend
} from './system/extend';

import {
  ajax
} from './system/fetch';

import {
  toBoolean
} from './system/boolean';

import delegate from 'delegate';

import tippy from 'tippy.js';
// let Dialog = require('./modal/')

// import tippy from 'tippy.js';


// eslint-disable-next-line no-unused-vars
(function (window) {
  'use strict'
  document.addEventListener('DOMContentLoaded', () => {
    // e.preventDefault()
    let hamburger = document.getElementById('toggle')
    let body = document.querySelector('body')
    if (hamburger) {
      hamburger.addEventListener('click', (e) => {
        e.preventDefault()
        body.classList.toggle('sidebar-collapse')
      })
    }

    new Scroll().all({
      speed: 1500,
      easing: 'liner',
      header: '.navbar-fixed',
      bottom: 0
    })

  })

  _$.localStorage = localStorage
  _$.cartStorage = {
    list,
    get,
    add,
    remove,
    update,
    total,
    destroy,
    exists,
    subtotal,
    onChange
  }
  _$.data = data
  _$.attr = attr
  _$.has = has
  _$.each = each
  _$.create = create
  _$.extend = extend
  _$.message = message
  _$.Preloader = Preloader
  _$.Dialog = Dialog
  _$.Form = Form
  _$.validator = validator
  _$.fetch = ajax
  _$.toBoolean = toBoolean
  _$.delegate = delegate
  _$.tippy = tippy
  // _$.Waves = Waves

})(window)