/* global define */
(function () {
  'use strict'
  let doc = document
  var _self
  // var ulCounter = 0
  let nodeId = 1

  function Menu(id) {
    /**  */
    this.id = id
    /** папка из которой подгружается изображения */
    this.folder = '/images/'
    /** иконка возле пункта меню */
    this.folderImage = 'menu.png'
    /** иконка [+] */
    this.plusImage = 'dhtmlgoodies_plus.gif';
    /** иконка [-] */
    this.minusImage = 'dhtmlgoodies_minus.gif';
    /** Максимальная вложенность */
    this.maximumDepth = 6
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

    this.ulCounter = 0

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
      this.id = id
      return this
    },

    /**
     * Максимальная вложенность
     * @param {number} maxDepth максимальная вложенность
     *
     * @public
     */
    setMaximum: function (maxDepth) { // 
      this.maximumDepth = maxDepth;
    },
    /**
     * Сообщение в случае если максимальная вложенность достигнута
     * @param {string} newMessage текст сообщения   
     *
     * @public
     */
    setMessageMax: function (newMessage) {
      this.messageMaximum = newMessage;
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
			for(var i=0;i<menuItems.length;i++){
				var subItems = menuItems[i].getElementsByTagName('ul');
				if(subItems.length>0 && subItems[0].style.display!='block'){
					_self.showHideNode(false,menuItems[i].id);
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
      if (doc.all) top = top / 1 + 13;
      else top = top / 1 + 4;
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
      let thisNode//, ul, parentNode
      if(inputId){
				if(!document.getElementById(inputId))return;
				thisNode = document.getElementById(inputId).getElementsByTagName('img')[0]; 
			}else {
				thisNode = this;
				if(this.tagName=='A')thisNode = this.parentNode.getElementsByTagName('img')[0];	
				
			}
			if(thisNode.style.visibility=='hidden')return;		
			var parentNode = thisNode.parentNode;
			inputId = parentNode.id.replace(/[^0-9]/g,'');
			if(thisNode.src.indexOf(_self.plusImage)>=0){
				thisNode.src = thisNode.src.replace(_self.plusImage,_self.minusImage);
				var ul = parentNode.getElementsByTagName('ul')[0];
				ul.style.display='block';
			}else{
        thisNode.src = thisNode.src.replace(_self.minusImage,_self.plusImage);
        // ! BAG: Если переносить на рут ошибка parentNode
        console.log(':::[ parentNode ]:::', parentNode)
				parentNode.getElementsByTagName('ul')[0].style.display='none';
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
      _self = this
      if (this.dragDropTimer >= 0 && this.dragDropTimer < 10) {
        this.dragDropTimer = this.dragDropTimer + 1;
        setTimeout(()=> _self.timerDrag(), 20)
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
      let thisObj, tmpVar, tmpObj, tmpImg, eventSourceObj
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
          tmpObj.style.left = (_self.getLeftPos(eventSourceObj) + _self.indicator_offsetX_sub) + 'px';
        } else {
          tmpImg.src = tmpImg.src.replace('ind2', 'ind1');
          _self.insertAsSub = false;
          tmpObj.style.left = (_self.getLeftPos(eventSourceObj) + _self.indicator_offsetX) + 'px';
        }


        tmpObj.style.top = (_self.getTopPos(thisObj) + _self.indicator_offsetY) + 'px';
      }
      return false;
    },


    dropDragableNodes: function () {
      if (_self.dragDropTimer < 10) {
        _self.dragDropTimer = -1;
        return;
      }
      let showMessage = false;
      if (_self.dragNode_destination) { // Check depth
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
            ul = uls[0];
            ul.style.display = 'block';

            let lis = ul.getElementsByTagName('li');

            if (lis.length > 0) { // Sub elements exists - drop dragable node before the first one
              ul.insertBefore(_self.dragNode_source, lis[0]);
            } else { // No sub exists - use the appendChild method - This line should not be executed unless there's something wrong in the HTML, i.e empty <ul>
              ul.appendChild(_self.dragNode_source);
            }
          } else {
            var ul = document.createElement('ul');
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

      nodeId = 0
      let totalPlus = 0
      let dropMenuUl = doc.getElementById(this.id)
      // извлекаем пункты меню в виде массива
      let menuItems = dropMenuUl.getElementsByTagName('li')
      // сколько пунктов меню
      let counts = menuItems.length
      // создаем новый li для пункта меню
      let newLi = doc.createElement('li')
      //TODO: Вынести в настройки 
      //TODO: Вынести в установку через функцию
      let addItemUl = doc.getElementById('drag_ul_0')
      let items, noDrag, noChildren, aTag, img, folderImg

      totalPlus = counts + 1;
      newLi.innerHTML = '<a href="#" id="nodeATag' + totalPlus + '" data-url="' + item.url + '">' + item.title + '</a>';
      //        newLi.setAttribute('data-url', item.url);
      newLi.id = 'node' + totalPlus;
      addItemUl.appendChild(newLi);
      // находим новый созданный пункт меню
      items = doc.getElementById('node' + totalPlus)
      noDrag = false
      noChildren = false
      aTag = items.getElementsByTagName('a')[0]
      // создаем изображение [+] и добавляем в пункт меню
      img = doc.createElement('img')
      // создаем изображение папки и добавляем в пункт меню
      folderImg = doc.createElement('img')

      aTag.id = 'nodeATag' + items.id.replace(/[^0-9]/gi, '');
      if (!noDrag) aTag.onmousedown = _self.initDrag;
      if (!noChildren) aTag.onmousemove = _self.moveDragableNodes;
      img.src = this.folder + this.plusImage;
      // img.onclick = _self.showHideNode;
      img.style.visibility = 'hidden';
      items.insertBefore(img, aTag);
      img.addEventListener('click', _self.showHideNode)

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

        nodeId++;
        // var subItems = menuItems[i].getElementsByTagName('UL');
        /////

        /////
        aTag = menuItems[i].getElementsByTagName('a')[0];
        //            aTag.id = 'nodeATag' + menuItems[no].id.replace(/[^0-9]/gi, '');
        aTag.id = 'nodeATag_' + nodeId; //TODO: вынести в настройки
        if (!noDrag) aTag.onmousedown = _self.initDrag;
        if (!noChildren) aTag.onmousemove = _self.moveDragableNodes;
        menuItems[i].id = 'node' + nodeId; //TODO: вынести в настройки
      }

      doc.documentElement.onmousemove = _self.moveDragableNodes;
      doc.documentElement.onmouseup = _self.dropDragableNodes;
      _self.ulCounter = 0; // Обнулили счётчик вложенных субменю (ul)
    }
  }

  if (typeof define === 'function' && define.amd) {
    define('Menu', [], function () {
      return Menu
    })
  } else if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      // eslint-disable-next-line no-global-assign
      exports = module.exports = Menu
    }
    exports.default = Menu
  }
})()