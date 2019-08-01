const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
  return {
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(sa|sc|c)ss$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../css/[name].css',
        chunkFilename: '../css/[id].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    }
  }
}