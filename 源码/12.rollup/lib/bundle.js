
const path = require('path');
const fs = require('fs');
const MagicString = require('magic-string');
const Module = require('./module');
const { keys, hasOwnProperty } = require('./utils');
const walk = require('./ast/walk');
class Bundle {
  constructor(options) {
    //入口文件的绝对路径
    this.entryPath = path.resolve(options.entry);
  }
  build(filename) {
    let entryModule = this.fetchModule(this.entryPath);
    this.statements = entryModule.expandAllStatements();//this.ast.body
    this.deconflict();//处理冲突
    const { code } = this.generate();
    fs.writeFileSync(filename, code);
  }
  deconflict() {
    const defines = {};//定义的变量
    const conflicts = {};//冲突的变量
    this.statements.forEach(statement => {
      //循环此语句上定义的所有的变量
      keys(statement._defines).forEach(name => {
        //判断此变量name是否已经定义过了
        if (hasOwnProperty(defines, name)) {
          //此变量已经出现过了，就标记为此变量冲突
          conflicts[name] = true;
        } else {
          defines[name] = [];
        }
        defines[name].push(statement._module);
      })
    })
    Object.keys(conflicts).forEach(name => {
      const modules = defines[name];
      //最后一个模块不需要重命名
      modules.pop();
      modules.forEach((module, index) => {
        const replacement = `${name}$${modules.length - index}`;
        module.rename(name, replacement);
      });

    });
  }
  //根据模块的路径，返回模块对象
  fetchModule(importee, importer) {//importee=./msg.js
    let route;
    if (!importer) {//如果无人导入，说明是入口模块
      route = importee;
    } else {
      if (path.isAbsolute(importee)) {
        route = importee;
      } else {
        route = path.resolve(path.dirname(importer), importee.replace(/\.js$/, '') + '.js')
      }
    }
    if (route) {
      let code = fs.readFileSync(route, 'utf8');
      let module = new Module({
        path: route,//模块的绝对路径
        code,//模块内容
        bundle: this//它所属的bundle的实例
      })
      return module;
    }
  }
  generate() {
    let bundle = new MagicString.Bundle();
    this.statements.forEach(statement => {
      //先定义一个对象，保存将要替换的变量名 老名称和新名称
      let replacements = {};
      //读取的变量和定义的变量都要改
      Object.keys(statement._dependsOn).concat(Object.keys(statement._defines))
        .forEach(name => {
          //用老的变量名云别名里找一找，找到模块内替换后的别名
          const canonicalName = statement._module.getCanonicalName(name);
          if (name !== canonicalName) {
            replacements[name] = canonicalName;
          }
        })
      const source = statement._source.clone();
      if (statement.type === 'ExportNamedDeclaration') {
        source.remove(statement.start, statement.declaration.start);
      }
      replaceIdentifiers(statement, source, replacements);
      bundle.addSource({
        content: source,
        separator: '\n'
      });
    });
    return { code: bundle.toString() };
  }
}
function replaceIdentifiers(statement, source, replacements) {
  walk(statement, {//TODO
    enter(node) {
      if (node.type === 'Identifier') {
        if (node.name && replacements[node.name]) {
          //age => age$1
          source.overwrite(node.start, node.end, replacements[node.name]);
        }
      }
    }
  });
}
module.exports = Bundle;