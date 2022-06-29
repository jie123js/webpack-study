21:45
123
sourcelocation 是啥 
123
原地址 
123
父亲的 
会议用户468209
parentNode 
Tony
父亲是函数的 或者全局环境的 
123
找到不是箭头函数位置的this 
123
直接判断是functionExpression 不行吗？ 
21:55
小白
为什么还有const 
123撤回了一条消息
123
找到他的父级作用域是函数并且不是箭头函数的环境， 环境的作用域中push 个代码是var _this = this  , 找到代码中有thisExpression的  替换成 _this 
人生若只如初见
getThisPath函数干么得了？ 
22:04
123
替换完箭头函数之后判断body 是否是BlockStatement 不是就变为BlockStatement 

types 在哪里声明的？ 
小白
多了_this那句 




20:31
二十
Babel-plugin-import 不识别 require 是嘛、 
Tony
如果多个库呢 一会实现
小白
rum居然也能跑呢 
封东其
19k吧 
bu
如果想对自己写的的代码做按需加载得怎么做？ 
封东其
import {flatten as flat} from 'lodash'
flatten就是imported
flat就是local 


monorepo 
会议用户468209
改成 const flatten = require('lodash/flatten'); 这样不行吗 
可以的
小白
刚才说commonjs不行呢 
后面会手写rollup,
bu
import _ from 'loadsh' 这种默认导入也不处理吗？ 
h2x
多个/ 


sourcemap就是这样的？ 
21:06
Kai
为啥放arguments啊 


最佳划水选手
最好加点 样式打印 
Tony
老师你还是没有演示一个插件引入多个库的情况 
如果有引入了但是没有用呢 ？ 这种也不能处理 
这个我们会放在后面讲rollup的时候进行处理
