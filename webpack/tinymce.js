module.exports = () => {
  return {
    module: {
      rules: [

        {
          test: require.resolve('tinymce/tinymce'),
          loaders: [
            'imports?this=>window',
            'exports?window.tinymce'
          ]
        },
        {
          test: /tinymce\/(themes|plugins)\//,
          loaders: [
            'imports?this=>window'
          ]
        }
      ]
    }
  }
}