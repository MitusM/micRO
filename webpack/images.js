module.exports = () => {
  return {
    module: {
      // rules: [
      //   {
      //     test: /\.(gif|png|jpe?g|webp)$/i,
      //     use: [{
      //       loader: 'file-loader',
      //       options: {
      //         // name: 'images/[name][hash].[ext]'
      //         name: '[name].[ext]',
      //         outputPath: '../images/',
      //         publicPath: '../images/'
      //       }
      //     }, {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 70
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false
      //         },
      //         pngquant: {
      //           quality: '65-90',
      //           speed: 4
      //         },
      //         gifsicle: {
      //           interlaced: false
      //         },
      //           // the webp option will enable WEBP
      //         webp: {
      //           quality: 75
      //         }
      //       }
      //     }
      //     ]
      //   }
      // ]
      rules: [{
        test: /\.(gif|png|jpe?g|webp)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../images/',
              publicPath: '../images/',
              mozjpeg: {
                progressive: true,
                quality: 70
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      }]
    }
  }
}