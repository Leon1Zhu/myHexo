---
title: gitlub私服的搭建
date: 2018-03-12 22:26:06
categories: 工具使用
---
最近应公司需求，搭建gitlab私服，在这里做一个简单的记录。

## 1.安装和配置必要的依赖

	sudo yum install curl policycoreutils openssh-	server openssh-clients
	sudo systemctl enable sshd
	sudo systemctl start sshd
	sudo yum install postfix
	sudo systemctl enable postfix
	sudo systemctl start postfix
	sudo firewall-cmd --permanent --add-service=http
	sudo systemctl reload firewalld
	
## 2.使用国内镜像安装，新建 /etc/yum.repos.d/gitlab-ce.repo，添加以下内容，否则下载安装太过缓慢
<!--more-->
	[gitlab-ce]
	name=gitlab-ce
	baseurl=http://mirrors.tuna.tsinghua.edu.cn/	gitlab-ce/yum/el6
	repo_gpgcheck=0
	gpgcheck=0
	enabled=1
	gpgkey=https://packages.gitlab.com/gpg.key
## 3.安装并初始化gitlab
	# 安装 GitLab 社区版
	sudo yum install gitlab-ce
	# 初始化 GitLab
	sudo gitlab-ctl reconfigure
	
最后通过ip访问80端口即可（giutlab默认使用80端口）