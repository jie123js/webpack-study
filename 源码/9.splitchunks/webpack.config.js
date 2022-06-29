const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const PreloadWebpackPlugin = require('./plugins/preload-webpack-plugin');
const WebpackAssetsPlugin = require('./plugins/webpack-assets-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    publicPath: 'auto'
  },
  /* entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
    page3: './src/page3.js'
  }, */
  //在这里配置splitChunks
  optimization: {
    splitChunks: {
      //chunk分为二种，一种initial,入口代码块，同步加载的，一种叫async,异步加载的代码
      chunks: 'all',
      //最小大小，表示分离出去的代码块最小必须大于多少，默认是20000 byte。0表示不设置
      minSize: 0,
      //表示一个模块被 至少几个chunk引用时才会提取 拆分前必须共享模块的最小 chunks 数
      minChunks: 1,
      //最大的同步加载请求数
      maxInitialRequests: 5,
      //最大的异步加载请求数
      maxAsyncRequests: 1,
      //缓存组
      cacheGroups: {
        defaultVendors: false,
        default: false,
        common: {//自定义缓存组
          minChunks: 1,
          reuseExistingChunk: true
        }
        /* defaultVendors: {
          //如果模块的路径里包含node_modules的话就属于此缓存组
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          //如果一个模块被2个或2个以上的模块引用的话就属于default缓存组
          minChunks: 2,
          priority: -20
        }, */

      }

    }
  },
  plugins: [
    /* new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page1.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page2.html',
      chunks: ['page2']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page3.html',
      chunks: ['page3']
    }), */
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    /* new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    }), */
    new WebpackAssetsPlugin()

  ]
}