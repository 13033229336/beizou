#  JS中this的指向

### 1.默认绑定

```js
function foo() {
    console.log(a);
}
var a = 2;
foo(); // 2
```

在这里**this指向全局作用域**，因为函数调用的位置是在全局作用域中，像foo()这种直接使用不带任何修饰的函数引用进行调用时，只能使用默认绑定，这也是我们最常见的独立函数调用。

### 2. 隐式绑定

隐式绑定是当调用位置周围含有上下文对象时需要考虑的，

```js
function foo() {
    console.log(this.a);
}
var obj = {
    a:2,
    foo: foo
}
obj.foo(); // 2
```

当函数调用位置周围有上下文对象时，隐式绑定会把函数中的this绑定到这个上下文对象。换句话说，在这里，我们在obj对象中调用了foo()函数，调用位置正好处于obj对象中，因此隐式绑定把函数中的this绑定到了obj对象上，因此这里输出的是obj对象中的属性a。

一连串的函数调用会有函数调用栈，那么函数包含在一连串对象中是什么呢？答案是：**对象属性链**。

```js
function foo() {
    console.log(this.a);
};
var obj2 = {
    a: 1,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 1 即this指向了obj2

```

在这里我们可以看到有多个对象，如果我们理解了函数调用栈的话，举一反三，栈中最后一个元素就是我们的调用位置，因此这里函数最后是在obj1上调用的，this应该被绑定在obj1上，输出应该是2，可为什么这里是1呢？

因为对象属性链中只有第一层在调用位置中起作用，换句话说，函数调用位置只在第一层对象中绑定。我们再来看，foo()最开始是在obj2被调用的，因此this被绑定在了obj2上，接着obj2中的foo属性又在obj1中调用了，但是此时我们已经不再去考虑后面this的绑定了，因为this的绑定已经终结在了第一层。

#### 隐式丢失

**一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把this绑定的全局对象或undefined上。**

```js
function foo() {
    console.log(this.a);
};
var obj = {
    a: 1,
    foo: foo
};
var bar = obj.foo; //传递了函数，隐式绑定丢失了  

var a = 'hello';

bar(); // 'hello' 

```

首先在这里我们创建了一个bar全局变量，并且把obj中的foo属性传递给了它，由于foo属性对应一个函数，因此 var bar = obj.foo 相当于把foo(...)这个函数传给了bar，当我们再调用bar时，其实是一个不带任何修饰的函数调用，因此应用了默认绑定，这时隐式绑定就丢失了。如果我们就想this就绑定到obj上怎么办？下面介绍显示绑定。

### 显示绑定

显示绑定很好理解，我们希望this绑定在哪个对象上我们就用方法绑定它，具体有三种方法可以达到这个效果，需要注意的是一旦我们 显示绑定 之后我们便无法再绑定了。

- `call(..)`
- `apply(..)`
- `bind(..)`

![](https://user-gold-cdn.xitu.io/2020/5/24/17245962b6fabdba?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这里运行的结果我们可想而知是2，`call(..)`、`apply(..)`和`bind(...)`绑定方法都是一样的，第一个参数是一个对象，后面都是传参数，只是两者传参数的方式不一样

### New绑定

使用new来调用函数，第一步是创建了一个全新的对象，第二步是这个新对象会绑定到函数调用的this

```js
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2    即this指向了bar
```

首先，创建了一个新的对象bar，当使用new来调用`foo(..)`函数时，我们会把bar对象中的this绑定在`foo(...)`函数中，因此这里bar对象中的a指向`foo(..)`函数中的a，所以输出是2。



### 绑定优先级

**隐式绑定 VS 显示绑定**

```js
function foo() {
    console.log(this.a);
}
var obj1 = {
    a: 2,
    foo: foo
}
var obj2 = {
    a: 3,
    foo: foo
}
obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3 显示绑定
obj2.foo.call(obj1); // 2 显示绑定
```

**显示绑定的优先级要高于隐式绑定**，因为在隐式绑定之后我仍可以用显式绑定。

**new绑定 VS 显示绑定**

```js
function foo(something) {
    this.a = something;
}
var obj1 = {};
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);    // 2
    
var baz = new bar(3);  
console.log(obj1.a); // 2 ??
console.log(baz.a); // 3

```

从上面这个例子我们可以看出n**ew绑定的优先级要高于显式绑定**，因为在显式绑定之后我仍可以用new绑定。

### 箭头函数的中this的指向

箭头函数没有 this，也不能绑定 this。箭头函数的 this 会指向当前最近的非箭头函数的 this，找不到就是 window(严格模式下是 undefined)
也就是说箭头函数本身不拥有 this 这样一个东西，它的作用域是由作用域查找来决定的，父级的 this