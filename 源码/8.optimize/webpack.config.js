const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackHashPlugin = require('./plugins/webpack-hash-plugin');
module.exports = {
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.js',//改代码一般main对应的入口文件
    //vendor: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[chunkhash][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new WebpackHashPlugin()
  ]
}