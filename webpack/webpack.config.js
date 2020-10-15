const path = require('path')
const {
  merge
} = require('webpack-merge')
const webpack = require('webpack')
// const ManifestPlugin = require('webpack-manifest-plugin')
// const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const analyzer = require('./analizer')
const svg = require('./svg')
const images = require('./images')
const sass = require('./sass')
const babel = require('./babel')
const TerserPlugin = require('terser-webpack-plugin')


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

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        minSize: 0,
        minChunks: 2,
        maxInitialRequests: Infinity,
        // name: true,
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
      publicPath: pathList.build
    },
    devtool: false,
    // resolve: {},
    // mode: "development",
    watch: true,
    // devtool: "inline-cheap-source-map",
    watchOptions: {
      ignored: ["node_modules/**"],
    },

    plugins: [
      // new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),

      new CopyPlugin({
        patterns: [{
            from: 'node_modules/tinymce/plugins',
            to: path.join(pathList.build, '/plugins')
          },
          {
            from: 'node_modules/tinymce/skins',
            to: path.join(pathList.build, '/skins')
          },
          {
            from: 'assets/js/tinymce/langs',
            to: path.join(pathList.build, '/langs')
          },
          {
            from: 'node_modules/tinymce/themes',
            to: path.join(pathList.build, '/themes')
          }
        ],
        options: {
          concurrency: 100
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
  console.log('env', env)
  return merge([{
      mode: 'development',
      // watch: true
    },
    common,
    sass()
    // analyzer
  ])
}