let { AsyncSeriesBailHook } = require("tapable");
let factorize = new AsyncSeriesBailHook(['resolveData']);
//最后总得返回一个模块吧 switch case default 
factorize.tapAsync('factory1', (resolveData, callback) => {
  if (resolveData === 'jquery') {
    callback(null, {
      id: resolveData,
      type: '外部模块',
      source: 'window.jQuery'
    });
  } else {
    callback(null);
  }
});
//生成正常模块的工厂函数最后一个工厂函数了，
factorize.tapAsync('factory2', (resolveData, callback) => {
  callback(null, { id: resolveData, type: '正常模块', source: 'webpack打包后的内容' });
});

factorize.callAsync('jquery', (err, module) => {
  console.log(module);
});
factorize.callAsync('lodash', (err, module) => {
  console.log(module);
});