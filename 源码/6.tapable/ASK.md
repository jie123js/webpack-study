123
什么插件是并行钩子呢
123
整体的打包费事应该是串行的吧

webpack

为啥叫异步注册
因为注册的回调里有异步代码

123
就是为了注册异步事件的
bu
tapAsync 和 tapPromise 这种能混用吗？

不能

parallel 这个体现在哪里呀
1
2
3
3
同步异步混用呢

123 撤回了一条消息
123
一个插件里面是不是会有很多 hook 什么 hook 都可能出现呢
123
6
h2x
都串行了异步有啥意义
123
3

谁调用的 CALL_DELEGATE
小白
this.\_createCall 可以取到吗?

复用了相同部分的代码
张仁阳
说一下你的理由  
21:06
123
让 createCall 先执行
123
并且\_createCall 是的返回值是个函数 重新赋值给 call 然后执行
bu
子类可以自定义执行逻辑？

21:17
123
create 代码工厂根据选项创建函数的，并没有\_create
这个 create 和\_create 怎么联系起来的？
123
怎么知道我是父类的还是子类的 只是因为 自己的类里面没有定义吗
是的

123
看到 extends 了 自己又没有定义 那就是父亲的
123 撤回了一条消息
123
并行看出来了 async 怎么理解呢？
21:25
123
因为 new 的是子类所以 compiler 走的是子类的
123
vm 这个文件是怎么来的？内存里的，
1

123 撤回了一条消息
bu
这种设计的怎么想的呢， 子类父类反复跳。。
如果每个子类有可能不一样的逻辑，写在子类里
如果每个子类都一样的逻辑，写在父类里

123
\_createCall 里面调用子类的 compiler
热带么
张老师讲这种课之前都有备课吗 怎么做到这么熟悉呢
bu
为什么要用这种拼接形式呢？
h2x
抽离公共代码到父类，子类就放自定义的代码，把代码拼接起来
123
可以
123
我继承了
123
哦 不是实例调用跟继承没有关系

多态
123
就是 dubugger 的生成的那个并行执行的 函数  
小白
动态编译函数？就是 new Function 那个吗
h2x
准确说应该叫动态创建函数

前面部分的代码在动态创建函数的时候执行了，回调函数留着给用户调用 所以是 async

注册的时候
tap tapAsync tapPromise

tap 
tap 
tapAsync
tapAsync
tapPromise
tapPromise

触发的时候

callAsync callPromise
如果他们混着用会出现什么情况
callAsync();


09:55
bu
传 tap0 能做什么操作？ 
crystal
执行每个拦截其中的tap回调 
门敢山文丰
97 行 length 


interceptors 啥时候放到 hook 实例上的 
crystal
是调用call函数的时触发拦截器吗 
调用call方法的时候 
会先触发call拦截器方法
再触发tap拦截器


crystal
就是说代码执行的时候先将拦截器存到数组里，然后调用.call函数的时候开始触发拦截器数组的遍历 



插入排序  
会议用户468209
也可以用javascript原生的sort方法排序吧 

