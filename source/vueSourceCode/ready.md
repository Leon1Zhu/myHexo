---
title: 准备工作
date: 2018-09-01
tags: vue源码分析
categories: vue
---

# vue源码设计目录

 - src
   - compiler        # 编译相关
     * 主要是 template 2 render
   - core            # 核心代码,包括内置组件、全局API 封装，Vue 实例化、观察者、虚拟DOM、工具函数等等
     * components 组件
     * global api
     * instance各种辅助函数，声明舟曲
     * observer响应式数据相关
     * util工具方法
     * vdom目录下存放虚拟dom
   - platforms       # 不同平台的支持，可以在这里放自己的平台代码，编译出自己的平台代码
     * web 对web浏览器的支持
     * weex native原生app支持
   - server          # 服务端渲染
   - sfc             # .vue 文件解析
   - shared          # 共享代码,一些共享的辅助方法
 
 这样的目录设计可以增强代码的可维护性和阅读性，是非常值得学习和推敲的。
 
 # vue源码构建
 
 * vue.js源码构建是基于rollup构建的(webpack更加强大，将静态资源也编译成js，但是rollup只编译js,更加适合js库的编译)