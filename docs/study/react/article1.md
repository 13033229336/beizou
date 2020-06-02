 # React 与 Vue 的生命周期

 ### React三大体系

- react.js 用于web开发和组件的编写

- Reactnative 用于移动端开发

- ReactVR 用于虚拟现实技术的开发

- ## 相同点

  React 和 Vue 有许多相似之处，它们都有：

  - 使用 Virtual DOM，有自己的diff渲染算法
  - 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
  - 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

## 性能比较

####  生命周期

Vue: 8个周期

1. **beforeCreate（初始化界面前）**
2. **created（初始化界面后）**
3. **beforeMount（渲染dom前）**
4. **mounted（渲染dom后）**
5. **beforeUpdate（更新数据前）**
6. **updated（更新数据后）**
7. **beforeDestroy（卸载组件前）**
8. **destroyed（卸载组件后）**





![vue](https://user-gold-cdn.xitu.io/2018/9/6/165ad6f55c319399?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**react  新版周期**

![](https://user-gold-cdn.xitu.io/2019/12/15/16f0a0b3e20fa9aa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

[Mounting阶段](https://jspang.com/detailed?id=46#toc371)

Mounting阶段叫挂载阶段，伴随着整个虚拟DOM的生成，它里边有三个小的生命周期函数，分别是：

1. `componentWillMount` : 在组件即将被挂载到页面的时刻执行。
2. `render` : 页面state或props发生变化时执行。
3. `componentDidMount` : 组件挂载完成时被执行

### updata阶段

`shouldComponentUpdate`函数会在组件更新之前，自动被执行。它要求返回一个布尔类型的结果，必须有返回值

```
1-shouldComponentUpdate---组件发生改变前执行
2-componentWillUpdate---组件更新前，shouldComponentUpdate函数之后执行
3-render----开始挂载渲染
4-componentDidUpdate----组件更新之后执行
```

[componentWillReceiveProps 函数]

凡是组件都有生命周期函数，所以子组件也是有的，并且子组件接收了`props`，这时候函数就可以被执行了。

```javascript
componentWillReceiveProps(){
        console.log('child - componentWillReceiveProps')
    }
```

[componentWillUnmount函数](https://jspang.com/detailed?id=46#toc378)

这个函数时组件从页面中删除的时候执行，

```javascript
//当组件从页面中删除的时候执行
componentWillUnmount(){
    console.log('child - componentWillUnmount')
}
```