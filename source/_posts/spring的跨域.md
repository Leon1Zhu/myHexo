---
title: 浅谈跨域问题
date: 2018-03-15 22:26:06
categories: js
---
  &emsp;&emsp;&emsp;&emsp;对于前端开发的码农们，跨域问题一定不陌生，在我还是个新手时，就曾被跨域问题折磨的欲仙欲死。
      
  &emsp;&emsp;&emsp;&emsp;之前项目开发时，使用了CORS（跨域资源共享），虽然对低版本的IE兼容性有一定的限制，但是胜在方便，能轻松的解决跨域问题。今天突然想起这一茬，决定进行一个详细的记录。
  
  &emsp;&emsp;&emsp;&emsp;只要协议、域名、端口有任何一个不同，都被当作是不同的域。即在一个域下的js无法访问不同域下的数据对象。这是浏览器出于安全考虑的做法，几乎所有的浏览器都不允许这种跨域访问。所以当你需要访问其他域名的接口时，这个问题就出现了，这也是本文要探讨的问题。
  
## 1.jsonp解决方案
<!--more-->
   首先介绍jsonp的解决方案，这也是我之前的几个项目一直使用的方案。
   上文中说过，浏览器禁止跨域访问数据。但是script标签却可以不受这个规则的限制。而jsonp正是利用了这个“漏洞”，从而实现与其他域进行通讯的需求。这也是一些卓越的工程师们想出来“逃避”同源策略的有效方法。
   
   jsonp的要点是允许客户端传一个callback给服务器，然后服务器返回这个callback包裹着json给客户端，客户端执行这个回调函数。所以jsonp可以理解为json with padding.
   
   
- `-` jsonp的优点
	* 纯文本的方式，跨平台简单
	* javascript原生支持，兼容性好

- `-` jsonp的缺点
	* 只支持get请求，不支持其他类型的请求
	* 调用失败时，不会返回失败的状态码
	* 安全问题，当调用的服务存在页面注入漏洞，即返回的JS可能是被人控制的，所以使用jsonp的服务必须保证是安全可靠的

## 2.CORS跨域资源共享
   CORS是W3C官方的解决方案，全称是“跨域资源共享”，CORS需要浏览器端和服务器端同时支持，目前除了IE9以下的浏览器都是支持CORS方案的，所以只要是服务器端实现了CORS接口的即可进行调用。CORS通信和ajax通信代码完全一样，无需进行特别处理，这也是非常方便的地方。
 
### CORS的请求类型
CORS请求类型氛围两种
    
   -  简单请求
	- （1) 请求方法是以下三种方法之一：
		*	HEAD
		*	GET
		*	POST
	- （2）HTTP的头信息不超出以下几种字段：
	   *  Accept
	   *  Accept-Language
      *  Content-Language
	   *  Last-Event-ID
	   *  Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
 -  非简单请求
   - 凡是不同时满足以上两个条件的请求就是非简单请求。
 
 如果是简单请求，浏览器会直接发送跨域请求并在请求头部增加Origin字段用来表明该请求来自哪个个源（协议 + 域名 + 端口）。而服务器端直接根据这个参数来判断是否需要给予响应。如果是不被允许的，则服务器端返回的结果则不携带ccess-Control-Allow-Origin字段，浏览器端发现没有这个字段就知道出错了，直接捕获并报错。
 
 而对于非简单请求则会稍微复杂些
 
 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
 
 非简单请求在请求之前，都会发送一次预检（option）请求。
 ![option预检请求](http://otdc3q7z7.bkt.clouddn.com/D2305456-6299-473D-A20B-FA310F682C57.png)
 当服务器确认并成功返回之后，真正的请求才会被发送出去。
 ![正式请求](http://otdc3q7z7.bkt.clouddn.com/4AFD7E9A-BD69-46AD-A596-5F62E06BC795.png)
 
### CORS对于cookie的处理

CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。

	Access-Control-Allow-Credentials: true
	
另一方面，开发者必须在AJAX请求中打开withCredentials属性。

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。
但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。

	xhr.withCredentials = false;
	
需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie
