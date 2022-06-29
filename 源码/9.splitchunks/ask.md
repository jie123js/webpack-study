20:12
bu
import 是什么原理呢？ 
promise 通过jsonp加载一个远程 模块，然后执行

11
为什么不用 config 里面引入不用 import，要怎么才能使用 import 


为什么 webpack。config 里面引入不用 import，要怎么才能使用 import 
既然做了按需加载， 什么场景下会用preload进行最高优先级加载呢？ 


20:33
bu
为啥是用link 而不是script ？ 因为不需要执行吗？ 
20:41
小白
那行魔法注释怎么解析的，什么时候解析的，chunks里面可以体现吗 

20:54
小白
就不能专门针对一个文件进行prefetch/preload是吗 

入口代码块
page1.js
page2.js
page3.js

异步加载代码块
src_asyncModule1_js.js

defaultVendors缓存组对应的代码块
defaultVendors-node_modules_jquery_dist_jquery_js.js
defaultVendors-node_modules_lodash_lodash_js.js

default代缓存组对应的代码块
default-src_module1_js.js
default-src_module2_js.js


有一个优化的方案，如果说一个代码块的上游已经打包好模块了，自己就不管了，直接 用

如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块。这可能会影响 chunk 的结果文件名。

reuseExistingChunk: false
main main.js
common-src_index_js common-src_index_js.js


reuseExistingChunk: true
main main.js

缓存组和其他配置优先级 
common编译出来的是main吗？ 
张



老师，我对public path的还是不太透彻 
打包后的资源访问前缀

bu
项目中配置的话， 一般使用默认值吗？ 
bu
defaultVendors 中会继承 minChunks: 1, 这个属性吗？ 




这种适合组件库的开发吧 
最佳划水选手
deno也不是这种方式么？ 
最佳划水选手
模块在别人服务器 
123
装 
123
shared:{
                react: { singleton: true },
                "react-dom": { singleton: true }
              }
          }) 
123
shared:{
                react: { singleton: true },
                "react-dom": { singleton: true }
              }
          }) 这个是什么意思？ 
