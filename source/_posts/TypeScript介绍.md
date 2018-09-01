---
title: TypeScript介绍
date: 2018-07-12 10:45:54
tags: typescript相关学习
categories: typescript
---

- 为什么要学习TS
 * 支持ES6规范
 * 强大的IDE支持（语法提示，强制类型要求）
 * 是NG框架的开发语言
### 是js的超级，有谷歌和微软支持，后台强大。可能成为js后续发展的一个方向

### 需要compoiler将TS转为JS语法，防止浏览器的不兼容

### TS的新特性
<!--more-->

 - 字符串相关
  * 多行字符串，双撇号声明``，直接从头拼接到结束的`，允许直接换行
  * 模板语法 ${}，会直接对其中的变量进行替换，但是这种语法只在``声明的字符串中生效
  * 自动拆分字符串，
  
 - 参数相关
  * var name:string = `zhu liang`;这样就声明了字符串类型的变量
  * 后续的开发中对于声明类型的值如果赋值的类型不同，就会报错，但是这个报错只会在TS的编译器下，编译完成的JS代码则不会报错，因为JS中是没有变量类型的。
  * 类型推断机制，TS会自动推断变量的类型，后续改变不能和第一次不同
  * 如果想让值的类型多变，那么var XXX:any = `` 即可，any表示任何类型都可以
  * boolean number string any  void(函数使用表示函数没有返回值，如果返回了就会报错)
  * 函数，函数变量，变量都可以声明类型
  * 参数默认值，直接使用=给参数指定默认值即可，带默认值的参数声明在最后
  * 可选参数，在方法声明后面用问号来表明此参数为可选参数，可选参数要声明在必选参数的后面，切要对可选参数没有传入的情况做处理
  
 - 函数新特性
   - Rest and Spread操作符(...XXX)
     * 用来声明任意数量的方法参数、
     * 抵用固定参数的函数时，也可以使用。。。XXX的方法传递参数
   - generator 函数
     * 可以控制函数的执行过程，手工暂停和恢复代码
   - destructuring析构表达式
    * 可以将对象或数组拆解成任意数量的对象
    * 大括号中的变量要和对象中的变量严格相等
    * < var {code: codex,price:price2 }= XXX表示变量名称替换和子对象取值 
    * 针对数组的析构表达式用[]针对对象的析构表达式用{}
    
 - 表达式和循环
   - 箭头表达式
     * 用来声明匿名函数，消除传统函数this指针的问题
     * forEach for...in  for...of
     * forEach不允许中途跳出
     * for...in  表示键的遍历，会遍历允许遍历的键
     * for...of 表示值的遍历，对字符串使用时把每个字符打印出来
 - 类
   * 类是TS的核心，使用TS开发，大部分代码都是写在类里的
   - 类的定义
     * class XXX{name; eat(){};}
     - 访问修饰符 
       * public 默认关键字，访问没有限制
       * private 私有的，只有类的内部可以访问
       * protexted 只有类的内部和子类可以访问
   - 构造函数（constructor）
     * 只有在类的实例化的时候会被调用且只会被调用一次
     * 
   - 继承


   "rules": {
    "adjacent-overload-signatures": true,
    "callable-types": true,// 只有一个调用签名的接口或文字类型可以写成函数类型
    "class-name": true,// 类名使用PascalCase（帕斯卡拼写法）而不是CamelCase（骆驼拼写法）
    "comment-format": [// 注释必须保持单行，同时必须以空格开头，有助于在代码库中保持一致，可读的风格。
      true,
      "check-space"
    ],
    "align": [
      true,
      "parameters",
      "statements"
    ],
    "array-type": [// 强制使用T[]if T是一个简单类型（原始或类型引用）
      true,
      "array-simple"
    ],
    "arrow-return-shorthand": true, // 建议使用 () => x 替代 () => { return x; }
    "ban-types": [// 禁止使用Object ，String, Number, Boolean, Function，使用对应的基本类型进行代替
      true,
      [
        "Object",
        "Use {} instead."
      ],
      [
        "String",
        "Use string instead."
      ],
      [
        "Number",
        "Use number instead.”
      ],
      [
        "Boolean",
        "Use boolean instead."
      ],
      [
        "Function",
        "Use specific callable interface instead."
      ]
    ],
    "binary-expression-operand-order": true,// 二进制表达式中，文本应始终位于右侧
    "curly": true,// if/ for/ do/ while 语句强制加上大括号
    "encoding": true,// 强制使用UTF-8编码
    "eofline": true,// 强制文件以换行符结尾
    "deprecation": { // 禁止使用弃用的api
      "severity": "warn"
    },
    "import-spacing": true,// 确保import语句关键字之间的适当间距
    "indent": [// 强制使用制表符或空格缩进,并且执行一致的空格
      true,
      "spaces"
    ],
    "interface-name": [// 强制，接口名称不具有I前缀
      true,
      "never-prefix"
    ],
    "interface-over-type-literal": true,// 建议首选类型文字的接口声明( type T = {...} )
    "label-position": true, // 强制标签只能用在do/for/while/switch语句上，用在其他地方会被认为是糟糕的代码结构
    "new-parens": true,// 强制使用new调用构造函数也需要括号，保持风格的一直
    "no-angle-bracket-type-assertion": true,// 强制使用as Type for 类型断言而不是<Type>
    "member-access": false,//强制需要类成员的显式可见性声明。
    "no-any": true,//强制不允许使用any作为类型声明。
    "no-arg": true,// 强制不允许使用arguments.callee
    "no-bitwise": false,
    "no-consecutive-blank-lines": [//强制不允许出现一个或多个空行
      true
    ],
    "no-console": [// 禁止使用一下类型的console
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-conditional-assignment": true,// 强制、禁止条件中的任何类型赋值
    "no-construct": true,//强制 不允许使用String Number Boolean的构造函数
    "no-debugger": true,// 强制不允许使用debugger语句
    "no-duplicate-imports": true,// 强制，禁止来自同一模块的多个import语句
    "no-duplicate-super": true,// 建议，super在构造函数中至多出现一次
    "no-empty": false,// 强制 不允许空的块（带有注释的快不视为空）
    "no-empty-interface": true,// 强制 禁止空的接口
    "no-eval": true,// 强制，禁止使用eval函数
    "no-floating-promises": true,//promise的返回必须妥善处理，未处理的promise返回可能会出现意外
    "no-for-in-array": true,//禁止使用for…in来遍历数组
    "no-import-side-effect": true,// 避免带有副作用的import语句
    "no-inferrable-types": [//对于初始化为数字、字符串或布尔值的变量或参数，禁止使用显示类型声明
      true,
      “ignore-params”,// 函数参数可以指定可推断的类型注释
      “ignore-properties”// 类属性可以指定可推断类型
    ],
    "no-invalid-template-strings": true,// 建议不要在非模板字符串中使用${
    "no-invalid-this": true,// 禁止在this类之外使用关键字 https://github.com/palantir/tslint/pull/1105#issue-147549402
    "no-irregular-whitespace": true,// 禁止文件中的不规则空格
    "no-magic-numbers": false,// 不允许在变量赋值之外使用常数数值。如果没有指定允许值，默认允许-1，0，1
    "no-misused-new": true,
    "no-namespace": [// 不允许使用内部module和namespace
      true,
      “allow-declarations”// 允许declare namespace来描述外部api
    ],
    "no-non-null-assertion": true,// 禁止使用！后缀运算符进行非空断言
    "no-shadowed-variable": true,// 不允许隐藏变量声明
    "no-sparse-arrays": true,// 禁止数组包含缺少的元素，可能是一个意外重复的逗号
    "no-string-literal": true,// 禁止不必要的字符串文字属性访问，允许obj[“prop-erty"]，不允许obj["property"]
    "no-string-throw": true,// 强制 抛出异常的时候使用throw new Error
而不是直接throw
    "no-switch-case-fall-through": true,// 不允许穿过case
    "no-this-assignment": true,// 不允许不必要的引用this
    "no-trailing-whitespace": true,// 不允许在行尾添加尾随空格，保持版本控制干净，防止意外空格被提交
    "no-parameter-reassignment": true,// 禁止重新分配参数
    "no-unnecessary-initializer": true,// 禁止将var/let或者结构初始化程序初始化为undefined
    "no-unused-expression": true,// 禁止未使用的表达式语句
    "no-use-before-declare": true,// 禁止在声明之前使用变量
    "no-var-keyword": true, // 不允许使用var关键字
    "number-literal-format": true,// 检查十进制文字应以0开头而不只是’。’
    "object-literal-sort-keys": false,
    "object-literal-key-quotes": [// 对对象使用一致的文字属性引用样式
      true,
      “consistent”// 属性名称应全部引用或不引用
    ],
    "object-literal-shorthand": true,// 禁止使用es6的对象字面量简写
    "one-line": [// 要求制定的标记与之前的表达式在同一行
      true,
      “check-open-brace”,// 检查开括号是否与前一个表达式位于同一行
      "check-catch",
      "check-else",
      “check-whitespace”// 检查前面的空格是否有制定的标记
    ],
    "one-variable-per-declaration": [// 禁止在同一声明语句中使用多个变量定义
      true,
      “ignore-for-loop”// 忽略for循环
    ],
    "ordered-imports": [// 要求import语句按照字母顺序排列进行分组
      true,
      {
        "import-sources-order": "lowercase-last",// {baz , Bar , Foo}
        "named-imports-order": “lowercase-first”// {b , A , C}
      }
    ],
    "prefer-conditional-expression": false,
    "prefer-const": true,// 如果变量只在声明时赋值一次，建议使用const
    "prefer-for-of": true,// 建议使用for-of而不是for-in
    "prefer-method-signature": true,// 建议使用foo(): void 而不是 foo: () => void
    "prefer-object-spread": true,  // 建议在适当的地方使用es6的对象拓展运算符替代es5的object.assign
    "prefer-template": [// 允许单个串联（X+Y），但是不允许多个（X+Y+Z）
      true,
      "allow-single-concat"
    ],
    "quotemark": [ // 字符串强制使用单引号或双引号
      true,
      “single" //强制执行单引号
    ],
    "radix": true,// parseint需要制定第二个参数
    "semicolon": [// 每个语句末尾强势使用分号
      true,
      "always"
    ],
    "trailing-comma": [ //  解构赋值，函数类型，命名导入和导出以及函数参数需要在数组和对象文字中使用尾随逗号
      true,
      {
        "multiline": "never",
        "singleline": "never"
      }
    ],
    "triple-equals": [ //使用===而不是==
      true,
      "allow-null-check"
    ],
    "typedef": [// 需要存在类型定义
      true,
      “call-signature”,// 检查返回的类型函数
      “parameter”,// 检查飞箭头函数的函数参数的类型说明符
      “property-declaration”// 检查返回结果口属性的类型
    ],
    "typedef-whitespace": [// 不允许使用空格进行类型定义
      true,
      {
        "call-signature": “nospace”,//检查返回的函数类型
        "index-signature": “nospace”,// 检查索引器的索引类型说明符
        "parameter": “nospace”,// 检查功能函数
        "property-declaration": “nospace”,// 检查对象属性声明
        "variable-declaration": “nospace" //检查变量声明
      }
    ],
    "unified-signatures": true,// 对于可用reset参数进行重载的函数进行警告
    "use-isnan": true,// 使用isNaN函数对NaN常量进行比较
    "variable-name": [// 检查变量名称是否存在错误
      true,
      “allow-leading-underscore”//允许开头使用下划线
    ],
    "whitespace": [
      true,
      “check-branch”,//if/ else/ for/ while后跟空格
      “check-decl”,// 检查变量声明是否在equals标记周围有空格
      “check-operator”,// 检查运算符令牌周围的空格
      “check-module”,// 检查导入和导出语句中的空格
      “check-separator”,// 检查分隔符标记后的空格
      “check-type”,// 在变量类型规范之前检查空格
      “check-typecast”,// 检查类型转换与其目标之间的空白
      “check-preblock”// 在块的左大括号之前检查空格
    ],
    "directive-selector": [
      true,
      "attribute",
      [
        "nz"
      ],
      [
        "camelCase",
        "kebab-case"
      ]
    ],
    "component-selector": [
      true,
      [
        "element",
        "attribute"
      ],
      [
        "nz",
        "test"
      ],
      "kebab-case"
    ],
    "angular-whitespace": [
      false,
      "check-interpolation",
      "check-semicolon"
    ],
    "no-output-on-prefix": true,
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-host-property-decorator": false,
    "use-life-cycle-interface": true,
    "use-pipe-transform-interface": true,
    "component-class-suffix": true,
    "directive-class-suffix": true
  }
