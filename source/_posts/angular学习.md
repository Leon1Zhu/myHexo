---
title: angular学习
date: 2018-07-12 16:51:51
tags: angular学习记录
categories: angular
---

根据官方命名规则 angualr 指 angular4.0 an gularJS 指 angular1

#### 程序架构

- 组件

* 是 Angular 应用的基本构建块，你可以吧一个组件理解为一段带有业务逻辑和数据的 Html

- 模块

* 模块是用来将应用中不同的部分组织成一个 Angular 框架可以理解的单元

- 指令

* 允许你向 Html 元素添加自定义行为

- 服务
<!--more-->
* 用来封装可重用的业务逻辑


      使用 sudo npm install -g @angular/cli安装angular的cli脚手架
      安装完成之后使用ng -v来查看是否安装成功和安装的版本

      接下来使用ng new  项目名称来自动生成一个新项目
      除非你知道自己再干什么，否则不用随便修改默认生成文件的名称，因为可能会导致无法使用其他命令

- 生成的项目结构

* e2e 用来做自动测试

- src 应用源代码
  - app 存放代码文件，写的大部分代码都在这里面
  - assest 资源文件
  - environments 环境配置,对不同的开发环境进行配置
  - index.html 项目的主页面
  - main.js 项目的主入口文件
  - polyfills 主要用来配置兼容性
  - style.css 这里主要存放全局的 css
  - karma 主要用来配置自动化测试
    \*ts.config.json 主要是编译器的配置，一般不需要修改

* angular-cli.json angular 命令行的配置文件，通过修改这个文件来配置第三方文档
* tslint.json typescript 代码的 lint 检查

#### angular 组件相关的基本概念

- 装饰器 @Component()
  - 用来告知 ng 如何去渲染组件的数据,表示这个类是一个 ng 的组件，angular 中模块化有两种，一种是 ng 自带的 component,还有一个是 js 的模块化类
- 模板 Template
  - 告诉 ng 如何去渲染组件
  - 看起来很像 html，但是可以在模板中使用绑定语法
- 控制器 Controller
  - 就是一个普通的 TS 类，会被装饰器（@Component）装饰，会包含绝大多数的属性和方法
  - 大部分逻辑都是写在控制器里面的
  - 控制器通过数据绑定与模板通信，模板展现控制器的数据，控制器处理模板上发生的事件
- 数据绑定
  - 将 h 模板和控制器进行绑定
  - 属性绑定、事件绑定、双向绑定
- 模块
  - declarations 声明模块中有什么，在这里只能声明组件、指令和管道
  - imports 声明如果要让项目正常运行还需要什么模块
  - 声明的位置不能错
  - providers 声明模块中提供了什么服务，这里只能声明服务，服务只能声明在这
  - bootstrap 声明主组件是什么
- providers（依赖注入）

- 生命周期钩子

  - ngOnChanges()

  当 Angular（重新）设置数据绑定输入属性时响应。 该方法接受当前和上一属性值的 SimpleChanges 对象

  当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在 ngOnInit() 之前。

  - ngOnInit()

  在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。

  在第一轮 ngOnChanges() 完成之后调用，只调用一次。

  - ngDoCheck()

  检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。

  在每个 Angular 变更检测周期中调用，ngOnChanges() 和 ngOnInit() 之后。

  - ngAfterContentInit()

  当把内容投影进组件之后调用。

  第一次 ngDoCheck() 之后调用，只调用一次。

  - ngAfterContentChecked()

  每次完成被投影组件内容的变更检测之后调用。

  ngAfterContentInit() 和每次 ngDoCheck() 之后调用

  - ngAfterViewInit()

  初始化完组件视图及其子视图之后调用。

  第一次 ngAfterContentChecked() 之后调用，只调用一次。

  - ngAfterViewChecked()

  每次做完组件视图和子视图的变更检测之后调用。

  ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用。

  - ngOnDestroy()

  当 Angular 每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。

  在 Angular 销毁指令/组件之前调用。

- 动画

- 输出属性（用来在组件间共享数据）

##### 所有的组件都会包含上面的三个元素

所有的组件必须使用一个装饰器来注解

用装饰器将原数据附加到组件里（组件原数据装饰器）

（templateUrl）组件的模板定义了用户最终看到的页面的内容和布局

（styleUrls）声明了组件使用的 css 样式表

