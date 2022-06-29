const Bundle = require('./bundle');
/**
 * 
 * @param {*} entry 入口文件路径 C:\aproject\12.rollup\src\main.js
 * @param {*} outputFileName 打包后输出的文件名
 */
function rollup(entry, outputFileName) {
  const bundle = new Bundle({ entry });
  bundle.build(outputFileName);
}
module.exports = rollup;