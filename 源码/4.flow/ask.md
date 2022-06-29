21:24
bu
--inspect-brk 这个是什么意思？ 
21:28
h2x
是启动浏览器的debug工具吧 
21:39
最佳划水选手
只负责注册插件，然后webpack在合适的地方执行？ 
Tony
构造函数的入参名字是对应的吗 不是


somePlugin 是干啥来着 
Tony
还是参数个数对应就行了 


21:45
Tony
1 
会议用户468209
搞这么一下有啥意义。 直接写参数不更灵活吗 
h2x
自己埋固定钩子，webpack会去踩固定的点位 

21:57
11
一个antry只打包一个js文件吗？ 
一般来说一个entry只打包一个js文件
但后我们会讲splitChunks
import()
splitChunks配置代码块进行分割和合并

Tony
也要看有没有懒加载模块 



点的是运行 

自定义插件中用的compiler 就是 webpack 的那个全局管家吗 


Tony
plugin不可以直接是个方法吗，一定是一类吗 
徐健
compiler有哪些属性方法，我怎么看 
也可以写成一个有apply方法的对象嘛 
Kai
compiler.plugin() 是啥意思呀 
徐健
文档上没有吗，找文档都找不到 
123
看看参数怎么传入 单个plugin的 
this.options
文档上没有吗，找文档都找不到 
123
看看参数怎么传入 单个plugin的 
bu
对象不能保证每次使用都是新的实例 
Kai
看别人自定义插件写的 
123撤回了一条消息

再瞅一眼compiler。js 

这是啥写法呀 
123
单个插件中可以通过 compiler。options 拿到finalloptions 
Kai
看别人写的  我没看懂 




文件的真实存放路径 
bu
定为 / 为什么还能在window上运行？ 
前端爱好者
webpack必须要是/吗 是的
bu
webpack 是怎么加载这种写法的loader的 ？ "style-loader" 

require('style-loader!index.css');

10:35
最佳划水选手
6.1读取模块内容是并发的，相同的依赖模块怎么处理？？比如说例子中 两个entry都引用了 title.js 
马上
为什么要从右向左执行 
因为就这么规定的
其实是有原因，我们下午讲
loader执行
我们现在的工作是让大家了解webpack的工作流
rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ] 




        
这种的话， 目前的逻辑走不通吧 
前端爱好者
断点看一下流程吧 
Tony
可以的
这个地主可以写入模块名，也可能写成绝对路径
他的意思是加载node_modules里面的 
小白
./webpack 
Tony
options没传 
bu
会有一个文件和多个正则匹配的情况吗？ 
有的
者
plugins是比loader优先执行的吗 
loader只是用来在编译模块的时候使用的，只是一个点
plugins会贯穿我们整个编译流程
小白
断点时候，能不能看看每个参数都是什么值，有些没跟上 



babel和loader的关系是？ babel是一个loader吗 不是r
loader就仅仅是一个转换器，就是一个函数，接收一个参数，返回一个结果 
babel-loader
把es6转es6
babel负责转换

11:10
小白
  
11:25
Tony
这个还需要递归吧 
11:30
最佳划水选手
103行不太理解 
Tony
name是从哪里来的 



compilation 88行 不应该是 require('./src/title.js') 
bu
? 
最佳划水选手
debuger 一下吧 
bu
入口文件生的module不放到this.modules 上吗 ？ 

11:40
bu
代码直接放到_source上， 内存不会爆吗？  
