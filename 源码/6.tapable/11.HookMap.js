const { SyncHook, AsyncParallelHook, HookMap } = require('./tapable');
//const keyedHookMap = new HookMap(() => new SyncHook(['name']));
const keyedHookMap = new HookMap(() => new AsyncParallelHook(['name']));
/* keyedHookMap.for('key1').tapAsync('plugin1', (name) => console.log(1, name));
keyedHookMap.for('key1').tapAsync('plugin2', (name) => console.log(2, name)); */

keyedHookMap.tapAsync('key1', 'plugin1', (name) => console.log(1, name));
keyedHookMap.tapAsync('key1', 'plugin2', (name) => console.log(2, name));

const hook1 = keyedHookMap.get('key1');
hook1.callAsync('zhufeng');

//有些时候我们需要创建一组的hook
//js png ts json
//在webpack里，不同的文件对应不同的模块，不同的模块对应不同的模块工厂，不同的模块工厂会对应不同的钩子
// {'.js':JavaScriptFactoryHook,'json':JSONFactoryHook}