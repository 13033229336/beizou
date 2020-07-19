# React知识点

## 什么是React

React是一个简单的JavaScript UI库，用于构建高效、快速的用户面。遵循组件化设计模式、声明式编程范式和函数式编程概念，使用虚拟DOM操作DOM，遵循从高阶组件到低阶组件的单向数据流。

## React生命周期

![](https://gitee.com/gitee_fanjunyang/JueJin/raw/master/images/React%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F_4.png)

1.初始化阶段

constructor()

2.挂载阶段

1.getDerivedStateFromProps(nextProps,prevState):每次渲染前都会调用,

2.render:渲染dom

3.componentDidMount: 相当于Vue中的mounted,多用于操作真实dom，发起AJAX请求

3.运行阶段

1. 1.getDerivedStateFromProps(nextProps,prevState):每次渲染前都会调用,
2. shouldComponentUpdate(nextProps,nextState):当属性或状态发生改变后控制组件是否要更新，true就更新，否则不更新，默认为true
3. render : 渲染dom
4. getSnapshotBeforeUpdate
5. componentDidUpdate: 相当于Vue中的updated

4.销毁阶段

componentWillUnmount:相当于Vue中的beforeDestroy



## React 中的keys作用是什么？

Keys 是React用于追踪那些列表中元素被修改、被添加或者被移除的辅助标识。具有唯一性。不能是index

在React Diff算法中借助元素的key值来判断该元素是新建还是被移动而来的元素，从而减少不必要的渲染。

## 调用setState 之后发生了什么

在代码中调用setState 函数之后，React会将传入的参数对象与组件当前的状态合并，触发调和过程。 react会以相对高效的方式根据新的状态构建React元素树，重新渲染整个UI界面，根据树的节点差异进行最小化渲染

## react 组件通信
1. 父子组件，父->子直接props,子-父回调函数
2. 跨级组件 层层组件传递props和context
```text
context是一个全局变量,像是一个大容器,在任何地方都可以访问到,我们可以把要通信的信息放在context上,然后在其他组件中可以随意取到;但是React官方不建议使用大量context,尽管他可以减少逐层传递,但是当组件结构复杂的时候,我们并不知道context是从哪里传过来的;而且context是一个全局变量,全局变量正是导致应用走向混乱的罪魁祸首.
```
3. redux全局状态管理
4. 非父子组件，用发布订阅模式的Event模块

