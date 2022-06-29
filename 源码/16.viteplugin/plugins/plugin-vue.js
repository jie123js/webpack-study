import { createFilter, normalizePath } from '@rollup/pluginutils';
import { parse, compileScript, rewriteDefault, compileStyle, compileTemplate, compileStyleAsync } from 'vue/compiler-sfc';
import hash from 'hash-sum';
import path from 'path';
import fs from 'fs';
const root = process.cwd();
const descriptorCache = new Map();
function vue(pluginOptions) {
  const { include = /\.vue$/, exclude } = pluginOptions;
  const filter = createFilter(include, exclude);
  return {
    name: 'vue',
    async load(id) {
      //.log('id', id);//C:\aproject\zhufengwebpack202202\16.viteplugin\src\App.vue
      const { filename, query } = parseVueRequest(id);
      if (!filter(filename)) {
        return null;
      }
      if (query.has('vue')) {
        const descriptor = await getDescriptor(filename);
        if (query.get('type') === 'style') {
          let block = descriptor.styles[Number(query.get('index'))];
          if (block) {
            return { code: block.content };
          }
        }
      }
    },
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id);
      if (!filter(filename)) {
        return null;
      }
      if (query.get('type') === 'style') {
        const descriptor = await getDescriptor(filename);
        let result = await transformStyle(code, descriptor, query.get('index'));
        return result;
      } else {
        let result = await transformMain(code, filename);
        return result;
      }

    }
  }
}
async function transformStyle(code, descriptor, index) {
  const block = descriptor.styles[index];
  const result = await compileStyleAsync({
    filename: descriptor.filename,
    source: code,
    id: `data-v-${descriptor.id}`,
    scoped: block.scoped
  });
  let styleCode = result.code;
  let styleScript = `
  let style = document.createElement('style');
  style.innerText = ${JSON.stringify(styleCode)};
  document.head.appendChild(style);
  `;
  return {
    code: styleScript
  };
}
async function transformMain(source, filename) {
  const descriptor = await getDescriptor(filename, source);
  const scriptCode = genScriptCode(descriptor, filename);
  const templateCode = genTemplateCode(descriptor, filename);
  const stylesCode = genStyleCode(descriptor, filename);
  let resolveCode = [
    stylesCode,
    templateCode,
    scriptCode,
    `_sfc_main.render=render`,
    `export default _sfc_main`
  ].join('\n');
  return {
    code: resolveCode
  }
}
function genStyleCode(descriptor, filename) {
  let styleCode = '';
  if (descriptor.styles.length) {
    descriptor.styles.forEach((style, index) => {
      const query = `?vue&type=style&index=${index}&lang=css`;
      const styleRequest = normalizePath(filename + query);// / 
      styleCode += `\nimport ${JSON.stringify(styleRequest)}`;
    });
    return styleCode;
  }
}
function genTemplateCode(descriptor, filename) {
  let result = compileTemplate({ source: descriptor.template.content, id: filename });
  return result.code;
}
/**
 * 获取此.vue文件编译 出来的js代码
 * @param {*} descriptor 
 * @param {*} filename 
 */
function genScriptCode(descriptor, filename) {
  let scriptCode = '';
  let script = compileScript(descriptor, { id: filename });
  scriptCode = rewriteDefault(script.content, '_sfc_main');//export default => const _sfc_main
  return scriptCode;
}

async function getDescriptor(filename, source) {
  let descriptor = descriptorCache.get(filename);
  if (descriptor) return descriptor;
  const content = await fs.promises.readFile(filename, 'utf8');
  const result = parse(content, { filename });
  descriptor = result.descriptor;
  descriptor.id = hash(path.relative(root, filename));
  descriptorCache.set(filename, descriptor);
  return descriptor;
}
function parseVueRequest(id) {
  const [filename, querystring = ''] = id.split('?');
  let query = new URLSearchParams(querystring);
  return {
    filename, query
  };
}
export default vue;