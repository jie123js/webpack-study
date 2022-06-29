
const MagicString = require('magic-string');
const acorn = require('acorn');
const analyse = require('./ast/analyse');
const { hasOwnProperty } = require('./utils');
const SYSTEMS = ['console', 'log'];
class Module {
  constructor({ path, code, bundle }) {
    this.code = new MagicString(code, {
      filename: path
    })
    this.path = path;
    this.bundle = bundle;
    //把源代码转成一个语法树
    this.ast = acorn.parse(code, {
      ecmaVersion: 8,
      sourceType: 'module'
    });
    //存放本模块的导入信息
    this.imports = {};
    //本模块的导出信息
    this.exports = {};
    //存放本模块的定义变量的语句 a=>var a = 1;b =var b =2;
    this.definitions = {};
    //放置本模块的修改的变量
    this.modifications = {};
    //放置重命名的变量 key老的变量名 值是重命名后的变量名
    this.canonicalName = {};
    //开始进行语法树的解析
    this.analyse();
  }
  analyse() {
    this.ast.body.forEach(statement => {
      //给this.imports赋值 分析 导入
      if (statement.type === 'ImportDeclaration') {//main.js
        let source = statement.source.value;//"./msg"
        statement.specifiers.forEach(specifier => {
          let importName = specifier.imported.name;//name 外部msg模块导出的名称 name
          let localName = specifier.local.name;//n 导入到本模块后，本地变量的名字 n
          this.imports[localName] = { importName, source };
        });
        //给this.exports赋值，分析导出
      } else if (statement.type === 'ExportNamedDeclaration') {//msg.js
        let declaration = statement.declaration;
        if (declaration.type === 'VariableDeclaration') {
          const declarations = declaration.declarations;
          declarations.forEach((variableDeclarator) => {
            let localName = variableDeclarator.id.name;//name
            this.exports[localName] = { exportName: localName }
          });
        }
      }
    });
    analyse(this.ast, this.code, this);
  }
  expandAllStatements() {
    let allStatements = [];
    this.ast.body.forEach(statement => {
      if (statement.type === 'ImportDeclaration') return;
      if (statement.type === 'VariableDeclaration') return;//默认不包含所有的变量声明语句
      let statements = this.expandStatement(statement);
      allStatements.push(...statements);
    });
    return allStatements;
  }
  expandStatement(statement) {
    //为了避免语句被 重复添加，所以给每个语句放置一个变量，表示是否已经添加到结果 里了
    statement._included = true;
    let result = [];
    //获取此语句依赖的变量
    let dependencies = Object.keys(statement._dependsOn);
    dependencies.forEach(name => {
      //找到此变量定义的语句，添加到输出数组里
      let definitions = this.define(name);
      result.push(...definitions);
    });
    result.push(statement);
    //获取此节点上所有定义的变量
    const defines = Object.keys(statement._defines);
    defines.forEach(name => {
      //如果定义的变量上有对应的修改语句的话
      const modifications = hasOwnProperty(this.modifications, name) && this.modifications[name];
      if (modifications && modifications.length > 0) {
        modifications.forEach(statement => {
          if (!statement._included) {
            let statements = this.expandStatement(statement);
            result.push(...statements);
          }
        });
      }
    });
    return result;
  }
  define(name) {//name
    //说明是导入的
    if (hasOwnProperty(this.imports, name)) {
      //this.imports[localName]= {localName,importName,source};
      const { importName, source } = this.imports[name];
      let importModule = this.bundle.fetchModule(source, this.path);//msg.js
      // this.exports[localName] = {localName, exportName: localName, declaration}
      let { exportName } = importModule.exports[importName];//name
      return importModule.define(exportName);//msgModule.define(name);
    } else {//模块内声明的
      let statement = this.definitions[name];
      if (statement) {
        if (statement._included) {
          return [];
        } else {
          return this.expandStatement(statement);
        }
      } else if (SYSTEMS.includes(name)) {
        return [];
      } else {
        throw new Error(`变量${name}既没有从外部导入，也没有在当前的模块内声明`);
      }
    }
  }
  rename(name, replacement) {
    this.canonicalName[name] = replacement;
  }
  getCanonicalName(name) {//TODO
    return this.canonicalName[name] || name;
  }
}
module.exports = Module;