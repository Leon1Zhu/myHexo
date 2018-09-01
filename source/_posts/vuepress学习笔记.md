---
title: vuepress学习笔记
date: 2018-04-15 11:34:40
tags: vuepress学习小计
categories: vue
---

### vuepress是尤大大4月12日发布的一个全新的基于vue的静态网站生成器，实际上就是一个vue的spa应用，内置webpack，可以用来写文档。恰好最近需要为一些组件写文档，就动手撸了一波，毕竟刚发布，遇到不少坑，最终还是磕磕碰碰的运行起来了，为了避免大家踩同样的坑，特意将搭建的过程记录下来，分享一波。

##### 以下是几个已知的问题


* 因为util.promisify是在node 8.0之后引入的，所以如果你不想像我一样浪费三个小时的时间，请[查看并且更新node版本](https://www.cnblogs.com/ae6623/p/6242423.html)

* 建议不要使用webpack-simple的模板进行试验，否则会各种运行不起来╮(╯▽╰)╭

* 使用cli的模板如果报错TypeError: Cannot read property 'vue' of undefined 是因为vuepress内置的webpack的vueloader使用的版本和你本地的不一样，请将本地的版本更新到稳定最新版本

* 当出现安装官方文档部署之后一直跳转到404的情况时，请使用路由的哈希模式来访问

* 如遇到端口冲突等问题，在docs目录下新建.vuepress文件夹，然后新建config配置文件对prot端口项进行配置即可，具体可参照[官方文档](https://vuepress.docschina.org/config/)

* 全局安装之后项目中再安装的话依赖会冲突，引发Module build failed: CssSyntaxError ，建议写在全局的vuepress
<!--more-->

## 开始使用

#### [使用cli新建一个webpack模板项目](https://cn.vuejs.org/v2/guide/installation.html)

```
    //进入项目首先安装依赖
    npm install
    
    //将vue-loader进行版本替换，使其和vuepress内置的webpack里的vue-loader保持一致，否则会报错（不过尤大大已经在解决版本冲突的问题了，版本待发）
    npm install vue-loader@15.0.0-rc.2 --save-dev
    
    //接下来安装vuepress
	npm install -D vuepress
	
	mkdir docs
	
	echo "# Hello VuePress" > docs/README.md
	
	//最后一步启动vuepress
	npx vuepress dev docs
	
	//使用vuepress build即可完成对项目的打包
	
	//接下来就是按照官方的文档，对你的网站进行各种创造啦
	
```

项目部署的话我使用的是github，具体操作请参照[官方文档](https://vuepress.docschina.org/guide/deploy.html)

[示例网站](https://zhuliangt.github.io/v-alien-upload/)

[github地址](https://github.com/ZhuLiangT/testVuePress)


剩下的主题配置参照[官方文档](https://vuepress.docschina.org/default-theme-config/)的配置详解就OK了，这里就不在赘述

## 2.实战开发











