/* global _$, secret */
// Default SortableJS
import Sortable from 'sortablejs';

export default function SortableList(menu, clone) {
  /** Корзина для удаления */
  let basket = document.getElementById('basket')
  /** Настройки */
  let group = {
    name: 'shared',
    pull: 'clone' // To clone: set pull to 'clone'
  }
  /** Диалоговое окно удаление меню */
  let modal = new _$.Dialog('#dialog').initClose()
  /** Всплывающее сообщение  */
  let message = (success, title, message) => {
    _$.message(success, {
      title: title,
      message: message,
      position: 'topCenter'
    })
  }
  /** Скрываем карзину, если она не была целью */
  let hideBasket = function (to) {
    let hide = false
    if (to.className !== 'basket basket-delete' && basket.classList.contains('basket-delete')) {
      basket.classList.remove('basket-delete')
      hide = true
    }
    return hide
  }
  /** Началось перетаскивание элемента */
  let onStart = function ( /**Event  evt */ ) {
    basket.classList.add('basket-delete')
  }
  /** Событие при перемещении элемента в списке или между списками */
  // let onMove = function ( /**Event*/ evt) {
  //   // console.log(':::[ evt:sortablejs:onMove ]:::', evt)
  //   let dragged = evt.dragged
  //   dragged.classList.add('border-move')
  // }
  /**  */
  let onEnd = function ( /**Event*/ evt) {
    /** Элемент который перетащили */
    var itemEl = evt.item; // dragged HTMLElement
    /** Елемент на который перетащили */
    let to = evt.to; // target list
    /** Элемент в старом списке */
    let clone = evt.clone
    clone.remove()
    hideBasket(to)
    if (to.className === 'basket basket-delete') {
      itemEl.classList.add('hide')
      modal
        .header('Удалить меню')
        .show(bool => {
          if (_$.toBoolean(bool)) {
            _$.fetch('/widget/menu/delete', {
              method: 'delete',
              body: {
                "id": itemEl.id,
                "token": secret
              }
            }).then(done => {
              if (done.status === 201) {
                basket.classList.remove('basket-delete')
                message('success', 'Успешно', done.response)
              } else {
                message('error', 'Ошибка', done.response)
              }
            })
          }
        })
    }
  }
  /**  */
  let sortablejs = new Sortable(menu, {
    group: group,
    animation: 250,
    onStart: onStart,
    // onMove: onMove,
    onEnd: onEnd,
  })

  /** Список в котором добавляется пункт меню */
  let sortMenu = new Sortable(clone, {
    group: group,
    animation: 250,
    onStart: onStart,
    // onMove: onMove,
    onEnd: onEnd,
  })
  /** Корзина */
  let deleteMenu = new Sortable(basket, {
    group: {
      name: group.name,
      pull: false
    },
  })

  return {
    sortablejs,
    sortMenu,
    deleteMenu
  }
}