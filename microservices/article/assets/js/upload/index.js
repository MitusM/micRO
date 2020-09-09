/* global tinyMCE */
/* eslint-env es6 */
'use strict'
import Dropzone from 'dropzone'

// const source = (width, name) => `<source srcset="/public/images/article/resize/${name}" media="(max-width: ${width}px)">\n`
const source = (name, media) => `<source srcset="/public/images/article/resize/${name}" media="(${media})">\n`

// const picture = (arrImages) => {
//   let pictureElem = '<picture>\n'
//   arrImages.map((elem) => {
//     console.log(':::[ elem  ]:::', elem)
// if (elem.width === 480) { //если ширина экрана меньше 480 пикселей загружается маленькое изображения
// pictureElem += source(elem.width, elem.name)
// } else if () //если ширина экрана меньше 768 пикселей загружается маленькое изображения
//     switch (elem.width) {
//       case 480:
//         pictureElem += source(elem.width, elem.name)
//         break
//       case 768:
//         pictureElem += source(elem.width, elem.name)
//         break
//       case 1024:
//         pictureElem += source(elem.width, elem.name)
//         break
//       case 1028:
//         pictureElem += source(elem.width, elem.name)
//         break
//       case 1920:
//         pictureElem += source(elem.width, elem.name)
//         // pictureElem += ` <img
//         // src="/public/images/article/resize/${elem.name}"
//         // alt="a cute kitten">\n`
//         break
//         // case elem.width > 1920:
//         //   pictureElem += ` <img
//         //   src="/public/images/article/resize/${name}"
//         //   alt="a cute kitten">\n`
//         //   break

//       default:
//         pictureElem += ` <img
//         src="/public/images/article/resize/${elem.name}"
//         alt="a cute kitten">\n`
//         break
//     }
//   })
//   pictureElem += '</picture>'
//   return pictureElem
// }

const picture = (arrImages) => {
  let pictureElem = '<picture>\n'

  arrImages.map((elem) => {
    switch (elem.width) {
      case 480:
        pictureElem += source(elem.name, `max-width: ${elem.width}px`) //если ширина экрана меньше 480 пикселей загружается маленькое изображения
        break
      case 768:
        pictureElem += source(elem.name, 'min-width: 480px and max-width: 768px')
        break
      case 1024:
        pictureElem += source(elem.name, 'min-width: 768px and max-width: 1024px')
        break
      case 1280:
        pictureElem += source(elem.name, 'min-width: 1024px and max-width: 1280px')
        break
      case 1920:
        pictureElem += source(elem.name, 'min-width: 1920px')
        break

      default:

        break
    }
  })
  pictureElem += '</picture>'
  return pictureElem
}


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
  addRemoveLinks: true,
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
  // FIXME:Ко всем файлам один csrf-token
  //TODO: Ко всем файлам один csrf-token
  formData.append('csrf', csrf)
})

/** Когда файл обрабатывается (поскольку существует очередь, не все файлы обрабатываются немедленно). Это событие ранее называлось файлом обработки. */
upload.on('processing', (file) => {
  // console.log(':::[ file :: processing ]:::', file)
})

/** Вызывается для каждого файла, который был отклонен, поскольку количество файлов превышает ограничение maxFiles. */
upload.on('maxfilesexceeded', (file) => {
  // NOTE: Удаляем файлы к загрузки превысившие лимит по колличеству добовляемых к загрузке за один раз
  upload.removeFile(file)
})

/** Файл был успешно загружен. Получает ответ сервера в качестве второго аргумента. */
upload.on('success', (file, response) => {
  //? --------------------------------
  /**кнопка Вставить  */
  const add = Dropzone.createElement('<button id="add" class="btn btn-default btn-large btn-bloc">Вставить</button>')
  /**  */
  const details = file.previewElement.querySelector('.dz-details')
  /** кнопка Удалить */
  const removeButton = Dropzone.createElement('<button class="remove btn btn-default btn-large btn-bloc">Удалить файл</button>')
  /**  */
  const preview = file.previewElement
  /**  */
  const prevImagesArr = response.files[0].images
  /**  */
  file.images = prevImagesArr
  /**  */
  preview.appendChild(removeButton)
  details.appendChild(add)
  console.log(':::[ removeButton  ]:::', removeButton)
  preview.addEventListener('click', (e) => {
    // console.log(':::[ file  ]:::', file)
    const img = picture(file.images)
    console.log(':::[ element  ]:::', img)
    tinyMCE.activeEditor.execCommand('mceInsertContent', false, img)
    // console.log(':::[ tinyMCE.activeEditor  ]:::', tinyMCE.activeEditor)
    // tinyMCE.activeEditor.setContent(img)
  })
})

export default upload
// module.exports = upload