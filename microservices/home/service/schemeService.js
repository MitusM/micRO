module.exports = (mongoose) => {
  return new mongoose.Schema({
    home: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
      // type: Object
    },
    created: {
      type: Date,
      default: Date.now
    }
  })
}