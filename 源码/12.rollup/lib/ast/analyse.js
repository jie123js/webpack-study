const Scope = require('./scope');
const walk = require('./walk');
const { hasOwnProperty } = require('../utils');
function analyse(ast, code, module) {
  //处理作用域 构建作用域链 其实就是模块内的顶级作用域 
  let currentScope = new Scope({ name: '全局作用域' });
  ast.body.forEach(statement => {
    function addToScope(name, isBlockDeclaration) {
      currentScope.add(name, isBlockDeclaration);
      //如果说当前的作用域没有父亲 了，说明它是顶级作用域，说明name是顶级作用域中定义的变量 类似模块内的全局变量
      if (!currentScope.parent || currentScope.isBlockScope) {//TODO
        //此语句上定义了哪些变量
        statement._defines[name] = true
      }
    }
    //给statement语法树节点，定义属性_source=console.log('hello');
    Object.defineProperties(statement, {
      _module: { value: module },//此语句对应的模块对象
      _source: { value: code.snip(statement.start, statement.end) },
      _defines: { value: {} },//本语句定义的变量
      _modifies: { value: {} },//此语句修改的变量
      _included: { value: false, writable: true },
      _dependsOn: { value: {} }
    });

    walk(statement, {
      enter(node) {
        //当前节点的新的作用域
        let newScope;
        switch (node.type) {
          case 'FunctionDeclaration':
            //函数的名字添加到当前作用域中
            addToScope(node.id.name);
            //函数的参数添加到新作用域
            const names = node.params.map(param => param.name);
            newScope = new Scope({ name: node.id.name, parent: currentScope, names })
            break;
          case 'BlockStatement':
            newScope = new Scope({
              parent: currentScope,
              isBlockScope: true
            });
            break;
          case 'VariableDeclaration':
            node.declarations.forEach(declaration => {
              if (node.kind === 'let' || node.kind === 'const') {
                addToScope(declaration.id.name, true);
              } else {
                debugger
                addToScope(declaration.id.name);
              }
            });
            break;
          default:
            break;
        }
        if (newScope) {
          //此节点上创建了新的作用域
          Object.defineProperty(statement, '_scope', { value: newScope });
          currentScope = newScope;
        }
      },
      leave(node) {
        if (hasOwnProperty(node, '_scope')) {
          currentScope = currentScope.parent;
        }
      }
    });
  });
  //第二次循环
  ast.body.forEach(statement => {
    function checkForReads(node, parent) {
      if (node.type === 'Identifier' && parent.type !== 'VariableDeclarator') {
        //查找本模块读取的变量
        statement._dependsOn[node.name] = true;
      }
    }
    //一个检测修改变量
    function checkForWrites(node) {
      function addNode(node) {
        while (node.type === 'MemberExpression') {
          node = node.object;
        }
        if (node.type !== 'Identifier') {
          return;
        }
        statement._modifies[node.name] = true;
      }
      //如果此节点是一个赋值表示式的值
      if (node.type === 'AssignmentExpression') {
        //obj.name = 1;
        addNode(node.left);
      } else if (node.type === 'UpdateExpression') {
        addNode(node.argument);//TODO
      }
    }
    walk(statement, {
      enter(node, parent) {
        //封装两个方法，一个是检测读取变量
        checkForReads(node, parent);
        checkForWrites(node, parent);
      }
    });
  });
  ast.body.forEach(statement => {
    //获取每个语句定义的变量
    Object.keys(statement._defines).forEach(name => {
      //记录模块内定义的变量，key是变量名，值是定义变量的语句
      module.definitions[name] = statement;
    });
    Object.keys(statement._modifies).forEach(name => {
      if (!hasOwnProperty(module.modifications, name)) {
        module.modifications[name] = [];
      }
      //记录模块内定义的变量，key是变量名，值是定义变量的语句
      module.modifications[name].push(statement);
    });
  });
}
module.exports = analyse;
