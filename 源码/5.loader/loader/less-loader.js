const less = require('less');
function loader(lessContent) {
    //1.把loader的执行从同步变成异步 2 返回callback
    //let callback = this.async();
    let str;
    less.render(lessContent, { filename: this.resource }, (err, output) => {
        //callback(err,output.css);
        //现在less-loader返回的是css文本
        str = `module.exports = ${JSON.stringify(output.css)}`;
        //callback(err,`module.exports = ${JSON.stringify(output.css)}`);
    });
    return str;
}
module.exports = loader;