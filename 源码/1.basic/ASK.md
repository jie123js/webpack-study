## sourcemap文件的功能是什么 

把源代码映射为打包后的代码


let a=1;
let b=2;
let c=3;

let a=1,b=2,c=3;

let sourcemap = [
    {var:'b',sourceRow:1,sourceColumn:4,targetRow:0,targetColumn:8}
]


NODE_ENV 能随便赋值development 和production 以为的 的变量  比如 release？  

09:58
热带么
JSON.stringfy('release')和'release'有什么不一样么 
123
‘release’ 本来就是 string 


webpack.config.js文件中的值取决于package.json中配置的值，对吗 
一马平川！
是经过eval()吧，我猜的，O([表情]_[表情])O 
热带么
哦哦  它可能内部把'release'当成模块了 

我觉得挺变态的 我们就当字符串 它内部处理就行 还非得用户自己stringjfy 
👵
外面为什么是undefined 
woods
cross-env 
bu
设置进程中的值会影响， webpack 的mode 吗？ 
进程中设置生产， 但是mode是dev， 会怎么样？ 


要想哪里都有环境变量就用cross-env 来设置跨平台的环境变量 并且 设置mode （设置mode 是为了index.js中能拿到） 
门敢山文丰
DefinePlugin 和 mode 拿个优先级高

使用 了cross-env 就不用设置definePlugin了吧？ 
如果你只想设置process.env.NODE_ENV的话，的确通过cross-env影响 mode,mode影响 index.js中的process.env.NODE_ENV,的确不再需要definePlugin

如果你想设置别的变量，比如VERSION,还是需要definePlugin
热带么
为啥要用cross-env？不用的话  哪里回取不到值，忘了
如果我想想设置当前窗口的环境变量
mac export key=value
window set key=value
为了跨平台
cross-env key=value 
sunshine
cross-env是为了跨平台使用 

10:21
sunshine
在html中引用下图片呢 
11
devServer 配 static 那上线后呢  


打包后上线静态目录是啥 
还是dist目录
达蒙
配置多个目录怎么设置 
sunshine
在src目录下的html中引用下图片 
1


那如果打包后网要放到dist/imgs 目录里面，怎么让页面图片正常访问 
woods撤回了一条消息
Kai
Public 只是为了本地预览用是吧 
本要预览要用
上线之线也要用
只不过public里面的文件一般是静态文件，不需要打包，也不需要webpack里负责引入分析



那如果打包后图片要放到dist/imgs 目录里面，怎么让页面图片正常访问 
bu
contentBase publicPath 和 static 的区别是啥？ 

contentBase 现在已经废弃了。没有了
webpack5以前contentBase是额外的静态文件根目录
现在此参数已经没了 ，变成了static


123
我以为sass 是新版scss是老板呢 
老的sass
新的scss
当我们说到语言的时候 sass
只不过源文件后缀
如果是新的写法.scss
如果老的写法.sass

word文档 
.doc 2003
.docx 2017
123
sass 用的还是比较多？ 
小白
不是scss吗 


10:40
小白
public前面就没有/了？ 
10:43
热带么
use数组里面的执行顺序是怎么样的 
woods
从右往左 
Kai
右到左 

use里面放的是一个一个的loader
执行顺序是从右向左
从下向上


具体这几个cssloader的作用和区别说说老师 
热带么
那如果顺序不对  也解析不了洛？ 是的
use 里的loaers里是一个流水线
上一个结果是下一个输入
漫漫人生
不用装less-loder跟sass-loder吗 

讲一讲cssloader的作用


 { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },


 less.ess
 ```less
@color:blue;
#less-container{
    color:@color;
}
 ```
let lessSource = ` @color:blue;`;
交给less-loader处理
编译成css
```css
#less-container{
    color:blue;
}
```
再交给css-loader进行处理
负责处理源代码中的import和url



------如何打包图片
webpack5以前，一般要用file-loader和url-loader


11:06
sunshine
直接npm run dev可以演示吗 
woods
file-loader 
123
这个是在index。js 中 
sunshine
图片不是静态文件吗，为什么需要打包进去 
图片可以打包也可以不打包
123
不用装url-loader file-loader raw-loader ，webpcak 内置了这些的方法？ 
相当 于url-loader file-loader raw-loader都废弃了，不需要使用了
不是内置 ，而是直接抛弃了。

woods
可以配置小于10kb的打包成base64。减少请求 
123
。icon？ 
123
提示功能弱是因为不是。ts 类型吗？ 
热带么
小图标小图片采用base64是为了减少http请求；那为什么要减少http请求呢？大量http请求最大的开销在哪个地方呢？ 


