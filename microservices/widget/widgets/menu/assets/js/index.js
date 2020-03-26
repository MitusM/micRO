/* global _$, secret */
/**
 * Зависимости:
 */
import '../scss/index.scss'
//  var delegate = require('delegate')
import SortableList from './sortable';
import Menu from './menu';

(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    /** кнопка добавить пункт меню */
    let button = document.getElementById('menu-item-add')
    /**  форма добавления пункта меню */
    let form = document.forms['menu-item-form-add']
    /** кнопка добавить меню */
    let buttonMenu = document.getElementById('menu-add')
    /**  форма добавления пункта меню */
    let formMenu = document.forms['menu-form-add']
    /** список меню */
    let menuList = document.getElementById('menu-list')
    /** меню в котором добавляем пункты меню */
    let menuEl = 'menu-item-list'
    /** менб в которое добавляем пункты меню HTMLElement  */
    let append = document.getElementById(menuEl)
    /** кнопка сохранить пункты меню */
    let buttonSaveItem = document.getElementById('button-save-item-menu')
    /** id элемента ul из которого извлекаем данные для сохранения */
    let ulSaveId
    /** Массив меню */
    let menuListInit = [...document.querySelectorAll('#menu-list .drag_ul_0')]

    /**  */
    let drop = new Menu(menuEl)
    drop.setMaximum(7); //TODO: вынести в настройки сайта максимальный уровень вложенности пунктов меню
    drop.setMessageMax('Максимальная вложенность достигнута'); //
    for (const item in menuListInit) {
      const element = menuListInit[item];
      if (element.childElementCount > 0) {
        drop.initTree(element)
      }
    }

    SortableList(menuList, append)

    let edit = function (body) {
      let position = 'topCenter'
      return _$.fetch('/widget/menu/edit', {
        method: 'put',
        body: body
      }).then(done => {
        if (done.status === 201) {
          _$.message('success', {
            title: 'Успешно',
            message: "Данные успешно обновлены",
            position: position
          })
        } else {
          _$.message('error', {
            title: 'Ошибка',
            message: done.response,
            position: position
          })
        }
        return done
      })
    }

    let cancelRename = function (e) {
      let titleElem = e.nextSibling
      titleElem.classList.remove('hide')
      e.removeEventListener('keydown', renameCheckKeyCode)
      e.remove()
    }

    let saveTitleMenu = async function (e) {
      let titleElem = e.nextSibling
      let val = e.value
      let id = titleElem.parentNode.id
      let body = {
        "id": id,
        "title": val,
        "token": secret
      }
      let success = await edit(body)
      if (success.status === 201) {
        titleElem.innerText = val
      }
      cancelRename(e)
    }

    let renameCheckKeyCode = function (e) {
      if (e.keyCode == 13) { // Enter pressed
        e.preventDefault();
        e.stopPropagation();
        saveTitleMenu(this)
      }
      if (e.keyCode == 27) { // ESC pressed
        cancelRename(this);
      }
    }

    _$.delegate(menuList, 'a', 'click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      let target = e.delegateTarget
      let text = target.innerText
      let textBox = document.createElement('input')
      textBox.className = 'text-box form-control'
      textBox.value = text
      let parentNode = target.parentNode
      target.classList.add('hide')
      parentNode.insertBefore(textBox, target)
      textBox.focus()
      textBox.addEventListener('keydown', renameCheckKeyCode)
    }, false)


    /** Добавить меню */
    buttonMenu.addEventListener('click', () => {
      let li
      let childCount
      let title = formMenu.elements['title'].value
      if (title !== '') {
        _$.fetch('/widget/menu/create', {
          method: 'post',
          body: {
            "title": title,
            "token": secret
          }
        }).then(done => {
          if (done.status === 201) {
            li = document.createElement('li')
            childCount = menuList.childElementCount
            li.setAttribute('class', 'list-group-item')
            li.setAttribute('id', done.menu._id)
            li.dataset.id = done.menu._id
            li.innerHTML = '<a href="#" id="nodeATag' + childCount + '">' + done.menu.title + '</a><ul class="drag_ul_0"></ul>'
            menuList.insertAdjacentElement('afterbegin', li)
          }
        })
        formMenu.reset()
      } else { // !!! не указан заголовок
        // console.info(target);
      }
    })

    /** Добовляем пункт меню */
    button.addEventListener('click', (e) => {
      e.preventDefault()
      let title = form.elements['title'].value
      let url = form.elements['url'].value
      if (title !== '' || url !== '') {
        var item = {
          title: title,
          url: url
        };
        ulSaveId = document.querySelector('#MultipleContainers-item .list-group-item').dataset.id
        drop.setUl('#MultipleContainers-item .drag_ul_0')
        drop.initAdd(item); //NOTE: Добавляем новый пункт
        drop.expandAll(); //NOTE: Разварачиваем вложенные пункты
        if (buttonSaveItem.classList.contains('hide')) {
          buttonSaveItem.classList.remove('hide')
        }
        form.reset()
      } else { // !!! не указан заголовок и ссылка
        // console.info(target);
      }

    })

    /**  */
    buttonSaveItem.addEventListener('click', () => {
      let url = drop.getNodeOrders()
      let body = {
        "id": ulSaveId,
        "url": url,
        "token": secret
      }
      edit(body)
    })

  })
})()