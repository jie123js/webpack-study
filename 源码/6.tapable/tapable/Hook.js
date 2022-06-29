class Hook {
    constructor(args) {
        //回调函数的形参列表
        this.args = args || [];
        //用来存放回调函数
        this.taps = [];
        this.call = CALL_DELEGATE;
        this.callAsync = CALL_ASYNC_DELEGATE;
        this.promise = PROMISE_DELEGATE;
        //在Hook的构造函数中初始化了这一样的一个变量，存放所有的拦截器的数组
        this.interceptors = [];
    }
    tap(options, fn) {
        this._tap('sync', options, fn);
    }
    tapAsync(options, fn) {
        this._tap('async', options, fn);
    }
    tapPromise(options, fn) {
        this._tap('promise', options, fn);
    }
    _tap(type, options, fn) {
        if (typeof options === 'string') {
            options = { name: options };
        }
        options = { ...options, type, fn };
        options = this._runRegisterInterceptors(options);
        this._insert(options);
    }
    _runRegisterInterceptors(options) {
        for (const interceptor of this.interceptors) {
            if (interceptor.register) {
                let newOptions = interceptor.register(options);
                if (newOptions !== undefined) {
                    options = newOptions;
                }
            }
        }
        return options;
    }
    intercept(interceptor) {
        this.interceptors.push(interceptor);
    }
    _insert(tapInfo) {
        let before;
        if (typeof tapInfo.before === 'string') {
            before = new Set([tapInfo.before]);
        } else if (Array.isArray(tapInfo.before)) {
            before = new Set(tapInfo.before);
        }
        //此处会进行一个按照stage的插入排序
        let stage = 0;
        if (typeof tapInfo.stage === 'number') {
            stage = tapInfo.stage;
        }
        //i表示新的tapInfo将要插入的索引
        let i = this.taps.length;
        while (i > 0) {
            i--;
            const x = this.taps[i];
            this.taps[i + 1] = x;
            const xStage = x.stage || 0;
            if (before) {
                if (before.has(x.name)) {
                    before.delete(x.name);
                    continue;
                }
                if (before.size > 0) {
                    continue;
                }
            }
            if (xStage > stage) {
                continue;
            }
            i++;
            break;
        }
        this.taps[i] = tapInfo;
        /* 
         this.taps.push(tapInfo);
         this.taps.sort((a, b) => a.stage - b.stage);
          */
    }
    _createCall(type) {
        return this.compile({
            taps: this.taps,//回调数组
            args: this.args,//形参数组
            type,//类型 sync
            interceptors: this.interceptors
        });
    }
}
const CALL_DELEGATE = function (...args) {
    this.call = this._createCall('sync');
    return this.call(...args);
}
const CALL_ASYNC_DELEGATE = function (...args) {
    this.callAsync = this._createCall('async');
    return this.callAsync(...args);
}
const PROMISE_DELEGATE = function (...args) {
    this.promise = this._createCall('promise');
    return this.promise(...args);
}
module.exports = Hook;