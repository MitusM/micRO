'use srict'
const config = require('./config.json')
const lang = require('./lang.json')
const view = require('../../service/viewsServices')
const model = require('./model')

class Menu {
  constructor(target) {
    /**  */
    this._dir = view(['../', 'widgets/', 'menu'])
    /**  */
    this._template = view(['../', 'widgets/menu/', 'views', `${target}.njk`])
  }

  select() {
    return model.find({}).select('title').then(done => {
      return done
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
    console.log(':::[ body ]:::', body)
    let response
    // let status
    // let text
    if (body.id) {
      let edit = await model.findByIdAndUpdate({
          _id: body.id
        }, body, {
          upsert: true,
          new: true,
          select: '_id url title'
        })
        .then((done) => {
          // status = 201
          return done
        })
        response = {
          status: 201,
          ...edit
        }

    } else {
      // status = 200,
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

}

module.exports = {
  name: 'menu',
  config: config,
  lang: lang,
  function: Menu
}