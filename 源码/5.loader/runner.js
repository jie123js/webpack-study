const { runLoaders } = require('./loader-runner');
const path = require('path');
const fs = require('fs');
//将要转换的模块文件绝对路径
const entryFile = path.resolve(__dirname, 'src/index.js');
let request = `inline1-loader!inline2-loader!${entryFile}`;
//require('style-loader!css-loader!./index.css');
//enforce是一个属性，是一个配置，是配置loader的类型的
//如果有多个类型的loader 的叠加顺序=post(后置)+inline(内联)+normal(正常)+pre(前置)
//厚脸挣钱 后联正前
let rules = [
    {
        test: /\.js/,
        use: ['normal1-loader', 'normal2-loader']
    },
    {
        test: /\.js/,
        enforce: 'pre',
        use: ['pre1-loader', 'pre2-loader']
    },
    {
        test: /\.js/,
        enforce: 'post',
        use: ['post1-loader', 'post2-loader']
    }
]
let parts = request.replace(/^-?!+/, '').split('!');
//let parts = request.split('!');
//最后一个元素是要加载的模块 index.js
let resource = parts.pop();
//配置的行内loaders
let inlineLoaders = [...parts];
let preLoaders = [], postLoaders = [], normalLoaders = [];
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    if (rule.test.test(resource)) {
        if (rule.enforce === 'pre') {
            preLoaders.push(...rule.use);
        } else if (rule.enforce === 'post') {
            postLoaders.push(...rule.use);
        } else {
            normalLoaders.push(...rule.use);
        }
    }
}
//如果有多个类型的loader 的叠加顺序=post(后置)+inline(内联)+normal(正常)+pre(前置)
//-! noPreAutoLoaders	不要前置和普通 loader
let loaders = [];
if (request.startsWith('-!')) {
    loaders = [...postLoaders, ...inlineLoaders];
    //! noAutoLoaders	不要普通 loader
} else if (request.startsWith('!!')) {
    //noPrePostAutoLoaders	不要前后置和普通 loader,只要内联 loader
    loaders = [...inlineLoaders,];
} else if (request.startsWith('!')) {
    loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
} else {
    loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}
//解析模块的绝对路径
let resolveLoader = loader => path.resolve(__dirname, 'loaders', loader);
loaders = loaders.map(resolveLoader);
debugger
runLoaders({
    resource,//要转换的资源
    loaders,//配置的loader
    context: { name: 'zhufeng', age: 18 },//this指针 
    readResource: fs.readFile.bind(this) //读取资源的方法就是fs.readFile
}, (err, result) => {//finalCallback
    console.log(err);
    console.log(result.result);//放着转换后的内容
    console.log(result.resourceBuffer ? result.resourceBuffer.toString() : '');//resource的资源文件的原始内容
});

