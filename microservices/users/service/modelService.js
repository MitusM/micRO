'use strict'
const mongoose = require('mongoose')
const userSchema = require('./userSchemaService')(mongoose)
const crypto = require('crypto')



/**
 *
 *
 * @class User
 * @extends {Bd}
 */
class User {
  constructor() {}

  get password() {
    return this._plainPassword
  }

  set password(password) {
    this._plainPassword = password
    this.salt = crypto.randomBytes(32).toString('hex')
    this.hashedPassword = this.encryptPassword(password)
  }

  /**
   * [[Description]]
   * @param   {[[Type]]} password [[Description]]
   * @returns {[[Type]]} [[Description]]
   */
  encryptPassword(password) {
    return crypto.createHmac('sha256', this.salt).update(password).digest('hex')
  }

  /**
   * [[Description]]
   * @param   {[[Type]]} password [[Description]]
   * @returns {[[Type]]} [[Description]]
   */
  static hashPassword(password) {
    this.salt = crypto.randomBytes(32).toString('hex')
    return crypto.createHmac('sha256', this.salt).update(password).digest('hex')
  }

  /**
   * Проверить пароль по хешу
   * @param   {string}  password пароль пользователя
   * @returns {boolean} true если совпал
   */
  validatePassword(password) {
    return this.encryptPassword(password) === this.hashedPassword
  }

  /**
   * Получем данные о пользователе по его e-mail
   * @param   {string}   email Пользователя
   * @returns {function} Promise <pending>
   */
  static byEmail(email) {
    return this.findOne({
      email
    })
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  set fullName(v) {
    const firstSpace = v.indexOf(' ')
    this.firstName = v.split(' ')[0]
    this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1)
  }

  /**
   * `findByFullName()` Получаем данные пользователя по его имени и фамилии
   * @param   {string}  name имя и фамилия
   * @returns {Promise} <pending>
   */
  static findByFullName(name) {
    const firstSpace = name.indexOf(' ')
    const firstName = name.split(' ')[0]
    const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1)
    return this.findOne({
      firstName,
      lastName
    })
  }

  /**
   * Получение всех данных о пользователе по определённому критерию
   * @param   {object}  criteria Критерий по которому находим пользователя. Например {email: ...}
   * @returns {Promise}
   */
  static getFullUser(criteria) {
    return this.findOne(criteria)
  }

  /**
   * Получаем всех пользователей с их данными
   * @param   {[[Type]]}     select [[Description]]
   * @returns {Array|object} [[Description]]
   */
  static getUsersAll(select) {
    select = select || 'username email group block created firstName lastName'
    return this.find({}).select(select)
  }

  /**
   * Получение данных по определённому критерию или нескольким
   * @param   {*}       [options={}]
   * @param   {object}  [options.criteria] Критерий по которому находим пользователя. Например {email:...} или {_id:...}
   * @param   {object}  [options.select]   Какие данные о запрашиваемом объекте будут выведены
   * @returns {Promise}
   */
  static load(options) {
    let select = options.select
    // let limit = options.limit || 10
    let limit = options.limit || ''
    return this.find(options.criteria).select(select).limit(limit)
  }
  
  /**
   * Вывод списка данных по странично (пагинация)
   * @param   {Object}        [options={}]        опции
   * @param   {Object|String} [options.select]    какие данные только извлекать
   * @param   {Object|String} [options.sort]      сортировка данных
   * @param   {Number}        [options.page=1]    запрашиваемая страница
   * @param   {Number}        [options.limit=10]  какое количество выбрать из базы
   * @param   {Function}      callback            функция обратного вызова
   * @returns {Promise}
   */
  static async paginate(query, options, callback) {
    query = query || {}
    let select = options.select
    let sort = options.sort
    // let sort = options.sort ? 1 : -1;
    // let limit = options.limit ? options.limit : 10;
    let limit = options.limit || 10
    let page, skip, promises
    if (options.page) {
      page = typeof options.page === 'number' ? options.page : Number(options.page)
      skip = (page - 1) * limit
    } else {
      page = 1
      skip = 0
    }

    let docsQuery = this.find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)

    promises = {
      docs: docsQuery.exec(),
      count: this.countDocuments(query).exec()
    }

    promises = Object.keys(promises).map((x) => promises[x])
    return Promise.all(promises)
      .then((data) => {
        // сколько всего пользователей
        let count = data[1]
        // сколько всего страниц с учетом вывода количества пользователей на страницу
        let ceil = Math.ceil(count / limit)
        // следующая страница со списком пользователей
        var next = page < ceil ? page + 1 : 0
        let result = {
          docs: data[0], // массив со списком пользователей
          total: count, // сколько всего пользователей
          limit: limit, // какое количество пользователей выводить на страницу
          next: next // следующая страница

        }

        if (page !== undefined) {
          result.page = page // запрошенная страница
          result.pages = ceil || 1 // сколько всего страниц
        }
        if (typeof callback === 'function') {
          return callback(null, result)
        }
        return Promise.resolve(result)
      })
  }

  static update(id, obj, select) {
    return super.findOneAndUpdate({
      _id: id
    }, obj, {
      upsert: true,
      new: true
    }).select(select)
  }
}

userSchema.loadClass(User)
module.exports = mongoose.model('user', userSchema)