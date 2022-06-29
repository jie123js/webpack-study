const path = require('path');
const matchRelativePath = /^\.\.?[/\\]/;

function isAbsolutePath(str) {
    return path.posix.isAbsolute(str) || path.win32.isAbsolute(str);
}

function isRelativePath(str) {
    return matchRelativePath.test(str);
}
//remainingRequest 
//C: /aproject/zhufengwebpack202202/5.loader/loader/less-loader.js
//!C: /aproject/zhufengwebpack202202/5.loader/src/index.less
let remainingRequest = 'C:/aproject/zhufengwebpack202202/5.loader/loader/less-loader.js!C:/aproject/zhufengwebpack202202/5.loader/src/index.less';
//let result = remainingRequest.split('!').map(item => loaderUtils.urlToRequest(item,path.resolve())).join('!');
function stringifyRequest(loaderContext, request) {
    const splitted = request.split("!");
    //const { context } = loaderContext;
    const context = process.cwd();
    return JSON.stringify(
        splitted
            .map((part) => {
                part = path.relative(context, part);
                return part.replace(/\\/g, "/");
            })
            .join("!")
    );
}
let result = stringifyRequest(this, remainingRequest);
console.log('result', result);