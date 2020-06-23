# 凉经

## React 父子组件通信

**1.父组件向子组件传参：**

父子间通过属性的方式传递参数，

子组件通过this.props.（值或方法）来接收父组件传递

父组件中：

```
constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                name: 'yjj',
                age: 18
            }
        }
    }
    render() {
        return (
            <div className="App">
            //将父组件中的userInfo传递给子组件
                <Person info={this.state.userInfo}></Person>
                <div onClick={()=> console.log(this.state.userInfo)}>点我打印userinfo对象</div>
            </div>
        );
    }

```

子组件中

```
　render() {
        this.props.info.age = 25
        return (
            <div>
               
                <div>姓名：{this.props.info.name}</div>
                <div>年龄：{this.props.info.age}</div>
            </div>
        )
    }
```

父组件中定义了一个userInfo对象，并且将该对象的值作为info属性传入到子组件。子组件中对this.props.info对象的age属性重新赋值，由于子组件的this.props.info对象指向的指针和父组件中的userInfo对象的指针是一样的。所以父组件中的userInfo对象的age属性实际上也是改变了的，等于25。但是在react中state的值需要使用setState()方法修改，所以不会重新渲染对应的组件。

**2.子组件向父组件传值**

实际上就是通过父组件给子组件传递的属性值为函数，子组件在相应的情况下调用该函数。this.props.父组件的方法

父组件

```
　constructor(props) {
        super(props)
        this.state = {
            age: 18
        }
    }
    changeAge = () => {
        this.setState({
            age: 20
        })
    }
    render() {
        return (
            <div className="App">
                 //把changeAge方法传递给子组件
                <Person changeAgeEvent={this.changeAge}></Person>
                <div>当前年龄：{this.state.age}</div>
            </div>
        );
    }

```

子组件

```
   render() {return (
            <div>
                <div onClick={() => {this.props.changeAgeEvent()}}>点我改变年龄的值</div>
            </div>
        )
    }
```

父组件的changeAgeEvent的值为this.changeAge函数，在子组件中使用this.props.changeEvent（）调用父组件的函数。

 



## vue阻止事件冒泡

1. click.stop()
2. 事件对象 $event         @click="on($event)

## 画圆

border-radius



数组删除首位元素  Array.shift(),添加 Array.unshift()



## 深拷贝

深拷贝就是完全拷贝，值跟内存地址都拷贝

实现方案：**1.JSON.stringify/parse**

```js
let arr = [1, 2, 3];
let newArr = JSON.parse(JSON.stringify(arr));
console.log(arr === newArr); // false
```

缺点：

1.无法解决循环引用的问题

```js
const a = {val: 2};
a.target = a;
```

拷贝a会出现系统栈溢出，出现无限递归的情况

2.无法拷贝一些特殊的对象，例如：正则，Date,Set、Map

3.无法拷贝函数



递归实现深拷贝

```js
const deepClone=(obj)=>{
    if (typeof obj !== 'object') return obj;
    const cloneObj=Array.isArray ? []:{}  //判断赋值目标是数组还是对象
    for(let key in obj){
        if(obj.haxOwnProperty(key)){
            cloneObj= typeof obj[key] ==='object' ? deepClone(obj[key]) : obj[key]
        }
    }
}
```







## 去除数组中的不同类型的元素，(null, underfind)

创建一个空数组，遍历数组，typeof  元素=='number' ，是就push到空数组



## koa2-cors 请求跨域怎么设置的

安装koa2-cors，引入，use，在user.js 中把get请求变成post请求

在use里面配置异步配置



## HTTP常见状态码

100： 

200：成功

204 ：No Content 请求成功但没有资源可返回

206:  Partial Content  请求 部分内容

301： 永久性重定向、

302：临时重定向

304：服务端已经执行了GET，但文件未变化。

400：错误请求

401：缺少认证信息

403：禁止访问

404：请求失败或未找到

500：服务器异常

503：服务器繁忙



## 伪元素和伪类

![](https://pic2.zhimg.com/80/v2-a85036113478c3bc36062f76ef8e66bd_720w.jpg)

![](https://pic4.zhimg.com/80/v2-e44eab840072dc00011854928fb0bcaf_720w.jpg)



## html5 新特性

语义化标签：nav , header,footer,aside,section,

表单元素：required , placeholder,min,max,height,width

视频和音频：audio,video

Canvas图形



## 箭头函数

1.没有this，需要通过查找作用域链来确定this

2.没有argument对象

3.不能通过new关键词调用

4.没有原型

```js
var Bar=()=>{}
console.log(Bar.prototype);      //undefined
```

5.没有super



## CSS3 新特性

1.边框   

border-radius圆角     box-shadow





### forEach 和 map的区别

都能遍历数组，实现

都有三个参数 （currentVaule,index,arr）

forEach 没有返回值 如果进行数值操作会改变原数组 没有办法跳出或终止forEach循环

map 返回一个数组  进行数组操作不会改变原数组 



## em 和 rem

em和rem都是相对长度单位，不同的是em是相对于腹父级元素的字体尺寸，rem相对于HTML的根元素

em的值并不是固定的，会继承父级元素的字体大小

```
<html>
    <div>
        <p> 你猜我字体是多大？</p>
    </div>
</html>
/******css样式*********/
html{
    font-size:62.5% // font-size:10px 1em:10px
}
div{
    font-size:1.2em //font-size: 10 *1.2 =12px
}
p{
    font-size:1.2em //font-size= 12*1.2=14.4px
}
 
```

使用rem单位，html的字体默认字体大小必须设置为12px或以上。若小于12px则浏览器换算时自动默认字体为12px。



## CDN 内容分发网络

CDN的基本原理是广泛采用各种[缓存服务器](https://baike.sogou.com/lemma/ShowInnerLink.htm?lemmaId=8230101&ss_c=ssc.citiao.link)，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

## 请求放式

1. GET。请求指定的页面信息，返回实体主体。

2. POST。向指定资源提交数据进行处理请求，如表单提交或文件上传

3. PUT。从客户端向服务器传达的数据取代指定的文档内容

4. DELETE。请求服务器删除指定页面

    200-删除成功

   202-删除成功，但没有立即执行

   204--删除请求已经被执行，但是没有返回资源

5. OPTIONS。允许客户端查看服务器的性能。

6. HEAD。类似于GET，只是用于获取报头

7. CONNECT。HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器

8. TRACT 。回显服务器收到的请求，用于测试或诊断