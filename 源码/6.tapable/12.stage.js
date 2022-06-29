const { SyncHook } = require('./tapable');
const hook = new SyncHook(['name']);
hook.tap({ name: 'tap1', stage: 1 }, (name) => {
  console.log(1, name);
});
hook.tap({ name: 'tap3', stage: 3 }, (name) => {
  console.log(3, name);
});
hook.tap({ name: 'tap5', stage: 5 }, (name) => {
  console.log(5, name);
});
hook.tap({ name: 'tap2', stage: 2 }, (name) => {
  console.log(2, name);
});
hook.call('zhufeng');
//比如说我们写一些回调函数，webpack打包分成很多阶段
//1.分析参数  2. 创建模块 3 生成chunk 5.生成文件
//loader 可能是由多个配置文件合并在一起，我们很难完全规定书写的顺序。pre post normal 