
import { createFilter } from 'rollup-pluginutils';
import MagicString from 'magic-string';
import { walk } from 'estree-walker';
import path from 'path';
function commonjs(pluginOptions = {}) {
  const { include, exclude, extensions = ['.js', '.jsx'] } = pluginOptions;
  const extensionsRegexp = new RegExp(`(${extensions.join('|')})$`);
  const userDefinedFilter = createFilter(include, exclude);
  const filter = id => extensionsRegexp.test(id) && userDefinedFilter(id)
  return {
    name: 'commonjs',
    transform(code, id) {
      if (!filter(id)) return null;
      const result = transformAndCheckExports(this.parse, code, id);
      return result;
    }
  }
}
function transformAndCheckExports(parse, code, id) {
  const { isEsModule, ast } = analyzeTopLevelStatements(parse, code, id);
  if (isEsModule) {
    return null;
  }
  //反之就是commonjs ,需要把commonjs 导出变成es 导出  module.exports=>export default 
  return transformCommonjs(code, id, ast);
}
function transformCommonjs(code, id, ast) {
  const magicString = new MagicString(code);
  //const exportDeclarations = [];
  let moduleExportsAssignment;//module.exports
  walk(ast, {
    enter(node) {
      switch (node.type) {
        case 'AssignmentExpression':
          if (node.left.type === 'MemberExpression') {
            const keypath = getKeypath(node.left);
            if (keypath === 'module.exports') {
              moduleExportsAssignment = node;
            }
          }
          break;
      }
    }
  });
  const { left } = moduleExportsAssignment;//left=module.exports
  // module.exports = 'catValue'
  //获取当前的文件名 cat.js  cat
  const exportsName = path.basename(id, path.extname(id));//cat
  // cat = 'catValue'
  magicString.overwrite(left.start, left.end, exportsName);
  // var cat = 'catValue'
  magicString.prependRight(left.start, 'var ');
  //export default cat
  //exportDeclarations.push(`export default ${exportsName}`);
  //const exportBlock = `\n\n${exportDeclarations.join('\n')}`;
  //magicString.trim().append(exportBlock);
  magicString.trim().append(`export default ${exportsName}`);
  return {
    code: magicString.toString()
  }

}
function getKeypath(node) {
  const parts = [];// [b,c,d]
  while (node.type === 'MemberExpression') {
    //a.b.c.d
    parts.unshift(node.property.name);
    node = node.object;
  }
  parts.unshift(node.name);
  return parts.join('.');
}
function analyzeTopLevelStatements(parse, code) {
  const ast = parse(code);
  let isEsModule = false;
  for (const node of ast.body) {
    switch (node.type) {
      case 'ExportNamedDeclaration':
        isEsModule = true;
        break;
      case 'ExportDefaultDeclaration':
        isEsModule = true;
        break;
      case 'ImportDeclaration':
        isEsModule = true;
        break;
      default:
        break;
    }
  }
  return { isEsModule, ast };
}
export default commonjs;