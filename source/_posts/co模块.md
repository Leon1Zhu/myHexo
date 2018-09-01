---
title: js异步编程
date: 2018-05-24 9:36:08
tags: 
categories: node.js
---

![js异步编程](http://otdc3q7z7.bkt.clouddn.com/7052DD95A174DCB5AE70B3A5D512F151.jpg)

使用 js 编程，回调再常见不过。因为单线程，所以要异步，因为异步，所以要有回调。随着逻辑的越来越复杂，回调也越来越多，
尤其是在 node.js 中，经常会发生回调层层去嵌套的情况。

<!--more-->

```javascript
    $.get(/XXX,function(){
        //.....
        $.get(/XXX2,function(){
            /....
        })
    })
```

不难发现，因为 XXX2 需要 XXX 的回调数据所以只能写在 XXX 的回调完成之后，这样的逻辑一多之后就会十分酸爽，形成回调地域。

后来出现了 promise，很大程度上解决了以上的问题，并且已经成为 es6 标准的一部分（由 jq 的 promise 演化而来）

```javascript
    api.get(/XXX).then(response => {
        //......
        return api.get(/XXX2)
    }).then(response => {
       //......
    })
```

不难发现，同样的需求，使用 promise 之后，极大地提高了代码的可阅读性。但是说到底 promose，还是一个异步的写法，但是使用 generator 之后就可以用同步的写法来实现异步了

所以，在 node 中出现了 co 模块，让我们可以用同步的方式去编写异步代码。使用 co 自动执行 next 方法，无需人工干预

```javascript
    co(function *(){
        var data = yield api.get(/XXX)
        console.log(data)
        var user = yield api.get(/XXX2)
        console.log(user)
    })
```

执行后不难发现，data 和 user 顺序打印，看起来完全像同步

在 es7 中提出了 async await，实际上就是 generator 的语法糖，但是他是真正的异步解决方案，有了它，也就不需要 co 模块了

```javascript
async function test(){
   var a = await new Promise(resolve =>{
       setTimeout(() =>{
           resolve(1）
       })
   })

   console.log(a);//两秒后打印，相当于同步执行

   try{
       var b = new Promise((resolve,reject) => {
           setTimeout(() =>{
               reject(2)
           })
       })
   }.catch(e){
       console.log(e)//第三秒时打印2
   }

}
```
