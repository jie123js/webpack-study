let { readBody } = require('./utils');
const MagicString = require('magic-string');
const { parse } = require('es-module-lexer');
const hash = require('hash-sum');
const path = require('path');
// C:\aproject\zhufengwebpack202202\14.vitesource\packages\vite-project\src\main.js
//relativePath=>src\main.js 这样计算的hash值可以保证每个文件都是唯一的
function moduleRewritePlugin({ root, app }) {
  app.use(async (ctx, next) => {
    //先执行serveStaticPlugin中间件
    await next();
    if (ctx.body && ctx.response.is('.js')) {
      const relativePath = path.relative(root, ctx.path);
      const bodyContent = await readBody(ctx.body);
      const rewriteBodyContent = await rewriteImports(bodyContent, relativePath);
      ctx.body = rewriteBodyContent;
    }
  });
}
async function rewriteImports(bodyContent, relativePath) {
  let magicString = new MagicString(bodyContent)
  const imports = await parse(bodyContent);
  if (imports && imports[0].length > 0) {
    imports[0].forEach(({ n, s, e }) => {
      //如果导入的模块不是以. 或者 /开头的才会重写  ./App.vue    vue
      if (/^[^\/\.]/.test(n)) {
        magicString.overwrite(s, e, `/node_modules/.vite/${n}.js?v=${hash(relativePath)}`);
      }
    });
  }
  return magicString.toString();
}
module.exports = moduleRewritePlugin;