控制器（下面的 TS 类所定义）指一个被 Component 装饰器装饰的 TS 类，包含了模板相关的所有属性和方法

元数据 :Angular 需要知道如何把应用程序的各个部分组合到一起，以及该应用需要哪些其它文件和库。 这些信息被称为元数据.

使用 ng generate component XXXXX 命令可以生成对应的 component 组件，并且自动添加好对应的依赖

组件不应该直接获取或者保存数据，组件应该就聚焦于展示数据，而对于数据访问的职责应该委托给服务。

服务是在多个"互相不知道"的类之间共享信息的好方法。

让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。 构造函数不应该做任何事。 它肯定不能调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求.

- angualr 的动态组件和自定义元素

* 自定义元素指与具体框架无关的用于定义新 HTML 元素的 Web 标准
* 组件的模板不会永远是固定的，应用可能在运行的时候加载一些新的组件，所以需要动态组件。

- 指令
- 属性选择器

* 再生成的指令文件中写上逻辑，模板文件的元素里直接打上对应的属性名称即可
* 起名称方面，不要使用可能和原生 html 标签发生冲突的名称，尽量加上自己的前缀，不要使用 ng-XXX 的形式。

- 响应用户引发的事件

* @HostListener 装饰器用来添加事件处理器
* 相对于传统的直接操作 DOM，可以避免和 DOM api 打交道，且进行了封装，不易发生内存泄漏事件

- 使用@Input 数据绑定向指令传递数据

* [appHighlight]="color"这里做了两件事，首先是表示这个组件使用高亮指令，其次是通过属性绑定设置了属性的值

- 结构性指令（NgFor,NgIf 之类的）

* 大驼峰和小驼峰的命名方式分别表示引用指令的类名和指令的属性名。
* 你可以在一个组件上使用多个属性型指令，但是只能使用一个结构型指令。
* 指令的\*是一个用来简化复杂语法的"语法糖"
* 优先使用带\*的语法，语法糖形式比普通形式更加清晰。
* 自己编写结构型指令时，也需要用到<ng-template>

- 管道

#### 工作上的收获

- angular 表单相关

  - formgroup 表示一个动态表单，其中的每一个 formcontrol 都对应一个表单值,这样可以避免模板表单一个输入框对应一个控制的麻烦

* 对于 angular 的组件，直接引用他的 class 也可以直接使用，angular 中模块分成两种，一种是 angular 自带的模块，还有就是 js 本身提供的模块。

* 父子组件的通信除了 input 和 output 之外还有 viewchild(XXX) name，可以直接拿到 XXX 模板的引用;

* formgroup setvalue 使用 this.fb.get('XXX').setValue(''),设置值使用 this.fb.get('XXX').value,重置表单使用 this.fb.reset();


<div class="input-content">
            <nz-input [(ngModel)]="item.groupName" [nzPlaceHolder]="'Basic usage'"  #name="ngModel" required></nz-input>
        </div>
        <i class="iconfont grouping-icon pass-icon " [ngClass]="{'hidden-class' : name.invalid}">&#xe6d2;</i>
        <i class="iconfont grouping-icon error-icon" [ngClass]="{'hidden-class' : name.valid}">&#xe696; </i>
- 一些零碎的知识点

  * 使用表单值动态判定是否合法
  * angular 不允许同一个元素上出现多个*语法，因为一个*语法会生成一个 template，多个会导致错误
  * angular5.0 开始支持 service worker 但是要确认当前浏览器是支持这个特性的
  * angular 支持 AOT(预先编译) 在编译期间将应用的 HTML 和 TS 代码编译成高效的 JS 代码，然后浏览器就可以下载并快速运行这些代码 ng build --aot ng serve --aot
  * filedType?.colType 表示可选值，如果 filedType 为 undefined，则不会继续取值
  * constructor会在任何生命周期之前调用，可以用来做依赖注入项，但是不要用来做正事。
  * 使用 noOnChanges 来监听输入值得变化，实现监听接口获取的数据变化，及时更新
  * platformBrowserDynamic().bootstrapModule(AppModule)通过这一句来启动主模块的主组件
  * angular 在加载完所有的模块之后会去找主组件的模板类和 css 来替换 index.html 的内容
  * 在 angular.json 的 script 和 styles 中引入第三方库的 js 和 css,在 install #types/XXX 就可以让 ts 识别了

