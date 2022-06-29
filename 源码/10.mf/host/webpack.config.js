const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    publicPath:'http://127.0.0.1:8000/'
  },
  devServer: {
    host: '127.0.0.1',
    port: 8000
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
      chunks: ["main"]
    }),
    new ModuleFederationPlugin({
      //远程引用的应用名及其别名的映射，使用时以key值作为name
      remotes: {
        remote:"remote@http://127.0.0.1:3000/remoteEntry.js"
      },
      filename: 'remoteEntry.js',//作为远程 组件向外提供服务时的文件名
      name: 'remote',//必传值，即输出的模块名，被远程引用时路径为${name}/${expose}
      exposes: {//远程引用时可暴露的资源路径及其别名
        "./Sliders": "./src/Sliders"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
    })
  ]
}