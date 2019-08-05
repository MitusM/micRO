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
    let id = req.params.id || 1
    let number = req.params.number
    const usersArray = await modelUser.paginate({}, {
      limit: this.config.limit,
      select: 'username email group created block',
      page: (id === 'page') ? number : '',
      sort: {
        _id: -1
      }
    })

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


}

module.exports = Users