const path = require('path');
const webpackRunPlugin = require('./plugins/webpack-run-plugin');
const webpackDonePlugin = require('./plugins/webpack-done-plugin');

module.exports = {
    mode: 'development',
    //entry: './src/index.js',{ main: './src/index.js'}
    entry: {
        entry1: './src/entry1.js',
        entry2: './src/entry2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].js'  
    },
    resolve: {
      extensions:['','.js','.jsx']  
    },
    module: {
        //其实在大型项目 中，webpack的配置文件可能会有多个，而且还有有shell配置，需要合并
        rules: [
/*             {
                test: /\.js$/,
                use: ['eslint']
            }, */
            {
                test: /\.js$/,
                use: [
                    path.resolve(__dirname, 'loaders/logger1-loader.js'),
                    path.resolve(__dirname, 'loaders/logger2-loader.js')
                ]
            }//,
            /* {
                test: /\.css$/,
                use: [
                    path.resolve(__dirname, 'loaders/style-loader.js')
                ]
            } */
        ]
    },
    plugins: [
        new webpackRunPlugin({msg:'消息'}),
        new webpackDonePlugin({msg:'消息'})
    ]
}
//一般来说每个入口对生成一个代码块chunk,每个代码块chunk里面会放着本入口模块和它依赖的模块