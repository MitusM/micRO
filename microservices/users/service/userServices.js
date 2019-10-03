'use strict'
// eslint-disable-next-line no-unused-vars
// let fn = require("funclib")
/**  */
// TODO: Переименовать файл
let service = require('./serviceLayer')
/** Шаблоны (папка)*/
let views = require('./viewsServices')
/**  */
let modelUser = require('./modelService')
/** Языковые константы  */
let lang = require('../lang/ru.json')
/** Местоположение (директория) шаблона */
let dirTemplate = views()

// eslint-disable-next-line no-unused-vars
let fn = require("funclib")

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


  async getUsersList(req, res) {
    const usersArray = await this.getListUserPaginate(req.body.page)
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
    let body = req.body
    // let body = req.body
    console.log('===========================')
    console.log(':::[ body ]:::', body)
    // fn.log(req.body, 'req.body')
    // fn.log(req.session, 'session')
    fn.log(req.cookies, 'cookies')
    let token = await service('auth', {
      server: {
        action: 'token',
        meta: {
          token: body.token
        }
      }
    }, res.app)
    console.log(':::[ token ]:::', token)
    console.log('===========================')
    return await res.end(token)
    // return res.json({
    //   token: token
    // })
  }
}

module.exports = Users