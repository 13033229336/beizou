# React

## React 函数组件和类组件

函数组件

```
const beizou = (props)=>{
 const sayHi=()=>{
   alert(Hi ${props.name})
 }
  return(
     <h1>{props.name}</h1>
     <button onClick={sayHi}></button>
     
  )
}
```

类组件

```
class beizou extends React.Component{
   constructor(props)
   super(props)
   this.state={
     name:'beiozu',
     age:22
   }
   sayHi=()=>{
     this.setState({
        name:'hello',
        age:'23'
     })
   }
   render(){
      return(
         <h1>name:{this.state.name},age:{this.state.age}</h2>
         <button onClick={this.sayHi}>sayHi</button>
      )
   }
}
```

区别：

1.函数组件相对于类组件代码要少一些，更加简洁

2.函数组件是无状态组件，无法使用state和组件的生命周期函数

3.函数组件没有this,类组件中要绑定this

4函数组件的性能高于类组件

·	

## React 与 Vue 的比较

### 组件化

**什么是模块化**：从代码的角度进行分析的；把一切可复用的代码，抽离为单个模块；便于项目的维护和开发

**什么是组件化**： 是从UI的角度进行分析；把一些可复用的UI元素，抽离为单独的组件。

**组件化的好处**：随着项目规模的增大，手里的组件雨来越多；很方便就能把现有的组件，拼接为一个完整的页面。

Vue组件的创建





## React diff 算法

- 把树形结构按层级分级，比较同级元素。   就是Tree Diff

- 给列表结构的每个单元添加一个唯一的key属性，方便比较

- 每一层中，组件级别对比，称为  Component Diff

- 合并操作，调用component的setState方法的时候，React将其标记为dirty,到每一个事件循环结束，React所有标记的dirty的component重新绘制

- 选择性子树渲染。重写shouldComponentUpdate提高diff的性能

    

## 为什么虚拟dom会提高性能

虚拟dom 相当于在js和真实dom中间的缓存，利用dom算法避免没有必要的dom操作。



用JavaScript结构表示dom树结构，构建一个真正的dom树，当状态变更时候，重新构建一颗新的对象树。然后新旧树比较，将差异应用到真正的dom树中，更新视图。

