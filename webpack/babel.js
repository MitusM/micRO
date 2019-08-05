'use strict'
module.exports = function (inc) {
  // console.log('inc', inc)
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: inc,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.bundle\.js$/,
          use: {
            loader: 'bundle-loader'
          }
        }
      ]
    }
  }
}
