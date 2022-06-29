20:41
shine
这个 编译后的结果 是生成在内存中了是吧？ 是的
123
他本身就是string 为啥还要JSON。stringify ""
123
这个是vite + vue-plugin 编译的 esmodule 格式？ 
bu

filename 是 src/app.vue ?  C:\aproject\zhufengwebpack202202\16.viteplugin\src\App.vue
20:51
Potter
少了await 
shine
有点懵，整个流程是先编译vue再 根据请求的内容 load不同的资源 transform成对应的吗？还是啥 是的
Potter
自动引入的 
bu
style 为啥要分多个， 要用 index ? 
shine
是不是因为同一个vue文件可以写多个style标签？ 
Potter
移除 
123
这好奇怪啊 ，为啥它又去找@的呢 



const styleRequest =
 (filename + query)
 是一个绝对路径
 回到客户端的时候直接变成了 /src/App.vue
 这一步是是vite帮我们的实现 

 这里为啥直接成了。/src/app.vue?xxx 了 ？ filename 不是个绝对路径吗？ 




看看浏览器 
shine
这个样式文件 如果其中有image呢 
Potter
staticResolve  
Potter
好的 
bu
在开发的时候 http服务器 会有一个中间件就是vite提供的插件
dev时， vite的插件是不是 会作为服务器的中间件使用啊？ 
小白
流程问题，
首先是编译了vue，vue里面style部分变成import语句，发给了浏览器
浏览器遇到了import语句，会再次向服务器发出请求
http://localhost:3000/src/App.vue?vue&type=style&index=0&lang.css
然后遇到import语句后，
然后服务器接收到请求后，会再次编译对应的样式代码，转成JS并返回
又在vue文件里面编译style部分，
编译完style是变成单独的一个文件返回了？这里是怎么实现的 
shine
把他当成模块去import 服务器返回对应的内容变成了css 是这样？ 
Potter
可以理解为中间件 
bu
会重新走http请求 
Potter
嗯 
小白
继续当作http请求，把编译后的style代码当作response body返回了？ 
Potter
最后将 style code 插入到html head 中，好奇这一步是怎么弄的。 

jsx其实是react的首创
所以说默认编译 的时候 会编译 成React.createElement