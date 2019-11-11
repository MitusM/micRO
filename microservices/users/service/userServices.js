'use strict'
// eslint-disable-next-line no-unused-vars
let fn = require("funclib")
/**  */
// TODO: Переименовать файл
const service = require('./serviceLayer')
/** Шаблоны (папка)*/
const views = require('./viewsServices')
/**  */
const modelUser = require('./modelService')
/** Языковые константы  */
const lang = require('../lang/ru.json')
/** Местоположение (директория) шаблона */
const dirTemplate = views()

const validator = require('validator')

class Users {
  constructor(config) {
    this.config = config
  }

  get users() {
    return this.users
  }

  set setUsers(user) {
    return this.users = user
  }

  /**
   * Страница со списком пользователей
   * @param {*} req 
   * @param {*} res 
   */
  async getUsers(req, res) {
      const usersArray = await this.getListUserPaginate(req.body.page)
      const template = await service('render', {
        // TODO: Продумать название обьекта
        server: {
          action: 'html',
          meta: {
            dir: dirTemplate,
            page: 'index.njk',
            data: {
              csrf: req.session.csrfSecret,
              lang: lang,
              config: this.config.create.args,
              ...usersArray
            }
          }
        }
      }, res.app)
      return await res.end(template.response.html)
  }


  async getUserId(req, res) {

    let user = await modelUser.findOne({
      _id: req.params.id
    }).select('username email group block')
    return await res.end({
      user,
      status: 200
    })
  }

  async getUsersList(req, res) {
    const usersArray = await this.getListUserPaginate(req.params.number)
    const template = await service('render', {
      // TODO: Продумать название обьекта
      server: {
        action: 'html',
        meta: {
          dir: dirTemplate,
          page: 'user-line-table.njk',
          data: usersArray
        }
      }
    }, res.app)

    let json = {
      html: template.response.html,
      paginate: JSON.stringify({
        "total": usersArray.total,
        "limit": usersArray.limit,
        "next": usersArray.next,
        "page": usersArray.page,
        "pages": usersArray.pages
      })
    }

    return await res.json(json)
  }

  /**
   * Список пользователей для построничной навигации
   * @param {Object} req - 
   * @param {Object} res - 
   */
  getListUserPaginate(page = 1) {
    return modelUser.paginate({}, {
      limit: this.config.limit,
      select: 'username email group created block',
      page: page,
      sort: {
        _id: -1
      }
    })
  }

  async setUsersCreate(req, res) {
    let obj = {} // 
    let arr = [] //
    let itog //
    let template
    let body = req.body
    let password = body.password
    let password2 = body.password2
    let auth = await service('auth', {
      server: {
        action: 'token',
        meta: {
          token: body.token
        }
      }
    }, res.app)

    /**
     * Проверяем есть ли сессия  
     */
    // TODO:  и права на добавления данных
    if (auth.response.csrfSecret) { // Object или null
      // TODO: Необходим микросервис group. В котором бы создавались группы и они наделялись правами доступа к дригим микросервисам и распределение прав внутри этих микросервисов.
      obj.group = (body.group === true) ? 'admin' : 'user'

      if (password !== '' && password2 !== '' && password === password2) {
        obj.password = password
      } else {
        arr.push(
          Promise.reject(new Error({
            name: 'password',
            message: lang.do_not_match
          }))
        )
      }

      // TODO: Проверку логина и почты объеденить в отдельный метод
      if (body.username !== '') {
        let name = this.userValidateLoginOrEmail('username', body.username)
        arr.push(name)
      }
      // TODO: Добавить вывод сообщения если не валидный email
      if (validator.isEmail(body.email)) {
        let email = this.userValidateLoginOrEmail('email', body.email)
        arr.push(email)
      }

      itog = await Promise.all(arr)
        .then(arrs => {
          return arrs.reduce((o, v) => {
            // из Array превратим в Object
            let key = Object.keys(v)
            let val = v[key]
            return (o[key] = val), o
          }, obj)
        })
        .then(save => {
          // fn.log(save, 'save')
          return modelUser.create(save).then(doc => {
            return {
              response: doc,
              status: 200
            }
          })
        })
        .catch(err => {
          console.log('err', err)
          return {
            response: err,
            status: 205
          }
        })

      if (itog.status === 200) {
        template = await service('render', {
          // TODO: Продумать название обьекта
          server: {
            action: 'html',
            meta: {
              dir: dirTemplate,
              page: 'user-line-table.njk',
              data: {
                docs: [itog.response]
              }
            }
          }
        }, res.app)
      } else {
        template.response = ''
        template.status = 205
      }
    }
    let end = (itog.status === 200) ? {
      status: itog.status
    } : {
      status: itog.status,
      response: itog.response
    }
    return res.end({
      ...end,
      ...template.response
    })
  }

