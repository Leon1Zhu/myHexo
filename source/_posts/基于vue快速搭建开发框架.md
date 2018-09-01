---
title: 基于vue快速搭建开发框架
date: 2017-07-28 22:34:06
categories: vue
---
从去年开始接触vue开发，也从头到尾经历了两个大项目，从搭建项目一点点的也积累了不少经验，也给自己挖了不少的坑。同样的，填的坑也不少。今天就总结一下，如何搭建vue前端开发框架。其中涉及的相关技术有：vue-cli脚手架、vuex作为全局事件、变量的管理，global.js（中小型项目开发时不需要复杂的vuex时使用），vue-router，axios，scss等。

## 1.使用vue-cli生成webpack项目模板
 * 安装node
   
   首先需要安装node环境，可以直接到中文官网[http://nodejs.cn/](http://nodejs.cn/)下载安装包。
   
   只是这样安装的 node 是固定版本的，如果需要多版本的 node，可以使用 nvm 安装[http://blog.csdn.net/s8460049/article/details/52396399] (http://blog.csdn.net/s8460049/article/details/52396399)

   安装完成后，可以命令行工具中输入 node -v 和 npm -v，如果能显示出版本号，就说明安装成功。
   
 * 安装vue-cli
   
	安装好了 node，我们可以直接全局安装 vue-cli：
	
	``` bash
	npm install -g vue-cli
	```
<!--more-->
最新的 vue 项目模板中，都带有 webpack 插件，所以这里可以不安装 webpack

安装完成后，可以使用 vue -V （注意 V 大写）查看是否安装成功。

如果提示“无法识别 'vue' ” ，有可能是 npm 版本过低，可以使用 npm install -g npm 来更新版本
	
* 生成项目
   
  首先需要在命令行中进入到项目目录，然后输入：
  
	``` bash
	vue init webpack Vue-Project
	```
		
  按照提示项进行设置生成项目即可。
  
  生成之后使用
  
   ``` bash
   npm install
  	``` 
  		
  即可安装依赖
  
  然后启动项目
  
  ``` bash
  npm run dev
  ``` 
  
  至此，项目的生成就完成了
  
## 2.对生成的项目进行配置

刚生成的项目因为通用的原因，所以没有太多的定制需求，在这里，我们将vuex，axios，axios二次封装,global全局文件等等设置，加速开发。

### （1）axios集成以及二次封装
  
  &nbsp;&nbsp;&nbsp;运行如下命令安装axios 
   
   	npm install -g axios
   	
  安装完成之后，先不要急于使用，首先在src目录下新建api文件夹，同时在api文件夹下新建index.js文件，对axios进行二次封装，方便请求。完成之后的项目结构以及index.js的文件内容如下图
  
  ![example](http://otdc3q7z7.bkt.clouddn.com/jg.png)
  
  至此，axios的封装也已完成，下面展示如何去调用，以便开发的时候调用层次更加鲜明，逻辑更加清晰。
  
* 在api文件夹下新建一个javascript文件，用于存放接口相关信息和实现逻辑   
  ![example](http://otdc3q7z7.bkt.clouddn.com/apidemo.png)

看一下在实际使用中的效果
  ![example](http://otdc3q7z7.bkt.clouddn.com/27544414-054C-41E6-85F5-79B36E5CCEEA.png)
  
  ![example](http://otdc3q7z7.bkt.clouddn.com/853E24F3-D63C-43B5-947B-D149C0654E79.png)

 可以发现使用es6的import和export进行模块化之后，就将api接口请求从界面逻辑中分离出来，单独开发，使得层次更加分明，增加接口的复用率更加方便项目的管理。让后期项目的管理更加容易。
 
### （2）配置vuex

当你的项目比较复杂，对项目的状态管理比较复杂时，就需要集成vuex进行项目状态的管理，集成之后的效果如下

![example](http://otdc3q7z7.bkt.clouddn.com/5D58CA9C-1888-440A-A2BE-3A6D922B2476.png)

因为官网上都有相关配置，就不做详细说明，需要看文件内具体内容的可以去项目的[**github地址进行查看**](https://github.com/ZhuLiangT/vue-template)

### (3)global文件以及全局方法文件的创建以及维护

在很多情况下，你的项目都不会那么的复杂，所以使用vuex反而会增加项目的复杂度，降低你的开发效率，这种时候，就需要我们用一个全局的js文件来管理相关的变量（bus），将这些变量统一存放在javascript的全局global下进行管理，再用专门的文件对这些变量进行管理，使得项目更加整洁。

* 创建global.js用来存放全局变量
 
 ![example](http://otdc3q7z7.bkt.clouddn.com/02039E49-6D47-40B2-8E22-1063D3F7523A.png)

* 创建globalFun.js用来专门管理global中的全局变量

![example](http://otdc3q7z7.bkt.clouddn.com/2D881D6C-BBC0-4BF8-AF22-0F519A1D523E.png)

如果项目没有太过复杂的话，这样的两个文件基本可以替代vuex的相关功能，并且这样使用可以很大程度的降低管理的复杂度，相当实用。
注：在globalFun.js中import global.js在main.js中引入gloablFun.js

* 创建mainFun.js文件对全局方法进行管理
  
  每次开发程序时，总会有很多的全局方法需要管理，所以干脆使用一个专门管理全局方法的文件进行统一管理。
  
  ![example](http://otdc3q7z7.bkt.clouddn.com/96EBB9DB-3AD0-479D-AC49-99A43FE7BA95.png)
  
至此，一套相当实用的基于vue-cli的开发框架就配置完成，项目已经上传到github上，你也可以到[**github上进行查看**](https://github.com/ZhuLiangT/vue-template)。
 

  
 