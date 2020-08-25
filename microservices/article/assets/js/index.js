/* eslint-env es6 */
'use strict'

import '../scss/index.scss'
// import htmlFormatting from '../../../../assets/js/html-formatting/html-formatting'

import './upload'
import tp from './typograf'
import glavred from './glavred'
import formatting from './htmlformatting'

import tinyMCE from 'tinymce/tinymce'
/** Default icons are required for TinyMCE 5.3 or above **/
import 'tinymce/icons/default'
/** A theme is also required **/
import 'tinymce/themes/silver'

import textPattern from './text-pattern';

(async() => {
  'use strict'
  document.addEventListener('DOMContentLoaded', () => {
    /** Очищаем текст от вставок Главреда
     * @param {string} text - очищаемый текст
     */
    const removeMarkup = function(text) {
      const reg = /(<span[^>]*data-glvrd="true"[^>]*>)(.+?)(<\/span>)/g
      if (text) {
        return text.replace(reg, '$2')
      }
      return text
    }

    //************************
    //*
    //************************
    tinyMCE.init({
      skin: 'oxide',
      // skin: 'lightgray',
      selector: 'textarea#post-article',
      height: '480',
      // placeholder: 'Type here...',
      language: 'ru',
      content_css: '/public/css/article.css',
      content_css_cors: true,
      block_formats: 'Paragraph=p; Header 2=h2; Header 3=h3',
      branding: false,
      spellchecker_languages: '+Russian=ru,Ukrainian=uk,English=en',
      spellchecker_rpc_url: 'http://speller.yandex.net/services/tinyspell',
      // eslint-disable-next-line no-useless-escape
      spellchecker_word_separator_chars: '\\s!"#$%&()*+,./:;<=>?@[\]^_{|}\xa7\xa9\xab\xae\xb1\xb6\xb7\xb8\xbb\xbc\xbd\xbe\u00bf\xd7\xf7\xa4\u201d\u201c',
      draggable_modal: true,
      document_base_url: `${!window.location.origin ? `${window.location.protocol}//${window.location.host}` : window.location.origin}/`,
      // eslint-disable-next-line max-len
      toolbar1: 'print preview media | insertfile undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image | emoticons | spellchecker | code template insert',
      toolbar2: 'customDateButton | restoredraft | charmap | mysidebar | typograf |  glavred | format | toc | searchreplace',

      plugins: [
        // eslint-disable-next-line max-len
        'advlist autolink lists link charmap print preview hr anchor searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table directionality emoticons template paste textpattern spellchecker autoresize tabfocus insertdatetime charmap image imagetools toc quickbars textpattern'
      ], //autosave

      autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
      autosave_interval: '20s',
      // autosave_restore_when_empty: true,

      //TODO: Расширить список правил, для автоматического форматирования текста
      formats: {
        // Changes the default format for h1 to have a class of heading
        h1: {
          block: 'h2',
          classes: 'heading'
        }
      },

      browser_spellcheck: true,

      //* ****************************
      //* ********** IMAGES **********
      //* ****************************
      // images_upload_handler: function (blobInfo, success, failure) {
      //   console.log(blobInfo.blob());
      //   success('url');
      // },
      images_upload_handler(blobInfo, success, failure) {
        console.log('================================')
        console.log(':::[ blobInfo  ]:::', blobInfo)
        console.log(':::[ success  ]:::', success)
        console.log(':::[ failure  ]:::', failure)

        let xhr
        let formData

        xhr = new XMLHttpRequest()
        xhr.withCredentials = true
        // xhr.open('POST', 'postAcceptor1.php');
        xhr.open('POST', '/upload/article')

        xhr.onload = function() {
          let json

          if (xhr.status != 200) {
            failure(`HTTP Error: ${xhr.status}`)
            return
          }

          json = JSON.parse(xhr.responseText)

          if (!json || typeof json.location != 'string') {
            failure(`Invalid JSON: ${xhr.responseText}`)
            return
          }

          success(json.location)
        }

        formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())
        console.log(':::[ blobInfo.blob()  ]:::', blobInfo.blob())
        console.log(':::[ blobInfo.filename()  ]:::', blobInfo.filename())

        xhr.send(formData)
      },

      file_picker_types: 'file image media',
      images_upload_base_path: '/some/basepath',
      images_upload_credentials: true,
      // TODO: Добавить список изображений из статьи
      // image_list: "/mylist.php",
      image_list: [{
        title: 'главред',
        value: '/public/images/pipe-1.png',
        alt: 'главред1'
      },
      {
        title: 'обои',
        value: 'https://images.wallpaperscraft.ru/image/pejzazh_art_luna_127187_3840x2160.jpg',
        alt: 'обои1'
      }
      ],
      /** role="presentation" */
      a11y_advanced_options: true,
      /**  */
      // <figure class="image">
      //  <img src="url" alt="" />
      //  <figcaption>Caption</figcaption>
      // </figure>
      image_caption: true,
      /** add custom styles, spacing and borders to images. */
      image_advtab: true,

      file_picker_callback(callback, value, meta) {
        // console.log(':::[ callback, value, meta  ]:::', callback, value, meta)
        console.log(':::[ value ::file_picker_callback ]:::', value)
        console.log(':::[ meta ::file_picker_callback ]:::', meta)
        console.log(':::[ callback ::file_picker_callback ]:::', callback)
        // Provide file and text for the link dialog
        if (meta.filetype == 'file') {
          callback('mypage.html', {
            text: 'My text'
          })
        }

        // Provide image and alt text for the image dialog
        if (meta.filetype == 'image') {
          callback('myimage.jpg', {
            alt: 'My alt text'
          })
        }

        // Provide alternative source and posted for the media dialog
        if (meta.filetype == 'media') {
          callback('movie.mp4', {
            source2: 'alt.ogg',
            poster: 'image.jpg'
          })
        }
      },

      // imagetools_cors_hosts: ['mydomain.com', 'otherdomain.com'],
      imagetools_proxy: 'proxy.php',
      /**  */
      imagetools_fetch_image(img) {
        console.log(':::[ img:imagetools_fetch_image  ]:::', img)
        return new tinyMCE.util.Promise((resolve) => {
          // Fetch the image and return a blob containing the image content
          resolve(new Blob(img, {
            type: 'image/png'
          }))
          // resolve(img);
        })
      },

      quickbars_insert_toolbar: 'quickimage quicktable | pagebreak',
      quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
      imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',

      // save_enablewhendirty: true,
      // save_oncancelcallback: function () { console.log('Save canceled'); },

      /** Правила форматирования текста
       * TODO: Расширить список правил, для автоматического форматирования текста
       */
      textpattern_patterns: textPattern,


      paste_postprocess(plugin, args) {
        console.log('paste_postprocess', args)
        // args.node.setAttribute('id', '42');
        // htmlFormatting(args.node, valid_elements)
      },

      // paste_preprocess: async function (pl, o) {
      //   console.log(':::[ pl  ]:::', pl)
      //   console.log(':::[ o :: paste_preprocess ]:::', o)
      //   // await formatting(tinyMCE.activeEditor.getContent())
      //   typograf(o.content)
      // },

      setup(editor) {

        editor.ui.registry.addContextToolbar('textselection', {
          predicate(node) {
            console.log(':::[ node  ]:::', node)
            return !editor.selection.isCollapsed()
          },
          items: 'bold italic underline | copy | blockquote | formatselect | quicklink', // | typograf  glavred
          position: 'selection',
          scope: 'node'
        })


        // editor.ui.registry.addContextToolbar('imageselection', {
        //   predicate: function (node) {
        //     return node.nodeName === 'P';
        //   },
        //   items: 'quicklink quickimage',
        //   position: 'node'
        // });

        //************************************
        //* Главред
        //************************************
        editor.ui.registry.addButton('glavred', {
          text: 'Главред',
          tooltip: 'Проверить текст на стоп-слова',
          image: '/images/typograf.png',
          onSetup() {
            const scriptLoader = new tinyMCE.dom.ScriptLoader()
            scriptLoader.load('https://api.glvrd.ru/v1/glvrd.js')
            scriptLoader.loadQueue(() => {})
          },
          onAction() {
            const content = removeMarkup(editor.getContent().toString().trim())
            if (content !== '') {
              glavred(content)
            }
          }
        })

        //* ************************************
        //* ТИПОГРАФ
        //* ************************************
        editor.ui.registry.addButton('typograf', {
          text: 'Типограф',
          image: 'http://micro.loc/public/images/pipe-1.png',
          tooltip: 'Типографирование текста',
          onAction() {
            const tiny = tp.execute(editor.getContent())
            tinyMCE.activeEditor.setContent(tiny)
          }
        })

        //* **********************************
        //*
        //* **********************************
        editor.ui.registry.addButton('format', {
          text: 'Форматирование текста',
          tooltip: 'Форматирование html разметки, по заданным правилам',
          onAction() {
            formatting(editor.getContent())
          }
        })

      }
    })

  }) // DOMContentLoaded
})()
