const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

const sourceCode = 'function ast(){}';
const ast = esprima.parse(sourceCode);
//console.log(ast);
let indent = 0;
let padding = () => " ".repeat(indent);
/**
 * 当我们遍历一颗抽象语法树的时候
 * 以深度优先的方式进行遍历 
 * 只会遍历有type属性节点
 * 每个节点都会有进入和离开两个环节
 */
estraverse.traverse(ast, {
    enter(node) {
        console.log(padding() + node.type + '进入');
        indent += 2;
    },
    leave(node) {
        indent -= 2;
        console.log(padding() + node.type + '离开');
    }
});