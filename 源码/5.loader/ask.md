14:32
bu
特殊配置在项目中怎么使用？ 马上会讲
bu
loader 执行流程图上的， 从左到右是左什么的？
马上讲

是在 inline2 pitch 那里 return 了不

loader 可以有异步的么？？？ 可以的

小白
return 的值有什么用呢

getOptions method for Loaders
Webpack 5 ships with built-in this.getOptions method available in loader context.
This is a breaking change for loaders that had been using getOptions method from previously preferred schema-utils:

this.getOptions is available since webpack 5

15:39
h2x
多个 loader 那不是有很多 sourcemap，耗费性能
是的

source1 => loader1=>loader2=>loader3=>得到最终的结果

15:45
bu
inputSourceMap, 但是我们只配置了一个 loader
不是说每一个 loader 都需要 sourceMap
babel 转译代码需要 sourcemap
bu
谁给 babel_loader 传的？ 并没有任何人传，所以其它它的值是 undefined

还是没有还原成源码
小白
是不是 webpack 在 development 模式的时候默认都是打开 sourcemap 的？
h2x
sourcemap 感觉没成功，没有定位到源文件

15:53
h2x
传递 ast 的话就不用每个 loader 里面把 source 转成 ast 了吧
是的
如果你向下游传递了最新的 ast,那么下游或者是 loader 或者是 webpack 可以使用你提供的 ast，不于需要自己转 Ast 了
bu
第二个 sourmap 文件是 webpack 生成的吗？

16:29
会议用户 468209
这个字符串是怎么执行的？
冉龙
1
Tony
filename this.filename 是干什么
小白
为什么是脚本
达蒙
这个 script 怎么执行的

执行 pitch 的时候 为啥 loaderIndex 不是 2 呢？
123
执行完 loader 了 index 是 2
123
在 2 的基础上 执行 pitch 从 2 开始 —
火神的光芒
什么情况下一上来 pitch 就执行完了呢？
没有 pitch 函数
123
loader1—》loader2—》loader3 —》index。js —》loader3 的 pitch ===》 loader3 的 pitch ==》loader1 的 pitch

loader1 pitch

123
没有返回值 怎么 传递 loader 处理过的内容呢
没有内容 ，不向右传递任何东西
123
--
小白
pitchExcuted 是指执行完了 pitch 函数，还是指进入了 pitch 的执行呢？
一体的
pitchExcuted=true
pitchFn();

return 了一个非空的值,然后 index--, 回来了不又++回去了吗
此逻辑我还没有实现

123
所以老师能不能给个场景呢？index。js 相当于啥
123
是
bu
咱们写这个源码会和之前实现的 webpack 结合起来吗？  
小白
感觉要放在 fn()后面比较好吧

pitch 有返回值会继续 往下执行 pitch 吧
123
一般的 loader 都有返回值吧
如果 pitch 有返回值，

那 pitch 处理的文件内容不需要往下传递吗
123
哦

只有 style-loader 用到了吗
小夏
那一般 pitch 用来干什么，感觉 pitch 没有什么用
123
对呢 多了 pitch 就不好理解呢
小白
不是 normalCallback 吗？
123
为了终止了 loader
1

utf8 和 utf-8 啥区别？ 一样的
123
文件读取的时候需要用到 raw 是 true
读出来没有加编码的肯定是 Buffer
会议用户 468209
—
123
转换完的 buffer 或者 string 没有用到呢
会议用户 468209
finalcallback
123
有一个没有改 returnArgs

火神的光芒
pitch 有返回值就不处理文件了吧
是的
小白
raw 是什么时候设置的，还是传递的参数？

就是你写 loader 的时候需要就自己设置了
bu
args[0] 不一定是文件， 为啥还要进行 buffer 的处理呢？
123
buffer 除了在文件流中用还在那里用呢？
二进制的数组

normal 执行到最后还要执行一下 pitchCallback 吗？不太理解这里
bu
pitchCallback 是最外层的那个回掉

21:50
小白
一般写在哪里？
小白
loader.pitch()这个吗

21:58
123

bail 和 pitch 其实没有关系
但是的确有相似的地方
都是只要有返回值了，就不向后执行

bail 和 pitch 相似 waterfall 和 loader 相似
也没有关系
上一个函数的输出是下一个函数的输入
123
loop 循环终止条件就是 undefined
