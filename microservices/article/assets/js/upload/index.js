/*global _$, tinyMCE */
/* eslint-env es6 */
'use strict'
import Dropzone from 'dropzone'
import {
  picture
} from './picture'

let inspect = require('util').inspect

const lang = {
  ru: {
    dropzone: 'Перетащите изображения в данную область и отпустите, или кликните по ней для начала загрузки изображения.',
    message: {
      error: {
        title: 'Во время загрузки произошла ошибка.',
        success: 'Сервер не смог загрузить изображение, попробуйте позже.'
      },
      success: {
        title: 'Файл успешно загружен.',
        done: 'Загрузка прошла успешно.'
      },
      limit: {
        title: '',
        body: 'Превышен лимит по количеству изображений доступных для загрузки.'
      }
    }
  }
}
const message = lang.ru.message
const position = 'topCenter'

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false
//TODO: Настройки drag and drop перенести на страницу настроек так чтобы они были доступны в браузере
const upload = new Dropzone('div#dropzone', {
  url: '/upload/article',
  dictDefaultMessage: lang.ru.dropzone,
  acceptedFiles: 'image/*',
  maxFiles: 5, //* лимит на загрузку файлов. Сколько всего можно загрузить файлов
  uploadMultiple: false,
  parallelUploads: 1,
  addRemoveLinks: false,
  withCredentials: true,
  timeout: 20000,
  thumbnailWidth: 240, //FIXME: Не срабатывает. Размер превью по умолчанию
  thumbnailHeight: 240, //FIXME: Не срабатывает. Размер превью по умолчанию
  // previewTemplate: document.querySelector("#tpl").innerHTML

})
// ────────────────────────────────────────────────────────────────────────────────
//*************************************************************
//** Вызывается, когда загрузка была успешной или ошибочной. */
//*************************************************************
upload.on('complete', (file) => {
  // FIX: DROPZONE - добавить всплывающее сообщение об неудачной или удачной загрузки файла
  if (file.status === 'error') {
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
  console.log(':::[ file :: processing ]:::', file)
})

/** Вызывается для каждого файла, который был отклонен, поскольку количество файлов превышает ограничение maxFiles. */
upload.on('maxfilesexceeded', (file) => {
  //* NOTE: Удаляем файлы к загрузки превысившие лимит по количеству добавляемых к загрузке за один раз
  // upload.removeFile(file)
  _$.message('error', {
    title: message.limit.title,
    message: message.limit.success,
    position: position
  })
})

// === === === === === === === === === === === ===
//* Файл был успешно загружен. Получает ответ сервера в качестве второго аргумента.
// === === === === === === === === === === === ===
upload.on('success', (file, response) => {
  console.log('⚡ response', response)
  /** исходный размер фото */
  const width = file.width
  console.log('⚡ file', file)
  console.log('⚡ width', width)
  let obj = response.files
  console.log('⚡ inspect', inspect(obj))
  //* ---------------------------------- *//
  /**кнопка Вставить  */
  // const add = Dropzone.createElement('<button id="add" class="btn btn-default btn-large btn-bloc">Вставить</button>')
  /**  */
  // const details = file.previewElement.querySelector('.dz-details')
  /** кнопка Удалить */
  const removeButton = Dropzone.createElement('<button type="button" class="remove btn btn-primary btn-sm">Удалить файл</button>')

  /**  */
  // const prevImagesObj = response.files[0].images
  /**  */
  // file.images = prevImagesObj
  /**  */
  //* ---------------------------------- *//
  // preview.appendChild(removeButton)
  console.log('⚡ removeButton', removeButton)
  // details.appendChild(add)
  /**  */
  const preview = file.previewElement
  console.log('⚡ preview', preview)
  preview.addEventListener('click', () => {
    const img = picture(obj, width)
    console.log('⚡ img', img)
    // tinyMCE.activeEditor.execCommand('mceInsertContent', false, img)
  })
})

export default upload
// module.exports = upload