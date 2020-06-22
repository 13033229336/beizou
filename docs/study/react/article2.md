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