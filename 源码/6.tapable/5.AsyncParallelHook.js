const { AsyncParallelHook } = require('./tapable');
const hook = new AsyncParallelHook(['name', 'age']);
/* 
console.time('cost');
debugger
hook.tapAsync('1', (name, age, callback) => {
    setTimeout(() => {
        console.log(1, name, age);
        callback();
    }, 1000);
});
hook.tapAsync('2', (name, age, callback) => {
    setTimeout(() => {
        console.log(2, name, age);
        callback();
    }, 2000);
});

hook.tapAsync('3', (name, age, callback) => {
    setTimeout(() => {
        console.log(3, name, age);
        callback();
    }, 3000);
});
debugger
hook.callAsync('zhufeng', 13, (err) => {
    console.log(err);
    console.timeEnd('cost')
});
 */


console.time('cost');
hook.tapPromise('1', (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1, name, age);
            resolve();
        }, 1000);
    });
});

hook.tapPromise('2', (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2, name, age);
            resolve();
        }, 2000);
    });
});

hook.tapPromise('3', (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3, name, age);
            resolve();
        }, 3000);
    });
});

hook.promise('zhufeng', 13).then((data) => {
    console.log(data);
    console.timeEnd('cost')
}); 