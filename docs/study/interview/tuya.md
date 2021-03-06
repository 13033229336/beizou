# 涂鸦智能凉经

## 闭包

定义：有权访问另一个函数作用域中变量的函数

用处：1.读取函数内部的变量。

​             2.这些变量始终保存在内存中，不会在外层函数调用后被自动清除

优点：

1.    变量长期驻扎在内存中
2. 避免了全局变量的污染。
3. 私有成员的存在

特性：

1.  函数套函数
2. 内部函数可以直接使用外部函数对的雨布变量或参数。
3. 变量或参数不会被垃圾回收机制回收

缺点：

常驻内存 会增大内存的使用量，容易造成内存泄漏

1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用，会造成网页性能问题，在IE中可能会导致内存泄漏。解决方法，在退出含少数之前，将不使用的局部变量全部删除。

## computed 和 watch

### computed

计算属性：依赖其他属性，有缓存，只有依赖属性发生改变，下一次获取computed的值才会重新计算

场景：当我们需要进行数据计算，并且依赖于其他数据时，有缓存，避免每次获取值都要重复计算

### Watch

侦听器：起到观察作用，当监听的数据变化时都会执行回调进行后续操作，无缓存性

场景：数据变化时执行异步或开销较大的操作时，使用watch可以允许我们执行异步操作。



## Proxy

- Proxy可以直接监听对象而非属性
- Proxy可以直接劫持整个对象，
- Proxy返回一个新对象，我们可以只操作新的对象达到目的；Object.definedProperty只能遍历对象属性进行修改
- Proxy具有更多的拦截方法，如apply,ownKeys,has等
- 存在兼容性问题



## BFC
块级格式上下文，里面的元素和外部的元素不会相互影响
作用：清除浮动，避免垂直外边距的重叠，实现自适应布局（如：两栏布局）

形成条件
1. 浮动元素float除none以外的值
2. position:absolute,fixed
3. display:inline-blocks,table-cells,
4. overflow除了visible以外（hidden,auto,scroll
）

## 清除浮动

1. 在浮动标签后新增一个标签设为 clear:both
2. 父级元素添加overflow：hidden
3. 使用伪元素清除浮动
```css
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
```
4. 父级元素设置高度
## 模块化
require/module.exports: commonJS
export/import: 只有es6支持 
exprots/module.exports 只有node支持导出

node的遵循commonJS

import是异步加载，编译时加载，必须
放在开头，不会将整个模块运行后赋值给某个变量
require是同步加载，运行时加载模块



