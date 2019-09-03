'use strict'
// eslint-disable-next-line no-unused-vars
let fn = require("funclib")
/**  */
// TODO: Переименовать файл
let service = require('./serviceLayer')
/** Шаблоны (папка)*/
let views = require('./viewsServices')

let modelUser = require('./modelService')

/** Местоположение (директория) шаблона */
let dirTemplate = views()

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


  async getUsers(req, res) {
    const usersArray = await this.getListUserPaginate(req.body.page)
    // fn.log(usersArray, 'usersArray')

    const template = await service('render', {
      // TODO: Продумать название обьекта
      server: {
        action: 'html',
        meta: {
          dir: dirTemplate,
          page: 'index.html',
          data: usersArray
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
          page: 'user-line-table.html',
          data: usersArray
        }
      }
    }, res.app)
fn.log(template.response.html, 'template.response.html')
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


}

module.exports = Users