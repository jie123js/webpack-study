
function loader(source) {//loader.raw = true; source就是一个Buffer
    console.log('inline1');
    return source + '//inline1';
}
loader.pitch = function (rem, pre, data) {
    console.log('inline1-pitch');
}
loader.raw = false;
module.exports = loader;