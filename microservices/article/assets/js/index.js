/* global glvrd, _$ */
import '../scss/index.scss'
// import load from 'little-loader'
//  Import TinyMCE
import Typograf from 'typograf';
// import htmlFormatting from '../../../assets/js/html-formatting/html-formatting'
import htmlFormatting from '../../../../assets/js/html-formatting/html-formatting';

// import Dropzone from '../../../../assets/js/dropzone';
let Dropzone = require('../../../../assets/js/dropzone')


import tinyMCE from 'tinymce/tinymce'
// A theme is also required
// import 'tinymce/themes/silver'
// import 'tinymce/plugins/paste'
// import 'tinymce/plugins/link'
// import 'tinymce/plugins/hr'
// import 'tinymce/plugins/autoresize'
// import 'tinymce/plugins/imagetools'

(async () => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /*
     * @description dran`drop - загрузка файлов при добавлении статьи
     */
    // let drop = new
    // eslint-disable-next-line no-undef
    //   Dropzone.options.dropzone = {
    //     parallelUploads: 1, //TODO: Настройки drag and drop перенести на страницу настроек так чтобы они были доступны в браузере
    //     thumbnailWidth: 350,
    //     thumbnailHeight: 350,
    //     dictDefaultMessage: "Перетащите сюда фото одно или несколько",
    //     withCredentials: true,
    //     headers: { 'Accept':'application/octet-stream' },
    //     // headers: { 'content-type':'application/octet-stream' },
    //     // application/octet-stream
    //     init: function () {
    //         let i = 1;
    //         this.on("success", function (file, responseText) {
    //           console.log(':::[ file, responseText  ]:::', file, responseText)
    //         });
    //     }
    // };

    // Dropzone.options.myAwesomeDropzone = {
    //   paramName: "file", // The name that will be used to transfer the file
    //   maxFilesize: 2, // MB
    //   accept: function(file, done) {
    //     console.log(':::[ file, done  ]:::', file, done)
    //     // if (file.name == "justinbieber.jpg") {
    //     //   done("Naha, you don't.");
    //     // }
    //     // else { done(); }
    //   }
    // };

    //   Dropzone.options.myDropzone = {
    //     paramName: "file", // The name that will be used to transfer the file
    //     init: function () {
    //         let thisDropzone = this;
    //         // 6
    //         // $.get('/uploads', function (data) {

    //         //     if (data == null) {
    //         //         return;
    //         //     }
    //         //     // 7
    //         //     $.each(data, function (key, value) {
    //         //         var mockFile = { name: value.name, size: value.size };

    //         //         thisDropzone.emit("addedfile", mockFile);
    //         //         thisDropzone.options.thumbnail.call(thisDropzone, mockFile, '/public/uploads/thumbnail_' + value.name);

    //         //         // Make sure that there is no progress bar, etc...
    //         //         thisDropzone.emit("complete", mockFile);
    //         //     });

    //         // });
    //     }
    // };

    // Dropzone.options.myDropzone = {
    //   maxFilesize: 1,
    //   // headers: {
    //   //   ' Content-Type': 'application/x-www-formurlencoded'
    //   // },
    //   uploadMultiple: true,
    //   parallelUploads: 4,
    //   acceptedFiles: 'application/octet-stream',
    //   init: function () {
    //     let that = this
    //     console.log(':::[ that :init  ]:::', that)
    //     this.on("success", function (file, responseText) {
    //       console.log(':::[ file, responseText  ]:::', file, responseText)
    //     });
    //   },
    //   accept: function (file, done) {
    //     console.log(':::[ file, done  ]:::', file, done)
    //     let that = this
    //     console.log(':::[ that  ]:::', that)
    //   },
    // }

    // // console.log(':::[ Dropzone  ]:::', Dropzone)

    new Dropzone("div#dropzone", {
      /* options */
      url: '/article/upload',
      thumbnailWidth: 350,
      thumbnailHeight: 350,
      dictDefaultMessage: "Перетащите сюда фото одно или несколько",
      paramName: "images", // The name that will be used to transfer the file
      // headers: {
      //   'Content-Type': 'application/octet-stream'
      //   // ' Content-Type': 'application/x-www-formurlencoded'
      // },
      uploadMultiple: true,
      parallelUploads: 4,
      // createImageThumbnails: false,
      resizeMethod: 'crop',
      //*
      // acceptedFiles: 'application/octet-stream',
      //*
      params: function (e){
        console.log(':::[ e  ]:::', e)
      },
      /**  */
      init: function () {
        let that = this
        // console.log(':::[ that :init  ]:::', that)
        // console.log(':::[ that.element  ]:::', that.element)
        that.element.classList.add('dropzone')
        this.on("success", function (file, responseText) {
          console.log(':::[ file, responseText  ]:::', file, responseText)

        })

        this.on('addedfile', function(file) {
          console.log('================================')
          console.log(':::[ file ::init:addedfile ]:::', file)
          console.log('================================')
        })

      },
      /**  */
      accept: function (file, done) {
        let that = this
        console.log(':::[ that::accept  ]:::', that)
        console.log(':::[ file, done  ]:::', file, done)
        if(file.status === "added"){}

        // this.on("success", function (file, responseText) {
        //   console.log(':::[ file, responseText  ]:::', file, responseText)

        // })

        // this.on('addedfile', function(file) {
        //   console.log(':::[ file ::accept ]:::', file)
        // })

      },

      // transformFile: function (file, done) {
      //   console.log(':::[ file, done :: transformFile  ]:::', file, done)
      // }
    })

    /** Блок в котором будет отображаться ин-фа полученная от Главреда */
    let statsBlock
    /** Область в которой происходит набор текста в редакторе */
    let body
    /** Массив блоков с метками Главреда, взятых из текста
     * @type {NodeList}
     */

    //  1 +- 2 1 <= 2 1 -> 2 (c), (tm) 10 C, 20 F 1/2, 3/4 10x3~=30
    /** Типограф */
    let typograf = (text) => {
      // let sp = editor.getContent()
      let tp = new Typograf({
        locale: ['ru', 'en-US']
      })
      /** -> → →, <- → ← */
      tp.enableRule('common/symbols/arrow')
      // 	Добавление ° к C и F
      tp.enableRule('common/symbols/cf')
      // (c) → ©, (tm) → ™, (r) → ®
      tp.enableRule('common/symbols/copy')
      // №№ → №
      tp.enableRule('ru/symbols/NN')
      // Удаление повторяющихся пробелов между символами
      tp.enableRule('common/space/delRepeatSpace')
      // Пробел после знаков пунктуации
      tp.enableRule('common/space/afterPunctuation')
      // Пробел перед открывающей скобкой
      tp.enableRule('common/space/beforeBracket')
      // Удаление лишних пробелов после открывающей и перед закрывающей скобкой
      tp.enableRule('common/space/bracket')
      // Удаление пробела перед %, ‰ и ‱
      tp.enableRule('common/space/delBeforePercent')
      // Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки
      tp.enableRule('ru/typo/switchingKeyboardLayout')
      /** != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± */
      tp.enableRule('common/number/mathSigns')

      // -tp. enableRule('*')
      tp.enableRule('ru/money/*')
      tp.enableRule('ru/date/*')
      tp.enableRule('ru/optalign/*')
      // tp.enableRule('ru/punctuation/*')
      tp.enableRule('ru/dash/*')
      tp.enableRule('common/space/*')
      tp.enableRule('common/number/*')
      // tp.enableRule('common/html/escape')
      //- Разобраться с правилами что-бы в тексте пробелы не заменялись на &nbsp
      tp.disableRule('common/nbsp/*')
      //-NOTE: !!! Не удоляет теги из текста
      // tp.disableRule('common/html/stripTags')
      //-tp.disableRule('common/html/*')

      // Неразрывный пробел перед последним словом в предложении, не более 5 символов
      // tp.setSetting('common/nbsp/beforeShortLastWord', 'lengthLastWord', 5);

      // Вложенные кавычки тоже «ёлочки» для русской типографики
      tp.setSetting('common/punctuation/quote', 'ru', {
        left: '«',
        right: '»',
        removeDuplicateQuotes: true
      });

      // Неразрывный пробел после короткого слова, не более 3 символов
      // tp.setSetting('common/nbsp/afterShortWord', 'lengthShortWord', 3);
      let tiny = tp.execute(text)
      tinyMCE.activeEditor.setContent(tiny)
    }

    /** Очищаем текст от вставок Главреда
     * @param {string} text - очищаемый текст
     */
    let removeMarkup = function (text) {
      var reg = /(<span[^>]*data-glvrd="true"[^>]*>)(.+?)(<\/span>)/g
      if (text) {
        return text.replace(reg, '$2')
      }
      return text
    }

    /**
     * Главред
     * @param {string} text Текст который проверяется
     */
    let glavred = (text) => {
      glvrd.proofread(text, function (resultat) {
        /** В зависимости от оценки устанавливаем подсветку оценки
         * @param {number} score
         * @returns {string} red | orange
         */
        let getScoreColor = function (score) {
          if (score < 5) {
            return 'red';
          }
          if (score < 7.5) {
            return 'orange';
          }
          return 'green';
        }
        if (resultat.status == 'ok') {
          // console.log(':::[ resultat ]:::', resultat)
          //TODO: Массив стоп-слов можно будет в будущем использовать для сбора статистики
          let num = resultat.fragments.length
          let offset = 0
          if (num >= 0) {
            resultat.fragments.forEach(function (fragment) {
              let tagOpen = '<span class="hint" data-glvrd="true" data-style="orange" data-desc="' + fragment.hint.description + '" data-name="' + fragment.hint.name + '" >'
              let tagClose = '</span>'
              let tagsLength = tagOpen.length + tagClose.length
              text = text.substring(0, fragment.start + offset) +
                tagOpen + text.substring(fragment.start + offset, fragment.end + offset) +
                tagClose + text.substring(fragment.end + offset, text.length);
              offset += tagsLength;
            })
          }
          /**  */
          tinyMCE.activeEditor.setContent('')
          /**  */
          tinyMCE.activeEditor.setContent(text, ({
            format: 'raw',
            no_events: true
          }))
          /**  */
          let classScore = getScoreColor(resultat.score)
          statsBlock.innerHTML = `<div class="glavred">
          <div class="rule"></div>
          <div class="stats"><span class="stats-score ${classScore}">${resultat.score}</span> - <span class="stats-score-suffix">баллов</span> из 10 <br/> по шкале Главреда</div>
          </div>`
          // body = tinyMCE.activeEditor.iframeElement.contentWindow.document.getElementById("tinymce")
          /** элемент в который вставляем описание слова */
          let ruleSelector = document.querySelector('.rule')
          /** Массив блоков с метками Главреда, взятых из текста
           * @type {NodeList}
           */
          let hint = body.querySelectorAll('.hint')
          _$.delegate(body, 'span.hint', 'mouseover', function (e) {
            let target = e.target
            let data = target.dataset
            /** устанавливаем класс для выделения блока */
            target.classList.add('highlighted')
            /** вставляем описание слова в блок  */
            ruleSelector.innerHTML = `<div class="name">${data.name}</div><div class="rule-desc">${data.desc}</div>`
            /**  */
            hint = [...hint].map(elem => {
              /**  */
              if (elem !== target && elem.classList.contains('highlighted')) {
                elem.classList.remove('highlighted')
              }
              return elem
            })
          })

        } else {
          alert(resultat.message);
        }
      })
    }

    /** */
    let headerRule = {
      'br': {
        process: function (node) {
          var parent = node.parentNode,
            space = document.createTextNode(' ');

          parent.replaceChild(space, node);
        }
      }
    }


    /**  */
    let valid_elements = {
      'img': {
        valid_styles: '',
        valid_classes: 'foto',
        no_empty: false,
        valid_elements: 'src,width,height',
        // process: function (node) {
        // }
      },
      'h1': {
        convert_to: 'h2',
        valid_styles: 'text-align',
        valid_classes: 'heading',
        no_empty: true,
        valid_elements: headerRule
      },
      'h2,h3,h4': {
        valid_styles: 'text-align',
        valid_classes: 'heading',
        no_empty: true,
        valid_elements: headerRule
      },
      'p': {
        valid_styles: 'text-align',
        valid_classes: '',
        no_empty: true
      },
      a: {
        valid_styles: '',
        valid_classes: '',
        no_empty: true,

        process: function (node) {
          var host = 'http://' + window.location.host + '/';
          if (node.href.indexOf(host) !== 0) {
            node.target = '_blank';
          }
        }
      },
      'br': {
        valid_styles: '',
        valid_classes: ''
      },
      'blockquote,b,strong,i,em,s,strike,sub,sup,kbd,ul,ol,li,dl,dt,dd,time,address,thead,tbody,tfoot': {
        valid_styles: '',
        valid_classes: '',
        no_empty: true
      },
      'table,tr,th,td': {
        valid_styles: 'text-align,vertical-align',
        valid_classes: '',
        no_empty: true
      },
      'embed,iframe': {
        valid_classes: ''
      }
    }

    /** Форматирование html разметки, по заданным правилам */
    let formatting = function () {
      console.log(':::[ body  ]:::', body)
      htmlFormatting(body, valid_elements)
    }

    //************************
    //*
    //************************
    tinyMCE.init({
      skin: 'oxide',
      selector: 'textarea#post-article',
      height: '480',
      // placeholder: 'Type here...',
      language: 'ru',
      content_css: '/public/css/article.css',
      content_css_cors: true,
      block_formats: 'Paragraph=p; Header 2=h2; Header 3=h3',
      branding: false,
      spellchecker_languages: "+Russian=ru,Ukrainian=uk,English=en",
      spellchecker_rpc_url: "http://speller.yandex.net/services/tinyspell",
      spellchecker_word_separator_chars: '\\s!"#$%&()*+,./:;<=>?@[\]^_{|}\xa7\xa9\xab\xae\xb1\xb6\xb7\xb8\xbb\xbc\xbd\xbe\u00bf\xd7\xf7\xa4\u201d\u201c',
      draggable_modal: true,
      document_base_url: (!window.location.origin ? window.location.protocol + '//' + window.location.host : window.location.origin) + '/',
      toolbar1: "print preview media | insertfile undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image | emoticons | spellchecker | code template insert",
      toolbar2: "customDateButton | restoredraft | charmap | mysidebar | typograf |  glavred | format | toc | searchreplace",

      plugins: [
        "advlist autolink lists link charmap print preview hr anchor searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table directionality emoticons template paste textpattern spellchecker autoresize tabfocus insertdatetime charmap image imagetools toc quickbars textpattern"
      ], //autosave

      autosave_prefix: "tinymce-autosave-{path}{query}-{id}-",
      autosave_interval: "20s",
      // autosave_restore_when_empty: true,

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
      images_upload_handler: function (blobInfo, success, failure) {
        console.log('================================')
        console.log(':::[ blobInfo  ]:::', blobInfo)
        console.log(':::[ success  ]:::', success)
        console.log(':::[ failure  ]:::', failure)

        var xhr, formData;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        // xhr.open('POST', 'postAcceptor1.php');
        xhr.open('POST', '/images/upload');

        xhr.onload = function () {
          var json;

          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }

          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }

          success(json.location);
        };

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        console.log(':::[ blobInfo.blob()  ]:::', blobInfo.blob())
        console.log(':::[ blobInfo.filename()  ]:::', blobInfo.filename())

        xhr.send(formData);
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

      file_picker_callback: function (callback, value, meta) {
        // console.log(':::[ callback, value, meta  ]:::', callback, value, meta)
        console.log(':::[ value ::file_picker_callback ]:::', value)
        console.log(':::[ meta ::file_picker_callback ]:::', meta)
        console.log(':::[ callback ::file_picker_callback ]:::', callback)
        // Provide file and text for the link dialog
        if (meta.filetype == 'file') {
          callback('mypage.html', {
            text: 'My text'
          });
        }

        // Provide image and alt text for the image dialog
        if (meta.filetype == 'image') {
          callback('myimage.jpg', {
            alt: 'My alt text'
          });
        }

        // Provide alternative source and posted for the media dialog
        if (meta.filetype == 'media') {
          callback('movie.mp4', {
            source2: 'alt.ogg',
            poster: 'image.jpg'
          });
        }
      },

      // imagetools_cors_hosts: ['mydomain.com', 'otherdomain.com'],
      imagetools_proxy: 'proxy.php',
      /**  */
      imagetools_fetch_image: function (img) {
        console.log(':::[ img:imagetools_fetch_image  ]:::', img)
        return new tinyMCE.util.Promise(function (resolve) {
          // Fetch the image and return a blob containing the image content
          resolve(new Blob(img, {
            type: "image/png"
          }));
          // resolve(img);
        });
      },

      quickbars_insert_toolbar: 'quickimage quicktable | pagebreak',
      quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
      imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",

      // save_enablewhendirty: true,
      // save_oncancelcallback: function () { console.log('Save canceled'); },

      textpattern_patterns: [{
          start: '---',
          replacement: '<hr/>'
        },
        {
          start: '--',
          replacement: '—'
        },
        {
          start: '-',
          replacement: '—'
        },
        {
          start: '(c)',
          replacement: '©'
        },
        {
          start: '(с)',
          replacement: '©'
        },
        {
          start: '(tm)',
          replacement: '&trade;'
        },
        {
          start: '(тм)',
          replacement: '&trade;'
        },
        {
          start: '//brb',
          replacement: 'Be Right Back'
        },
        {
          start: '//heading',
          replacement: '<h1 style="color: blue">Heading here</h1> <h2>Author: Name here</h2> <p><em>Date: 01/01/2000</em></p> <hr />'
        },
        {
          start: '* ',
          cmd: 'InsertUnorderedList'
        },
        {
          start: '- ',
          cmd: 'InsertUnorderedList'
        },
        {
          start: '1. ',
          cmd: 'InsertOrderedList',
          value: {
            'list-style-type': 'decimal'
          }
        },
        {
          start: '1) ',
          cmd: 'InsertOrderedList',
          value: {
            'list-style-type': 'decimal'
          }
        },
        {
          start: 'a. ',
          cmd: 'InsertOrderedList',
          value: {
            'list-style-type': 'lower-alpha'
          }
        },
        {
          start: 'a) ',
          cmd: 'InsertOrderedList',
          value: {
            'list-style-type': 'lower-alpha'
          }
        },
        {
          start: 'i. ',
          cmd: 'InsertOrderedList',
          value: {
            'list-style-type': 'lower-roman'
          }
        },
        {
          start: 'i) ',
          cmd: 'InsertOrderedList',
          value: {
            'list-style-type': 'lower-roman'
          }
        }
      ],

      // paste_auto_cleanup_on_paste : true,

      // 'extended_valid_elements': 'img',

      // paste_postprocess: function (plugin, args) {

      // },

      paste_postprocess: function (plugin, args) {
        console.log(args);
        // args.node.setAttribute('id', '42');
        htmlFormatting(args.node, valid_elements);
      },

      // paste_preprocess: async function (pl, o) {
      //   console.log(':::[ pl  ]:::', pl)
      //   console.log(':::[ o :: paste_preprocess ]:::', o)
      //   // await formatting(tinyMCE.activeEditor.getContent())
      //   typograf(o.content)
      // },

      setup: function (editor) {

        editor.ui.registry.addContextToolbar('textselection', {
          predicate: function (node) {
            return !editor.selection.isCollapsed();
          },
          items: 'bold italic underline | copy | blockquote | formatselect | quicklink', // | typograf  glavred
          position: 'selection',
          scope: 'node'
        });



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
          onSetup: function () {
            let scriptLoader = new tinyMCE.dom.ScriptLoader()
            scriptLoader.load('https://api.glvrd.ru/v1/glvrd.js')

            scriptLoader.loadQueue(function () {
              /** div в котором редактор */
              let container = tinyMCE.activeEditor.container
              body = body || tinyMCE.activeEditor.iframeElement.contentWindow.document.getElementById("tinymce")
              /** div в который вставляем результаты проверки Главредом */
              let glvrdSideBar = '<div id="stats-glavred" class="glavred-bar"></div>'
              container.insertAdjacentHTML('beforeEnd', glvrdSideBar)
              statsBlock = document.querySelector('.glavred-bar')
            })

          },
          onAction: function () {
            let content = removeMarkup(editor.getContent().toString().trim())
            if (content !== "") {
              glavred(content)
            }
          }
        });

        //* ************************************
        //* ТИПОГРАФ
        //* ************************************
        editor.ui.registry.addButton('typograf', {
          // type: 'button',
          text: 'Типограф',
          // image: '/images/typograf.png',
          image: 'http://micro.loc/public/images/pipe-1.png',
          // icon: 'fa fa-angle-double-left',
          tooltip: 'Типографирование текста',
          // id: 'typograf',
          onAction: function () {
            typograf(editor.getContent())
          }
        });

        //* **********************************
        //*
        //* **********************************
        editor.ui.registry.addButton('format', {
          text: 'Форматирование текста',
          tooltip: 'Форматирование html разметки, по заданным правилам',
          onAction: function () {
            formatting(editor.getContent())
          }
        })

      }
    });

    // },'tinymce')
  }) // DOMContentLoaded

})()