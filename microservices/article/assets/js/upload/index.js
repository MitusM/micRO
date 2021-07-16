/*global _$, tinyMCE */
/* eslint-env es6 */
'use strict'
import Dropzone from 'dropzone'
import {
  picture
} from './picture'

const lang = {
  ru: {
    dropzone: 'Перетащите изображения в данную область и отпустите, или кликните по ней для начала загрузки изображения.',
    message: {
      error: {
        title: 'Во время загрузки произошла ошибка.',
        success: 'Сервер не смог загрузить изображение, попробуйте позже.'
      },
      success: {
        title: '',
        done: 'Загрузка прошла успешно.'
      },
      limit: {
        title: '!!!!',
        body: 'Превышен лимит по количеству изображений доступных для загрузки.'
      },
      delete: {
        title: '',
        body: 'Файл успешно удалён.'
      }
    }
  }
}
const message = lang.ru.message
const position = 'topCenter'
let maxfilesexceeded = false

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false
//TODO: Настройки drag and drop перенести на страницу настроек так чтобы они были доступны в браузере
const upload = new Dropzone('div#dropzone', {
  url: '/upload/article',
  dictDefaultMessage: lang.ru.dropzone,
  acceptedFiles: 'image/*',
  maxFiles: 3, //* лимит на загрузку файлов. Сколько всего можно загрузить файлов
  uploadMultiple: false,
  parallelUploads: 1,
  addRemoveLinks: false,
  withCredentials: true,
  timeout: 60000,
  thumbnailWidth: 240, //FIXME: Не срабатывает. Размер превью по умолчанию
  thumbnailHeight: 240, //FIXME: Не срабатывает. Размер превью по умолчанию
  // previewTemplate: document.querySelector("#tpl").innerHTML

})
// ────────────────────────────────────────────────────────────────────────────────
/** 
 *  Вызывается непосредственно перед отправкой каждого файла. Получает объект xhr и объекты formData в качестве второго и третьего параметров, поэтому имеется возможность добавить дополнительные данные. Например, добавить токен CSRF 
 */
upload.on('sending', (file, xhr, formData) => {
  const csrf = document.querySelector('meta[name=csrf-token]').getAttributeNode('content').value
  // BUG:🐞 Если добавляется несколько файлов то к каждому файлу добавляется значение
  // FIXME: Ко всем файлам один csrf-token
  //TODO: Ко всем файлам один csrf-token
  formData.append('csrf', csrf)
})

/** Когда файл обрабатывается (поскольку существует очередь, не все файлы обрабатываются немедленно). Это событие ранее называлось файлом обработки. */
upload.on('processing', (file) => {
  // console.log(':::[ file :: processing ]:::', file)
})

/** Вызывается для каждого файла, который был отклонен, поскольку количество файлов превышает ограничение maxFiles. */
upload.on('maxfilesexceeded', (file) => {
  //* NOTE: Удаляем файлы к загрузки превысившие лимит по количеству добавляемых к загрузке за один раз
  // upload.removeFile(file)
  maxfilesexceeded = true
  _$.message('error', {
    title: message.limit.title,
    message: message.limit.success,
    position: position
  })
  console.log('maxfilesexceeded')
})

// === === === === === === === === === === === ===
//* Вызывается, когда загрузка была успешной или ошибочной. */
// === === === === === === === === === === === ===
upload.on('complete', (file) => {
  // FIX: DROPZONE - добавить всплывающее сообщение об неудачной или удачной загрузки файла
  if (file.status === 'error' && maxfilesexceeded === false) {
    console.log('⚡ maxfilesexceeded::error', maxfilesexceeded)
    console.log('complete')
    _$.message('error', {
      title: message.error.title,
      message: message.error.success,
      position: position
    })
    upload.removeFile(file)
  } else if (file.status === 'success') {
    _$.message('success', {
      title: message.success.title,
      message: message.success.done,
      position: position
    })
  }
})

// === === === === === === === === === === === ===
//* Файл был успешно загружен. Получает ответ сервера в качестве второго аргумента.
// === === === === === === === === === === === ===
upload.on('success', (file, response) => {
  console.log('⚡ response', response)
  // console.log('⚡ file', file)
  try {
    const csrf = document.querySelector('meta[name=csrf-token]').getAttributeNode('content').value
    const create = Dropzone.createElement
    /** исходный размер фото */
    const width = file.width
    const height = file.height
    const obj = response.files
    /** контейнер в котором отображаются детали фото */
    const details = file.previewElement.querySelector('.dz-details')
    /** кнопка Удалить */
    const removeButton = create('<div class="d-flex justify-content-center"><button type="button" class="remove btn btn-primary btn-sm">Удалить файл</button></div>')
    /** Элемент в котором отображаются превью фото, кнопка удалить и детали фото */
    const preview = file.previewElement
    const size = create(`<div class="prev-img-wigth-height"><span>${width} x ${height} px.</span></div>`)
    /** добавляем в детали размер изображения */
    details.appendChild(size)
    /** добавляем кнопку удалить фото */
    preview.appendChild(removeButton)
    /** Устанавливаем обработчик события, для вставки изображения в редактор. */
    _$.delegate(preview, '.dz-image', 'click', function (e) {
      const img = picture(obj, width)
      tinyMCE.activeEditor.execCommand('mceInsertContent', false, img)
    }, false)

    /** устанавливаем обработчик события, для удаления фото */
    removeButton.addEventListener('click', (e) => {
      e.preventDefault()
      let arr = ['/images/article/original/' + response.name]
      let path = '/images/article/resize/'

      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const name = obj[key].name;
          arr.push(path + name)
        }
      }
      _$.fetch('/files/article', {
        method: 'delete',
        body: {
          files: arr,
          fields: {
            csrf: csrf
          }
        }
      }).then(done => {
        deleteUploadFiles(done, file)
      }).catch(error => error)
    })
  } catch (error) {
    console.log('⚡ error::', error)
  }
})

export default upload

function deleteUploadFiles(done, file) {
  if (done.status === 200) {
    _$.message('success', {
      title: message.delete.title,
      message: message.delete.body,
      position: position
    })
    upload.removeFile(file)
  }
}
// module.exports = upload