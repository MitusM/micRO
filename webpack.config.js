const path = require('path')
const {merge} = require('webpack-merge')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
// const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const analyzer = require('./webpack/analizer')
const svg = require('./webpack/svg')
const images = require('./webpack/images')
const sass = require('./webpack/sass')
const babel = require('./webpack/babel')
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
  // optimization: {},
  // optimization: {
  //   runtimeChunk: 'single',
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
  //         enforce: true,
  //         // chunks: 'all',
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
    // minimize: true,
    // minimizer: [new TerserPlugin({
    //   parallel: true,
    // })],
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },
    splitChunks: {
      minSize: 0,
      minChunks: 2,
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
    publicPath: pathList.build
  },
  devtool: false,
  resolve: {},
  // externals: [{
  //     module: 'jquery',
  //     entry: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
  //     global: 'jQuery',
  //   },
  //   {
  //     module: 'swiper',
  //     entry: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/js/swiper.js',
  //     global: 'Swiper',
  //   },
  // ],
  plugins: [
    new ManifestPlugin(),
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
        from: 'node_modules/tinymce/langs',
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

    // new DynamicCdnWebpackPlugin({
    //   resolver: (packageName, packageVersion, options) => {
    //     let env = options.env || "development";
    //     console.log(':::[ packageName ]:::', packageName)
    //     console.log(':::[ packageVersion ]:::', packageVersion)
    //     // console.log(':::[ options ]:::', options)
    //     // if (packageName === "react") {
    //     //   return {
    //     //     name: packageName,
    //     //     var: "React",
    //     //     version: packageVersion,
    //     //     url: `https://cdn.jsdelivr.net/npm/${packageName}@${packageVersion}/umd/react.${env}.min.js`
    //     //   };
    //     // } else {
    //     //   return null;
    //     // }
    //   }
    // })
  ]
},
// tinymce(),
images(),
svg(),
babel()
])

module.exports = function(env) {
  if (env === 'development') {
    return merge([{
      mode: 'development'
    },
    common,
    sass()
      // analyzer
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
