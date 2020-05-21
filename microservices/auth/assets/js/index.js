/*global _$, config, lang */
'use strict'
/**
 * Зависимости: _$.Form, _$.message
 */
import '../scss/index.scss'

(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = new _$.Form('login', true)
    const elementForm = loginForm._element
    elementForm.button.addEventListener('click', (e) => {
      e.preventDefault()
      loginForm.isVal().then((val) => {
        let validate = loginForm.validateForm(val, config)
        if (validate) {
          _$.fetch('/auth/login', {
            method: 'post',
            body: val
          }).then(done => {
            if (done.status === 403) {

              _$.message('error', {
                title: lang.message.title,
                message: lang.message.success,
                position: 'topCenter'
              })

            } else if (done.status === 200) {
              document.location.reload(true)
            }
          }).catch(err => {
            console.log('::: fetch[ err ]:::', err)
          })
        }
      }).catch((err) => {
        console.log('::: isVal[ err ]:::', err)
      })
    })
  })
})()