最佳划水选手
浏览器会限制同一个域名的并发数 6
bu
为啥写的是type:xxx  webpack规定的
热带么
因为http请求会产生阻塞，所有浏览器有并发数量控制？ 有的
👵
HTML如何直接使用打包后的图片 

没法直接在页面中使用是吗 是的
bu
是 type:xxx webpack 就会判断并执行一些loader？ 可以这么认为
sunshine
这里图片的处理方式和之前作为静态文件有什么区别 
一个会经过webpack打包处理，一个不经过webpack打包处理



//importLoaders Allows to enables/disables or setups number of loaders applied before CSS loader for @import at-rules
importLoaders允许你启用/禁用 或者设置loader的数量 
在css中遇到@import关键字的时候，在CSS loader处理前应用的loader的数量




11:47
Tony
默认字符串吧 
123
=false 去掉试试呢 
Tony
要写成对象格式 
123
啊 
123
tree-shaking 只能是引用类型吗？ 后面会非常详细 的讲
只应用于es modules
123
为啥非要包成对象？ 
11:53
123
为啥要配置这么麻烦呢？ webpack 劝退攻城狮 
危唯。
less-loader不能处理 import吗 
其实less-loader能处理import
less-loader能处理import

123
less-loader 是 将less 编译成css 让后交给css 去处理import 
Tony
less-loader 会处理import 
123
这是在讲resolve 了？ 


12:00
👵
css被转成js在页面中还怎么用 
Tony
脚本添加style标签啊 


cssloader会把CSS源代码全部处理好
然后交给style-loader
会把cSS源代码转成一个style标签插入到页面中
let style = document.createElement('style');
style.innerHTML = CSS内容
document.head.appendChild(style);



~取node_modules是内置的么 是的  css-loader的内置功能
123
在less-loader中配置options 里面的 import：true css-loadr的options的 import： false 看看
less-loader没有import选项 


css_loader 处理 url 会走 图片的大小限制吗？ 
css_loader处理图片的时候也会走的我们的配置

后面演示一下，肯定 是的





copy-webpack-plugin 
会议用户468209
我也是现装的. = = 
Potter
环境依赖相关插件版本太低了 
Potter
很可能是你本地环境node版本太低，webpack 有node.js 最低版本要求的 
会议用户468209
哦。 那我是12 
16.8

14:10
123
老师好像现在的浏览器基本上不用加前缀了吧？ 基本上不带前缀的都兼容了 

babel是一个语法的转换引擎
具体的转换规则是由插件决定的
每个插件可以转一个语法
es6 箭头函数
通过一个 plugin
es5的普通函数
插件一个一个配非常麻烦，所以可以插件打成一个包，变成一个预设 preset

When true, 
class properties are compiled to use an assignment expression instead of Object.defineProperty.


14:13
123
postcss-loader的周下载量还是很高13,737,328 
123
看到配置了 preset-env 就干嘛呢？ 会把js 文件放到一个个的插件集合处理吗？ 那么多插件集合一个个走吗？ 
是的
14:18
123
老外起名字也很随意corejs2 
123
还讲corejs2是干嘛的吗？ 
sunshine
这四个插件是什么作用 
Tony
每个插件都要加中括号吧 
如果要传选项需要加，如果没有选项则不用加
14:26
123
区别就是放在前面和上面 
Tony
老师你配置plugins 要加中括号 
123
老的 方法是放在export 前  新是放在export 后 
123
为啥还都是提案 都在用了还是提案 




@babel/plugin-proposal-decorators 
支持装饰器
@withLog
class Person{}

class-properties
class Person{
    private PI = 3.14
    @readonly PI=3.14
}


private-property-in-object

private-methods



预设中的插件集合，会包含单独配置的插件嘛 
123
#bar 是什么鬼啊   是es语法  
h2x
完全可以被ts代替 




browser 是按照浏览器中的规则校验？ 
不是的
是指你的代码将会运行在浏览器中

14:52
details
vcode要得做什么操作 
文件保存时进行代码检查 并自动格式化
123
这个.vscode 文件怎么生成的 
会议用户468209
vscode还得装一个eslint插件吧 
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

185****1937
babel eslint是检查es6语法的格式嘛 


aribnb 同时按照这些插件需要配置嘛 

 21:1   error  Expected linebreaks to be 'LF' but found 'CRLF'            linebreak-style

 LF \n  line feed
 CRLF  \r\n  carriage return line feed
 换行
 回车


 换行符在window里\r\n 
 在linux是\n
 在mac 里 \r 

 感觉rewrite 没有什么用你一般都是api 开头就直接配置就行了 


 15:21
bu
在 webpack-dev-server 静态资源中间件处理之前 
bu
这个怎么理解？ 

