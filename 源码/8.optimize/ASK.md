老项目也能npm 直接换成pnpm 用吗? 
h2x
用的都是硬链接到本地缓存的包 
小白
如果本地没有缓存就也很慢了？ 
h2x
不但快还节省存储空间 
最佳划水选手
不是依赖地狱么？ 
小白
只要install即使不是全局也会放入这个缓存中？ 
会议用户468209
也就是多个项目用的是同一份包是吧 


15:01
小白
这个style在哪里？ 
h2x
package.json 
小白
那你不写这个就找不到了bootstrap了吗 
小白
还是因为配了所以找得更快 
找错了
张仁阳
休息5分 
小白
那个loader没跟上 




commonjs 2 是什么？ 
最佳划水选手
那在node 中呢？？ 也是 esmodule？ 
h2x
node也支持esm 
最佳划水选手
哦 ？？？ 新版本么？ 
h2x
14 
h2x
以上支持 
Tony
异步的 
bu
defer  

这个模块没有依赖别的模块才可以配noParse
noParse 为啥不直接配置成 node_module 呢？
不行
node_modules 里有模块有依赖
import React from 'react';


pnpm如何解决这样情况，就是jquery这样库，一个项目用版本1，一个项目用版本2，这样缓存里存什么呢 

后面会开一pnpm的专题课


15:47
h2x
打包esm是不是只能用gulp 

rollup 
webpack
gulp

打包之后还是esm
最好的库是 rollup


16:06
h2x
css treeshaking 
Tony
动态添加style标签和引入文件性能优化在哪个方面 

减少index.html文件的体积
css 50k
html 50k
css内联到html中100K
50k 并行加载
50k 并行加载
还可以实现缓存


16:50
会议用户468209
css 是不是也有hash 
bu
chunkHash 和 模夫的很多信息有关



16:58
Tony
还是对contenthash 和 chunkhash的区别没太理解 
只关心内容contenthash ，内容不变，它就不变，chunkhash还会关心很多的信息

bu
我理解的是 chunkhash 就是和构建出来的chunk有关系， 一样的话就不变， contenthash 则是和打包后的文件内容有关系， 内容不变hash就不会变 

5=>内容 contentHash

1+4
2+3
3+2





