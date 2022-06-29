const acorn = require('acorn');
const sourceCode = 'console.log(this)'
//SyntaxError: 'import' and 'export' may appear only with 'sourceType: module' (1:0)
const ast = acorn.parse(sourceCode, {
  locations: true, ranges: true, sourceType: 'module', ecmaVersion: 8
});
console.log(ast);