  async delete(req, res) {
    let body = req.body
    // TODO: Добавить проверку токена и установка его на страницу.
    let response
    let auth = await service('auth', {
      server: {
        action: 'token',
        meta: {
          token: body.token
        }
      }
    }, res.app)

    if (auth.response.csrfSecret) {
      response = await modelUser.deleteOne({
        _id: body.id
      }).then(done => {
        return (done.n === 1 && done.deletedCount === 1) ? {
          status: 201,
          response: lang.user_delete
        } : {
          status: 200,
          response: lang.user_delete_no
        }
      })
    }
    res.end({
      ...response
    })
  }


  async update(req, res) {
    let body = req.body
    let id = body.id
    let target = body.target
    let update
    let select
    // TODO: Проверку токена вынести в отдельный метод
    let token = await service('auth', {
      server: {
        action: 'token',
        meta: {
          token: body.token || null
        }
      }
    }, res.app)
    // TODO: Если нет токена весь код ниже не отрабатывается
    if (token.response.csrfSecret) {
      if (target === 'block') {
        update = body.block === 'true' ? {
          "block": true
        } : {
          "block": false
        }
        select = 'block'
      } else if (target === 'edit') {
        update = await this.userUpdate(body)
        select = 'username group email block'
      }
      let response = await modelUser.findByIdAndUpdate({
          _id: id
        }, update, {
          upsert: true,
          new: true,
          select: select
        })
        // .select(select)
        .then(done => {
          return {
            status: 201,
            response: {
              text: lang.successfully_updated,
              user: done
            }
          }
        }).catch(err => {
          console.log(':::[ err ]:::', err)
          return {
            response: err,
            status: 205
          }
        })
      res.end({
        ...response
      })
    } else {
      // TODO:❓ Переадресация не работает
      res.writeHead(302, {
        'Location': req.headers['referer'] + '/qwerty/'
      })
      res.end()
    }
  }

  async userUpdate(obj) {
    let user = await modelUser.findOne({
      _id: obj.id
    }).then(doc => {
      let arr = []
      // TODO: 📌 Проверку логина и почты объеденить в отдельный метод
      if (obj.username !== doc.username) {
        let name = this.userValidateLoginOrEmail('username', obj.username)
        arr.push(name)
      }
      // TODO: 📎  Добавить вывод сообщения если не валидный email
      if (obj.email !== doc.email) {
        validator.isEmail(obj.email)
        let email = this.userValidateLoginOrEmail('email', obj.email)
        arr.push(email)
      }

      if (obj.password !== '') {
        let password = {
          hashedPassword: modelUser.hashPassword(obj.password)
        }
        let salt = {
          salt: modelUser.salt
        }
        arr.push(Promise.resolve(password))
        arr.push(Promise.resolve(salt))
      }
      let group = (obj.group === true) ? 'admin' : 'user'
      arr.push(Promise.resolve({
        group: group
      }))
      return arr
    }).then(items => {
      return Promise.all(items).then(item => {
        return item.reduce((o, v) => {
          let key = Object.keys(v)
          let val = v[key]
          return (o[key] = val), o
        }, {})
      }).catch(err => {
        console.log(':::[ err ]:::', err)
        return err
      })
    })

    return user
  }

  /**
   * Проверяем логин пользователя или email пришедшие с сервера на занятость.
   * @param {string} name
   * @param {string} val
   * @returns
   * @memberof User
   */
  userValidateLoginOrEmail(name, val) {
    let obj = {
      [name]: val
    }
    return modelUser.getFullUser(obj).then(user => {
      if (user) {
        // логин или email - занят
        return Promise.reject({
          name: name,
          message: lang.s_it_is_busy
        })
      } else {
        return obj
      }
    })
  }

}

module.exports = Users