---
title: 你不知道的js阅读小计
date: 2018-11-29  14:18:49
tags:
categories: 读后感
---
### 作用域相关
 ```javascript
 var a = 2;
浏览器的处理逻辑
1. 遇到var a,编译器会询问作用于是否有一个该名称的变量存在于同一个作用于集合中，若有，则忽略该条，继续编译，否则会要求当前作用域在在当前作用域集合中声明一个新变量，并命名a。
2.接下来编译器会为引擎生成运行时所需要的代码，用来处理a = 2操作。此时引擎会先询问作用域是否存在变量a，如果是，就使用这个变量，并将2赋值给a，否则继续向上查找，直到超出作用域，抛出一个异常。
总结： 编译器会首先声明一个变量（如果之前没有声明过），然后运行时引擎会查找该变量并对该变量进行赋值。

同时，在这个例子中，也存在LHS和RHS查询，L和R分别表示一个赋值操作的左侧和右侧。
RHS只是简单的找到这个变量的值，而LHS是找到这个变量的容器本身。
```
注： 不成功的LHS会抛出一个（ReferenceError）异常，而一个不成功RHS会创建一个全局变量（费严格模式下）

### 此法作用域
 * js本身会在编译阶段进行数项的性能优化。但是如果使用eval或者with的话，编译器无法明确的知道会接受到什么样的代码，所以这些优化都会无效，所以不建议使用eval或者with
 * 遮蔽效应
 指由于作用域查找会在找到第一个匹配的值时停止，所以在多层嵌套的作用域中，内部的标识符遮蔽了外部的标识符。
 注：词法作用域只会查找一级标识符，比如foo.bar.baz，此法作用域只会试图查找foo，当找到foo变量时，对象访问规则便会分别接管对bar和baz的访问权限。
 ```javascript
with关键字可能会导致变量的泄露，看如下代码
 function foo(obj) {
    with(obj) {
        a = 2;
    }
 }
 
 var o1 = {
    a = 3;
 }
 
 var o2 = {
    b = 2;
 }
 
 foo(o1);
 foo(o1);
 在这段代码中，当第二次执行foo函数时，因为o2并没有a属性，此时程序会自动创建一个a变量并绑定到全局作用域中。
```

### 函数作用域和块作用域
* 函数作用域
  指属于这个函数的全部变量都可以在整个范围内使用及复用。
* 最小授权原则
  指在软件设计中，应该最小限度的暴露必要的内容，将其他内容隐藏起来。
* 规避冲突
  1. 全局命名空间
     通过命名空间，将各自的属性都声明再统一的对象下，，而不是将自己暴露在顶级词法作用域下。
  2. 模块管理
     模块模式
* IIFE(立即执行函数)
（function(){}）()

* 块作用域
  在一个代码块内，变量只能在内部使用，不会对外部的块作用域进行污染。
  with, trh/catch都会创建一个块作用域
  es6的let 和 const 也会创建一个快作用域
  注： 当声明一个覆盖整个函数作用域的闭包时，js极有可能不会回收该函数，造成内存不必要的浪费和泄露，但是在块作用域下就能够与避免这样的情况。
  
### 闭包

* 函数中的函数，由于函数的作用域链，外部函数无法访问函数中定义的函数内容，从而形成闭包

### 隐式和显示作用域

* let声明会创建一个显示作用域并与其进行绑定，再块外部是无法访问let声明的变量的

### this词法

* es6中新增了箭头函数() => {} 使用箭头函数会放弃普通的this绑定规则，取而代之的使用当前词法作用域覆盖了this本来的值

### 关于this
 * 为什么要用this
   答： this提供了一种更优雅的方式来隐式'传递'一个对象引用，由此可以将API设计的更加简洁并且易于复用。随着使用的模式越来越多
     显式传递上下文对象会让代码越来越混乱，使用this就不会这样。
     
```javascript
function foo(num) {
    console.log('foo' + num);
    
    // 记录foo 被调用的次数
    foo.count++;
}
foo.count = 0;
var i = 0;
for (i = 0; i < 10; i++ ) {
    if (i > 5) {
        foo(i);
    }
}
console.log(foo.count); //0
因为词法作用域的原因，foo函数中的this绑定到全局变量，导致count永远是0；
// 解决方法

1. 创建一个带count的对象
2. 使用foo.count 替代 this.count
3. 使用call函数使this强制绑定到foo上（荐）
```

* this调用栈和调用位置

```javascript
function baz() {
    // 当前调用栈是：baz;
    // 因此,当前调用位置是全局作用域
    console.log('baz');
    bar(); // bar的调用位置
}

function bar() {
    // 当前调用栈是baz --> bar
    // 因此，当前调用位置再baz中
     console.log('bar');
     foo(); // <-- foo的调用位置
}

function foo() {
    // 当前调用栈是baz --> bar --> foo
    // 因此，当前调用位置是在bar中
    console.log('foo')
}
baz(); // <-- baz的调用位置
```

### this绑定规则

1. 默认规则
 * 再无法应用其他规则时的规则
 ```javascript
  function foo() {
    console.log(this.a);
  }
  foo();
  // 这里this默认绑定到了全局变量上，因为foo是直接使用不带任何修饰的函数引用进行调用的，所以应用了this的默认绑定，因此this指向全局对象
  // 但是在严格模式下则不会绑定到全局全局对象，会直接绑定到undefined
```

2. 隐式绑定
```javascript
function foo() {
    console.log(this.a);
}
 var obj = {
    a: 2,
    foo: foo,
 };
 
obj.foo();
// 因为此时foo调用的函数上下文是obj，所以此时this就绑定到了obj上。调用位置会使用obj上下文来引用函数，因此你可以说函数被调用时obj对象'拥有'或者'包含'它
```
3. 显式绑定（call apply bind）

```javascript
 Function.prototype.bind = function(newThis) {
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    return function() {
        return that.apply(newThis, args.concat(Array.prototype.slice.call(arguments, 1));o
    }
 }
```
