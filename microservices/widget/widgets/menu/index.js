'use srict'
const config = require('./config.json')
const lang = require('./lang.json')
const view = require('../../service/viewsServices')
const model = require('./model')

// TODO: Уличшить код
let submenu = (object, i, bool) => {
  let el = ''
  let n = i++
  bool = bool || false
  if (bool) el += `<ul style="display: block;">`
  for (const key in object) {
    const obj = object[key];
    el += `<li id="node${n}"><a href="#" id="nodeATag_${n}" data-url="${obj.url}">${obj.title}</a>`
    if (obj.submenu) {
      el += submenu(obj.submenu, n, true)
    }
    el += `</li>`
    if (bool) el += '</ul>'
    n++
  }
  return el
}
// TODO: Уличшить код
let menuRender = (done, arr, i) => {
  arr = arr || []
  let count = done.length
  let el = ''
  i = i || 0
  for (i; count > i; i++) {
    let obj = done[i]
    el += `<li id="${obj._id}" class="list-group-item" data-id="${obj._id}"><a class="title-menu" href="#" id="nodeATag${ i }">${ obj.title }</a><ul class="drag_ul_0">`
    if (obj.url.length > 0) {
      el += submenu(obj.url, i)
    }
    el += ` </ul></li>`
    arr.push(el)
    el = ''
  }
  return arr
}

class Menu {
  constructor(target) {
    /**  */
    this._dir = view(['../', 'widgets/', 'menu'])
    /**  */
    this._template = view(['../', 'widgets/menu/', 'views', `${target}.njk`])
  }

  select() {
    return model.find({}).select('title url').then(done => {
      let htmlMenu = menuRender(done)
      return htmlMenu
    })
  }

  async create(body) {
    let response
    if (body.title) {
      let menu = await model.create({
        "title": body.title
      })

      response = {
        status: 201,
        menu
      }

    } else {
      response = {
        status: 200,
        response: lang.no_title
      }
    }

    return response
  }

  async edit(body) {
    let response
    if (body.id) {
      let edit = await model.findByIdAndUpdate({
          _id: body.id
        }, body, {
          upsert: true,
          new: true,
          select: '_id url title'
        })
        .then((done) => {
          return done
        })
      response = {
        status: 201,
        ...edit
      }

    } else {
      response = {
        status: 200,
        response: lang.menu_identifier
      }
    }
    return response
  }

  async delete(body) {
    let response
    if (body.id) {
      response = await model.deleteOne({
        _id: body.id
      }).then(done => {
        return (done.n === 1 && done.deletedCount === 1) ? {
          status: 201,
          response: 'Меню удалено'
        } : {
          status: 200,
          response: 'Что-то пошло не так, попробуйте позже'
        }
      })
    } else {
      response = {
        status: 200,
        response: lang.menu_identifier
      }
    }
    return response
  }

  async widget() {
    return model.find({}).select('url title').then(done => {
      return done
    })
  }

  async config (conf) {
    return conf
  }

}

module.exports = {
  name: 'menu',
  config: config,
  lang: lang,
  function: Menu
}