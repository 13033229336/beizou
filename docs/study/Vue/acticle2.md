 # React 与 Vue 

 ### React三大体系

- react.js 用于web开发和组件的编写

- Reactnative 用于移动端开发

- ReactVR 用于虚拟现实技术的开发

- ## 相同点

  React 和 Vue 有许多相似之处，它们都有：

  - 使用 Virtual DOM，有自己的diff渲染算法
  - 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
  - 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

## react和vue diff算法的异同

### 相同

都是同层节点进行比较；复杂度都是O(n);

### 不同点

1. vue比对节点，当节点元素类型相同，但是className不同，任务是不同类型元素，会删除重建，而react会认为是同类型节点，修改节点属性
2. Vue 的采用的是双向遍历方法，就是从两端到中间的对比方法；而react是从左到右依次对比的方式，总体上，vue的对比方式更高效

## redux和vuex设计思想

### redux

1.Redux是一个纯粹的状态管理系统，React利用react-redux将它和react框架结合起来

2.只有一个createStore方法创建一个store

3.action接收视图发出的通知，告诉Store State要改变，有一个type属性；

4.reducer：纯函数来处理事件，纯函数指一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，得到一个全新的state

### vuex

1.vuex吸收了redux的经验，放弃了一些特性，并做了一些优化，但是只能与vue配合

2.store:通过new Vuex.store创建store，辅助函数mapState

3.getters；获取state,辅助函数mapGetters;

4.action:异步改变state,像ajax,辅助函数mapActions;

5.mutation:同步改变state,辅助函数mapMutations

6.module:可以将单一的store拆分为多个store

#### 对比

```text
1.Redux:view-->actions-->reducer-->state变化-->view变化（同步异步一样）
2.Vuex:view-->commit-->mutations-->state变化-->view变化（同步）
        view-->dispatch-->actions-->mutations-->state变化-->view变化（异步）
```



## Vue的nextTick原理

使用场景：

nextTick主要是为了解决单一事件更新数据后立即操作dom的场景

原理：

1.vue用异步队列的方式来控制DOM更新和nextTick回调先后执行；

2.microtask因为高优先级的特性，能确保队列中的微任务在一次事件循环前被执行完毕

3.考虑兼容问题，vue做了microtack向macrotack的降级方案

```js
const simpleNextTick = function queueNextTick (cb) {   
    return Promise.resolve().then(() => {
      cb()
    })
}

simpleNextTick(() => {
  console.log(this.$refs.test.innerText)
})
```

