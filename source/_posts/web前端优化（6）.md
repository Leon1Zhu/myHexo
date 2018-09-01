---
title: web前端优化（6）
date: 2017-11-18 19:32:12
tags: service worker实战
categories: 前端性能优化
---

## service worker实战
- service worker可以做的事
 * 后台消息传递
 * 网络代理，转发请求，伪造响应
 * 离线缓存
 * 消息推送
 * ......
* 注册当前的service worker
 
		if(navigator.serviceWorker){
		      navigator.serviceWorker.register('./service-worker.js',{scope : './'})
		        .then( function(reg){
		          console.log(reg)
		        })/*.catch(fu nction(error){
		          console.log(error)
		      })*/
		}else{
		  alert("Service Worker is not support")
		}
<!--more-->
* 编写service-worker.js

		self.addEventListener("install",function(e){
		  //waitUntil表示知道里面的异步方法执行完成，才会进行下一步
		  e.waitUntil(
		    caches.open('app-v1').then(function(cache){
		      console.log('open cache')
		      return cache.addAll([
		        './app.js',
		        './main.css',
		        './service-worker.js'
		      ]);
		    })
		  )
		})
		
		//fetch可以请求拦截和响应
		self.addEventListener("fetch", function(event){
		  //改变response返回的数组
		  event.respondWith(
		    //改变请求返回的资源，如果serviceWorker中有，就直接返回，否则就启用fetch进行请求
		    caches.match(event.request).then(function(res){
		      if(res){
		        return res;
		      }else{
		        //通过fetch方法向网络发起请求
		       /* fetch(url).then(function(){
		          if(res){
		             //对于新请求的资源存储搭配我们的cachestorage中
		          }else{
		             //用户提示
		          }
		        })*/
		
		      }
		      return fetch(event.request)
		    })
		  )
		})

* 其中self 属性可返回对窗口自身的只读引用。等价于 Window 属性
* install是service worker的一个生命周期 waitUntil表示当其中的promise都执行完之后才会继续往下执行
* service worker会拦截对应的fetch请求进行对应的处理
* service worker还有message事件，可以用来各个页面之间的通信
![第一次执行之后的cachestorage缓存的数据](http://otdc3q7z7.bkt.clouddn.com/E0F3B907-EE45-44CA-A140-9B4BDA100ACE.png)


![第一次刷新发现，需要的文件都从缓存中读取，实现了离线应用的需求](http://otdc3q7z7.bkt.clouddn.com/3E42AB1C-451E-422A-8247-59DD2AA68D28.png)
