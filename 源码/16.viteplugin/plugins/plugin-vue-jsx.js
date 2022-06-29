import { transformAsync } from '@babel/core';
import jsx from '@vue/babel-plugin-jsx';
//import jsx from '@babel/plugin-transform-react-jsx';
import { createFilter } from '@rollup/pluginutils';
import typescript from '@babel/plugin-syntax-typescript';
import importMeta from '@babel/plugin-syntax-import-meta';
function jsxPlugin(pluginOptions = {}) {
  const { include = /\.jsx$/, exclude, ...babelPluginOptions } = pluginOptions;
  const filter = createFilter(include, exclude);
  return {
    name: 'vite:vue-jsx',
    config() {
      return {
        //默认情况下在开发的时候会编译我们的代码，它会也会编译jsx,但是它会编译 成React.createElement
        esbuild: {
          include: /\.ts$/
        },
        define: {
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false
        }
      }
    },
    async transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      const plugins = [importMeta, jsx];
      if (id.endsWith('.tsx')) {
        plugins.push([typescript, { isTSX: true, allowExtensions: true }]);
      }
      const result = await transformAsync(code, {
        babelrc: false,
        configFile: false,
        ast: true,
        plugins
      });
      console.log('result', result.code);
      return {
        code: result.code,
        map: result.map
      }
    }
  }
}
export default jsxPlugin;