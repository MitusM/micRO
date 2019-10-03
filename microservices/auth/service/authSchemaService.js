'use strict'

module.exports = (mongoose) => {
  return new mongoose.Schema({
    expires: {
      type: Date,
      default: Date.now
    },
    session: {
      type: Object
    }
  })
}