const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
console.log(path.resolve('dist'));

/**
 * 取值 process.env.NODE_ENV 有两个地方
 * 一个是模块内(node)
 * 一个是webpack的配置文件中
 * 
 * 
 */
//不管如何设置，此处无法取到值,因为这个是node环境的值,上面设置的是webpack环境的值,但是使用cross-env NODE_ENV=production webpack可以
//console.log('process.env.NODE_ENV', process.env.NODE_ENV);
//package.json --env决定 envObj  envObj.development 决定 mode ,mode会决定 process.env.NODE_ENV
module.exports = {
    //影响mode的几种方法
    /* "scripts": {
    "build": "cross-env NODE_ENV=production webpack",   cross是插件  因为window(set)和MAC(export)输入的指令不一样 
    "dev": "webpack serve"
  }, */
  /* "scripts": {
    "build": "webpack ==env=development",   不过这样的话要拿到值就需要把module.exports变成一个函数通过参数传进来
    "dev": "webpack serve"
  }, */
  /* "scripts": {
    "build": "webpack --mode=development",   
    "dev": "webpack serve"
  }, */
    mode:'development',
    devtool:false,//这个是控制台报错好看错误代码的位置
    //入口
    entry: './src/index.js',
    //出口
    output:{
        path:path.resolve('dist'),
        filename:'main.js',
        publicPath:''  //指定指定打包后的文件插入html文件时的访问路径路径前缀,就是dist文件夹下面的html里面的script src="/xxxx"加个/
                    //todo 默认是'' 你随便加一个/ <script defer src="/main.js"></script> 浏览器会找不到的
   
    },
    devServer:{
        //额外的静态文件根目录 (比如放图片在里面 直接http://localhost:8080/xxx.jpg 可以直接访问  )
        static: path.resolve(__dirname,'public'),
        port:8080,
        open:true
    },
      //配置解析的别名
      resolve: {
        alias: {
            '@': path.resolve('src')
        }
    },
    module:{
        //loader 翻译器
        rules:[
            //css-loader 负责url引入和@import的引入
            
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,//处理url地址中的图片地址
                            import: true,//是否要处理源码中的import关键字
                            modules: false,//是否要对类名进行模块化处理 vue style scoped
                            sourceMap: false,//是否生成sourceMap
                            esModule: false,//{default:Array}  false Array
                            importLoaders: 1,//在处理引入@import引入的css这前需要先使用几个loader对它进行处理
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/, use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,//处理url地址
                            import: false,
                            modules: true,
                            sourceMap: true,
                            importLoaders: 0,//此参数无意义，因为css-loader拿 到的less-loader编译后css代码已经没有@import
                            esModule: true
                        }
                    },
                    "postcss-loader",
                    'less-loader']
            },
            {
                test: /\.scss$/, use: [
                    'style-loader',
                    'css-loader',
                    "postcss-loader",
                    'sass-loader']
            },
            {
                test: /\.png$/,
                type: 'asset/resource',//相当于以前的file-loader,它可以发射一个文件到输出目录里
                parser: {
                    //指定内联的条件，如果引入的文件体积大于10K的话就发射文件，如果小于4K就变成base64字符串内联
                    dataUrlCondition: {
                        maxSize: 50 * 1024
                    }
                }
            },
            {
                test: /\.ico$/,
                type: 'asset/inline'//相当于以前的url-loader,它可以把文件内容变成一个base64字符串，并内联到HTML中
            },
            {
                test: /\.txt$/,
                type: 'asset/source'//相当于以前的raw-loader,不对内容做任何转换
            },
            {
                test: /\.jpg$/,
                type: 'asset',
                parser: {
                    //指定内联的条件，如果引入的文件体积大于10K的话就发射文件，如果小于4K就变成base64字符串内联
                    dataUrlCondition: {
                        maxSize: 50 * 1024
                    }
                }
            },
    
    
    
    ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            //如果此处设置了process.env.NODE_ENV，会覆盖mode设置的process.env.NODE_ENV
            //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            VERSION: JSON.stringify("1.0.0")
            //todo 如果不包JSON编译的话不会当成字符串会不识别

        }),
        //这个依赖是要拷贝public的姿态资源到dist开发环境去
        new CopyWebpackPlugin({
            patterns:[
                // {
                //     from: path.resolve("public"),
                //     to:path.resolve("dist")
                // }
                //那如果打包后网要放到dist/imgs 目录里面，怎么让页面图片正常访问 
                {
                    from: path.resolve("public"),
                    to:path.resolve("dist/imgs")
                }
            ]
        })
    ]

}