
class WebpackDonePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync('WebpackDonePlugin', (stats, callback) => {
      //console.log(stats);//代表本次编译的结果 modules chunks entries assets filenames
      callback();
    });
  }
}
module.exports = WebpackDonePlugin;