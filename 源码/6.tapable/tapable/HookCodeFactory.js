

class HookCodeFactory {
    setup(hookInstance, options) {
        //把所有的回调函数存放到hook实例的_x属性上
        hookInstance._x = options.taps.map(tapInfo => tapInfo.fn);
    }
    args(config = {}) {
        let { after } = config;
        let { args } = this.options;//['name','age']
        let allArgs = [...args];//[name, age]
        if (after) {
            allArgs.push(after);//[name, age, _callback]
        }
        return allArgs.join(',');//name,age
    }
    init(options) {
        this.options = options;
    }
    header() {
        let code = '';
        let interceptors = this.options.interceptors;
        code += `var _x = this._x;\n`;
        if (interceptors.length > 0) {
            code += `var _taps = this.taps;\n`;
            code += `var _interceptors = this.interceptors;\n`;
            for (let k = 0; k < interceptors.length; k++) {
                const interceptor = interceptors[k];
                if (interceptor.call) {
                    code += `  _interceptors[${k}].call(${this.args()});\n`;
                }
            }
        }
        return code;
    }
    create(options) {
        this.init(options);
        let fn;
        switch (this.options.type) {
            case 'sync':
                fn = new Function(
                    this.args(),
                    this.header() + this.content()
                )
                break;
            case 'async':
                fn = new Function(
                    this.args({ after: '_callback' }),
                    this.header() + this.content({ onDone: () => "_callback();\n" })
                )
                break;
            case 'promise':
                let tapsContent = this.content({ onDone: () => "_resolve();\n" });
                let content = `
                    return new Promise((function (_resolve, _reject) {
                        ${tapsContent}
                    }));
                `;
                fn = new Function(
                    this.args(),
                    this.header() + content
                )
                break;
            default:
                break;
        }
        this.deinit();
        return fn;
    }
    callTapsSeries() {
        let { taps } = this.options;
        let code = '';
        for (let i = 0; i < taps.length; i++) {
            let tapContent = this.callTap(i);
            code += tapContent;
        }
        return code;
    }
    callTapsParallel({ onDone }) {
        let { taps } = this.options;
        let code = '';
        code += `var _counter = ${taps.length};\n`;
        code += `var _done = (function () {
          ${onDone()}
        });`;
        for (let i = 0; i < taps.length; i++) {
            const tapContent = this.callTap(i);
            code += tapContent;
        }
        return code;
    }
    callTap(tapIndex) {
        let tapInfo = this.options.taps[tapIndex];
        let code = '';
        let interceptors = this.options.interceptors;
        if (interceptors.length > 0) {
            code += `var _tap${tapIndex} = _taps[${tapIndex}];`;
            for (let i = 0; i < interceptors.length; i++) {
                const interceptor = interceptors[i];
                if (interceptor.tap) {
                    code += `_interceptors[${i}].tap(_tap${tapIndex});`;
                }
            }
        }
        code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
        switch (tapInfo.type) {
            case 'sync':
                code += ` _fn${tapIndex}(${this.args()});\n`;
                break;
            case 'async':
                code += `_fn${tapIndex}(${this.args()}, (function () {
                            if (--_counter === 0) _done();
                         }));`;
                break;
            case 'promise':
                code += `var _promise${tapIndex} = _fn${tapIndex}(${this.args()});
                        _promise${tapIndex}.then((function () {
                            if (--_counter === 0) _done();
                        }));`;
                break;
            default:
                break;
        }
        return code;
    }
    deinit() {
        this.options = null;
    }
}
module.exports = HookCodeFactory;