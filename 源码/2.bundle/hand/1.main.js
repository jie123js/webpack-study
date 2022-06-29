//把所有模块定义全部存放到modules对象里 
//属性名是模块的ID，也就是相对于根目录的相对路径，包括文件扩展名
//值是此模块的定义函数，函数体就是原来的模块内的代码
var modules = {
  './src/title': function (module, exports, require) {
    let msg = require('./src/msg.js');
    //exports = 'title';
    module.exports = 'title-' + msg;
  },
  './src/msg.js': function (module, exports, require) {
    module.exports = 'msg';
  }
}

var cache = {};
//在打包后的文件里按commonjs实现了一个require
function require(moduleId) {
  if (cache[moduleId]) {
    return cache[moduleId].exports;
  }
  var module = cache[moduleId] = {
    exports: {}
  }
  modules[moduleId](module, module.exports, require);
  return module.exports;
}

let title = require('./src/title');
console.log(title);