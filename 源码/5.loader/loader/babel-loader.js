const core = require('@babel/core');
const path = require('path');
function loader(source) {
    let filename = this.resourcePath.split(path.sep).pop();
    let options = this.getOptions();
    let loaderOptions = {
        ...options,
        sourceMaps: true,//我会基于上一个份sourcemap生成自己的sourcemap
        filename
    }
    //code转译后的代码 源代码和转译后的代码的映射文件 抽象语法树
    let { code, map, ast } = core.transformSync(source, loaderOptions);
    //如果想往 下一个loader传递多个值，可以使用this.callback,它是同步的
    this.callback(null, code, map, ast);
}
module.exports = loader;
/**
 * babel-loader只是提供一个转换函数，但是它并不知道要干啥要转啥
 * @babel/core 负责把源代码转成AST，然后遍历AST，然后重新生成新的代码
 * 但是它并不知道如何转换语换法，它并不认识箭头函数，也不知道如何转换
 * @babel/transform-arrow-functions 插件其实是一个访问器，它知道如何转换AST语法树
 * 因为要转换的语法太多，插件也太多。所以可一堆插件打包大一起，成为预设preset-env
 */