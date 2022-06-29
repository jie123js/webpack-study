function importPolyfill() {
  return {
    name: 'importPolyfill',
    async moduleParsed(moduleInfo) {
      if (moduleInfo.isEntry) {
        moduleInfo.moduleSideEffects = 'no-treeshake';
      }
    },
    renderDynamicImport({ format, moduleId, targetModuleId }) {
      return {
        left: 'dynamicImportPolyfill(',
        right: ', import.meta.url)'
      };
    }
  }
}
export default importPolyfill;