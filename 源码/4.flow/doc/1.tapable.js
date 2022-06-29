//const { SyncHook } = require('tapable');
class SyncHook{
    constructor(args) {
        this.args = args;
        this.argsLength = args ? args.length : 0;
        this.taps = [];
    }
    tap(name,fn) {
        this.taps.push({name,fn});
    }
    call() {
        let args = Array.prototype.slice.call(arguments, 0, this.argsLength);
        this.taps.forEach(tap=>tap.fn(...args));
    }
}
let syncHook = new SyncHook(['aa']);

syncHook.tap('监听器名称1', (yy) =>{
    console.log('监听器名称1', yy);
});
syncHook.tap('监听器名称2', (zz) => {
    console.log('监听器名称2',zz);
});
//webpack里有很多的插件，这些插件可以用来注册一些钩子回调，然后在合适 的时间点触发
class SomePlugin {
    apply() {
        syncHook.tap('SomePlugin', (tt) => {
            console.log('SomePlugin', tt);
        });
    }
}

new SomePlugin().apply();// js apply

syncHook.call('名称');// js call


//events
// on
// emit