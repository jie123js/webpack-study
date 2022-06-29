const Koa = require('koa');
const dedent = require('dedent');
const serveStaticPlugin = require('./serveStaticPlugin');
const moduleRewritePlugin = require('./moduleRewritePlugin');
const moduleResolvePlugin = require('./moduleResolvePlugin');
const injectProcessPlugin = require('./injectProcessPlugin');
const vuePlugin = require('./vuePlugin');
function createServer() {
  //koa的实例
  const app = new Koa();
  //当前命令所在的根目录
  const root = process.cwd();
  //上下文
  const context = {
    app,
    root
  }
  app.use((ctx, next) => {
    Object.assign(ctx, context);
    return next();
  });
  const resolvedPlugins = [
    injectProcessPlugin,
    moduleRewritePlugin,
    moduleResolvePlugin,
    vuePlugin,
    serveStaticPlugin
  ]
  resolvedPlugins.forEach(plugin => plugin(context));
  return app;
}
createServer().listen(4000, async () => {
  const chalk = await import('chalk');
  console.log(
    dedent`${chalk.default.green(`vite-cli dev server running at:`)}
           > Local: http://localhost:4000/
    `
  );
});
