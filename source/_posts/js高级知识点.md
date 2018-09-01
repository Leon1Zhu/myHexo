---
title: js高级知识点
date: 2018-03-18 15:59:42
tags: 
categories: js
---

## es6相关
#### 模块化
- es6模块化如何使用，开发环境如何打包
 * 使用babel来对新语法进行转化，在项目根目录配置.babelrc文件，使用babel 文件名可进行转换
 * 使用webpack来对模块化进行处理（common.js规范）
 * AMD（掌握）慢慢成为标准，require.js（也有CMD）
 * commonjs标准是后端的
 * es6的出现，想统一现在所有模块化标准
 * es6在nodejs里面可以写，浏览器尚未统一
 * 对模块化统一的期望
 
#### Class与js构造函数的区别
- Class和普通构造函数有何区别  
    * js的构造函数和原型继承
	* class的属性是不会参加迭代输出的
	* class实际上就是构造函数的语法糖（本质上一样的，只是更加简单了）
	* class本身实际上就是个函数 typeof 是function
	* class必须用new，而构造函数不一定
	* class中是不存在变量提升的
	* class不提供私有方法，都是public
	* static (静态方法可以和非静态方法重名，没有静态属性，只有静态方法) * get set new.target

<!--more-->
#### Promise语法
- Promise的基本使用和原理
 * 为了解决callback hell
 * 三个状态
 * all race的区别
 * 实际上还是callback，只是可以区分了，可以模块化了
 
* async await

  ```javascript
  
   const load = async function(){
		const result1 = await loadImg(XX);
		const result2 = await loadimg(XX);
 	}
 	load();
 
 ```

#### ES6的其他功能
- es6其他常用功能
  * let/const
  * 模板变量
  * 块级作用域
  * 解构赋值
  * 函数默认参数
  * 箭头函数（this相关）


## 异步
#### 什么是单线程，和异步有什么关系
- 单线程，只有一个线程，一次只能做一件事
 * 原因是为了避免DOM渲染的冲突
 * 解决方案 —— 异步
- 单线程原因
 * 浏览器需要渲染DOM
 * js可以修改DOM
 * 所以JS执行的时候浏览器DOM渲染会暂停
 * 两端JS也不能同时执行（都修改DOM就冲突了）

#### 什么是event-loop（事件轮循）

* 对于那些异步函数，js都是讲他们放在任务队列中，当主线程执行完成之后，会查询任务队列，当任务队列有满足执行条件的函数的时候，就会调用那个函数
* 
* es6的队列函数是高于任务队列的，当主线程执行完成之后先去查询es6的事件队列，如果有，则先运行

#### 目前解决js单线程的方案（异步是目前唯一的方案）
 * setTimeout
 * Promise
 * async/await
 - jquery Deffered
  * deffered 延迟
  * jquery 1.5 添加了Deferred
  * 后来return dtd.promise()是因为不让函数外部改变promise的执行状态
 * h5 web-work 可以定义多线程，但是不能访问dom

#### 之用jquery如何解决异步

#### Promise的标准

#### async/await的使用
- 和Promise的区别、联系

##原型

#### 原型如何实际应用
* 可以直接说jquery和zepto对于原型的应用

- jquery
  * 定义jQuery  function，$指向这个函数，并定义jQuery.fn
  * return 构造函数 jQuery.fn.init
  * 在init函数中查找并且初始化
  * 最后将init的原型指向fn所定义的对象上
- zepto
 * 通过$函数调用zepto.init
 * 通过zepto.init选择出对应的元素，并返回zepto.z
 * 通过zepto.z  new 一个构造函数Z
 * Z中填写对应的对象的值
 * 将构造函数的原型指向$.fn，扩展对应的原型方法
- 为什么吧原型放在$.fn上
 * 只有$会暴露在全局变量，减少变量污染
 * 将插件拓展统一到$.fn下，方便使用
 * 一个库最好只暴露一个变量就好了
 
#### 原型如何满足扩展
* 将$.fn开放出来

## Vdom

#### 什么是vdom，为何使用
  * 用js模拟dom结构，提高重绘性能
  * DOM变换只能在js中实现，因为只有js是可以实现各种逻辑的前端语言（图灵完备语言）
  * 浏览器的DOM操作是最昂贵的，但是js的运行效率更高
  * 尽量减少DOM操作，而不是‘推倒重来’
  * 将DOM对比操作放在js层

#### jquery实现，遇到的问题
  * 用js模拟dom结构
  * jquery使用append等方法对dom进行增删改查

#### vdom如何使用，核心函数是什么
  - 介绍snabbdom一个开源的VDOM实现（vue升级2.0的时候借用的snabbdom代码）
    * 要改什么就改什么，其他的地方都不用改
    * h patch两个核心函数 

#### 了解diff算法
 - vdom为什么使用diff算法
  * DOM渲染太昂贵
  * 找出需要更新的节点，其他的不更新
  * 这个找出的过程，就是用diff算法

## MVVM

#### 之前使用jquery和现在使用vue或者React框架的区别
 * Vue等框架视图和数据分开

#### MVC
 * modeo
 * view 
 * controller（控制器，控制view和model的变换）
 * 一般是view发生变化，通过controller去修改model

#### 你如何理解MVVM
* model 通过数据绑定
* view（dom）通过事件绑定
* viewModel(view和model之间的一座桥)

#### Vue三要素
* 数据响应式
* 模板引擎
* 渲染
####Vue如何实现响应式
- 注意点
 * 在set监听中，会触发updateComent来触发虚拟dom的更新以及视图的rerender
 * 如果没有经过get函数，也就是说在模板中是没有使用的，那么set之后就不会发生变换，这样来减少DOM的渲染消耗

#### Vue如何解析模板

#### 介绍Vue的实现流程




