

//es
//export { main as default };

//cjs
//module.exports = main;


 WARN  deprecated rollup-plugin-babel@4.4.0: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-babel.


09:44
123
rollup 自动scope hosting 了 没有模块的概念了的赶脚 
bu
使用rollup打包的话， 代码一定要用esModule写吗？ 
123
日常开发都是esModule 的赶脚了  很少直接require 的写法了 
123
以前一直不明白这个modules：false的含义现在终于明白了 原来 preset 也能转换模块。 rollup 也能转换模块 
Potter
用官方包 



10:12
123
其实好奇 如果 我遇到options 是@babel/preset-env 
那我就把我的代码拿到 modules/@babel/preset-env 路径下 的每个函数里面处理一遍吗？
不是的
如果你配置的preset-env 
如何工作的呢？
1.拿到源代码
2.转换成语法树，并且遍历语法树
3.再交给预设下面的所有的插件，让插件处理自己感兴趣的节点，返回新的内容 


10:16
Tony
要加.js 
bu
有个console 
bu
sum.js 
Potter
上下文相对路径不对了 
Potter
目录上下文路径应该是在根路径下 
123
没有默认配置的alias   src 
123
input 也是./src/mian.js 
123
看看sum 是不是importee？ 
小白
是不如果不修改钩子，return要把所有入参都原样返回？ 
123
resolveDynamicImport 是import（‘xx’）吗？ 

import 

少了重要的转换成ast后   然后给babel 插件处理 
Tony
感觉babel比webpack简单，weapck处理的更加细致 
bu
为什么处理一个模块时， 在transform之后再处理 import 的其他模块呢？ 

因为有些导入是转换之后才导入的


rollup简单清晰多了 
Potter
webpack 二十多万行代码，是个巨物 
10:35
123
为啥大部分插件设置的main 都是cjs？ 是默认在node 环境中使用吗？ 
rollup本身肯定 就是一个nodejs项目 
es虽然是未来，
但是在node.js里现在主流 commonjs



10:58
Tony
rollup 有 html-plugin吗 
123
意思l是npm 安装的odash 库的package。json中main 引入的是.cjs的     那就需要rollup/commonjs 这个插件 

11:04
小白
可以看下index。html 
123
typescript2 
Tony
typescript这个方法有参数吗 



tslib 是干什么的？ 
Potter
没用呀 
123
用的还是typescript 没有用typescript2 呢 
123
多了错误提示了 
123
堆栈打印出来 我也不会看 


webpack vs rollup
1.都可以打包入口文件
2.可以加载各种不同类型的文件
3.webpack和rollup加载好模块后，都会进行模块解析，转成语法树，分析import等依赖，再递归处理依赖的模块
4.都有输入和输出
5.他们都有插件机制，可以通过插件修改打包的过程

1.webpack加载别的类型的文件用的是loader,rollup用的是插件，插件里面的transform钩子
2.webpack打包出来的是commonjs,体积比较大，模块还分开的。rollup打包出来的esmodule,体积比较小，模块代三会合并在一起


rollup最大的优点
简单 生成的文件比较小 支持es module 非常大小写强大的tree shaking 


acore 是个bable 的什么插件 类似 parser transform codegen 的那个环节？ 
acorn 是一个语法树解析库
后来fork出来个项目 ，就叫babylon

babel内部语法树解析靠的是一个库babylon
123
acorn 
Potter
把code 转成语法树的工具 
123
感觉水好深 
Potter
只是用还好，要写解析器就更深一层了 
123
sourceType：module  这个module 说明什么呢 
import 
export

var a = 1;
11:54
123
parent 都没有传 

11:59
会议用户468209
vue 上npm run start 就会显示 parse: babylon 


12:04
Potter
5年前 
Potter
core里面吧 
Potter
推荐github 一个快速查看代码的工具，Chrome  插件Octotree    
Potter
贼好用，不用每次点进目录看代码了。 

rullup里面用的事件钩子也是tapable？ 
不是的
14:20
123
path。resolve 只有一个参数呢 
path.resolve(a,b);
path.resolve(a)


自己打包自己 
最佳划水选手
https://github.dev/rollup/rollup 
最佳划水选手
也一样 
123
为啥都是这样rollup/rollup  jquery/jquery lodash/lodash 这种呢 
为了以后扩展
rollup是一个文件夹
第二个rollup是核心文件
除了核心文件之后还有其它的辅助文件

123
用的 graph。pluginDriver 
14:29
123
return code 




达蒙
导出localname 跟别的文件重名咋办 
123
在导入if 条件递归 当前的函数 
Potter
懂了 
Potter
根据作用域来控制statement 是否加入到输出语句中 



/**
 * main.js
 * 我要实现treeshaking
 * 1.找到当前模块使用到了读取哪些变量 say name
 * 2.我得知道这二个变量是在哪里定义的，是模块外还是模块内
 * 如果是外部导入的，需要去外部模块时找到定义变量的语句添加到输出结果里
 * 
 */


 15:44
Potter
是 
123
JS是静态作用域，跟执行没有关系 
不管你是否调用，作用域都是存在的
那要是写了这个函数没有调用呢 
Potter
可以放到foreach 外面，避免重复定义addToScope  
Potter
加个默认为空数组把 
Potter
遇到变量 
15:53
Potter
1 
123
这是判断原型上有这个属性 
123
1 

为什么leave 要会退到父作用域 ？ 


16:21
Potter
再通过name,去获取定义语句 
Potter
this.imports[name]  
Potter
  


17:01
Potter
导出declation 不能删，删了就会出现export var age = xx + 1，xx 不是还需要递归展开的么？ 
Tony
name不见了 



depandsOn 不只是读取的变量还有定义的变量吧 




depandsOn 不只是读取的变量还有定义的变量吧 
Tony
今天我查的时候定义的变量也有 
123
刚才的name 是import 倒入的 
123
是标识符 父亲不是 变量声明说明是引入的变量？ 
123
是标识符又不是通过声明 生成的 
123撤回了一条消息
Potter
node.left ? 
123
什么时候能弄出UpdateExpression 这种类型？ 
123
node。left？ 
123
AssignmentExpression 没有name 呢 
Potter
嗯，写错了。 
20:21
123
  
123
这两个 好像取Identifier的方式不一样呢？ 
123
修改过说明什么呢？ 修改过我门就不进行tree-shanking了？ 

如果一个变量修过的话，我们要把修改的语句也添加到输出结果 

123
有点忘记了呢？定义的说明是VariableDeclaration 的是吗？ 



Potter
parent 好像是null  
123
开始的这个tree-shanjing 是谁提出来的。我的理解是只要有ast 就能有这个实现，为啥最近几年我才听说呢 
three shaking就是rollup发明的
123
多了个s 
123
这个是update 



如果说一个变量，定义了，但是没有使用，那么它就不会出现在结果里

为啥要用 _defines ? 定义了也不一定使用呀？ 
123
为了提示是否定义过 没有定义过报错 
21:39
123
source 是什么类型的为啥有 overwrite方法 

 this.code = new MagicString(code, {
      filename: path
    })
    this.code.snip();返回的也是一个MagicString类似 的实例 overwrite


    
后面重命名这一段没听太明白 
bu
哦哦 
Potter
  这个是在做什么？ 
Potter
  
123
1 
