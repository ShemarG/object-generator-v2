var path = require('path')
module.exports = {
  configureWebpack: {
    loader: {
      rules: [
        { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
      ]
    },
    resolve: {
      alias: {
        'fonts': path.join(__dirname, './src/assets/fonts'),
        'images': path.join(__dirname, './src/assets/images'),
        'components': path.join(__dirname, './src/components')
      }
    }
  }
}
