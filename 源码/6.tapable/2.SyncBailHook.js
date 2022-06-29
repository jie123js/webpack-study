const { SyncBailHook } = require('tapable');
const hook = new SyncBailHook(['name', 'age']);
hook.tap('1', (name, age) => {
    console.log(1, name, age);
});

hook.tap('2', (name, age) => {
    console.log(2, name, age);
    //return 2;
});

hook.tap('3', (name, age) => {
    console.log(3, name, age);
});

hook.call('zhufeng', 12);