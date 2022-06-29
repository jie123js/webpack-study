
这二个插件已经废弃了，因为已经被 webpack5内置了
DllPlugin，DllReferencePlugin 老师这两个插件能介绍一下吗 

公司里
UI负责 设计 
前端负责 开发页面
后台负责 API接口




必须写 ./ 吗？ 
Tony
为什么是./NewList 
Tony
可以像qiankun一样把整个应用导出去吗 
123
这组件还能远程 组件呢 
20:35
123
拿到的是函数组件？ 
bu
remote 这个全局变量是配置的吗？ 
123
remote 是个函数组件
是一个对象
remote.get(id)返回一个组件 
123
最终module。exports 。deafult 是函数组件 
123
expose 可以写过个吗？ 
123
那我这边开发一个 统一的导航栏 那我岂不是所有的 project 都能用了 
123
就是我所有的中台项目都能用了 
20:43
bu
实际场景中 localhost 改为 ip 地址吗？ 
123
这个有点像我单独开发的组件 编译好了放到远程 服务器 然后和这个插件映射一个可以访问的方法就可以了 
123
还要设置允许跨域  
remote引用 hostl? 
热带么
能整体再过一遍么 
人生若只如初见
sso
单 点登录
有一个单独的登录系统，一次登录，到处访问
比如 有一个公共sso登录。如何共享登录模块？ 
bu
为什么 remote 项目中 会自己引入一个 /remoteEntry.js ? 



如果我的ip 123.0.0.0 那别人只需要在ModuleFederationPlugin 这个插件中remotes: {
                remote: "全局变量名@http://123.0.0.0/xxx.js
            }. 然后我开发完毕别人就能用了 
123
生产的话在部署到远程服务器，所有的项目就可以用远程服务器的地址了，相当于写一个组件 能在很多项目中使用 
123
npm run 
人生若只如初见
相互引用彼此的组件可以么？ 可以
123
这边从来么有执行webpack 打包命令都是npm run 
123
这边从来么有执行webpack 打包命令都是npm run dev 吧 
人生若只如初见
比如涉及到接口请求跨域如何设置 
1.一般最推荐是走nginx 配置 access-control-allow-origin
2.或者走代理
123
就是在dev 环境他也是会打包成file的 


production 环境也是没有打包这个外部的remote Entry。js 也是引入的 相当于自身打包的包的体积没有变化 
人生若只如初见
host项目了里会打包remote的了代码么？ 不会
都是独立构建的，相互之间没有依赖

123
remote项目中打包而来 
bu
模块联邦使用的时候必须是异步加载吗？ 是的
小白
host的webpack配置里，remotes的 remote属性是固定的吗，还是自己想要写在项目内的前缀名字 
123
现在老师就是演示的开发的时候互相引用 
123
跨项目使用 组件 
最佳划水选手
两个项目都打包了react   不会冲突么？ 


如何两个项目用的react版本不一致如何处理？ 
里面会有版本检查 ，如果不一致，各用各的。
bu
使用的远端组件中， 如果涉及接口调用呢？ 涉及跨域问题是在host项目中配置吗？  nginx
人生若只如初见
如何一个项目用的react，一个用vue. 可以互相引用么？ 
bu
remote@http://localhost:3000/remoteEntry.js   如果打包上线之后， 肯定不是这个域名了， 这种每个都根据环境变量配置吗？  
人生若只如初见
如何一个项目引用多个项目如何处理？ 

关于前缀的问题
1.写死
2.可以根据环境变量配置
3.有时候我在开发的时候我不知道最终上线的域是什么??最终发布的可能是一个我不知道的域名




这样不是不安全吗 
小白
document.currentScript.baseURI在哪里设置值了？ 
123
document。currentScript。baseURI 是啥？ 
bu
使用的远端组件中， 如果涉及接口调用呢？ 涉及跨域问题是在host项目中配置吗？  本地开发的话怎么配置呢？ 
小白
这时候的index.html是什么样的呢 
123
但是这些相同的组件的使用场景好低啊 



不是location。href 呢 
h2x
有这个document.baseURI 
123
是不是有document。currentScript。baseURI 就用这个没有就用 location。href 呢 





这个publicPath动态配置方法是不是webpack5的解决方案，webpack4可以用吗 
123
umijs 是只有中国人用吗 
123
还是只有阿里系用 公司没有用呢 
123
mfsu 是啥？ 
123
mfsu 是 联邦模块 
bu
 谁会使用shared的模块？ 只有暴露的模块会用吗？ 
bu
使用的远端组件中， 如果涉及接口调用呢？
各个组件调用各自的接口
提供服务的一方，需要配置允许跨域
host remote remote服务器方配置允许跨域
 涉及跨域问题是在host项目中配置吗？  本地开发的话怎么配置呢？ 
h2x
安装了新依赖也不要再编译吗 




说说原理应该就是加载完挂window上
，remote会去window上去对应版本的依赖，
没有的话就jsonp加载再挂window上 



window.remote.get('./newsList')
返回模块的代码
模块的代码需要通过 jsonp懒加载过来