
const POLYFILL_ID = '\0polyfill';
const PROXY_SUFFIX = '?inject-polyfill-proxy';
function polyfill() {
  return {
    name: 'polyfill',
    async resolveId(source, importer, { isEntry }) {
      if (source === POLYFILL_ID) {
        return { id: POLYFILL_ID, moduleSideEffects: true };
      }
      if (isEntry) {
        //1.确定实际的入口是什么
        //this plugin Context 插件的上下文对象
        const resolution = await this.resolve(source, importer, { skipSelf: true });
        console.log(resolution);
        //如果模块找不到，或者这是一个外部模块，就直接返回
        if (!resolution || resolution.external) {
          return resolution;
        }
        const moduleInfo = await this.load(resolution);
        console.log(moduleInfo);
        //表示此模块内有副作用，不要进行tree shaking
        moduleInfo.moduleSideEffects = true;
        //C:\\aproject\\zhufengwebpack202202\\15.rollupplugin\\src\\index.js?inject-polyfill-proxy
        return `${resolution.id}${PROXY_SUFFIX}`;
      }
    },
    async load(id) {
      if (id === POLYFILL_ID) {
        return "console.log('这里就是我们要插入的polyfill代码了')";
      }
      if (id.endsWith(PROXY_SUFFIX)) {
        //load  中，怎么不直接读取entryId 内容，然后再拼接代码，而是多export  
        //entryId = C:\\aproject\\zhufengwebpack202202\\15.rollupplugin\\src\\index.js
        const entryId = id.slice(0, -PROXY_SUFFIX.length);
        //看看此模块中有没有默认导出
        const { hasDefaultExport } = this.getModuleInfo(entryId);
        let code = `
          import ${JSON.stringify(POLYFILL_ID)};
          export * from ${JSON.stringify(entryId)};
        `;
        //因为命名空间导出不会导出默认值
        if (hasDefaultExport) {
          code += `export {default} from ${JSON.stringify(entryId)}`;
        }
        return code;
      }
    }
  }
}
export default polyfill;