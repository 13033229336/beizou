# JS 之继承

## ES5 中的继承

### 1.构造函数继承/call方式继承

把父类构造函数的this指向为子类实例化对象应用，从而导致父类执行的时候父类的属性会挂载到子类的实例

```js
function Parent1() {
    this.name = 'parent1';
}
Parent1.prototype.say=function(){
    console.log('say')
}
function Child1() {
    Parent1.call(this);
    this.type = 'child1'
}
let child=new Child1();
console.log(child.say())   //child.say is not a function
console.log(child.name)   //parent1
```

缺点：

1.无法继承父类的中的方法和父类原型上的属性和方法

2.实例并不是父类的实例，只是子类的实例



## 2.原型链式继承（借用原型链实现继承）

```js
function Parent(name) { 
    this.name = name;
}
Parent.prototype.sayName = function() {
    console.log('parent name:', this.name);
}
function Child(name) {
    this.name = name;
}

Child.prototype = new Parent('father');


Child.prototype.sayName1 = function() {
    console.log('child name:', this.name);
}

var child = new Child('son');
child.sayName1();    // child name: son
child.sayName()    // parent name : son
```

优点：继承了父类的模板，又继承了父类的原型对象

缺点：1.构建的Child 对象会共享原型链，修改原型上的数据会到导致子类的属性跟着改变，实例化对象无法实现隔离

  2.在创建Child实例的时候，不能向Parent 传参



## 组合式继承

借助构造函数和原型链的两种方式

- 原型链继承保证子类能继承到**父类原型上的属性和方法
- 构造函数继承保证继承到父类的实例属性和方法

```js
function Parent3() {
  this.name = 'parent3';
  this.arr = [1, 2, 3];
}
function Child3() {
  Parent3.call(this);
  this.type = 'child3';
}
Child3.prototype = new Parent3();
```

优点：实现了实例化对象的隔离

缺点：1.多执行了父类的构造函数，父类的构造函数执行了两次

​     第一次：Child3.prototype = new Parent3();

​     第二次：使用new 实例化对象的时候



## 寄生组合式继承

```js
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function() {
    console.log('parent name:', this.name);
}

function Child(name, parentName) {
    Parent.call(this, parentName);  
    this.name = name;    
}

function inheritPrototype(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype);   //修改
    Child.prototype.constructor = Child;
}

inheritPrototype(Parent, Child);

Child.prototype.sayName = function() {
    console.log('child name:', this.name);
}

var parent = new Parent('father');
parent.sayName();      // parent name: father

var child = new Child('son', 'father');
child.sayName();       // child name: son
```



不需要在一次实例中调用两次父类的构造函数。



## ES6继承

子类extends父类   super()

```js
class Parent {
    constructor(name) {
	this.name = name;
    }
    doSomething() {
	console.log('parent do something!');
    }
    sayName() {
	console.log('parent name:', this.name);
    }
}

class Child extends Parent {
    constructor(name, parentName) {
	super(parentName);
	this.name = name;
    }
    sayName() {
 	console.log('child name:', this.name);
    }
}

const child = new Child('son', 'father');
child.sayName();            // child name: son
child.doSomething();        // parent do something!

const parent = new Parent('father');
parent.sayName();           // parent name: father
```

