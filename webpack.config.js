const merge = require('webpack-merge')
const webpack = require('webpack')
// const copyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const path = require('path')

const analyzer = require('./webpack/analizer')
const svg = require('./webpack/svg')
const images = require('./webpack/images')
const sass = require('./webpack/sass')
const babel = require('./webpack/babel')
// const tinymce = require('./webpack/tinymce')

const pathList = {
  source: path.join(__dirname, 'develop', 'js'),
  build: path.join(__dirname, 'public', 'js')
}
const common = merge([{
    // context:
    entry: {
      style: './assets/js/index.js',
      users: './microservices/users/assets/js/index.js',
      login: './microservices/auth/assets/js/index.js',
      home: './microservices/home/assets/js/index.js',
      widget: './microservices/widget/assets/js/index.js',
      menu: './microservices/widget/widgets/menu/assets/js/index.js',
      article: './microservices/article/assets/js/index.js'
    },
    // optimization: {},
    // optimization: {
    //   // runtimeChunk: 'single',
    //   splitChunks: {
    //     chunks: 'async',
    //     // minSize: 30000,
    //     minSize: 0,
    //     minChunks: 1,
    //     maxAsyncRequests: 10,
    //     // maxInitialRequests: 3,
    //     maxInitialRequests: Infinity,
    //     name: true,
    //     cacheGroups: {
    //       default: {
    //         minChunks: 1,
    //         priority: -20,
    //         reuseExistingChunk: true
    //       },
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         // enforce: true,
    //         // chunks: 'all'
    //         priority: -10
    //       }
    //     }
    //   },
    //   // runtimeChunk: true,
    //   noEmitOnErrors: true,
    //   mergeDuplicateChunks: true,
    //   flagIncludedChunks: true
    // },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        minSize: 0,
        minChunks: 1,
        maxInitialRequests: Infinity,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
          }
        }
      }
    },
    output: {
      path: pathList.build,
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      publicPath: '/public/js/'
    },
    devtool: false,
    resolve: {},
    plugins: [
      new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  },
  // tinymce(),
  images(),
  svg(),
  babel()
])

module.exports = function (env) {
  if (env === 'development') {
    return merge([{
        mode: 'development'
      },
      common,
      sass(),
      analyzer
    ])
  } else if (env === 'production') {
    return merge([{
        mode: 'production',
        devtool: false
      },
      common,
      sass(),
      analyzer
    ])
  }
}