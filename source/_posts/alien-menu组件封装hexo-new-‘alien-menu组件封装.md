---
title: alien-menu组件封装
date: 2018-02-06 09:53:00
tags:
categories: js
---

四种高度、宽度获取，区别
	
	arguments.callee表示调用本身函数
	js隐式转换非常吃转换引擎的性能
	js的节点无法自杀，找到父节点，删除子节点
	this上下文，如果用that存储this,表示用静态变量存储动态指针，可以使用
	高内聚低耦合，单一节点
	短路运算符$$左边真返回右边，左边假返回左边
	1$$2返回2
	0$$2返回0
	if(1)2;
	setInterval永远指向window
	可以使用setInterval(function(){}.bind(this),3000)表示被动执行的函数永远绑定在this上	

#### 使用文档片段进行操作，防止回流
 使用 createDocumentFragment创建文档片段，每次都添加到这个对象的时候，最后添加到dom容器里面，这样只会渲染一次，大大减少了DOM渲染所浪费的性能
<!--more-->
