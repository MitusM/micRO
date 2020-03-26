// 'use strict'
const mongoose = require('mongoose')
const homeSchema = require('./schemeService')(mongoose)

class Home {
  constructor() {}

  static async select() {
    let response = await this.findOne({}).select('home')
    return response
  }

  static async createOrUpdate(body) {
    let query = {}
    let response = await this.findOneAndUpdate(query, {
      $set: {
        home: body.home
      }

    }, {
      new: true,
      safe: true,
      upsert: true,
      select: 'home'
    })

    return response
  }


}

homeSchema.loadClass(Home)
module.exports = mongoose.model('home', homeSchema)