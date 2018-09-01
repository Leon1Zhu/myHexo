---
title: nuxt架构
date: 2017-11-25 16:36:46
tags: nuxt学习笔记
categories: vue
---

## 安装过程
 
 * 首先安装vue-cli，直接使用过nuxt的模板
 * 然后直接安装vue-cli对应的nuxt模板
 
 		vue init nuxt/starter <project-name>
		cd <project-name>
		npm install

## 目录结构
* components存放组件，nuxt.js不会扩展增强该目录下的vue.js组件，即不会拥有asyncData特性
* layouts用于组织应用的布局组件
* middleware用于存放中间件
* pages用于组织应用的路由以及视图，nuxt会读取改目录下所有的.vue文件并自动生成对应的路由配置，并且该目录为保留目录，不可更改
* plugins用于存放那些需要在页面中使用的javascript组件
* nuxt拓展的asyncData方法（仅限于页面组件）可以在组件每次加载之前没调用，可以再服务端或者路由更新之前调用。被调用时，第一个参数设置为当前页面的上下文对对象，可以利用这个方法获取数据，nuxt会将返回的数据融合组件data方法返回的数据一并返回给当前组件
- Nuxt.js 提供了几种不同的方法来使用 asyncData 方法，你可以选择自己熟悉的一种来用：
 * 返回一个 Promise, nuxt.js会等待该Promise被解析之后才会设置组件的数据，从而渲染组件.
 * 使用 async 或 await (了解更多)
 * 为第二个参数指定一个回调函数. 注：该回调函数需符合通用的 NodeJs 回调函数的形式:  callback(err, data)
 * [具体使用示例](https://zh.nuxtjs.org/guide/async-data)
 - nuxt.config.js的extend函数介绍
    * 该扩展方法会被调用两次，一次在服务端打包构建的时候，另外一次是在客户端打包构建的时    候。
    * 该方法的参数为1.Webpack 配置对象2.构建环境对象，包括这些属性（全部为布尔类型）： dev， isClient， isServer
 * 使用starter模板的不需要对scss进行额外的配置
 * [nuxt运行时的各种生命周期](https://segmentfault.com/a/1190000008114613)
 * [插件的使用](https://zh.nuxtjs.org/api/configuration-plugins)
<!--more-->
## 关于子路由
* 你可以通过 vue-router 的子路由创建 Nuxt.js 应用的嵌套路由。

* 创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。

* 别忘了在父级 Vue 文件内增加 &lt;nuxt-child/> 用于显示子视图内容。

			pages/
				--| users/
				-----| _id.vue
				-----| index.vue
				--| users.vue
				
##关于插件（plugin）
* 如果担心对于同一个插件引入次数过多，可以使用build下的vendor配置，直接把该插件打进vendor bundle从而减少文件的体积（自己写的组件也可以这样使用）

##生成项目之后

 * 使用nuxt build可以在dist文件夹下生成dist目录直接生成项目
 * 使用nuxt build -a 可以直接生成dist文件之后再8888端口对文件的大小进行分析

 
 
 
 
 
 注：在任何 Vue 组件的生命周期内， 只有 beforeCreate 和 created 这两个钩子方法会在 客户端和服务端均被调用。其他钩子方法仅在客户端被调用。