---
title: web前端优化（7）
date: 2017-11-22 20:25:25
tags: 缓存相关
categories: 前端性能优化
---



##浏览器的缓存

 * 大规模的文件存储需要浏览器和服务器之间约定一个缓存大文件的缓存方式

 
 
 
## cache-control所控制的缓存策略

 * 可以出现在http responseheader 或者http requestheader中
 * max-age指定缓存的最大时间，在这段时间内，不会向服务端重新请求（相对过期时间，max-age的优先级更高）
 * s-maxage s-maxage返回状态304，也是定义缓存的最大时间，但是只能针对public的缓存 （优先级高于max-age，设置之后要去public缓存区拿）
 * private私人的缓存设备，只能私人用户使用
 * public比如cdn服务器，可以被很多用户访问并且获取信息的
 * no-cache 搭配max-age=0配置，每次都会发发起请求，询问我当前的文件是否过期，从而知道缓存策略是什么样的
 * no-store 完全不使用缓存策略
 - Expires
  * 设置缓存过期时间，过期之前都可以直接从缓存读取（max-age(http1.1)的优先级高于expires（http1.0））
<!--more-->
##last-modified和etagg以及整个服务端浏览器端的存储过程
 - Last-Modified/If-Modified-Since
  * last-modified-- response header客户端拿到，服务端这告诉客户端个文件的最后修改时间
  * if-modified-since -- request header客户端告诉服务端当前文件客户端知道的最后修改时间，如果服务端没有更新，返回304成功状态，表示没有更新，可以使用，如果有修改，返回200状态码，返回最新文件，此时需要使用返回的最新的文件，不需要从缓存中读取
   * 第一次请求，客户端不会携带if-modified-since的参数
 - last-modified缺点
  * 服务端可能没有精确的修改时间
  * 有些文件修改时间是改了，但是文件内容是没有修改
 - etagg(If-None-Match，优先级高于last-modified)
  * Response Header中返回 ETag（文件的hash值）
  * request Headers中带If-None-Match参数，这个参数是ETag传递回来的hash值
  * etag是记住当前文件的hash值，当文件的hash值改变时，表示文件变动，返回200，否则是304状态
  * 也需要和cache-control一起使用
  ![缓存流程last-modified和etagg](http://otdc3q7z7.bkt.clouddn.com/E394114D-4422-499E-90AD-C0C3317E957C.png)
  ![缓存流程cache-control](http://otdc3q7z7.bkt.clouddn.com/3DD6BC6C-F4D3-4CC6-A3C8-7B96F57FC9C6.png)

##案例分析和基于node实践缓存方式

chrome下使用 chrome://cache可以直接查看到当前的cache
