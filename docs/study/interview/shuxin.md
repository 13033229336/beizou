# 数新一面

1.数据类型

2.判断类型的方法

typeof    ,instanceof,   object.prototype.tostring.call()  constructor  Object.prototype.isPrototypeOf

3.typeof(null) 为什么为object

这是js存在很久的bug。在js的最初版本使用的是32为的系统，为了性能考虑使用低位存储变量的类型信息，000代表对象，而null 表示全为空，所以判断成object.

可以使用Object.prototype.toString.call(null)   ==> [object,null]

4.深浅拷贝的区别，实现深拷贝的方法

深浅拷贝的区别主要表现在对于引用类型的拷贝，浅拷贝只拷贝指向某个对象的指针快，新旧对象还是共享同一块内存地址，其中一个对象改变了这个内存地址会影响到另一个对象。而深拷贝是是完全拷贝，两个对象不会相互影响。

方法：JSON.parse(JSON.stringify),递归实现

5.es6 新增的

6.promise

7.async  await跟promise的区别与普通函数的区别

8.箭头函数

8.三次握手四次挥手

9.vue响应式原理

10.koa的洋葱模型

11.hooks解决了函数组件的什么问题

12.react-fiber

13函数组件和类组件的区别

14.学习中遇到最难的问题

