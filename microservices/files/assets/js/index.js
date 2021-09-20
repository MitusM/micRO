import 'dropzone/dist/dropzone.css';
import '../scss/index.scss'

import {
  Upload
} from '../../libs/FRTcloud/src/assets/js/dropzone.js'

(() => {
  'use strict';

  const lang = {
    ru: {
      dropzone: 'Перетащите изображения в данную область и отпустите, или кликните по ней для начала загрузки файла.',
      message: {
        error: {
          title: 'Во время загрузки произошла ошибка.',
          success: 'Сервер не смог загрузить файл, попробуйте позже.'
        },
        success: {
          title: '',
          done: 'Загрузка прошла успешно.'
        },
        limit: {
          title: '!!!!',
          body: 'Превышен лимит по количеству доступных для загрузки.'
        },
        delete: {
          title: '',
          body: 'Файл успешно удалён.'
        }
      },
      error: {
        delete: {
          title: '',
          body: 'Во время удаления произошла ошибка.'
        }
      }
    }
  }

  const message = lang.ru.message
  const position = 'topCenter'
  let maxfilesexceeded = false
  let doc = document

  // 👣 📽 🎞 ❗️ © ™ 💯 💫 💥 ☑️ ✔️ ⁉️ ‼️

  doc.addEventListener('DOMContentLoaded', async () => {
    let files
    let folder
    /** ul files */
    let clickFiles = doc.querySelector('#files')

    const csrf = () => doc.querySelector('meta[name=csrf-token]').getAttributeNode('content').value

    /** Dropzone add */
    const dropzoneAdd = doc.querySelector('.files-panel-container-add')
    /** Icon add new file and folder */
    const addFilesAndFolder = doc.getElementById('icon-add')
    addFilesAndFolder.addEventListener('click', function (e) {
      let target = e.target;
      let that = this
      // меню добавления файла или папки
      let children = that.children[1]
      // показываем меню добавления файла или папки
      children.classList.toggle('display-view')
      if (target.classList[0] === 'add-files-text') {
        dropzoneAdd.classList.add('display-view')
      }

    })

    /** Папки */
    // _$.delegate('#folders', 'div', 'click', function (e) {
    //   console.log(e.delegateTarget);
    // }, false);



    /** Файлы */
    // _$.tippy('.menu-outline', {
    //   content: '<strong>Bolded content</strong>',
    //   allowHTML: true,
    //   trigger: 'click',
    // });

    /** 
     * 
     */
    clickFiles.addEventListener('click', (e) => {
      let target = e.target
      let parent = target.offsetParent
      if (parent) { // if parent exists and is not a click menu svg 
        let classList = parent.classList[0]
        // если клик произошёл не на меню файла, выделяем li в котором находится файл
        if (classList !== 'files-panel-item-menu__icon' && classList !== 'files-panel-item-menu') {
          parent.classList.toggle('files-click')
        }
      }
    })

    /** 
     ** Меню файла. 
     * Показываем меню файла.
     */
    _$.delegate('ul', '.menu-outline', 'click', (e) => {
      let target = e.target
      let parentNode = target.parentNode
      let children = parentNode.children[1]
      children.classList.toggle('display-view')
    })


    _$.delegate('ul', 'span', 'click', (e) => {
      let target = e.target
      let parent = target.offsetParent
      let data
      let id

      if (parent) {
        data = target.dataset
        id = target.id
        switch (id) {
          case 'menu-file-rename': {
            fileRename(data)
            break;
          }
          case 'menu-file-delete': {
            deleteFile(data)
            break;
          }
          case 'menu-file-settings': {
            settings(data)
            break;
          }
          default: {
            break
          }
        }
      }
    })

    console.log('⚡ user', user)
    /**
     * Загружаем файлы
     */
    let uploadFile = Upload({
      url: '/files/upload/misha',
      acceptedFiles: 'image/*',
      lang
    }).on('success', function (file, response) {
      // Если файл успешно загружен удалим превью из Dropzone
      if (response.status === 201) {
        clickFiles.insertAdjacentHTML('afterbegin', response.file)
        uploadFile.removeFile(file)
      }
    })


    function fileRename(data) {

    }


    function deleteFile(data) {
      try {
        let element
        let name = data.name

        _$.fetch('/files/delete/misha', {
          method: 'delete',
          body: {
            files: [data.path],
            fields: {
              csrf: csrf()
            }
          }
        }).then(done => {
          if (done.status === 200) {
            _$.message('success', {
              title: message.delete.title,
              message: message.delete.body,
              position: position
            })
            element = doc.getElementById(name)
            element.classList.add('fadeOutUp')
            setTimeout(() => {
              element.remove()
            }, 600)
          } else {
            new Error(lang.ru.error.delete.body)
          }
        }).catch(error => error)
      } catch (err) {
        console.log('⚡ err::deleteFile', err)
      }

    }

    function settings(data) {

    }



    // _$.delegate('#files', 'li', 'mouseover', function (e) {
    //   // console.log('⚡ e', e)
    //   let target = e.target
    //   console.log('❗️ target', target)
    // })

    /** Показываем меню файла */
    // clickFiles.onmouseover = function (e) {
    // let target = e.target
    // let localName = target.localName
    // if (localName === 'figure') {
    //   console.log('-----------------------------------------')
    //   console.log('❗️ target', target)
    //   console.log('⚡ localName', localName)
    //   let parentElement = target.parentElement
    //   let firstElementChild = target.firstElementChild
    //   console.log('⚡ parentElement', parentElement)
    //   console.log('💥 firstElementChild', firstElementChild)
    // }
    //   menuFilesView(e)
    // }

    // /** Скрываем меню файла */
    // clickFiles.onmouseout = function (e) {
    // let target = e.target
    // console.log('👣 target', target)
    //   menuFilesView(e)
    // }



    // function menuFilesView(e) {
    //   let target = e.target
    //   console.log('⚡ e.type', e.type)
    //   let type = e.type
    //   let localName = target.localName
    //   console.log('❗️ target', target)
    //   if (localName === 'figure') {
    //     // console.log('-----------------------------------------')

    //     // console.log('⚡ localName', localName)
    //     let parentElement = target.parentElement
    //     let firstElementChild = target.firstElementChild
    //     if (type === "mouseover") firstElementChild.classList.add('display-view')
    //     if (type === "mouseout") firstElementChild.classList.remove('display-view')

    //   }
    // }


  }) // DOMContentLoaded

})()