const path = require('path');
//不同操作系统的路径分割符
console.log(path.posix.sep);// \
console.log(path.win32.sep);
//环境变量PATH的路径分隔符
console.log(path.posix.delimiter);// ;
console.log(path.win32.delimiter);
/* require('path').sep
'/'
require('path').delimiter
':' */
//所以说在webpack里做了统一，全部用/
//10:25
//会议用户468209
//转成这个左斜杠之后的路径在window下应该用不了了吧

const fs = require('fs');
function toUnixPath(path) {
    return path.replace(/\\/g, '/');
}
const packagePath = toUnixPath(path.resolve(process.cwd(), 'package.json'));
console.log('packagePath', packagePath);
const content = fs.readFileSync(packagePath);
console.log(content);

