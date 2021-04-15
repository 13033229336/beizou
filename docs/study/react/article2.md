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

在代码中调用setState 函数之后，React会将传入的参数对象与组件当前的状态合并，触发调和过程。 
react会以相对高效的方式根据新的状态构建React元素树，重新渲染整个UI界面，
在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异根据树的节点差异进行最小化渲染

## react 组件通信
1. 父子组件，父->子直接props,子-父回调函数
2. 跨级组件 层层组件传递props和context
```text
context是一个全局变量,像是一个大容器,在任何地方都可以访问到,我们可以把要通信的信息放在context上,然后在其他组件中可以随意取到;但是React官方不建议使用大量context,尽管他可以减少逐层传递,但是当组件结构复杂的时候,我们并不知道context是从哪里传过来的;而且context是一个全局变量,全局变量正是导致应用走向混乱的罪魁祸首.
```
3. redux全局状态管理
4. 非父子组件，用发布订阅模式的Event模块

## react hooks
钩子函数
1.useState:用来声明状态变量。接收两个参数，第一个为状态初始值，第二个为改变状态的方法函数。
2.useEffect:相当于componentDidMount、componentDidUpdate、componentWillUnmount的集合，可以用来消除副作用。
3.useContext:父子组件传值。
4.useReducer:可以实现类似于redux的功能。

## redux
react的状态管理
适用于多交互、多数据源的场景：
```text
  1.某个组件的状态，需要共享
  2.某个状态需要在任何地方都要拿到
  3.一个组件需要改变全局状态
  4.一个组件需要改变另一个组件的状态
```
三大原则:
  1. store:存储整个应用的state(组件还是可以维护自身的state)
  2. state是只读的，state的变化，会导致视图的变化。用户接触不到state,只能接触视图，唯一改变state的方法是在视图中触发action
  3. 使用reducers来执行state的更新。reducer十一个纯函数，接受action和当前的state作为参数，通过计算返回一个新的state,从而实现视图的更新

  工作流程是：

1. view 用 actionCreator 创建一个 action,里面可能包含一些数据
2. 使用 store 的 dispatch 方法将 acion 传入 store
3. store 将 action 与旧的 state 转发给 reducer
4. reducer 深拷贝 state,并返回一个新的 state 给 store
store 接收并更新 state
5. 使用 store.subscribe 订阅更新,重新 render 组件

## redux 和 mobx的区别
1. redux的编程范式是函数式的而mobx是面向对象的；
2. 

## state 和 props的区别
1. state是组件自己管理状态，可以调用setState改变
2. props是外部传入的数据参数，只能读取，不能改变

## 高阶组件
1. 高阶组件就是接收一个组件并返回一个新组件的函数
2. 是从react的组合特性中衍生出来的，是纯组件。因为可以接收任何动态提供的组件，但不会修改或复制输入组件的任何行为

场景：代码重写、引导和逻辑抽象，渲染劫持，state抽象和操作

## 受控组件和非受控组件
主要取决于组件是否受父级传入的props控制
1. 受控组件受react控制的组件，是调单数据真实的唯一来源
2. 非受控组件：由DOM处理表单数据，不受自身的state或者props控制，通常需要为其添加ref来访问它的地域DOM 

