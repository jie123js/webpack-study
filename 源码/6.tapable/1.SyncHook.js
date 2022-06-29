const { SyncHook } = require('./tapable');
const hook = new SyncHook(['name', 'age']);
debugger
hook.tap('1', (name, age) => {
    console.log(1, name, age);
});

hook.tap({ name: '2' }, (name, age) => {
    console.log(2, name, age);
});
debugger
hook.call('zhufeng', 12);