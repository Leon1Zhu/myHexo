---
title: web前端优化（8）
date: 2017-11-22 22:54:52
tags: 服务端性能优化
categories: 前端性能优化
---

##解决首屏渲染慢的问题的几种方法

* 构建层模板编译（在构建层直接进行模板编译）
* 对数据无关的页面做一个prerender
* 服务端渲染（内存泄露，服务器端压力等等问题）

##为什么需要使用ssr服务端加载
* 在使用现代的react或者vue之类的框架时，服务端是先将打包后的在template里面的页面代码返回到客户端，但是客户端并不会直接开始渲染，而是要等待vue或者react的框架代码加载完成之后，才能对template里面的代码进行解析，借解析完成自后才能进行渲染，这也就导致了首屏渲染慢的问题。所以需要使用服务端渲染，将代码再服务端就渲染好，加载到客户端时直接进行渲染即可。
* 使用服务端渲染不会有mounted钩子，需要在服务端渲染的时候进行处理
<!--more-->
##服务端渲染（SSR）实践(nuxt.js)
* 在任何vue组件的生命周期内，只有beforeCreate和created这两个钩子会在浏览器端和服务端均被调用；其他的钩子都只会在浏览器端调用。
* 对于axios这种ajax请求插件，无疑会使用在页面的方方面面中，那么如果在每个页面中使用import方式进行引入，会导致在打包的时候打包多次。而实际上我们只需要打包一次，可以通过在nuxt.config.js里面的build.vendor来解决。
![](http://otdc3q7z7.bkt.clouddn.com/6540FAED-99E9-4A91-847A-F27405C351C5.png)
当然，如果你需要区分测试环境和线上环境的接口地址，就需要在plugins文件中对axios进行编写，如图：
![](http://otdc3q7z7.bkt.clouddn.com/6540FAED-99E9-4A91-847A-F27405C351C5.png)

参考资源https://juejin.im/post/598aabe96fb9a03c335a8dde

nuxt.js官网(https://zh.nuxtjs.org/)