import '../scss/index.scss'
import Sizes from './smooth-scroll-js/src/sizes'
import Scroll from './smooth-scroll-js/src/index'

(function (window) {
  'use strict'
  document.addEventListener('DOMContentLoaded', () => {
    let hamburger = document.getElementById('toggle')
    let body = document.querySelector('body')
    hamburger.addEventListener('click', (e) => {
      e.preventDefault()
      body.classList.toggle('sidebar-collapse')
    })
    // let Scroll = new Scroll()
    new Scroll().all({
      speed: 2000,
      easing: 'easeInOutCubic',
      header: '.navbar-fixed'
    }, function (hash, position) {
      console.log('hash', hash)
      console.log('position', position)
    })
    let size = new Sizes()
  let viewportHeight = size.view.height
  console.log('viewportHeight', viewportHeight)
  let heightBody = size.size.height
  console.log('heightBody', heightBody)

  })

  console.log('Sizes', Sizes)
  console.log('Scrool', Scroll)
  window.Sizes = Sizes
  window.Scroll = Scroll
})(window)