'use strict'

module.exports = (mongoose) => {
  return new mongoose.Schema({
    created: {
      type: Date,
      default: Date.now
    }
  })
}