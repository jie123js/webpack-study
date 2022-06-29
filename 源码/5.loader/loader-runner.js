const fs = require('fs');
/**
 * 把loader的绝对路径变成一个loader函数
 * @param {*} loader 
 * @returns 
 */
function createLoaderObject(loader) {
    //获取loader的normal函数
    let normal = require(loader);
    //获取loader的pitch函数
    let pitch = normal.pitch;
    //以前我会在讲file-loader 如果它为true,我们传递给loader的源内容是一个Buffer,否则就是一个字符串
    let raw = normal.raw;
    return {
        path: loader,
        normal,
        pitch,
        raw,//内容是否必须是二进制
        data: {},//每个loader可以携带一个自定义的数据对象
        pitchExecuted: false,//此loader的pitch函数是否已经执行过了
        normalExecuted: false//此loader的normal函数是否已经执行过了
    }
}
/**
 * 读取资源
 * @param {*} processOptions 
 * @param {*} loaderContext 
 * @param {*} pitchingCallback 
 */
function processResource(processOptions, loaderContext, pitchingCallback) {
    processOptions.readResource(loaderContext.resource, (err, resourceBuffer) => {
        processOptions.resourceBuffer = resourceBuffer;
        loaderContext.loaderIndex--;
        console.log(resourceBuffer.toString());
        iterateNormalLoaders(processOptions, loaderContext, [resourceBuffer], pitchingCallback);
    });
}
function convertArgs(args, raw) {
    if (raw && !Buffer.isBuffer(args[0])) {
        args[0] = Buffer.from(args[0]);
    } else if (!raw && Buffer.isBuffer(args[0])) {
        args[0] = args[0].toString('utf8');
    }
}
function iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback) {
    if (loaderContext.loaderIndex < 0) {
        return pitchingCallback(null, args);
    }
    let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
    if (currentLoader.normalExecuted) {
        loaderContext.loaderIndex--;
        return iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback);
    }
    let normalFn = currentLoader.normal;
    currentLoader.normalExecuted = true;
    convertArgs(args, currentLoader.raw);
    runSyncOrAsync(normalFn, loaderContext, args, (err, ...returnArgs) => {
        return iterateNormalLoaders(processOptions, loaderContext, returnArgs, pitchingCallback);
    });
}
/**
 * 迭代执行从左向右执行每一个loader的pitch函数
 * @param {*} processOptions 选项 readResource result.resourceBuffer
 * @param {*} loaderContext this指针 
 * @param {*} pitchingCallback 
 */
function iteratePitchingLoader(processOptions, loaderContext, pitchingCallback) {
    //如果一直从左向右执行，越界了，就可以读文件了
    if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
        return processResource(processOptions, loaderContext, pitchingCallback);
    }
    let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
    if (currentLoader.pitchExecuted) {///如果说当前的loader的pitchExecuted为true
        loaderContext.loaderIndex++;
        return iteratePitchingLoader(processOptions, loaderContext, pitchingCallback);
    }
    let pitchFn = currentLoader.pitch;
    //如果没有pitch函数，也要设置为true
    currentLoader.pitchExecuted = true;//表示这个loader的pitch已经执行过了
    //如果说pitchFn不存在没有，直接跳过此loader,执行下一个 loader的pitch
    if (!pitchFn) {
        return iteratePitchingLoader(processOptions, loaderContext, pitchingCallback);
    }
    //以同步或者异步的方式执行fn
    runSyncOrAsync(pitchFn, loaderContext, [
        loaderContext.remainingRequest,
        loaderContext.previousRequest,
        loaderContext.data
    ], (err, ...args) => {
        //如果pitch的返回值不为空，则跳过后续的loader和读文件操作，直接掉头执行前一个 loader的normal
        if (args.length > 0 && args.some(item => item)) {
            loaderContext.loaderIndex--;
            iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback);
        } else {
            return iteratePitchingLoader(processOptions, loaderContext, pitchingCallback);
        }
    });
}
function runSyncOrAsync(fn, loaderContext, args, runCallback) {
    //用来标识此fn是同步执行还是异步执行
    let isSync = true;
    //在loader的函数里执行它相当于执行下一个loader对应的函数
    loaderContext.callback = (...args) => {
        runCallback(...args);
    }
    loaderContext.async = function () {
        isSync = false;//把同步标识改为异步
        return loaderContext.callback;
    }
    let result = fn.apply(loaderContext, args);
    //如果是同步执行loader中的函数(normal pitch)
    if (isSync) {
        //直接调用runCallback向下执行，如果是异步此处不执行任何代码，等待你在loader里调用callback
        runCallback(null, result);
    }
}
/**
 * 
 * @param {*} options 选项 
 * @param {*} finalCallback 最终的回调 
 */
function runLoaders(options, finalCallback) {
    const {
        resource,//读取的文件
        loaders = [],//对此文件生效和翻译的loader
        context = {},//上下文对象
        readResource = fs.readFile//读取文件的方法
    } = options;
    const loaderObjects = loaders.map(createLoaderObject);
    const loaderContext = context;//loader的normal或pitch函数执行时候的this对象
    loaderContext.resource = resource;
    loaderContext.loaders = loaderObjects;
    loaderContext.readResource = readResource;
    loaderContext.loaderIndex = 0;//表示当前正在执行的loader的索引
    //这是一个回调函数，它的作用是调用它就会执行下一步 TODO
    loaderContext.callback = null;
    //默认loader的执行是同步的，执行完loader代码后会默认执行下一步，如果你调用async的话，把同步变成异步 TODO
    loaderContext.async = null;
    //代表本次请求
    Object.defineProperty(loaderContext, 'request', {
        get() {
            //loader1!loader2!loader3!index.js
            return loaderContext.loaders.map(loader => loader.path).concat(loaderContext.resource).join('!');
        }
    });
    Object.defineProperty(loaderContext, 'remainingRequest', {
        get() {
            //loader3!index.js
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loader => loader.path).concat(loaderContext.resource).join('!');
        }
    });
    Object.defineProperty(loaderContext, 'currentRequest', {
        get() {
            //loader2!loader3!index.js
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!');
        }
    });
    Object.defineProperty(loaderContext, 'previousRequest', {
        get() {
            //loader1
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!');
        }
    });
    Object.defineProperty(loaderContext, 'data', {
        get() {
            //loader1
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });
    let processOptions = {
        resourceBuffer: null,//本次要读取的资源文件的Buffer  index.js对应的Buffer
        readResource
    }
    const pitchingCallback = (err, result) => {//pitchingCallback
        finalCallback(err, {
            result,
            resourceBuffer: processOptions.resourceBuffer
        });
    };
    //开始迭代执行每个loader的pitch函数
    iteratePitchingLoader(processOptions, loaderContext, pitchingCallback);
}
exports.runLoaders = runLoaders;