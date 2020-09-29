// module.exports = () => {
//   return {
//     module: {
//       // rules: [{
//       //   test: /\.(gif|png|jpe?g|webp)$/i,
//       //   use: [
//       //     'file-loader',
//       //     {
//       //       loader: 'image-webpack-loader',
//       //       options: {
//       //         name: '[name].[ext]',
//       //         outputPath: '../images/',
//       //         publicPath: '../images/',
//       //         mozjpeg: {
//       //           // progressive: true,
//       //           quality: 70
//       //         },
//       //         // optipng.enabled: false will disable optipng
//       //         optipng: {
//       //           enabled: false,
//       //         },
//       //         pngquant: {
//       //           quality: [0.65, 0.90],
//       //           speed: 4
//       //         },
//       //         // the webp option will enable WEBP
//       //         webp: {
//       //           quality: 75
//       //         }
//       //       }
//       //     },
//       //   ],
//       // }]
//       rules: [
//         {
//           test: /\.(gif|png|jpe?g|svg)$/i,
//           use: [
//             "file-loader",
//             {
//               loader: "image-webpack-loader",
//               options: {
//                 bypassOnDebug: true, // webpack@1.x
//                 disable: true, // webpack@2.x and newer
//               },
//             },
//           ],
//         },
//       ],
//     },
//   };
// };

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g|webp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "../images/",
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
                mozjpeg: {
                  progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                // gifsicle: {
                //   interlaced: false,
                // },
                // the webp option will enable WEBP
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
      ],
    },
  };
};
