
class WebpackDonePlugin {
  constructor(options) {
    this.options = options; 
  }
  apply(compiler) {
    compiler.hooks.done.tap('WebpackRunPlugin', () => {
      console.log('结束编译',this.options.msg);
    });
  }
}
module.exports = WebpackDonePlugin;