---
title: js设计模式
date: 2018-03-14 22:26:06
tags: js设计模式小计
categories: js相关
---

#### 工厂模式

```javascript
function createPerson(age.name){
    var obj = new Object();
	obj.age = age;
	obj.name = name;
	obj.getName = function(){
		return this.name;
	}
	return obj;
}
```
<!--more-->
#### 单体模式

单体模式的对象只会实例化一次，并且使用代码块，减少全局变量的污染
返回的始终是一个对象，所以可以用来做全局组件等

```javascript
//单体模式
var createDiv = function(html){
	this.html = html;
	this._init();
}
createDiv._init = function(){
	var divNode = document.createElement();
	div,innerHtml = this.html;
	document.body.appendChild(divNode);
}

var proxyCreate = (function(){
	var instance = null;
	return function(html){
		if(!instance){
			instance = new createDiv(html);
		}else{
		    html = html ? html : instance.html
			instance.html = html;
		}
		return instance;
	}
}){}
```

#### 模块模式

增加私有变量，减少对于全局变量的污染

```javascript
function Person(){
    var privateA = 'a';  
    var obj = new Object();
    obj.a = function(){
    	return privateA;
    }
    return obj;
}
```

#### 代理模式

使用代理对象替本体执行，这样当本体实例化比较麻烦或者复杂的时候就可以等到用的时候再进行初始化，可以对代码逻辑进行优化

```javascript
//奶茶妹
function MikeGirl(){
	this.name ='gril';
	
} 

//京东CEO先生
function Ceo(gril){
	this.gril = gril;
	this.sendMarriageRing = function(ring){
		console.log(gril.name + ring);
	}
}

//CEO助理
function ProxyObj(gril){
	this.gril = gril;
	this.sendGift = function(gift){
		(new Ceo(this.gril)).sendMarriageRing(gift)
	}
}

(new ProxyObj(new MikeGirl())).sendGift('婚戒');
```
