
function normal(source) {
    console.log('inline2');
    return source + '//inline2';
}

normal.pitch = function () {
    console.log('inline2-pitch');
    //如果pitch方法没有返回值，执行下一个loader的pitch
    //如果pitch方法有返回值，那么直接结束了
    //return 'inline2-result';
}
module.exports = normal;