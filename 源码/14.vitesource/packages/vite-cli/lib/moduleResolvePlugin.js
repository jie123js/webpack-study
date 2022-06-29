
const moduleRegexp = /\/node_modules\/\.vite\/(.+?)\.js/;
const fs = require('fs').promises;
const path = require('path');
const { resolveVue } = require('./utils');
function moduleResolvePlugin({ app, root }) {
  //ctx.url=/node_modules/.vite/vue.js?v=cc1c6946
  //ctx.path = /node_modules/.vite / vue.js
  //ctx.query = {v:'cc1c6946'}
  app.use(async (ctx, next) => {
    //此中间件只处理/node_modules下的文件
    if (!moduleRegexp.test(ctx.path)) {
      return await next();
    }
    const vueResolved = await resolveVue(root);

    const moduleId = ctx.path.match(moduleRegexp)[1];//vue
    const modulePath = vueResolved[moduleId];
    //const modulePath = path.join(root, ctx.path)
    const moduleContent = await fs.readFile(modulePath, 'utf8');
    ctx.type = 'js';
    ctx.body = moduleContent;
  });
}
module.exports = moduleResolvePlugin;