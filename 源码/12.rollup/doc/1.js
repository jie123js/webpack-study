var MagicString = require('magic-string');
let sourceCode = `export var name = "zhufeng"`;
let ms = new MagicString(sourceCode);
console.log(ms);
//裁剪出原始字符串开始和结束之间所有的内容
//返回一个克隆后的MagicString的实例
console.log(ms.snip(0, 6).toString());//sourceCode.slice(0,6);
//删除0, 7之间的内容
console.log(ms.remove(0, 7).toString());//sourceCode.slice(7);

//还可以用用来合并代码 //TODO
let bundle = new MagicString.Bundle();
bundle.addSource({
  content: 'var a = 1;',
  separator: '\n'
});
bundle.addSource({
  content: 'var b = 2;',
  separator: '\n'
});
console.log(bundle.toString());