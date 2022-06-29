
const { Readable } = require('stream');
const Module = require('module');
async function readBody(stream) {
  if (stream instanceof Readable) {
    return new Promise((resolve) => {
      let buffers = [];
      stream
        .on('data', (chunk) => buffers.push(chunk))
        .on('end', () => {
          let result = Buffer.concat(buffers).toString();
          resolve(result);
        });
    });
  } else {
    return stream.toString();
  }
}
exports.readBody = readBody;

/**
 *  "module": "dist/runtime-dom.esm-bundler.js",
 * @param {*} root 
 */
async function resolveVue(root) {
  //require 是从当前目录里找模块
  //如果你想从某个目录里找，可以用createRequire(root)就可以实现从root目录里找模块
  let require = Module.createRequire(root);
  const resolvePath = (moduleName) => require.resolve(`@vue/${moduleName}/dist/${moduleName}.esm-bundler.js`)
  return {
    'vue': resolvePath('runtime-dom'),
    '@vue/shared': resolvePath('shared'),
    '@vue/reactivity': resolvePath('reactivity'),
    '@vue/runtime-core': resolvePath('runtime-core')
  }
}
exports.resolveVue = resolveVue;