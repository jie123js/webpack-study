## webpack打包后文件的分析 
- webpack打包出来的是什么文件
- 打包出来的文件在浏览器里是如何运行的




moduleId 就是路径？ 
是实现成这个样子了
185****1937
打包后的文件会自己按照commonjs规范实现一个require方法吗 
bu
不同的模块规范都是这样加载的吗？ 
是的
不管你原来是什么模块，都会变成common.js


其实就是为了给module。exports 赋值 
是的
热带么
用路径作为moduleId好标识一点；内部会去读取文件的类型和文件内容把 是的
是的
其实用递增的数字也行
但是相对路径肯定是唯 一的，而且也比较直观
185****1937
main.js文件本身是怎么来的 
打包后生成的


第三个参数还要传require怎么理解 
热带么
exports和module.exports有什么区别总是记不住 




185****1937
当然知道main.js是打包来的，我问得就是打包的过程呀 
h2x
下面的1 
bu
比如 ES module. 通过 export 暴露， 也会转成 main.js 中的modules那种样子吗？ 
15:57
123
1 
bu
1 
热带么
exports改变不会影响module.exports 
热带么
但是exports什么情况下会去改呀 
Tony
1 
会议用户468209
能 
夕慕
能 
热带么
能理解；就是不理解exports什么情况下会去改呀 
 
185****1937
能 
Tony
很简单啊 exports.name = 2 
123
改变的时候必须是module。exports  这么改就没有问题了吧 
bu
比如 ES module. 通过 export 暴露， 也会转成 main.js 中的modules那种样子吗？ 
马上讲
123
可以添加属性不能直接改成对象 
是的


123
原理就是给module。exports 赋值 然后导出啊 
123
如果exports.age = {}. 没有影响吧 


16:22
185****1937
知道是esmodule导出的有什么用呢 
是不是esmodule导出的，会决定 你取值的方式 
common默认出来value
es默认导同 value.default
123
d 怎么看出来 default 是 个getter吧 
Kai
r d 内置就有吗 



const 不是不会提升吗 会的
let const 也是会提升的
185****1937
为什么赋值都要用defineproperty而不是直接.赋值 



commonjs是不可以改的 
火神的光芒
旧的 
会议用户468209
哦哦 
123
为啥我没有明白怎么就是导出引用了呢 export const name = ‘123’ 呢？ 也是引用吗？ 

我这里里说的引用，其实是指的引用模块内的一个变量的意思，而不是说这个变量必须是一个引用类型
185****1937
我也没太懂一个是引用一个是直 




a不是个函数吗 
Tony
是个getter函数 
小白
为什么default要执行了 


老师 咱们现在是在实现webpack 的异步加载功能吗 
20:15
123撤回了一条消息
123
怎么就变成hello.main.js?  魔法字符串怎么写的 




只能异步加载esModule吗 
20:24
Kai
push 的时候索引是 按照什么来的 
20:35
123
i<chunkids.length 
小白
31: chunkIds.length 
bu
打包出来的哪里为啥叫 self[xxxx] 
Kai
直接设置成0 会不会有问题啊，模块万一没加载完成呢 
Tony
先拿到resolve 
123
reslove 都没哟了 
123
instqlledChunks 
Tony
installedChunks 
bu
为什么 chundIds 要设计为数组？ 
123
看看l 方法哪里调用的 
Tony
jsonp方法入参那里是数组 
Tony
入参也有问题啊 
123
resolve 什么都没有传？ 


123撤回了一条消息
人生若只如初见
hello.js里的内容是 window.对象方法在哪写得了？ 
123
结果怎么进入最后的then 的data中的 
bu
对于  commonJS 模块 ， 打包后获取默认值的话， 还会被 require.n 处理吗？ 没有
Kai
直接push 到索引2 的位置的 那个push 
bu
打包出来的哪里为啥叫 self[xxxx]  这个问题没听清楚 ～ 


以为是 return的 结果所以进入的promise的then 
bu
为啥要bind requrie ? 

因为绑定参数啊
