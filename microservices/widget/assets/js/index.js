/** 
 * Зависимости: 
 */
// import Sortable from '@shopify/draggable/lib/sortable'
// import MultipleContainers from './draggable'
import Menu from './menu'
import '../scss/index.scss'
(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    /** кнопка добавить пункт меню */
    let button = document.getElementById('menu-add')
    /**  форма добавления меню */
    let form = document.forms['menu-form-add']
    let dropMenuUl = 'menu-list' //NOTE: id в который добавляем выбранное меню


    let drop = new Menu()
    drop.setElement(dropMenuUl); // переименовать в setMenu
    drop.setMaximum(7); //TODO: вынести в настройки сайта максимальный уровень вложенности пунктов меню
    drop.setMessageMax('Максимальная вложенность достигнута'); // 
    /** Добовляем пункт меню */
    button.addEventListener('click', () => {
      let title = form.elements['title'].value
      let url = form.elements['url'].value
      if (title !== '' || url !== '') {
        var item = {
          title: title,
          url: url
        };
        drop.initAdd(item); //NOTE: Добавляем новый пункт
        drop.expandAll(); //NOTE: Разварачиваем вложенные пункты

        // form.reset()
      } else {
        // console.info(target);
      }

    })
  })
})()