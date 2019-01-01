---
title: 数据驱动
date: 2018-09-04
tags: vue源码分析
categories: vue
---

# 数据驱动
 * Vue.js 一个核心思想是数据驱动。所谓数据驱动，是指视图是由数据驱动生成的，我们对视图的修改，不会直接操作DOM，而是通过修改数据。它相比我们传统的前端开发，如使用jQuery 等前端库直接修改DOM，大大简化了代码量。特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑变的非常清晰，因为DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，而不用碰触DOM，这样的代码非常利于维护。
 
 # Virtual DOM(虚拟DOM)
 
 * 虚拟DOM产生的前提是浏览器中的DOM都是很'昂贵'的，每一个DOM元素中的属性都非常多，所以操作起来会非常的耗时。
 而Virtual DOM只是也能改原生的js对象去描述一个DOM节点，所以他比创建一个原生DOM的代价要小很多，Virtual DOM是
 VNNode  Class去描述的
 ```
export default class VNode {
    tag: string | void;
    data: VNodeData | void;
    children: ?Array<VNode>;
    text: string | void;
    elm: Node | void;
    ns: string | void;
    context: Component | void; // rendered in this component's scope
    key: string | number | void;
    componentOptions: VNodeComponentOptions | void;
    componentInstance: Component | void; // component instance
    parent: VNode | void; // component placeholder node
    // strictly internal
    raw: boolean; // contains raw HTML? (server only)
    isStatic: boolean; // hoisted static node
    isRootInsert: boolean; // necessary for enter transition check
    isComment: boolean; // empty comment placeholder?
    
    isCloned: boolean; // is a cloned node?i
    sOnce: boolean; // is a v-once node?
    asyncFactory: Function | void; // async component factory function
    asyncMeta: Object | void;
    isAsyncPlaceholder: boolean;
    ssrContext: Object | void;
    fnContext: Component | void; // real context vm for functional nodesfnOptions: ?ComponentOptions; // for SSR cachingfnScopeId: ?string; // functional scope id supportconstructor (tag?: string,data?: VNodeData,children?: ?Array<VNode>,text?: string,elm?: Node,context?: Component,componentOptions?: VNodeComponentOptions,asyncFactory?: Function) {this.tag = tagthis.data = datathis.children = childrenthis.text = textthis.elm = elmthis.ns = undefinedthis.context = contextthis.fnContext = undefined


 ```