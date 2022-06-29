const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackExternalPlugin = require('./plugins/webpack-external-plugin');

/* const WebpackDonePlugin = require('./plugins/webpack-done-plugin');
const WebpackAssetsPlugin = require('./plugins/webpack-assets-plugin');
const WebpackArchivePlugin = require('./plugins/webpack-archive-plugin'); */
module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    main: './src/index.js'
  },
  //配置模块外链，原理不再打包对应jquery和loadash模块，而是从window.jQuery window._上进入此模块的内容
  /*  externals: {
     'jquery': 'jQuery',
     'lodash': '_'
   }, */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new WebpackExternalPlugin({
      jquery: {
        varName: 'jQuery',
        url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
      },
      lodash: {
        varName: '_',
        url: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js'
      }
    })
    /*  
     new WebpackDonePlugin(),
     new WebpackAssetsPlugin(),
     new WebpackArchivePlugin()
    */
  ]
}