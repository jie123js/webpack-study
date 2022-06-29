//'virtual' is imported by src/index.js, but could not be resolved – treating it as an external dependency



//import '@babel/polyfill'


14:29
h2x
合并命令行的参数吗 
Potter
合并选项参数的 
Potter
可以把名字改掉 
Potter
老师 你的这个console 快捷输出是哪个插件，看着挺好用的 
小白
好像不需要插件？直接打lg 
Potter
哦，内置这个快捷代码块了，我还以为装的插件 

14:41
小白
main.js现在是什么样的 
resolveId是查找此模块对应的真实文件名的 查找路径的
./virtual.js
C:\aproject\zhufengwebpack202202\15.rollupplugin\src\virtual.js
load读取文件内容，默认行为是读取文件
fs.readFile(C:\aproject\zhufengwebpack202202\15.rollupplugin\src\virtual.js)

小白
打包出来的 
h2x
后面的查找逻辑应该是在load里面吧 
Potter
路径查找在resolveId 里面进行处理 
Potter
load 对内容信息处理 


load里面才会读文件吧 
resolved里面不动，我在load里面直接return文件资源也可以 


webpack loader= 读取+转换
load=读取
transform=转换


//实现一个案例
想给每个入口自动添加polyfill


Potter
我想到的直接在transform，解析代码成语法树，然后在import 节点中添加pollyfill 导入语句节点不就可以了嚒 
Potter
可能我想简单了 

15:18
最佳划水选手
只有入口文件  才插入 polyfill 吧 
肯定是的

Potter
load  中，怎么不直接读取entryId 内容，然后再拼接代码，而是多export  

20:06
bu
多个入口会收敛到一个bundle中？ 
小白
output里定义的吗？ 
20:11
Potter
js错了 

[!] Error: 'default' is not exported by src/cat.js, imported by src/index.js
https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module


h2x
有code不能直接正则替换字符串吗'module.export'改为'export default' 
exports.a =1
小白
export.a = 1 这种呢 
