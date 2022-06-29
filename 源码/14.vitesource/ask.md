
lerna publish 可以发布到自己搭建的 npm源上面吗 
publishConfig:{
  registry:'私服',
  access:'public'
}
11
pnpm不支持吗？ 
droden
我发布的总是失败… 发npm 是成功的 发私有源 总是报 426 或者403 
小白
什么是工作空间，有什么用呀 
工作空间就是把当前的文件夹当成一个共享的工作空间
此项目中所有的包，他们的依赖全部安装在共享空间内，也就是根目录里的node_modules
shine
看看你的npm版本对不对有没登录有没设置到私有源 
npm login
whoami
droden
有没登录 登录了
有没设置到私有源 设置了 
npm版本  有什么要求吗 
shine
降低到6试试 
小白
不设置workspace呢，就不判断了吗 
11
vite 不是用的 lena 它到底是用的啥 
shine
pnpm+changeset也好玩 



Error [ERR_REQUIRE_ESM]: 
require() of ES Module  chalk\source\index.js from  not supported.

//import { createApp } from 'vue';

//import { createApp } from '/node_modules/.vite/vue.js?v=cc1c6946';

vue =>  /node_modules/.vite/vue.js?v=cc1c6946

shine
有个点没搞懂 vite2开发环境这样用 上线呢？ 
上线用提rollup打包

热带么
请求vue文件的端口是啥 3000

Failed to resolve module specifier "vue".
Relative references must start with either "/", "./", or "../".
默认情况下，必须是相对路径或者说绝对路径 

import { createApp } from 'vue';
import { createApp } from '/node_modules/.vite/vue.js?v=cc1c6946';



hash(n)需要记录下来吗 




老师，我之前做vite项目，当vue文件名相同的时候，偶尔打包会出现溢出的问题，但是开发的时候不会 
10:29
最佳划水选手
vue-rumtime 里面不是还有依赖的么？？ 那是怎么解析的？ 
小白
module.exports = injectProcessPlugin 和 module.injectProcessPlugin = injectProcessPlugin有什么区

module.exports = injectProcessPlugin
exports.injectProcessPlugin=injectProcessPlugin;


别呀 
10:33
Potter
shared.js 没有缓存，请求了3次 
Potter
对的，为啥不直接返回.vite/vue.js 文件内容 
Potter
vue 确实可以这么解析返回，写这个模块解析是为了后面支持解析其他模块加载的吧  
最佳划水选手
但是你的.vite需要提前打包呀 
我们为什么不直接读取.vite/vue.js

 我们在手写自己的vite实现


.vite/vue.js 是原版的vite预解析出来的，不是我们写入的


r
一个导默认，一个可以导多个 
Potter
依赖预构建  出来的吧 
Potter
嗯 
h2x
什么情况下用预构建的 
Potter
就是提升打包构建速度 
Potter
而且shared还加载了3次，这样请求也少了，速度更快了 
Potter
哈哈 
Potter
这太猛了 
小白
预构建会得到什么？就是跑一下library的npm run build后的文件吗 
Potter
多合一呀 
Potter
我天啊 


最佳划水选手
同问 _sfc_main是固定的吗 ？？？多个组件怎么办？ 

是的
只要默认导出一个组件


sfc
single file component