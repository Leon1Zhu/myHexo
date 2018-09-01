---
title: nodejs设计模式学习小笔记小记
date: 2018-05-18 15:59:42
tags: nodejs
categories: nodejs
---
![封面](http://otdc3q7z7.bkt.clouddn.com/30CE1406BCDFD52887D41A5379C266AC.jpg)

[一些总结](https://blog.csdn.net/sinat_26054677/article/details/43866567)
### 第一章： 欢迎来到node.js平台（对nodejs的一些简单的介绍)
<!--more-->
* #### node.js的哲学
  - ##### 微核心
    * nodejs追求的是内核极小化，内核中只包含了最基础也是必须的功能，其他的都放在用户空间里
    * 所以nodejs可以借助社区的力量快速发展，而不是被动的等待内核缓慢的更新
  - ##### 微模块
    * nodejs的开发模块需要尽量小和简洁
    * 每个方法只做一件事
    * nodejs鼓励开发者去开发小巧精悍的模块，借助npm包管理工具，这些模块可以很好的被管理
    * 小模块易于理解和使用
    * 小模块更加便于测试和维护
  - ##### 微表层
    * nodejs中不光模块要简介，同时暴露的api也要简洁
    * 要实用
* #### node.js6 和es2015的介绍
* #### reactor(反应堆)模式（[两种高性能 I/O 设计模式 Reactor 和 Proactor](https://www.cnblogs.com/daoluanxiaozi/p/3274925.html)）
   - ##### 阻塞io
    * io阻塞的话对速度的影响非常大，所以node采用非阻塞的io，每一个io都相当于一个线程，发送之后不会对后面的执行程序造成堵塞，使用callback进行回调即可，也可以采用es6的promise或者async来进行异步实现
   - ##### 非阻塞io
    * 发出io请求之后不会等待返回，而是直接执行接下来的操作
    * 但是轮询并不是最好的办法，因为不断的查询会浪费CPU的资源
   - ##### 多路复用
    * 一条线路给不同状态的io请求多次使用，避免了多个io请求混乱的情况，提高了资源的利用率
    * [一篇不错的文章](http://nodefe.com/nodejs-event-loop/)
    * 通过libuv实现异步机制
   - ##### node的组成图
   ![node组成图](http://otdc3q7z7.bkt.clouddn.com/7470BE9B-0693-40C5-9148-BF5EA8EC2045.png)
* #### 总结

### 第二章： nodejs的基本设计模式(对异步编程和设计模式的一个简单介绍)
  - ##### 回调模式
    * cps(函数式编程)指将回调函数作为参数传递给另外的函数
    - 释放或者避免Zalgo(指同步或者异步的不确定性)
  - ##### 事件发射器

###