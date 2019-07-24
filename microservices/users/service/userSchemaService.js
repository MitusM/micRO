'use strict'

module.exports = (mongoose) => {
  return new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    firstName: String,
    lastName: String,
    hashedPassword: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    },
    group: {
      type: String,
      required: true,
      index: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    block: { // бан пользователя
      type: Boolean,
      default: false
// index: true
    }

  })
}