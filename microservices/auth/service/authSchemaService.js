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
    },
    auth: {
      tupe: Boolean
    },
    user: {
      type: Object
    }
  })
}