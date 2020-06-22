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