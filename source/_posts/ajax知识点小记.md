---
title: ajax知识点小记
date: 2018-03-11 19:51:20
tags: ajax知识点整理
categories: js
---

## 基本信息

使用IE7以及之前的版本需要特许处理，具体见书P572，因为组件使用vue，IE版本在IE8+，所以目前不考虑

```javascript
首先 var xhr = new XMLHttpRequest();
    在使用异步请求时，需要检测xhr对象readyState属性，该属性表示请求/响应过程的当前活动阶段
   0：未初始化。尚未调用open()方法，
   1：启动，已经调用opend方法，但未收调用send方法
   2：已经调用send方法，但未接收到响应
   3：接收，已经接收到部分响应数据
   4：完成，已经接收到全部数据响应
   每次readyState的值改变都会触发一次readystatechange事件，通常只对值为4的阶段感兴趣，不过必须在open之前指定readystatechange事件处理程序才能确保跨浏览器兼容性
   
   xhr.onreadystatechange = function(){
       if(xhr.readyState === 4){
       	if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 ){
       		alert(xhr.responseText)
       	}else{
       	 	alert('response error'+ xhr.status); 
       	}
       }
   }//这里使用的是dom0级事件，因为并非所有的浏览器都支持dom2级事件
       
    xhr.open('get',url,true)//第一个参数表示请求类型，第二个参数表示url，第三个参数表示是否异步
    
     xhr.send(null)//send方法接受一个参数，即作为请求主体发送的数据，如果不需要，则必须传入null
    
    在收到响应后，会自动填充xhr对象的属性，
    1.responseText：作为响应返回的文本
    2.responseXML： 如果响应头设置的是‘text/xml’或者‘application/xml’，这个属性中保存着响应数据的xml文档
    3.status:响应的http状态
    4.statusText:HTTP的状态说明
    
    在未收到响应之前，可以调用xhr.abort();来取消异步请求  
```
<!--more-->
在收到响应时，第一步是检查status的响应状态码，一般将200作为成功的标志，此外，304表示请求的资源文件没有被修改，可以直接使用浏览器中的缓存版本，这也意味着响应是有效的，一般这样检查响应

```javascript
if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
	alert(xhr.responseText)
}else{
	alert('response error:'+xhr.status)//statusText不是很可靠，因为后者在跨域的时候不是很可靠，另外，无论什么内容，都会保存到responseText中
}
```


有的浏览器会错误的报告http的状态，早期的IE会将204设置为1223，Opera会将204设置为0

http请求和响应的头部信息

- 发送时，会带有下列头部信息
  * Accept 浏览器能够处理的内容类型
  * Accept-Charset 浏览器能够显示的字符集
  * Accept-Encoding 浏览器能够处理的压缩编码
  * Accept-Language 浏览器当前设置的语言
  * Connection 浏览器与服务器之间的连接类型
  * Cookie 当前页面设置的任何cookie
  * Host 发出请求页面所在的域、
  * Referer 发出请求页面的URL，Http请求这个头部字段拼写错了，而为了保证与规范的一致性，只能将错就错了
  * user-Agent 浏览器的用户代理字段

可以使用setRequestHeader来设置ajax的头部信息

使用getResponseHeader来获取一个包含所有头部信息的长字符串


```
	xhr.setRequestHeader('Myheader','test')
```

使用getAllResponseHeaders()方法则可以获得如下所示的多行文本内容

```
Date: Sun, 14 Nov 2004 18:04:03 GMT
Server: Apache/1.3.29 (Unix)
Vary: Accept
X-Powered-By: PHP//4.3.8
Connection: close
Content-Type: text//html; charset=iso-8859-1
```
建议使用自定义的头部信息，不要使用默认的，可能会影响服务器的响应

## 请求类型

#### get

必要时，可以将查询字符串参数追加在Url末尾，但是添加的参数必须要经过编码(encodeURLComponent)

#### post
post请求，通常向服务器发送应该被保存的数据，post应该吧数据最为请求的主体进行提交
一般程序对post提交和表单提交不会一视同仁，但是我们可以模仿表单提交，首先将Content-Type设置为‘application/x-www-from-urlencoded’,然后使用serialize函数来创建这个字符串

从传输速度看，post请求浪费的资源比get多一些，get请求速度最快可以达到post的两倍

## XMLHttpRequest2级
 FormData为序列化表单以及创建数据格式相同的数据提供了便利，添加数据使用append方法，键值对添加。
 
 使用FormData的方便之处是不用明确的为xhr设置请求头部，xhr能够识别数据类型是formdata的从而设置相应的请求头
 
 timeout，xhr2级收录了超时属性，使用ontimeout触发，支持性不是很好
 
#### 进度事件
 load事件， 表示当前接收到服务器响应，不管状态如何，所以可以替代前面的onreadystatechange函数进行检测state
 
 onprogress事件，这会在浏览器接收数据期间周期性的触发，event除了target之外有额外的三个属性，lengthComputable、position、totalSize三个属性，lengthComputable是一个表示当前进度信息是否可用的布尔值，position表示已经接收的字节数，totalSize表示根据Content-Length响应头部确定的预期字节数 
 
## 安全

#### 同源策略

相同的域名、端口、协议

#### CSRF 跨站点请求伪造
未被授权的系统伪造自己是合法的

 * 使用https连接
 * 增加token
 * 


