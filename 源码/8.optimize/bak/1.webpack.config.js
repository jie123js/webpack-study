const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const smw = new SpeedMeasureWebpackPlugin();
module.exports = smw.wrap({
  mode: 'development',
  devtool: false,
  //配置如何解析模块路径
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      //bootstrap
    },
    modules: ['mymodules', 'node_modules'],
    mainFields: ['style', 'module', 'main', 'base'],
    mainFiles: ["index", "base"]
  },
  //只会在找loader的时候生效
  resolveLoader: {
    modules: ['loaders', 'mymodules', 'node_modules'],
  },
  module: {
    noParse: /jquery|lodash/,//此模块不需要解析它的依赖
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'test-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.IgnorePlugin({
      contextRegExp: /moment$/,
      resourceRegExp: /^\.\/locale/
    }),
    new BundleAnalyzerPlugin()
  ]
})