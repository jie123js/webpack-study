
var modules = {
  './src/title.js': (function (module, exports, require) {
    //表示当前的模块是es导出的
    //es导出的内部模块的一个引用地址，任何都可以获取它模块内最新的值
    //commonjs导出的一个值，
    require.r(exports);
    exports.default = 'title_name';
    exports.age = 'title_age';
    //给exports上面挂属性
    /* require.d(exports, {
      default: () => DEFAULT_EXPORT,
      age:()=>age
    });
    const DEFAULT_EXPORT = 'title_name';
    const age = { name: 'title_age'}; */
    setTimeout(() => {
      age.name = 'new_title_age';
    }, 1000);
  })
}


var cache = {};
function require(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = cache[moduleId] = {
    exports: {}
  };
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
//标明这个exports是es模块导出的结果
//不管是es还comm,最终导出的都是common
require.r = (exports) => {
  //exports[Symbol.toStringTag]='Module'
  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  //exports.__esModule = true;
  Object.defineProperty(exports, '__esModule', { value: true });
}
require.d = (exports, definition) => {
  for (let key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: definition[key]
    });
  }
}

let title = require("./src/title.js");
//console.log(title.default);
//console.log(title.age);
setTimeout(() => {
  console.log(title.age);
}, 2000);