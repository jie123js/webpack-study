
const path = require('path');
const dedent = require('dedent');
const fs = require('fs').promises;
const { parse, compileScript, compileTemplate,
  compileStyle, rewriteDefault } = require('@vue/compiler-sfc');
const descriptorCache = new Map();
function vuePlugin({ root, app }) {
  app.use(async (ctx, next) => {
    if (!ctx.path.endsWith('.vue')) {
      return await next();
    }
    const filePath = path.join(root, ctx.path);
    const descriptor = await getDescriptor(filePath, root);
    if (ctx.query.type === 'style') {
      const block = descriptor.styles[Number(ctx.query.index)]
      ctx.type = 'js';
      ctx.body = `
       let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(block.content)};
        document.head.appendChild(style);
      `;
    } else {//默认的.vue文件处理走下面的 
      let targetCode = '';
      if (descriptor.styles.length > 0) {
        let styleCodes = '';
        descriptor.styles.forEach((style, index) => {
          const query = `?t=${Date.now()}&vue&type=style&index=${index}&lang.css`;
          //const id = '/src/App.vue';
          const id = ctx.path;
          const styleRequest = id + query;
          styleCodes += `\nimport ${JSON.stringify(styleRequest)}`
        });
        targetCode += styleCodes;
      }
      if (descriptor.script) {
        let scriptCode = compileScript(descriptor, {
          reactivityTransform
            : false
        });
        //export default => const _sfc_main =
        scriptCode = rewriteDefault(scriptCode.content, '_sfc_main');
        //console.log(scriptCode);
        targetCode += scriptCode;
      }
      if (descriptor.template) {
        const templateContent = descriptor.template.content;
        let { code } = compileTemplate({
          source: templateContent
        });
        code = code.replace(/export function render/, 'function _sfc_render');
        targetCode += code;
      }
      targetCode += dedent`
    _sfc_main.render = _sfc_render;
    export default _sfc_main;
    `;
      ctx.type = 'js';
      ctx.body = targetCode;
    }

  });
}

async function getDescriptor(filePath) {
  if (descriptorCache.has(filePath)) {
    return descriptorCache.get(filePath);
  }
  const content = await fs.readFile(filePath, 'utf8');
  const { descriptor } = parse(content, { filename: filePath });
  descriptorCache.set(filePath, descriptor);
  return descriptor;
}

module.exports = vuePlugin;