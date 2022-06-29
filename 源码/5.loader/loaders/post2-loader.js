
function loader(source) {
    console.log('post2');
    //如何让loader的变成异步 调用this.async方法可以把loader的执行从同步改变为异步
  /*   let callback = this.async();
    setTimeout(() => {
        callback(null, source + '//post2');
    },3000); */

    return source + '//post2';
}
loader.pitch = function () {
    console.log('post2-pitch');
}
module.exports = loader;