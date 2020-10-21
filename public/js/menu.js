(self["webpackChunkmicro"] = self["webpackChunkmicro"] || []).push([["menu"],{

/***/ "./microservices/widget/widgets/menu/assets/js/index.js":
/*!**************************************************************!*\
  !*** ./microservices/widget/widgets/menu/assets/js/index.js ***!
  \**************************************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sortable */ "./microservices/widget/widgets/menu/assets/js/sortable.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./microservices/widget/widgets/menu/assets/js/menu.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_menu__WEBPACK_IMPORTED_MODULE_1__);
/* global _$, secret */

/**
 * Зависимости:
 */
 //  var delegate = require('delegate')




(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    /** кнопка добавить пункт меню */
    let button = document.getElementById('menu-item-add');
    /**  форма добавления пункта меню */

    let form = document.forms['menu-item-form-add'];
    /** кнопка добавить меню */

    let buttonMenu = document.getElementById('menu-add');
    /**  форма добавления пункта меню */

    let formMenu = document.forms['menu-form-add'];
    /** список меню */

    let menuList = document.getElementById('menu-list');
    /** меню в котором добавляем пункты меню */

    let menuEl = 'menu-item-list';
    /** менб в которое добавляем пункты меню HTMLElement  */

    let append = document.getElementById(menuEl);
    /** кнопка сохранить пункты меню */

    let buttonSaveItem = document.getElementById('button-save-item-menu');
    /** id элемента ul из которого извлекаем данные для сохранения */

    let ulSaveId;
    /** Массив меню */

    let menuListInit = [...document.querySelectorAll('#menu-list .drag_ul_0')];
    /**  */

    let drop = new (_menu__WEBPACK_IMPORTED_MODULE_1___default())(menuEl);
    drop.setMaximum(7); //TODO: вынести в настройки сайта максимальный уровень вложенности пунктов меню

    drop.setMessageMax('Максимальная вложенность достигнута'); //

    for (const item in menuListInit) {
      const element = menuListInit[item];

      if (element.childElementCount > 0) {
        drop.initTree(element);
      }
    }

    (0,_sortable__WEBPACK_IMPORTED_MODULE_0__.default)(menuList, append);

    let edit = function (body) {
      let position = 'topCenter';
      return _$.fetch('/widget/menu/edit', {
        method: 'put',
        body: body
      }).then(done => {
        if (done.status === 201) {
          _$.message('success', {
            title: 'Успешно',
            message: "Данные успешно обновлены",
            position: position
          });
        } else {
          _$.message('error', {
            title: 'Ошибка',
            message: done.response,
            position: position
          });
        }

        return done;
      });
    };

    let cancelRename = function (e) {
      let titleElem = e.nextSibling;
      titleElem.classList.remove('hide');
      e.removeEventListener('keydown', renameCheckKeyCode);
      e.remove();
    };

    let saveTitleMenu = async function (e) {
      let titleElem = e.nextSibling;
      let val = e.value;
      let id = titleElem.parentNode.id;
      let body = {
        "id": id,
        "title": val,
        "token": secret
      };
      let success = await edit(body);

      if (success.status === 201) {
        titleElem.innerText = val;
      }

      cancelRename(e);
    };

    let renameCheckKeyCode = function (e) {
      if (e.keyCode == 13) {
        // Enter pressed
        e.preventDefault();
        e.stopPropagation();
        saveTitleMenu(this);
      }

      if (e.keyCode == 27) {
        // ESC pressed
        cancelRename(this);
      }
    };

    _$.delegate(menuList, 'a', 'click', e => {
      e.preventDefault();
      e.stopPropagation();
      let target = e.delegateTarget;
      let text = target.innerText;
      let textBox = document.createElement('input');
      textBox.className = 'text-box form-control';
      textBox.value = text;
      let parentNode = target.parentNode;
      target.classList.add('hide');
      parentNode.insertBefore(textBox, target);
      textBox.focus();
      textBox.addEventListener('keydown', renameCheckKeyCode);
    }, false);
    /** Добавить меню */


    buttonMenu.addEventListener('click', () => {
      let li;
      let childCount;
      let title = formMenu.elements['title'].value;

      if (title !== '') {
        _$.fetch('/widget/menu/create', {
          method: 'post',
          body: {
            "title": title,
            "token": secret
          }
        }).then(done => {
          if (done.status === 201) {
            li = document.createElement('li');
            childCount = menuList.childElementCount;
            li.setAttribute('class', 'list-group-item');
            li.setAttribute('id', done.menu._id);
            li.dataset.id = done.menu._id;
            li.innerHTML = '<a href="#" id="nodeATag' + childCount + '">' + done.menu.title + '</a><ul class="drag_ul_0"></ul>';
            menuList.insertAdjacentElement('afterbegin', li);
          }
        });

        formMenu.reset();
      } else {// !!! не указан заголовок
        // console.info(target);
      }
    });
    /** Добовляем пункт меню */

    button.addEventListener('click', e => {
      e.preventDefault();
      let title = form.elements['title'].value;
      let url = form.elements['url'].value;

      if (title !== '' || url !== '') {
        var item = {
          title: title,
          url: url
        };
        ulSaveId = document.querySelector('#MultipleContainers-item .list-group-item').dataset.id;
        drop.setUl('#MultipleContainers-item .drag_ul_0');
        drop.initAdd(item); //NOTE: Добавляем новый пункт

        drop.expandAll(); //NOTE: Разварачиваем вложенные пункты

        if (buttonSaveItem.classList.contains('hide')) {
          buttonSaveItem.classList.remove('hide');
        }

        form.reset();
      } else {// !!! не указан заголовок и ссылка
        // console.info(target);
      }
    });
    /**  */

    buttonSaveItem.addEventListener('click', () => {
      let url = drop.getNodeOrders();
      let body = {
        "id": ulSaveId,
        "url": url,
        "token": secret
      };
      edit(body);
    });
  });
})();

