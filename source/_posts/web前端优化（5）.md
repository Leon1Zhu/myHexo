---
title: web前端优化（5）
date: 2017-11-16 17:47:27
tags: 浏览器存储和缓存
categories: 前端性能优化
---
## cookie相关
  * cookie的本意是用来与服务端通信，告诉服务端当前调用的人的相关信息，方便服务端及时的知道是那些人在调用后台的数据
  * 每次发送http请求时，都会自动的吧cookie信息带上
  * cookie的大小为4MB
  * cookie具有时效性
  * 在dns服务器上，如果使用cookie来存储信息的话，并且在相同域名下请求静态资源文件，那么因为请求会自动带上cookie这一项而浪费很多的流量，例如京东这样的公司，如果dns服务器进行cookie操作的话，光是对静态资源的请求，就会浪费上亿元的流量费
  * cookie并不适合做浏览器端数据的存储
  * cookie具有httponly的设置，防止js的恶意读取
## sessionStorage和LocalStorage
  * 这两个是H5为了浏览器存储而设计的
  * 仅在客户端使用，不和服务端通信
  * 5MB大小
  * 使用storage进行缓存数据，可以减少对于后端的http请求，进行一定的优化
  * sessionStorage是会话级别的浏览器存储
  * loaclStorage是直接存储在本地
  * 百度在loaclStorage中存储了很多的信息，包括百度地图的js、函数级别的缓存和css级别的缓存，但是要注意要有一个很好的更新机制
  * 手淘将很多的小的icon图片都存在loaclstorage中，同样也很好加快了网页的读取速度，用户数据还是放在了cookie中，随请求发送到后端，手淘中将浏览器是否支持webp格式的图片字段放在了sessionStorage中，因为这个字段是会每次随浏览器的改变都会改变
<!--more-->
## indexDB浏览器端数据库
 
 * 用于客户端存储大量结构化数据，大数据量存储就使用这个
 * 可以为应用创建离线版本

## Service Workers
* Service Worker是一个脚本可以将一些运行时间比较长或者不依赖页面的JS放在后台运行
* Service Worker可以拦截请求，将需要到后台请求资源的请求拦截下来，直接从Service Worker的缓存数据中进行请求（离线应用就是一个比较重要的能力）
* Service Worker可以实现与主页面的通信，可以将大规模的运算放在Service Worker中进行运算，结束之后通过API进行通信
* 当前端需要大批量的运算和获取时，使用Service Workers可以避免对UI渲染的堵塞
* 在谷歌中，使用chrome://inspect/#/service-workers可以查看当前浏览器有多少service worker在运行
* 使用chrome://serviceworker-internals可以查看service-worker的历史，用来查看浏览过的网站，那些使用了service-worker
* 目前苹果设备对service-worker的支持不是很好
* service Worker目前只支持https的站点，http的站点不支持，但是对localhost的本地地址进行了过滤
![Service Work的生命周期](http://otdc3q7z7.bkt.clouddn.com/1758B00C-BD65-4FD8-AC81-0ED2A1151E3D.png)
 * 
## PWA(Progressive Web Apps)
* PWA是一种WebApp的新模型，并不是单一的知识点，它通过一系列新的WEB特性，配合优秀的UI交互设计，逐步增强WebApp的用户体验
* 渐进式（弱网环境下，是否可以加载出来，没有网的时候能不能加载出来，然后渐进式的提升用体验）
* 可靠：在没有网络的情况下也能访问提供的基本页面，而不是出现“没有连接到互联网的提示”
* 快速：针对网页渲染和书库访问有较好的优化
* 融入：应用可以被增加到手机桌面，并且和普通应用一样有全屏，推送等特性

##使用lightHouse对页面进行性能检验

 
