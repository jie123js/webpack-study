
class Scope {
  constructor(options = {}) {
    //作用域的名称
    this.name = options.name;
    //父作用域
    this.parent = options.parent;
    //此作用域内定义的变量
    this.names = options.names || [];
    //是否是块级作用域
    this.isBlockScope = !!options.isBlockScope;
  }
  /**
   * 
   * @param {*} name 添加的变量
   * @param {*} isBlockDeclaration 是否是块级声音 var 不是块级声明 let const就是块级声明
   */
  add(name, isBlockDeclaration) {
    if (!isBlockDeclaration && this.isBlockScope) {
      this.parent.add(name, isBlockDeclaration);
    } else {
      this.names.push(name);
    }
  }
  findDefiningScope(name) {
    if (this.names.includes(name)) {
      return this;
    } else if (this.parent) {
      return this.parent.findDefiningScope(name);
    } else {
      return null;
    }
  }
}
module.exports = Scope;