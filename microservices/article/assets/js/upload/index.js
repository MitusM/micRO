/* global tinyMCE */
/* eslint-env es6 */
'use strict'
import Dropzone from 'dropzone'
import {
  picture
} from './picture'

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false
//TODO: Настройки drag and drop перенести на страницу настроек так чтобы они были доступны в браузере
const upload = new Dropzone('div#dropzone', {
  url: '/upload/article',
  dictDefaultMessage: 'Drag an image here to upload, or click to select one 1',
  acceptedFiles: 'image/*',
  maxFiles: 5,
  uploadMultiple: false,
  parallelUploads: 1,
  addRemoveLinks: false,
  withCredentials: true,
  timeout: 10000


})
// ────────────────────────────────────────────────────────────────────────────────
//*************************************************************
//** Вызывается, когда загрузка была успешной или ошибочной. */
//*************************************************************
upload.on('complete', (file, done) => {
  //  console.dir(file, done)
  console.log('Вызывается, когда загрузка была успешной или ошибочной.')
  console.log(':::[ file.status::complete  ]:::', file.status)
})


/**  Вызывается непосредственно перед отправкой каждого файла. Получает объект xhr и объекты formData в качестве второго и третьего параметров, поэтому имеется возможность добавить дополнительные данные. Например, добавить токен CSRF */
upload.on('sending', (file, xhr, formData) => {
  const csrf = document.querySelector('meta[name=csrf-token]').getAttributeNode('content').value
  // BUG: Если добовляется несколько файлов то к каждому файлу добовляется значение
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
  // NOTE: Удаляем файлы к загрузки превысившие лимит по колличеству добовляемых к загрузке за один раз
  upload.removeFile(file)
})

/** Файл был успешно загружен. Получает ответ сервера в качестве второго аргумента. */
upload.on('success', (file, response) => {
  /** исходный размер фото */
  const width = file.width
  // console.log('width', width)
  //* --------------------------------
  /**кнопка Вставить  */
  const add = Dropzone.createElement('<button id="add" class="btn btn-default btn-large btn-bloc">Вставить</button>')
  /**  */
  const details = file.previewElement.querySelector('.dz-details')
  /** кнопка Удалить */
  const removeButton = Dropzone.createElement('<button class="remove btn btn-default btn-large btn-bloc">Удалить файл</button>')
  /**  */
  const preview = file.previewElement
  /**  */
  const prevImagesObj = response.files[0].images
  /**  */
  file.images = prevImagesObj
  /**  */
  preview.appendChild(removeButton)
  details.appendChild(add)
  preview.addEventListener('click', () => {
    const img = picture(file.images, width)
    tinyMCE.activeEditor.execCommand('mceInsertContent', false, img)
  })
})

export default upload
// module.exports = upload