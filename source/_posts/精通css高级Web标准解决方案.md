---
title: 精通css高级Web标准解决方案
date: 2017-12-14 20:36:08
tags: 总的来说，这本书有点脱节了，内容有些老旧
categories: 读后感
---

## IE兼容性相关
 * IE浏览器的表现和其他浏览器不一样的一个原因就是，显示引擎使用一个称之为引擎的概念，所以布局的概念是IE浏览器上特有的，所以当元素在IE上显示时，如果元素拥有了布局，那么元素的显示就会被限制，就会和其他浏览器上展示的不一样（比如当给浮动元素设置的宽度时，浮动元素拥有布局，就会被限制为矩形，会阻止文本绕元素浮动）
 * 在其他浏览器上，如果元素的内容大于元素的尺寸，那么会溢出，而IE6或者更低版本中，拥有布局的元素会错误的扩展元素以支持这些多出的内容，剩余的问题列举见书P195
 * 在html中，可以指定css应用于特定的浏览器，可以使用条件注释指定特定的浏览器，也可以对IE浏览器隐藏某些css文件（见书P196）(<!-- [if It IE 6]> <![endif]>)（这就是条件注释，用来兼容IE浏览器）
 * IE6不支持锚链接的：focus伪类，ie7忽略:active和:focus
 * css2.1和css3的很多高级选择器IE6和更低版本是不支持的（例如属性选择器）
 * IE7以上都支持子元素选择器，但是在IE7中有一个BUG，如果选择的元素之间存在html注释，那么就会出问题，相邻同胞
 * IE6中，混杂模式时使用的是非标准的盒模型，这时候，元素的width不是内容的宽度，而是内容、内边距和外边框的宽度
 * IE8以上支持display:inline-block
 * 老版本的ie想要支持透明度的话需要专门的适配filter:alpha(opacity=80);（opacity = 0.8）
 * 在IE6中对PNG的透明度支持也要有专门的代码适配，代码见书P74
 * 老版本IE不支持对锚元素（a）使用：hover伪类
 * IE6及其以下的双外边距BUG，使用display：inline即可修复
 * 更多的IEBUG请看书199页9.5 
 * IE的缺陷不应该阻碍我们尝试各种新技术
 
 <!--more-->
## 2、高级选择器
* 通用选择器（*）是最强大但是最少用的选择器，匹配所有元素
* 子元素选择器（#nav > li）选择所有的后代子元素
* 相邻同胞元素选择器（h2 + p），根据一个元素与另外一个元素的相邻关系来选择元素
* 选择器的优先级，见书P27页
* 导入样式表（link）比导入样式表（@import）要快
* 老式浏览器只能从同一个域名同时下载两个文件，也就是说如果有三个css文件，那么要等待前两个下载完才能下载第三个，所以结构良好的单一css文件可以显著提高文件的下载速度
* 对代码进行有效的注释是一个很好的习惯
* 一般来说，好的编码习惯是对不同的样式进行不同的分组，写在样式表的不同地方
* 一般是使用@todo注释表示将要进行修改的工作，使用@workaround表示不完善的权宜之计，用@bugfix表示代码或特定浏览器遇到的问题

## 可视化格式模型
* css的盒模型由元素的外边距（margin）、边框(border)、内边距(padding)、内容组成(content)
* css3中的box-sizing可以定义要使用哪种盒模型。

#### 3.1.2外边距叠加
* 当两个或者更多的垂直外边距相遇时，它们将形成一个外边距，值等于两个外边距中较大的一个（只有普通文档流的块框的垂直外边距才会发生外边距叠加，行内框，浮动框和绝对定位框之间是不会发生的）

#### 3.2.1可视化格式模型
* p,h1,div等成为块级元素，这些元素通常显示为一块内容，即‘块框’
* strong、span等元素显示在行中的就是行内元素
* 可以通过display改变元素的可视化模型
* 使用display:inline-block可以让元素显示为行内元素，但是有块级元素的特性，可以设置各种高度
* 绝对定位是相对于已经定位的离他最近的祖先元素，如果都没有，那么直接相对于初始包含快
- 清理浮动的几种方法
 * 在元素中使用overflow:hidden，会自动清理浮动元素，但是这个方法对页面，因为会隐藏滚动条
 * 使用clear属性，但是这个方法需要额外增加一个元素
 * 使用after伪元素加上clear：both，但是这个方法在IE6中不被支持

## 4 不透明度
- 视差效果的实现
 * 对于背景图使用repeat-x，将图片水平铺平
 * 使用background-position：20% 0；让图片水平偏移20%，这样，当视窗移动时，看起来像是图片动了
 * 使用line-height属性会让文字总是保持在元素的中间，这比使用height好，应为使用height的话需要使用内边距将文字压到中间,但是使用line-height当文本的高度占据两行时，行高就会很高，唯一的方法就是让文本不换行
 * css精灵（雪碧图）减少请求，提高可维护性
 
## 8 布局
- 计划布局
 * 先设计，再写页面
* 使用浮动布局时，要做的不是连续的浮动和清理元素，而是浮动几乎所有东西，然后在整个文档的‘战略点’（比如页脚），进行一次清理，也可以使用溢出的方法清理元素
- 固定宽度布局
 * 固定宽度就是讲布局的宽度定死，但是，随着浏览器尺寸越来越多样，这已经不是一个很好的布局 了
- 流式布局
 * 用百分比数设置元素的尺寸，这样就可以相对浏览器的大小进行伸缩，但是当窗口宽度较小时，行会变的非常窄，难以阅读，所以有必要添加min-height/width等单位进行控制，但是如果设置的太大，又会变的和固定宽度一样
- 弹性布局
 * 使用字号（em,rem）来对元素的宽度进行设置，这样，当修改根元素的字号时，整个页面都会进行有效的缩放

## 9 捕捉BUG
* 外边距叠加问题，出现的原因是因为具有块级子元素的元素计算其高度的原因,通过添加一个垂直边框或内边距，外边距就不再叠加了

## 10 实例研究
* reset样式表可以避免和缓解HTML元素默认样式不一致的问题

## 11实例研究
* 使用:first-letter 或者:first-line，可以选中文本的第一个字母或者第一行
* 相邻同胞元素 li + li，匹配与第一个元素相邻的下一个同胞元素，并且元素的父元素必须是相同的，而且第二个元素必须紧挨着第一个元素。
