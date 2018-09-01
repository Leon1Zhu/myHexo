---
title: css揭秘一书相关
date: 2017-12-18 11:32:46
tags:
categories: 读后感
---
### 46 状态平滑的动画
* 对于动画，使用animation-play-state属性，指定当前动画的动画状态

### 47 沿环形路径平移的动画
* 简单实现之后发现旋转的图片也会随之旋转，大大降低了可阅读性，通过一个反方向的旋转，即可解决
* 第二种解决方案暂不记录
* 玩了一把作者写的相框效果，要活用background-clip,background-origin，以及用box-shadow,效果很漂亮
* background-clip对于图片只是裁剪，多余的部分会被裁减掉，而background-origin则是将图片移动到起始位置

### 42 缓动效果
* box-shadow 最后的inset参数可以实现将阴影投入到元素内部
* [贝塞尔曲线学习使用网站](http://cubic-bezier.com/#.17,.67,.83,.67)
<!--more-->