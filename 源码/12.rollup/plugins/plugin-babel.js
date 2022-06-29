
import * as babel from '@babel/core';
//传入插件选项
export default function (pluginOptions) {
  return {
    name: 'babel',
    buildStart() {
      console.log('buildStart');
    },
    options() {
      console.log(pluginOptions);
      return null;
    },
    /* 
    async resolveId(importee, importer, options) {
       console.log('importee', importee);
       console.log('importer', importer);//main.js import title.js  main.js=importer title.js importee
       console.log('options', options);
       //把./sum.js => ./src/sum.js
       return importee;
     }, */
    /*load(id) {
      console.log(id);
    }, */
    //把sum.js源代码读了以来，交给transform钩子进行转换
    async transform(code, filename) {
      console.log('code', code);
      console.log('filename', filename);
      const result = await babel.transformAsync(code, {
        presets: [["@babel/preset-env", { modules: false }]]
      });
      return result;
    },
    moduleParsed() {
      //解析此模块
    },
    buildEnd() {
      //编译结束
    },
    resolveDynamicImport(specifier, importer) {
      console.log('specifier', specifier);
      console.log('importer', importer);
    }
  }
}