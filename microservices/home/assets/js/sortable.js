/*global _$, secret */
import Sortable from 'sortablejs';

export default function SortableBlock(block) {
  let widget = document.getElementById('widget')
  let length = block.length
  /** Настройки */
  let group = {
    name: 'shared',
    pull: 'clone' // To clone: set pull to 'clone'
  }

  /** Блок виджетов */
  new Sortable(widget, {
    group: group,
    onEnd: function (evt) {
      /** Елемент на который перетащили */
      let to = evt.to
      /** имя блока в который добавляем виджет */
      let block = to.dataset.block
      let widget = to.querySelectorAll('.element')
      let arr = Array.prototype.slice.call(widget)
      let obj = {
        [block]: []
      }
      let i = 0;
      for (i; arr.length > i; i++) {
        let dataSet = {
          ...arr[i].dataset
        }
        obj[block].push(dataSet)
      }
      template()
    }
  })

  /**
  * Обходим блоки
  * @returns {object}
  */
  let update = () => {
    const obj = {}
    for (let i = 0; i < length; i++) {
      const element = block[i];
      const elementBlock = element.dataset.block
      /** HTMLCollection в Array */
      const children = [...element.children]
      /** массив в который добавляем элементы блока */
      const arr = []
      /** объект в котором */
      for (let i = 0; i < children.length; i++) {
        /** DOMStringMap в Object */
        let block = {
          ...children[i].dataset
        }
        arr.push(block)
      }
      obj[elementBlock] = arr
    }
    return obj
  }

  /**  */
  let ajax = function (body) {
    return _$.fetch('/home/structure-home-page', {
      method: 'post',
      body: body
    }).then(done => {
      return done
    })
  }

  /**  */
  let template = () => {
    let body = {
      home: update(),
      token: secret
    }
    ajax(body).then(done => {
      // console.log(':::[ done ]:::', done)
      return done
    })
  }

  /** перетаскиваем элемент между Блоками */
  let onEnd = ( /**Event*/ evt) => {
    /** Элемент который перетащили */
    var itemEl = evt.item; // dragged HTMLElement
    /** Елемент на который перетащили */
    let to = evt.to; // target list
    /** Элемент в старом списке */
    let clone = evt.clone
    /** Удаляем элемент в старом списке */
    clone.remove()
    if (to.id === "widget") {
      itemEl.remove()
    }
    template()
  }

  /** Блоки, в которые перетаскиваем элемент, или между ними */
  for (let i = 0; i < length; i++) {
    const element = block[i];
    new Sortable(element, {
      group: group,
      onEnd: onEnd
    })
  }
  return
}