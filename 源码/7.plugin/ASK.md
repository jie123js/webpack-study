11:14
bu
processAssets hook 执行时间是什么？ 
会议用户468209
生成资源文件之前 
11:20
Tony
.then没有返回 
bu
emit 是生成文件之前触发， 但是触发了 emit 之后才能 订阅 processAssets 吧 
bu
没加后缀吧 
11:27
Tony
是tap 
crystal
.tap 

如果想使用外链
1.html中引入CDN脚本
2.配置webpack,把这两个模块设置外链

不想每次都这么麻烦，我想变成自动化
自动配置外链
1.自动向index.html里插入CDN脚本
2.改造webpack生成模块的流程，如果发现是外链模块，则要选择不打包，而是变成从全局变量引入




什么时候tap，什么时候tapPromise呢 
关键看钩子的类型
钩子是同步的钩子tap
钩子是异步的tapPromise
11:45
会议用户468209
想用promise的时候用tapPromise，同步的时候用tap 
小白
每个钩子有自己的tap类型限制吗 
同步钩子只有tap
异步钩子tapAsync和tapPromise


123
不一样吧，如果我import jquery 那用 importedModules 就只有lodash了 
import jquery
importedModules jquery
import lodash
importedModules lodash

123
我感觉javascript/auto 
只要模块的后缀是.js
那它的类型就是javascript/auto 
只要是import 就是这么用要是require 就是跟下面的用 


不导入 
小白
tap(name, …) 这个name有什么实际作用呀 
没有用


14:33
123
我知道了importedModules 还可能比jquery 和loadash 万一导入moment 呢？   
importedModules 里面会有你所有的导入的模块

bu
这要是自己写， 坑有的踩了。。 

