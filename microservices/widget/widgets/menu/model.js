'use strict'
const mongoose = require('mongoose')
// module.exports = () => {



// }
 const menuSchema = new mongoose.Schema({
   title: {
     type: String,
     required: true,
     unique: true
   },
   url: [],
    modified: {
      type: Date,
      default: Date.now
    },
    ask: {
      type: mongoose.Schema.Types.Mixed,
      default: false
    }
  })



module.exports = mongoose.model('menu', menuSchema)