/***/ }),

/***/ "./microservices/widget/widgets/menu/assets/js/menu.js":
/*!*************************************************************!*\
  !*** ./microservices/widget/widgets/menu/assets/js/menu.js ***!
  \*************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_exports__, module */
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
(function () {
  'use strict';

  let doc = document;

  var _self; // var ulCounter = 0


  let nodeId = 1;

  function Menu(id) {
    /**  */
    this.id = id;
    /**  */

    this.ulAdd = 'drag_ul_0';
    /** папка из которой подгружается изображения */

    this.folder = '/images/';
    /** иконка возле пункта меню */

    this.folderImage = 'menu.png'; // '006-menu-3.svg'

    /** иконка [+] */

    this.plusImage = 'dhtmlgoodies_plus.gif';
    /** иконка [-] */

    this.minusImage = 'dhtmlgoodies_minus.gif';
    /** Максимальная вложенность */

    this.maximumDepth = 6;
    /**  */

    this.contextMenu = false;
    this.dragDropTimer = -1;
    this.dragNode_noSiblings = false;
    this.itemToEdit = false;

    if (doc.all) {
      this.indicator_offsetX = 2; // Offset position of small black lines indicating where nodes would be dropped.

      this.indicator_offsetX_sub = 4;
      this.indicator_offsetY = 2;
    } else {
      this.indicator_offsetX = 1; // Offset position of small black lines indicating where nodes would be dropped.

      this.indicator_offsetX_sub = 3;
      this.indicator_offsetY = 2;
    }

    this.messageMaximum = ''; // Use '' if you don't want to display a message

    this.helpObj = false;
    this.ulCounter = 1;
    /**  */

    this.floatingContainer = document.createElement('ul');
    this.floatingContainer.style.position = 'absolute';
    this.floatingContainer.style.display = 'none';
    this.floatingContainer.id = 'floatingContainer';
    this.insertAsSub = false;
    document.body.appendChild(this.floatingContainer);
    /**  */

    this.ulDragCont = doc.createElement('ul');
    this.ulDragCont.style.position = 'absolute';
    this.ulDragCont.style.display = 'none';
    this.ulDragCont.id = 'ulDragCont';
    this.insertAsSub = false;
    doc.body.appendChild(this.ulDragCont);
  }

  Menu.prototype = {
    setElement: function (id) {
      this.id = id; // return this
    },

    setUl(id) {
      this.ulAdd = id;
      return doc.querySelector('id');
    },

    /**
     * Максимальная вложенность
     * @param {number} maxDepth максимальная вложенность
     *
     * @public
     */
    setMaximum: function (maxDepth) {
      //
      this.maximumDepth = maxDepth; // return this
    },

    /**
     * Сообщение в случае если максимальная вложенность достигнута
     * @param {string} newMessage текст сообщения
     *
     * @public
     */
    setMessageMax: function (newMessage) {
      this.messageMaximum = newMessage; // return this
    },

    /**
     *
     * Ссылка на изображение возле пункта
     * @param {string} path путь до изображения
     *
     * @public
     */
    setImageFolder: function (path) {
      this.folderImage = path;
    },

    /**
     *
     *
     * @param {string} path путь до изображения
     *
     * @public
     */
    setFolderImage: function (imagePath) {
      this.folder = imagePath;
    },
    setPlusImage: function (imagePath) {
      this.plusImage = imagePath;
    },
    setMinusImage: function (imagePath) {
      this.minusImage = imagePath;
    },

    /**
     * Развернуть
     *
     * @public
     */
    expandAll: function () {
      var menuItems = document.getElementById(this.id).getElementsByTagName('li');

      for (var i = 0; i < menuItems.length; i++) {
        var subItems = menuItems[i].getElementsByTagName('ul');

        if (subItems.length > 0 && subItems[0].style.display != 'block') {
          _self.showHideNode(false, menuItems[i].id);
        }
      }
    },

    /**
     * Свернуть все
     *
     *@public
     */
    collapseAll: function () {
      var menuItems = doc.getElementById(this.id).getElementsByTagName('li');

      for (var i = 0; i < menuItems.length; i++) {
        var subItems = menuItems[i].getElementsByTagName('UL');

        if (subItems.length > 0 && subItems[0].style.display == 'block') {
          _self.showHideNode(false, menuItems[i].id);
        }
      }
    },

    /*
     * находим верхнюю позицию нашего дерева элементов
     */
    getTopPos: function (obj) {
      var top = obj.offsetTop / 1;

      while ((obj = obj.offsetParent) != null) {
        if (obj.tagName != 'HTML') top += obj.offsetTop;
      }

      if (doc.all) top = top / 1 + 13;else top = top / 1 + 8;
      return top;
    },

    /*
     * Находим левую позицию нашего дерева элементов
     */
    getLeftPos: function (obj) {
      var left = obj.offsetLeft / 1 + 1;

      while ((obj = obj.offsetParent) != null) {
        if (obj.tagName != 'HTML') left += obj.offsetLeft;
      }

      if (doc.all) left = left / 1 - 2;
      return left;
    },
    showHideNode: function (e, inputId) {
      let thisNode; //, ul, parentNode

      if (inputId) {
        if (!document.getElementById(inputId)) return;
        thisNode = document.getElementById(inputId).getElementsByTagName('img')[0];
      } else {
        thisNode = this;
        if (this.tagName == 'A') thisNode = this.parentNode.getElementsByTagName('img')[0];
      }

      if (thisNode.style.visibility == 'hidden') return;
      var parentNode = thisNode.parentNode;
      inputId = parentNode.id.replace(/[^0-9]/g, '');

      if (thisNode.src.indexOf(_self.plusImage) >= 0) {
        thisNode.src = thisNode.src.replace(_self.plusImage, _self.minusImage);
        var ul = parentNode.getElementsByTagName('ul')[0];
        ul.style.display = 'block';
      } else {
        thisNode.src = thisNode.src.replace(_self.minusImage, _self.plusImage); // ! BAG: Если переносить на рут ошибка parentNode

        parentNode.getElementsByTagName('ul')[0].style.display = 'none';
      }

      return false;
    },
    dropIndicator: function () {
      this.dropTargetIndicator = doc.createElement('div');
      this.dropTargetIndicator.style.position = 'absolute';
      this.dropTargetIndicator.style.display = 'none';
      let img = doc.createElement('img');
      img.src = this.folder + 'dragDrop_ind1.gif'; //TODO: вынести в настройки

      img.id = 'js-drag_drop_indicator'; //TODO: вынести в настройки

      this.dropTargetIndicator.appendChild(img);
      doc.body.appendChild(this.dropTargetIndicator);
    },
    dragDropCountLevels: function (obj, direction, stopAtObject) {
      var countLevels = 0;

      if (direction == 'up') {
        while (obj.parentNode && obj.parentNode != stopAtObject) {
          obj = obj.parentNode;
          if (obj.tagName == 'ul') countLevels = countLevels / 1 + 1;
        }

        return countLevels;
      }

      if (direction == 'down') {
        var subObjects = obj.getElementsByTagName('li');

        for (var i = 0; i < subObjects.length; i++) {
          countLevels = Math.max(countLevels, _self.dragDropCountLevels(subObjects[i], "up", obj));
        }

        return countLevels;
      }
    },
    initDrag: function () {
      var subs = _self.floatingContainer.getElementsByTagName('li');

      if (subs.length > 0) {
        if (_self.dragNode_sourceNextSib) {
          _self.dragNode_parent.insertBefore(_self.dragNode_source, _self.dragNode_sourceNextSib);
        } else {
          _self.dragNode_parent.appendChild(_self.dragNode_source);
        }
      }

      _self.dragNode_source = this.parentNode;
      _self.dragNode_parent = this.parentNode.parentNode;
      _self.dragNode_sourceNextSib = false;
      if (_self.dragNode_source.nextSibling) _self.dragNode_sourceNextSib = _self.dragNode_source.nextSibling;
      _self.dragNode_destination = false;
      _self.dragDropTimer = 0;

      _self.timerDrag();

      return false;
    },
    timerDrag: function () {
      _self = this;

      if (this.dragDropTimer >= 0 && this.dragDropTimer < 10) {
        this.dragDropTimer = this.dragDropTimer + 1;
        setTimeout(() => _self.timerDrag(), 20);
        return;
      }

      if (this.dragDropTimer == 10) {
        _self.floatingContainer.style.display = 'block';

        _self.floatingContainer.appendChild(_self.dragNode_source);
      }
    },
    moveDragableNodes: function (e) {
      if (_self.dragDropTimer < 10) return;
      if (document.all) e = event;
      let thisObj, tmpVar, tmpObj, tmpImg, eventSourceObj;
      let dragDrop_x = e.clientX / 1 + 5 + document.body.scrollLeft;
      let dragDrop_y = e.clientY / 1 + 5 + document.documentElement.scrollTop;
      _self.floatingContainer.style.left = dragDrop_x + 'px';
      _self.floatingContainer.style.top = dragDrop_y + 'px';
      thisObj = this;
      if (thisObj.tagName == 'A' || thisObj.tagName == 'img') thisObj = thisObj.parentNode;
      _self.dragNode_noSiblings = false;
      tmpVar = thisObj.getAttribute('noSiblings');
      if (!tmpVar) tmpVar = thisObj.noSiblings;
      if (tmpVar == 'true') _self.dragNode_noSiblings = true;

      if (thisObj && thisObj.id) {
        _self.dragNode_destination = thisObj;
        tmpObj = _self.dropTargetIndicator;
        tmpObj.style.display = 'block';
        eventSourceObj = this;
        if (_self.dragNode_noSiblings && eventSourceObj.tagName == 'img') eventSourceObj = eventSourceObj.nextSibling;
        tmpImg = tmpObj.getElementsByTagName('img')[0];

        if (this.tagName == 'A' || _self.dragNode_noSiblings) {
          tmpImg.src = tmpImg.src.replace('ind1', 'ind2');
          _self.insertAsSub = true;
          tmpObj.style.left = _self.getLeftPos(eventSourceObj) + _self.indicator_offsetX_sub + 'px';
        } else {
          tmpImg.src = tmpImg.src.replace('ind2', 'ind1');
          _self.insertAsSub = false;
          tmpObj.style.left = _self.getLeftPos(eventSourceObj) + _self.indicator_offsetX + 'px';
        }

        tmpObj.style.top = _self.getTopPos(thisObj) + _self.indicator_offsetY + 'px';
      }

      return false;
    },
    dropDragableNodes: function () {
      if (_self.dragDropTimer < 10) {
        _self.dragDropTimer = -1;
        return;
      }

      let showMessage = false;

      if (_self.dragNode_destination) {
        // Check depth
        let countUp = _self.dragDropCountLevels(_self.dragNode_destination, 'up');

        let countDown = _self.dragDropCountLevels(_self.dragNode_source, 'down');

        let countLevels = countUp / 1 + countDown / 1 + (_self.insertAsSub ? 1 : 0);

        if (countLevels > _self.maximumDepth) {
          _self.dragNode_destination = false;
          showMessage = true; // Used later down in this function
        }
      }

      if (_self.dragNode_destination) {
        if (_self.insertAsSub) {
          var uls = _self.dragNode_destination.getElementsByTagName('ul');

          if (uls.length > 0) {
            let ul = uls[0];
            ul.style.display = 'block';
            let lis = ul.getElementsByTagName('li');

            if (lis.length > 0) {
              // Sub elements exists - drop dragable node before the first one
              ul.insertBefore(_self.dragNode_source, lis[0]);
            } else {
              // No sub exists - use the appendChild method - This line should not be executed unless there's something wrong in the HTML, i.e empty <ul>
              ul.appendChild(_self.dragNode_source);
            }
          } else {
            let ul = document.createElement('ul');
            ul.style.display = 'block';

            _self.dragNode_destination.appendChild(ul);

            ul.appendChild(_self.dragNode_source);
          }

          var img = _self.dragNode_destination.getElementsByTagName('img')[0];

          img.style.visibility = 'visible';
          img.src = img.src.replace(_self.plusImage, _self.minusImage);
        } else {
          if (_self.dragNode_destination.nextSibling) {
            let nextSib = _self.dragNode_destination.nextSibling;
            nextSib.parentNode.insertBefore(_self.dragNode_source, nextSib);
          } else {
            _self.dragNode_destination.parentNode.appendChild(_self.dragNode_source);
          }
        }
        /* Clear parent object */


        var tmpObj = _self.dragNode_parent;

        if (tmpObj.getElementsByTagName('li').length == 0) {
          let img = tmpObj.parentNode.getElementsByTagName('img')[0];
          img.style.visibility = 'hidden'; // Hide [+],[-] icon

          tmpObj.parentNode.removeChild(tmpObj);
        }
      } else {
        // Putting the item back to it's original location
        if (_self.dragNode_sourceNextSib) {
          _self.dragNode_parent.insertBefore(_self.dragNode_source, _self.dragNode_sourceNextSib);
        } else {
          _self.dragNode_parent.appendChild(_self.dragNode_source);
        }
      }

      _self.dropTargetIndicator.style.display = 'none';
      _self.dragDropTimer = -1;
      if (showMessage && _self.messageMaximumDepthReached) alert(_self.messageMaximumDepthReached);
    },
    ////////////////////////////////////////////////
    initTree: function (id) {
      id = id || this.id;
      _self = this;

      _self.dropIndicator();

      doc.documentElement.onselectstart = _self.cancelSelectionEvent;
      doc.documentElement.ondragstart = _self.cancelEvent;
      doc.documentElement.onmousedown = _self.removeHighlight;
      /* Creating help object for storage of values */

      this.helpObj = doc.createElement('div');
      this.helpObj.style.display = 'none';
      doc.body.appendChild(this.helpObj);
      var nodeId = 0; //  TODO: Проверка id HTML элемент, или string

      var dropMenuUl = id;
      var menuItems = dropMenuUl.getElementsByTagName('li'); // Get an array of all menu items

      for (var i = 0; i < menuItems.length; i++) {
        // No children var set ?
        var noChildren = false;
        var tmpVar = menuItems[i].getAttribute('noChildren');
        if (!tmpVar) tmpVar = menuItems[i].noChildren;
        if (tmpVar == 'true') noChildren = true; // No drag var set ?

        var noDrag = false; // !!!

        tmpVar = menuItems[i].getAttribute('noDrag');
        if (!tmpVar) tmpVar = menuItems[i].noDrag;
        if (tmpVar == 'true') noDrag = true;
        nodeId++;
        var subItems = menuItems[i].getElementsByTagName('ul');
        var img = doc.createElement('img');
        img.src = this.folder + this.plusImage;
        img.addEventListener('click', _self.showHideNode);

        if (subItems.length == 0) {
          img.style.visibility = 'hidden';
        } else {
          console.log(':::[ subItems[0] ]:::', subItems[0]);
          console.log(':::[ _self.ulCounter ]:::', _self.ulCounter);
          subItems[0].id = 'drag_ul_' + _self.ulCounter;
          _self.ulCounter++;
        }

        var aTag = menuItems[i].getElementsByTagName('a')[0]; //            aTag.id = 'nodeATag' + menuItems[no].id.replace(/[^0-9]/gi, '');

        aTag.id = 'nodeATag_' + nodeId;
        aTag.addEventListener('click', _self.showHideNode);
        if (!noDrag) aTag.onmousedown = _self.initDrag;
        if (!noChildren) aTag.onmousemove = _self.moveDragableNodes;
        menuItems[i].insertBefore(img, aTag);
        menuItems[i].id = 'node' + nodeId;
        var folderImg = doc.createElement('img');
        if (!noDrag) folderImg.onmousedown = _self.initDrag;
        folderImg.onmousemove = _self.moveDragableNodes;

        if (menuItems[i].className) {
          folderImg.src = this.folder + menuItems[i].className;
        } else {
          folderImg.src = this.folder + this.folderImage;
        }

        menuItems[i].insertBefore(folderImg, aTag);
      }

      doc.documentElement.onmousemove = _self.moveDragableNodes;
      doc.documentElement.onmouseup = _self.dropDragableNodes;
      _self.ulCounter = 0; // Обнулили счётчик вложенных субменю (ul)
    },
    /////////////////////////////////////
    /////////////////////////////////////
    initAdd: function (item) {
      _self = this;

      _self.dropIndicator();

      doc.documentElement.onselectstart = _self.cancelSelectionEvent;
      doc.documentElement.ondragstart = _self.cancelEvent;
      doc.documentElement.onmousedown = _self.removeHighlight;
      /* Creating help object for storage of values */

      this.helpObj = doc.createElement('div');
      this.helpObj.style.display = 'none';
      doc.body.appendChild(this.helpObj);
      nodeId = 0;
      let totalPlus = 0;
      let dropMenuUl = doc.getElementById(this.id); // извлекаем пункты меню в виде массива

      let menuItems = dropMenuUl.getElementsByTagName('li'); // сколько пунктов меню

      let counts = menuItems.length; // создаем новый li для пункта меню

      let newLi = doc.createElement('li'); //TODO: Вынести в настройки
      // !!! TODO: Вынести в установку через функцию
      // let addItemUl = doc.getElementById(this.ulAdd)

      let addItemUl = doc.querySelector(this.ulAdd);
      let items, noDrag, noChildren, aTag, img, folderImg;
      totalPlus = counts + 1;
      newLi.innerHTML = '<a href="#" id="nodeATag' + totalPlus + '" data-url="' + item.url + '">' + item.title + '</a>'; //        newLi.setAttribute('data-url', item.url);

      newLi.id = 'node' + totalPlus; ////////////////////////
      // newLi.setAttribute('class', 'sampleList')
      ////////////////////////

      addItemUl.appendChild(newLi); // находим новый созданный пункт меню

      items = doc.getElementById('node' + totalPlus);
      noDrag = false;
      noChildren = false;
      aTag = items.getElementsByTagName('a')[0]; // создаем изображение [+] и добавляем в пункт меню

      img = doc.createElement('img'); // создаем изображение папки и добавляем в пункт меню

      folderImg = doc.createElement('img');
      aTag.id = 'nodeATag' + items.id.replace(/[^0-9]/gi, '');
      if (!noDrag) aTag.onmousedown = _self.initDrag;
      if (!noChildren) aTag.onmousemove = _self.moveDragableNodes;
      img.src = this.folder + this.plusImage; // img.onclick = _self.showHideNode;

      img.style.visibility = 'hidden';
      items.insertBefore(img, aTag);
      img.addEventListener('click', _self.showHideNode);
      if (!noDrag) folderImg.onmousedown = _self.initDrag;
      folderImg.onmousemove = _self.moveDragableNodes;
      folderImg.src = this.folder + this.folderImage;
      items.insertBefore(folderImg, aTag);

      for (var i = 0; i < counts; i++) {
        noChildren = false;
        var tmpVar = menuItems[i].getAttribute('noChildren');
        if (!tmpVar) tmpVar = menuItems[i].noChildren;
        if (tmpVar == 'true') noChildren = true;
        noDrag = false;
        tmpVar = menuItems[i].getAttribute('noDrag');
        if (!tmpVar) tmpVar = menuItems[i].noDrag;
        if (tmpVar == 'true') noDrag = true;
        nodeId++; // var subItems = menuItems[i].getElementsByTagName('UL');
        /////
        /////

        aTag = menuItems[i].getElementsByTagName('a')[0]; //            aTag.id = 'nodeATag' + menuItems[no].id.replace(/[^0-9]/gi, '');

        aTag.id = 'nodeATag_' + nodeId; //TODO: вынести в настройки

        aTag.addEventListener('click', _self.showHideNode);
        if (!noDrag) aTag.onmousedown = _self.initDrag;
        if (!noChildren) aTag.onmousemove = _self.moveDragableNodes;
        menuItems[i].id = 'node' + nodeId; //TODO: вынести в настройки
      }

      doc.documentElement.onmousemove = _self.moveDragableNodes;
      doc.documentElement.onmouseup = _self.dropDragableNodes;
      _self.ulCounter = 0; // Обнулили счётчик вложенных субменю (ul)
    },

    /**
     * Извлекаем вложенные пункты меню
     * @param   {object} initObj ul
     * @returns {Array}  массив с вложенными пуктами меню
     */
    getSubMenu: function (initObj) {
      var save = [];
      var lis = initObj.getElementsByTagName('li');

      if (lis.length > 0) {
        var li = lis[0];
        var i = 0;

        while (li) {
          if (li.id) {
            var ankor = li.getElementsByTagName('a');
            var text = ankor[0].innerHTML;
            var url = ankor[0].getAttribute('data-url');
            var ul = li.getElementsByTagName('ul');

            if (ul.length > 0) {
              var sub = this.getSubMenu(ul[0]);
              save[i] = {
                title: text,
                url: url,
                submenu: sub
              };
            } else {
              save[i] = {
                title: text,
                url: url
              };
            }

            i++;
          }

          li = li.nextSibling;
        }
      }

      return save;
    },

    /**
     * Извлекаем и сохраняем
     * @param   {object} initObj    меню
     * @param   {array} saveString
     * @returns {string}
     */
    getNodeOrders: function (initObj, saveString) {
      // console.log(':::[ arguments ]:::', arguments)
      saveString = saveString || []; // if (!initObj) {

      initObj = initObj || this.ulAdd;
      initObj = document.querySelector(initObj); // }

      var lis = initObj.getElementsByTagName('li');

      if (lis.length > 0) {
        var li = lis[0];
        var i = 0;

        while (li) {
          if (li.id) {
            var ankor = li.getElementsByTagName('a');
            var text = ankor[0].innerHTML;
            var url = ankor[0].getAttribute('data-url');
            var numericID = li.id.replace(/[^0-9]/gi, '');

            if (numericID != '0') {
              var ul = li.getElementsByTagName('ul'); //                        console.log(ul);

              if (ul.length > 0) {
                var sub = this.getSubMenu(ul[0]); //TODO: проработать замкнуть на самой себе уменьшит код

                saveString[i] = {
                  title: text,
                  url: url,
                  submenu: sub
                };
              } else {
                saveString[i] = {
                  title: text,
                  url: url
                };
              }
            }

            i++;
          }

          li = li.nextSibling;
        }
      }

      if (initObj.id == this.idOn) {
        return saveString;
      }

      return saveString;
    }
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Menu;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "./microservices/widget/widgets/menu/assets/js/sortable.js":
/*!*****************************************************************!*\
  !*** ./microservices/widget/widgets/menu/assets/js/sortable.js ***!
  \*****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ SortableList
/* harmony export */ });
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.complete.esm.js");
/* global _$, secret */
// Default SortableJS

function SortableList(menu, clone) {
  /** Корзина для удаления */
  let basket = document.getElementById('basket');
  /** Настройки */

  let group = {
    name: 'shared',
    pull: 'clone' // To clone: set pull to 'clone'

  };
  /** Диалоговое окно удаление меню */

  let modal = new _$.Dialog('#dialog').initClose();
  /** Всплывающее сообщение  */

  let message = (success, title, message) => {
    _$.message(success, {
      title: title,
      message: message,
      position: 'topCenter'
    });
  };
  /** Скрываем карзину, если она не была целью */


  let hideBasket = function (to) {
    let hide = false;

    if (to.className !== 'basket basket-delete' && basket.classList.contains('basket-delete')) {
      basket.classList.remove('basket-delete');
      hide = true;
    }

    return hide;
  };
  /** Началось перетаскивание элемента */


  let onStart = function ()
  /**Event  evt */
  {
    basket.classList.add('basket-delete');
  };
  /** Событие при перемещении элемента в списке или между списками */
  // let onMove = function ( /**Event*/ evt) {
  //   // console.log(':::[ evt:sortablejs:onMove ]:::', evt)
  //   let dragged = evt.dragged
  //   dragged.classList.add('border-move')
  // }

  /**  */


  let onEnd = function (
  /**Event*/
  evt) {
    /** Элемент который перетащили */
    var itemEl = evt.item; // dragged HTMLElement

    /** Елемент на который перетащили */

    let to = evt.to; // target list

    /** Элемент в старом списке */

    let clone = evt.clone;
    clone.remove();
    hideBasket(to);

    if (to.className === 'basket basket-delete') {
      itemEl.classList.add('hide');
      modal.header('Удалить меню').show(bool => {
        if (_$.toBoolean(bool)) {
          _$.fetch('/widget/menu/delete', {
            method: 'delete',
            body: {
              "id": itemEl.id,
              "token": secret
            }
          }).then(done => {
            if (done.status === 201) {
              basket.classList.remove('basket-delete');
              message('success', 'Успешно', done.response);
            } else {
              message('error', 'Ошибка', done.response);
            }
          });
        }
      });
    }
  };
  /**  */


  let sortablejs = new sortablejs__WEBPACK_IMPORTED_MODULE_0__.default(menu, {
    group: group,
    animation: 250,
    onStart: onStart,
    // onMove: onMove,
    onEnd: onEnd
  });
  /** Список в котором добавляется пункт меню */

  let sortMenu = new sortablejs__WEBPACK_IMPORTED_MODULE_0__.default(clone, {
    group: group,
    animation: 250,
    onStart: onStart,
    // onMove: onMove,
    onEnd: onEnd
  });
  /** Корзина */

  let deleteMenu = new sortablejs__WEBPACK_IMPORTED_MODULE_0__.default(basket, {
    group: {
      name: group.name,
      pull: false
    }
  });
  return {
    sortablejs,
    sortMenu,
    deleteMenu
  };
}

/***/ })

},
0,[["./microservices/widget/widgets/menu/assets/js/index.js","runtime","vendors"]]]);