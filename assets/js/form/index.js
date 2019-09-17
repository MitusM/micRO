/* global _$ csrf, validator */
'use strict'
// import Main from '../system/index'
// import each from '../system/each'
// import Core from '../system/'
/**
 * [[Description]] extends Core
 * @class Form
 */
class Form {
  /**
   * [[Description]]
   * @param {[[Type]]} form   [[Description]]
   * @param {[[Type]]} option [[Description]]
   */
  constructor (selector, option) {
    // super()
    // this._form = form ? this.form(form) : null
    
    // console.log(':::[ _$.each ]:::', _$.each)
    // _$.each = _$.each
    // this._element = null
    this._form = typeof (selector) === 'string' ? document.forms[selector] : (typeof (selector) === 'object' ? selector : null)
    this.element()
    if (option) {
      this._options = option
      this.initForm()
    }
  }

  /**
   * [[Description]]
   * @memberof Form
   */
  get isForm () {
    return this._form
  }

  // /**
  //  * @param  {} val
  //  * @memberof Form
  //  */
  // set isForm (val) {
  //   this._form = val
  // }

  get elements () {
    return this._element || this.element()
  }

  /**
   * Устанавливаем атрибуты на форму
   * @param   {object} options не обязательный параметр исли он был передан в new Form('id-form',{...})
   * @returns {object} this для цепочки вызовов
   * @memberof Form
   */
  initForm (options) {
    // let form = this._form
    let obj = (this._options) ? this._options : options
    // _$.each(obj, (elem, key) => {
    //   form.setAttribute(key, elem)
    // })
    _$.attr(this._form, obj)
    return this
  }

  // /**
  //  * [[Description]]
  //  * @param   {object|string} selector [[Description]]
  //  * @returns {this}          this
  //  */
  // form (selector, bool = false) {
  //   this._form = typeof (selector) === 'string' ? document.forms[selector] : (typeof (selector) === 'object' ? selector : null)
  //   if (bool) this.element()
  //   return this
  // }

  /**
   * Хэш-таблица с элементами формы {name или type элемента: элемент}
   * @returns {object} элементы формы {name или type элемента: элемент}
   * @memberof Form
   */
  element () {
    let fieldsObj = {}
    let name
    let _
    let _name
    let objName
    let form = this._form
    
    _$.each(form, elem => {
      // console.log(':::[ form ]:::', form)
      // console.log(':::[ elem ]:::', elem)
      name = elem.getAttribute('name')
      objName = (name) || elem.getAttribute('type')
      _ = objName.indexOf('[')
      if (_ > -1) {
        _name = objName.replace(/\[/ig, '-').replace(/\]/ig, '')
      } else {
        _name = objName
      }
      fieldsObj[_name] = elem
    })
    this._element = fieldsObj
    return this
  }

  /**
   * Сброс полей формы в исходное состояние
   * @returns this
   * @memberof Form
   */
  reset () {
    this._form.reset()
    return this
  }

  /**
   * Установливаем фокус на элемент
   * @param  {object} element
   * @param  {boolean} scroll true по умолчинию т.е. прокрутка страницы до элементы формы, на котором устанавливается курсор (фокус)
   * @memberof Form
   */
  focus (element, scroll = true) {
    element.focus()
    if (scroll) element.scrollIntoView()
    return this
  }

  /**
   *
   *
   * @param {*} bool
   * @memberof Form
   */
  disabled (bool) {
    let button = this._element.submit || this._element.button
    console.log('button', button)
    button.disabled = bool || false
    return this
  }

  validate (element, option) {
    let target = element.target ? element.target : element
    let val = this.val(target)
    let rules = option.rules
    let func = rules.validator
    let min = (rules.min) ? val.length >= rules.min : true
    let max = (rules.max) ? val.length <= rules.max : true
    let validateFunction = (rules.validator) ? validator[func](val) : true
    return (val && min && max && validateFunction) ? this.error(target) : this.error(target, option.lang)
  }

   /**
    * Получение всех элементов формы в виде хэш - таблицы. Где ключём является значение атрибута name или type элемента
    * @param {string|object} selector id или class формы
    * @returns {Promise}
    * @memberof Admin
    */
  formElem () {
    return new Promise((resolve, reject) => {
      /** TODO: использовать метод для опроса формы по новой, или оставить так */
      let form = this.elements
      // let form = (this._element) ? this._element : this.element()._element
      if (form) {
        resolve(form)
      } else {
        reject(form)
      }
    })
  }

  /**
   * Устанавливаем значения элементам формы
   *
   * @param {object} obj хэш с данными для формы, где key - должен соответствовать элементу формы
   * @memberof Form
   * @example: __$.formElementValue({username: bob})
   * @returns this
   */
  formElementValue (obj) {
    this.formElem().then(elements => {
      _$.each(elements, (val, key) => {
        if (this.has(obj, key)) {
          if (elements[key].type === 'checkbox') {
            //
          } else {
            val.value = obj[key]
          }
        }
      })
    })
    return this
  }

   /**
    *
    * @param   {[[Type]]} objSave              [[Description]]
    * @param   {[[Type]]} [elements=this._element] [[Description]]
    * @returns {Promise}
    */
  isVal (objSave, elements) {
    objSave = objSave || {}
    elements = elements || this.elements
    // if (csrf) objSave.csrf = csrf
    _$.each(elements, (elem, key) => {
      if (!_$.has(objSave, key)) {
        objSave[key] = this.val(elem)
      }
    })
    // console.log(':::[ objSave ]:::', objSave)
    return Promise.resolve(objSave)
  }

  formValueElements (objSave, elements) {
    objSave = objSave || {}
    elements = elements || this.elements
    if (csrf) objSave.csrf = csrf
    _$.each(elements, (elem, key) => {
      if (!this.has(objSave, key)) {
        let val = this.val(elem)
        if (val) objSave[key] = val
      }
    })
    return Promise.resolve(objSave)
  }

  getSelectMultiple_ (el) {
    var values = []
    _$.each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value)
      }
    })
    return values.length ? values : null
  }

  getSelectSingle_ (el) {
    var selectedIndex = el.selectedIndex
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null
  }

  getValue (el) {
    var type = el.type
    if (!type) {
      return null
    }
    switch (type.toLowerCase()) {
      case 'select-one':
        return this.getSelectSingle_(el)
      case 'select-multiple':
        return this.getSelectMultiple_(el)
      case 'radio':
        return (el.checked) ? el.value : null
      case 'checkbox':
        return (el.checked) ? el.value : null
      default:
        return el.value ? el.value : null
    }
  }

  /**
   *
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */
  val (element) {
    return (element.type === 'checkbox') ? element.checked : element.value
  }

  /**
   * Получение значения type элемента
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */
  type (element) {
    return (element.target) ? element.target.type : element.type
  }

  /**
   * Получение значения name элемента
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */
  name (element) {
    return (element.target) ? element.target.name : element.name
  }
}

export default Form
