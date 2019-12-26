/* global _$, csrf */
'use strict'
/** 
 * Зависимости: _$.attr, _$.each, _$.create, _$.has
 */

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
  constructor(selector, option) {
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
  get isForm() {
    return this._form
  }

  get elements() {
    return this._element || this.element()
  }

  /**
   * Устанавливаем атрибуты на форму
   * @param   {object} options не обязательный параметр исли он был передан в new Form('id-form',{...})
   * @returns {object} this для цепочки вызовов
   * @memberof Form
   */
  initForm(options) {
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
  element() {
    let fieldsObj = {}
    let name
    let _
    let _name
    let objName
    let form = this._form

    _$.each(form, elem => {
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
  reset() {
    this._form.reset()
    return this
  }

  /**
   * Установливаем фокус на элемент
   * @param  {object} element
   * @param  {boolean} scroll true по умолчинию т.е. прокрутка страницы до элементы формы, на котором устанавливается курсор (фокус)
   * @memberof Form
   */
  focus(element, scroll = true) {
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
  disabled(bool) {
    let button = this._element.submit || this._element.button
    console.log('button', button)
    button.disabled = bool || false
    return this
  }

  validate(element, option) {
    let target = element.target ? element.target : element
    let val = this.val(target)
    let rules = option.rules
    let func = rules.validator
    let min = (rules.min) ? val.length >= rules.min : true
    let max = (rules.max) ? val.length <= rules.max : true
    let validateFunction = (func) ? _$.validator[func](val) : true
    return (val && min && max && validateFunction) ? this.error(target) : this.error(target, option.lang)
  }

  validateForm(val, params) {
    let bool = Object.keys(val)
      .map(key => {
        /** Для необязательных полей устанавливаем значение в true */
        let valid = true
        if (key !== 'submit' && key !== 'button') {
          /** Находим элемент в конфиге */
          let args = params[key]
          /** Проверка на то являтся элемент обязательным */
          let required = _$.has(args, 'required') ? args.required : false
          /** Находим правила установленные для элемента */
          let rules = args.rules
          /** Если поле обязательное и на него установлены правила, проверим значение элемента формы с учётом правил */
          if (required && rules) {
            /** Находим элемент */
            let element = this.elements[key]
            valid = (key === 'token') ? true : this.validate(element, {
              // eslint-disable-next-line no-undef
              lang: lang.error[key],
              rules: rules,
              validator: rules.validator || false
            })
          }
          return valid
        }
      }) // Removing undefined values from Array
      .filter(item => {
        return item !== undefined
      })
      // проверим все ли элементы массива true
      .every(item => {
        return item === true
      })
    return bool
  }

  /**
   * Получение всех элементов формы в виде хэш - таблицы. Где ключём является значение атрибута name или type элемента
   * @param {string|object} selector id или class формы
   * @returns {Promise}
   * @memberof Admin
   */
  formElem() {
    return new Promise((resolve, reject) => {
      // TODO: использовать метод для опроса формы по новой, или оставить так
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
   * @example: _$.elementValue({username: bob})
   * @returns this
   */
  elementValue(obj) {
    this.formElem().then(elements => {
      _$.each(elements, (val, key) => {
        if (_$.has(obj, key)) {
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
  isVal(objSave, elements) {
    objSave = objSave || {}
    elements = elements || this.elements
    _$.each(elements, (elem, key) => {
      if (!_$.has(objSave, key)) {
        objSave[key] = this.val(elem)
      }
    })
    return Promise.resolve(objSave)
  }

  formValueElements(objSave, elements) {
    objSave = objSave || {}
    elements = elements || this.elements
    if (csrf) objSave.csrf = csrf
    _$.each(elements, (elem, key) => {
      if (!_$.has(objSave, key)) {
        let val = this.val(elem)
        if (val) objSave[key] = val
      }
    })
    return Promise.resolve(objSave)
  }

  getSelectMultiple_(el) {
    var values = []
    _$.each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value)
      }
    })
    return values.length ? values : null
  }

  getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null
  }

  getValue(el) {
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
  val(element) {
    return (element.type === 'checkbox') ? element.checked : element.value
  }

  /**
   * Получение значения type элемента
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */
  type(element) {
    return (element.target) ? element.target.type : element.type
  }

  /**
   * Получение значения name элемента
   *
   * @param {*} element
   * @returns
   * @memberof Form
   */
  name(element) {
    return (element.target) ? element.target.name : element.name
  }

  error(e, text) {
    let span
    let target = e.target ? e.target : e
    /** Находим в родительском элементе, первый дочерний элемент, в частности label в него будем подгружать сообщение об ошибке */
    let parent = target.parentNode.childNodes[1]
    /** работа с классом */
    let error = target.classList
    /** находим span с ошибкой */
    let child = parent.children[0]
    if (typeof arguments[1] === 'string') {
      /** добавляем class error к элементу провалившиму валидацию */
      error.add('error')
      if (parent.childElementCount === 0) {
        span = _$.create('span', {
          class: 'error-text'
        }, text)
        parent.appendChild(span)
      }
      return false
    } else {
      /** удаляем класс error у поля */
      error.remove('error')
      if (child) { // если span обнаружен
        /** удаляем текстовое сообщение */
        child.remove()
      }
      return true
    }
  }
}

export default Form