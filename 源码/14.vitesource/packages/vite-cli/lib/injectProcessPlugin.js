const { readBody } = require("./utils");

function injectProcessPlugin({ root, app }) {
  const processInjection = `
  <script>
     window.process = {env:{ NODE_ENV:'development'}};
  </script>
  `;
  app.use(async (ctx, next) => {
    await next();
    if (ctx.response.is('html')) {
      const htmlContent = await readBody(ctx.body);
      ctx.body = htmlContent.replace(/<head>/, `$&${processInjection
        }`);
    }
  });
}
module.exports = injectProcessPlugin;