const path = require('path');
const rollup = require('./lib/rollup');
//将要打包的文件，也就是打包的入口
let input = path.resolve(__dirname, 'src/main.js');
//打包后输出结果
debugger
rollup(input, 'bundle.js');
