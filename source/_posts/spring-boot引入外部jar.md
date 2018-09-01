---
title: spring boot引入外部jar
date: 2017-12-12 10:47:23
tags: 
categories: java
---

#### 前言:由于项目需求，短信验证码的接口需要换成阿里大于的，但是尴尬的发现阿里大于的jar包没有maven版本的，于是便开始了一上午的操蛋引包之路。按照套路来说，自然应该是百度一波，但是百度了好久，找了好多方案之后发现，没一个有用的，而且文章的抄袭、拷贝十分严重，试了N种方案，都是错的，都没有将外部jar包打包到BOOK-INF文件夹下。最终，在第N次尝试之后，终于在打的jar包里将外部的jar包导入进来

首先在新建libs文件夹（根目录或者resource目录下都可以），将需要引入的jar放进去
![libs文件夹](http://otdc3q7z7.bkt.clouddn.com/F423D890-4FC6-4C60-8106-99A81A54E4EB.png)

然后再pom中加入如下配置，告诉maven导入本地jar

		   <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-core</artifactId>
            <version>3.2.2</version>
            <scope>system</scope>
            <systemPath>${project.basedir}/libs/aliyun-java-sdk-core-3.3.1.jar</systemPath>
        </dependency>
        <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-dysmsapi</artifactId>
            <version>1.0.0</version>
            <scope>system</scope>
            <systemPath>${project.basedir}/libs/aliyun-java-sdk-dysmsapi-1.0.0.jar</systemPath>
        </dependency>
       
其中除了systemPath配置告诉maven引入的本地jar包的位置之外，其他的配置都可以随便写

划重点！！！敲黑板！！！下面的一步配置也是最重要的一步，网上很多的教程缺了这样一步之后就会导致虽然本地可以运行，但是只要使用maven打包就不行，因为maven没有将本地的jar也打到生成的包中
<!--more-->
在pom中给spring boot的打包插件设置一下includeSystemScope参数即可

	<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <includeSystemScope>true</includeSystemScope>
                </configuration>
            </plugin>
        </plugins>
    </build>	