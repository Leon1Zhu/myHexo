---
title: hexo搭建
date: 2018-03-14 22:26:06
categories: 工具使用
---

一直纠结于要不要写博客，直到最近，手头上事情比较少，有些空闲时间来整理这个事情，花了一上午的时间了解了博客相关的信息，最终决定选用hexo+github来搭建自己的博客，整体过程还是比较顺利，但是过程中还是遇到了不少坑，觉得还是很有必要记录一下整个过程的。

## 1.环境准备
###  安装Node
  * 直接到Node.js官网现在最新版本，一路安装即可
  
### 安装git
  * 这个网上的教程有很多，直接到官网下载安装并且设置下环境变量即可
  
### GitHub账号和GitHub Pages
  * 在自己的GitHub上新建一个仓库（repository），需要注意的是仓库的名称，比如我的账号是ZhuLiangT,那么我的仓库名称就应该是：ZhuLiangT.github.io,创建完成之后直接访问这个地址就是你的个人主页了。
  
  * 添加SSH公钥到『Account settings -> SSH Keys -> Add SSH Key』，步骤如下:
  
设置你的用户名密码
     
 	
 	   git config --global user.email "youremail@XX.com"                   
		git config --global user.name "yourname"
	 
 
 生成SSH秘钥
 <!--more-->	  
	
		ssh-keygen -t rsa -C "bu.ru@qq.com"
		~/.ssh/id_rsa是生成私钥，~/.ssh/id_rsa.pub是生成公钥

接着打开秘钥文件，复制秘钥


   	   cat ~/.ssh/id_rsa.pub


这里会得到一段很长的编码：

``` bash
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCuYZIchz3THIcc/wH0ZB5WZYqe2iBVUNqSzfrgxBvJCZkFHWiUZhA/4omNud/27PVT/FADV9qSvrX7ifP05Cbl6mhE4uJjxOQRNoPdQQcsTEFh5vDvOeiJOT1CoFb9WLGg49Xml4yJmFJqv/Kz5hCe7LEWRYJH6tmaVG0qi9nwAZmjfTQpSWu07eAKB9wAbK6stCdnd5JvMq7IsNNylbwDlXf0RQA4RpppO+14oNBqivhi5ftBPjP15+aWKpnXUxkGMVAefKTvwsyw1T0H2sj+ILVFM4d5xpxu3jPHebqh363OwPPLMsoUy9VhQ3YDtMxt4vyOxvpJ9ekMGlDn/9ut youremail@XX.com
```
进入git的Account settings -> SSH Keys -> Add SSH Key将这段秘钥添加进去即可。
	   	  
![example](http://otdc3q7z7.bkt.clouddn.com/BA408E6C-C356-4D7E-8EF7-D2B7873C9797.png)

## 2.安装hexo

### 全局安装hexo
 

  	npm install -g hexo

 	
### 初始化hexo，将hexo安装到你指定的目录（到指定目录使用此命令直接进行初始化）
 
    hexo init

### 生成hexo的静态页面（到init的目录执行此命令）

  	 hexo generate


### 启动hexo本地服务

	hexo server

   浏览器输入http://localhost:4000就可以看到你的专属博客啦
       
  至此，hexo的安装也已经完成。

## 3.让hexo和github建立联系

### 在hexo的安装目录中，找到_config.yml，将Deployment属性做如下修改 

    deploy:
	     type: git
        repo: git@github.com:yourname/yourname.github.io.git
        branch: master 

  	
 注：在hexo3.0之后要部署到git需要进行如下操作
   
 ``` bash
  npm install hexo-deployer-git --save 
  hexo g(从新生成)
  hexo d（部署到git上）
 ```
   	 
   	至此，访问刚才部署的git个人页面，就能看到你的私人博客啦。