'use strict'

module.exports = (mongoose) => {
  return new mongoose.Schema({
    _id: {
      type: String
    },
    expires: {
      type: Date,
      default: Date.now
    },
    session: {
      type: Object
      // auth: {
      //   type: Boolean,
      //   default: false
      // },
      // user: {
      //   type: Object
      // }
    },
    auth: {
      type: Boolean
    },
    user: {
      type: Object
    }
  })
}