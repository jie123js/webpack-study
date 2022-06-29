const { SyncHook } = require('tapable');
const Compilation = require('./Compilation');
const path = require('path');
const fs = require('fs');
class Compiler{
    constructor(options) {
        this.options = options;
        this.hooks = {
            run: new SyncHook(),//会在编译刚开始的时候触发此run钩子
            done:new SyncHook()//会在编译 结束的时候触发此done钩子
        }
    }
    //4.执行`Compiler`对象的`run`方法开始执行编译
    run(callback) {
        //在编译前触发run钩子执行 表示开始启动编译了
        this.hooks.run.call();
        //编译成功之后的回调
        const onCompiled = (err, stats, fileDependencies) => {
            //10.在确定好输出内容之后，会根据配置的输出的路径和文件名，把文件内容写到文件系统里
            for (let filename in stats.assets) {
                let filePath = path.join(this.options.output.path, filename);
                let exist = fs.existsSync(path.dirname(filePath));
                if (!exist) {
                    fs.mkdirSync(path.dirname(filePath));
                }
                fs.writeFileSync(filePath,stats.assets[filename],'utf8');
            }
            callback(err, {
                toJson:()=>stats
            });
            fileDependencies.forEach((fileDependency) => {
                fs.watch(fileDependency,()=>this.compile(onCompiled));
            });
            //当编译成功后会触发done这个钩子执行
            this.hooks.done.call();
        }
        //开始编译，编译 成功之后调用onCompiled方法
        this.compile(onCompiled);
    }
    compile(callback) {
        //webpack虽然只有一个Compiler,但是每次编译都会产出一个新的Compilation
        let compilation = new Compilation(this.options);
        //执行compilation的build方法进行编译 ，编译 成功之后执行回调
        compilation.build(callback);
    }
}
module.exports = Compiler;