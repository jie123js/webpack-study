import { transformAsync } from '@babel/core';
import { createFilter } from 'rollup-pluginutils';
function babel(options) {
  const { include, exclude, extensions = ['.js', '.jsx'] } = options;
  const extensionsRegexp = new RegExp(`(${extensions.join('|')})$`);
  const userDefinedFilter = createFilter(include, exclude);
  const filter = id => extensionsRegexp.test(id) && userDefinedFilter(id)
  return {
    name: 'babel',
    async transform(code, filename) {
      if (!filter(filename)) return;
      let result = await transformAsync(code);
      return result;
    }
  }
}
export default babel;