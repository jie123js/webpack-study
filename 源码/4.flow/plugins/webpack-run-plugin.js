
class WebpackRunPlugin{
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.run.tap('WebpackRunPlugin', () => {
            console.log('开始编译', this.options.msg);
        });
    }
}
/* 
function WebpackRunPlugin() {
    
}
WebpackRunPlugin.prototype.apply = function () {
    compiler.hooks.run.tap('WebpackRunPlugin', () => {
        console.log('开始编译');
    });
} */
module.exports = WebpackRunPlugin;