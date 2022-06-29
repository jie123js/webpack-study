const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
/* const NODE_ENV = process.env.NODE_ENV;
let publicPath;
switch (NODE_ENV) {
  case 'production':
    publicPath = 'http://prod.com'
    break;
  case 'test':
    publicPath = 'http://test.com'
    break;
  case 'development':
  default:  
    publicPath = 'http://127.0.0.1:3000/'
    break;
} */
module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
     optimization:{
       moduleIds:'named',
       chunkIds:'named'
   },
  output: {
    filename: '[name].js',
    publicPath: 'auto',
    chunkFilename:'[name].js'
  },
  devServer: {
    host:'127.0.0.1',
    port:3000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //pnpm install babel-loader @babel/core  @babel/preset-env @babel/preset-react
            presets: [
              "@babel/preset-env", "@babel/preset-react"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks:["main"]
    }),
    new ModuleFederationPlugin({
      //它其实全暴露一个全局变量 var remote;
      filename: 'remoteEntry.js',//作为远程 组件向外提供服务时的文件名
      name: 'remote',//必传值，即输出的模块名，被远程引用时路径为${name}/${expose}
      exposes: {//远程引用时可暴露的资源路径及其别名
        "./NewsList":"./src/NewsList"
      },
      remotes: {
        remote: "remote@http://127.0.0.1:8000/remoteEntry.js"
      },
      shared:{
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
      //如果在主机里想引用新闻列表组件 remote/NewsList,引用的 remote里本地的NewList组件
    })
  ]
}