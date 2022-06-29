const { SyncHook } = require('./tapable');
const hook = new SyncHook(['name', 'age']);
hook.intercept({
    //当你触发一个新的回调的时候会触发
    register(tapInfo) {
        console.log('拦截器1开始register');
        return tapInfo;
    },
    //每一个回调函数都会触发
    tap(tapInfo) {
        console.log('拦截器1的tap');
    },
    call(name, age) {
        console.log('拦截器1的call', name, age);
    }
});
hook.intercept({
    //当你触发一个新的回调的时候会触发
    register(tapInfo) {
        console.log('拦截器2开始register');
        return tapInfo;
    },
    //每一个回调函数都会触发
    tap(tapInfo) {
        console.log(tapInfo);
        console.log('拦截器2的tap', tapInfo.name);
    },
    call(name, age) {
        console.log('拦截器2的call', name, age);
    }
});

hook.tap('1', (name, age) => {
    console.log(1, name, age);
});

hook.tap({ name: '2' }, (name, age) => {
    console.log(2, name, age);
});

hook.call('zhufeng', 12);
/**
 * 
拦截器1开始register
拦截器2开始register
拦截器1开始register
拦截器2开始register
拦截器1的call zhufeng 12
拦截器2的call zhufeng 12
拦截器1的tap
拦截器2的tap
1 zhufeng 12
拦截器1的tap
拦截器2的tap
2 zhufeng 12

 */