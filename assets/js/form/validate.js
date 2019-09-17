/* global _$, conf, lang */
'use strict'
/**
 * Проверка на заполнение обязательных полей формы
 * @param  {} e
 */
export default function validate (e) {
  let name = _$.name(e)
  let args = conf.links.create.args
  let val = _$.validate(e, {
    lang: lang.error[name],
    rules: args[name].rules,
    validator: args[name].rules.validator || false
  })
  console.log('val', val)
}