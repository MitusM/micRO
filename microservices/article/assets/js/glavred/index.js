/* global tinyMCE, glvrd, _$ */
/**
 * Главред
 * @param {string} text Текст который проверяется
 */
const glavred = (text) => {
  /** Блок в котором будет отображаться ин-фа полученная от Главреда */
  // let statsBlock = document.querySelector('.glavred-bar')
  const container = tinyMCE.activeEditor.container
  // body = body || tinyMCE.activeEditor.iframeElement.contentWindow.document.getElementById('tinymce')
  /** div в который вставляем результаты проверки Главредом */
  // const glvrdSideBar = '<div id="stats-glavred" class="glavred-bar"></div>'
  container.insertAdjacentHTML('beforeEnd', '<div id="stats-glavred" class="glavred-bar"></div>')
  /** Блок в котором будет отображаться ин-фа полученная от Главреда */
  const statsBlock = document.querySelector('.glavred-bar')
  glvrd.proofread(text, (resultat) => {
    /** В зависимости от оценки устанавливаем подсветку оценки
     * @param {number} score
     * @returns {string} red | orange
     */
    const getScoreColor = function(score) {
      if (score < 5) {
        return 'red'
      }
      if (score < 7.5) {
        return 'orange'
      }
      return 'green'
    }
    if (resultat.status == 'ok') {
      //TODO: Массив стоп-слов можно будет в будущем использовать для сбора статистики
      const num = resultat.fragments.length
      let offset = 0
      if (num >= 0) {
        resultat.fragments.forEach((fragment) => {
          const tagOpen = `<span class="hint" data-glvrd="true" data-style="orange" data-desc="${fragment.hint.description}" data-name="${fragment.hint.name}" >`
          const tagClose = '</span>'
          const tagsLength = tagOpen.length + tagClose.length
          text = text.substring(0, fragment.start + offset) +
            tagOpen + text.substring(fragment.start + offset, fragment.end + offset) +
            tagClose + text.substring(fragment.end + offset, text.length)
          offset += tagsLength
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
      const classScore = getScoreColor(resultat.score)
      /** Блок в котором будет отображаться ин-фа полученная от Главреда */
      statsBlock.innerHTML = `<div class="glavred">
      <div class="rule"></div>
      <div class="stats"><span class="stats-score ${classScore}">${resultat.score}</span> - <span class="stats-score-suffix">баллов</span> из 10 <br/> по шкале Главреда</div>
      </div>`
      const body = tinyMCE.activeEditor.iframeElement.contentWindow.document.getElementById('tinymce')
      /** элемент в который вставляем описание слова */
      const ruleSelector = document.querySelector('.rule')
      /** Массив блоков с метками Главреда, взятых из текста
       * @type {NodeList}
       */
      let hint = body.querySelectorAll('.hint')
      _$.delegate(body, 'span.hint', 'mouseover', (e) => {
        const target = e.target
        const data = target.dataset
        /** устанавливаем класс для выделения блока */
        target.classList.add('highlighted')
        /** вставляем описание слова в блок  */
        ruleSelector.innerHTML = `<div class="name">${data.name}</div><div class="rule-desc">${data.desc}</div>`
        /**  */
        hint = [...hint].map((elem) => {
          /**  */
          if (elem !== target && elem.classList.contains('highlighted')) {
            elem.classList.remove('highlighted')
          }
          return elem
        })
      })

    } else {
      alert(resultat.message)
    }
  })
}

export default glavred
