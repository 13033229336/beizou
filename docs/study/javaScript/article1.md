# JavaScript 之数据类型

### 基本类型

基本类型分为以下六种：

- string（字符串）
- boolean（布尔值）
- number（数字）
- symbol（符号）
- null（空值）
- undefined（未定义）
- bigint

**注意**：

1. string 、`number` 、`boolean` 和 `null`  `undefined` 这五种类型统称为**原始类型**（Primitive），表示不能再细分下去的基本类型;
2. `symbol`是ES6中新增的数据类型，`symbol` 表示独一无二的值，通过 `Symbol` 函数调用生成，由于生成的 symbol 值为原始类型，所以 `Symbol` 函数不能使用`new` 调用；
3. `null` 和 `undefined` 通常被认为是特殊值，这两种类型的值唯一，就是其本身。

**数字类型**

根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值（-(263 -1) 到 263 -1）。它并没有为整数给出一种特定的类型。除了能够表示浮点数外，还有一些带符号的值：+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。

`Number`运算符转换规则：

- `null` 转换为 0
- `undefined` 转换为 `NaN`
- `true` 转换为 1，`false` 转换为 0
- 字符串转换时遵循数字常量规则，转换失败返回`NaN`


```js
Number(null) // => 0                           parseInt(null) // => NaN
Number(undefined) // => NaN         parseInt(undefined) // => NaN
Number('') // => 0                                 parseInt('') // => NaN
Number('123') // => 123                    parseInt('123') // => 123
Number('123abc') // => NaN            parseInt('123abc') // => 123
```

#### 0.1+0.2 为什么不等于 0.3？
0.1 和 0.2 在转换成二进制后会无限循环，由于标准位数的限制，后面多余的位数会被截掉，此时就已经出现可精度的损失，相加后因为浮点数小数位的限制而截断的二进制数字再次转换为十进制就会变成 0.300000000000004...
参考资料：冴羽大神掘金文章👉https://juejin.im/post/5e6ee1b5f265da5710439f21

### String

`String` 运算符转换规则

- `null` 转换为 `'null'`
- `undefined` 转换为 `undefined`
- `true` 转换为 `'true'`，`false` 转换为 `'false'`
- 数字转换遵循通用规则，极大极小的数字使用指数形式


```js
`String(null)         // 'null'

String(undefined)      // 'undefined'

String(true)         // 'true'

String(1)          // '1'

String(-1)          // '-1'

String(0)          // '0'

String(-0)          // '0'

String(Math.pow(1000,10))  // '1e+30'

String(Infinity)       // 'Infinity'

String(-Infinity)      // '-Infinity'

String({})          // '[object Object]'

String([1,[2,3]])      // '1,2,3'

String(['koala',1])     //koala,1`
```


### Boolean

`ToBoolean` 运算符转换规则

除了下述 6 个值转换结果为 `false`，其他全部为`true`：

1. undefined
2. null
3. -0
4. 0或+0
5. NaN
6. ''（空字符串）


```js
Boolean(undefined) // false

Boolean(null) // false

Boolean(0) // false

Boolean(NaN) // false

Boolean('') // false



Boolean({}) // true

Boolean([]) // true

Boolean(new Boolean(false)) // true
```


**Null 类型**

Null 类型只有一个值： null。
```js
null === null; // true
typeof null; // object 为什么不是 null呢？
```
解释：typeof null 会输出 object，但 null 本身不是一个对象，这是 JS 存在的一个历史悠久的 bug。在 JS 的最初版本中使用的是 32 位的系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表的是对象，而 null 表示为全空，所以将它错误地判断成了 object
**解决：**可以使用 Object.prototype.toString.call(null) -> 输出 [object Null]

**Undefined 类型**

一个没有被赋值的变量会有个默认值 undefined。
```js
let a; // 我申明我是一个变量 a
typeof a; // undefined 申明未赋值
undefined == undefined; // true
undefined == 0; // false
undefined == null; // true
undefined == ''; // false
```


**符号类型**

符号(Symbols)是ECMAScript 第6版新定义的。符号类型是唯一的并且是不可修改的, 并且也可以用来作为Object的key的值。
```js
let obj = {};
let symbol1 = Symbol();
let symbol2 = Symbol();

typeof symbol1; // symbol
typeof symbol2; // symbol

symbol1 == symbol2; // false

obj.symbol1 = 'hello';
obj[symbol1] = 'world';

console.log(obj.symbol1 + ' ' + obj[symbol1]); // hello world
```
### 对象类型

**object**  对象类型也叫引用类型，对象 Object(包括普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function)。对象在逻辑上是属性的无序集合，是存放各种值的容器。对象值存储的是引用地址，所以和基本类型值不可变的特性不同，对象值是可变的。
```js
let obj1 = {}; // 对象字面量
let obj2 = new Object(); // 实例化一个对象

typeof obj1; // object
typeof obj2; // object

const person = { author: {name: "布一", "wechat": "Hankewins"}, 1: "No.1" };

console.log(person.author.name); // 布一
console.log(person.author.wechat); // Hankewins
console.log(person[1]); // No.1
```


### 类型对比

我们都知道JavaScript中有两大数据类型：`基本类型`和`引用类型`，其中`基本类型`主要是把值存储在`栈内存`中，而`引用类型`却是把地址存储在`栈内存`中，把值存储在`堆内存`中，然后将`栈内存`中存储的地址指向`堆内存`中存储的值。



# js中的强制转换规则

### `ToPrimitive`(转换为原始值)

`ToPrimitive`对原始类型不发生转换处理，只**针对引用类型（object）的**，其目的是将引用类型（object）转换为非对象类型，也就是原始类型。



# js转换规则不同场景应用

### 什么时候自动转换为string类型

**在没有对象的前提下**

字符串的自动转换，主要发生在字符串的**加法运算**时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。

'2' + 1 // '21'

'2' + true // "2true"

'2' + false // "2false"

'2' + undefined // "2undefined"

'2' + null // "2null"

**当有对象且与对象`+`时候**

//toString的对象

var obj2 = {

  toString:function(){

​    return 'a'

  }

}

console.log('2'+obj2)

//输出结果2a



//常规对象

var obj1 = {

  a:1,

  b:2

}

console.log('2'+obj1)；

//输出结果 2[object Object]



//几种特殊对象

'2' + {} // "2[object Object]"

'2' + [] // "2"

'2' + function (){} // "2function (){}"

'2' + ['koala',1] // 2koala,1

对下面`'2'+obj2`详细举例说明如下：

1. 左边为`string`，`ToPrimitive`原始值转换后不发生变化
2. 右边转化时同样按照`ToPrimitive`进行原始值转换，由于指定的type是`number`，进行`ToPrimitive`转化调用`obj2.valueof()`,得到的不是原始值，进行第三步
3. 调用`toString()` `return 'a'`
4. 符号两边存在`string`，而且是`+`号运算符则都采用`String`规则转换为`string`类型进行拼接
5. 输出结果`2a`

对下面`'2'+obj1`详细举例说明如下：

1. 左边为`string`，`ToPrimitive`转换为原始值后不发生变化
2. 右边转化时同样按照`ToPrimitive`进行原始值转换，由于指定的type是`number`，进行`ToPrimitive`转化调用`obj2.valueof()`,得到`{ a: 1, b: 2 }`
3. 调用`toString()` `return [object Object]`
4. 符号两边存在`string`，而且是+号运算符则都采用`String`规则转换为`string`类型进行拼接
5. 输出结果`2[object Object]`

### 什么时候自动转换为Number类型

**有加法运算符，但是无`String`类型的时候，都会优先转换为`Number`类型**

true + 0           // 1 

true + true     // 2

 true + false   //1

**除了加法运算符，其他运算符都会把运算自动转成数值**

'5' - '2' // 3

'5' * '2' // 10

true - 1 // 0

false - 1 // -1

'1' - 1  // 0

'5' * []  // 0

false / '5' // 0

'abc' - 1  // NaN

null + 1 // 1

undefined + 1 // NaN



//一元运算符（注意点）

+'abc' // NaN

-'abc' // NaN

+true // 1

-false // 0

### 什么时候进行布尔转换

- 布尔比较时
- `if(obj)` , `while(obj)`等判断时或者 三元运算符只能够包含布尔值

条件部分的每个值都相当于`false`，使用否定运算符后，就变成了`true`

if ( !undefined

  && !null

  && !0

  && !NaN

  && !''

 ) {

  console.log('true');

 } // true

 

 //下面两种情况也会转成布尔类型

 expression ? true : false

 !! expression

# js中的数据类型判断

三种方式，分别为 `typeof`、`instanceof` 和`Object.prototype.toString()`

### typeof

通过 `typeof`操作符来判断一个值属于哪种基本类型

 typeof 'seymoe'  // 'string'

typeof true    // 'boolean'

typeof 10     // 'number'

typeof Symbol()  // 'symbol'

typeof null    // 'object' 无法判定是否为 null

typeof undefined  // 'undefined'



typeof {}      // 'object'

typeof []      // 'object'

typeof(() => {})  // 'function

上面代码的输出结果可以看出，

1. `null` 的判定有误差，得到的结果 如果使用 `typeof`，`null`得到的结果是`object`
2. 操作符对对象类型及其子类型，例如函数（可调用对象）、数组（有序索引对象）等进行判定，则除了函数都会得到 `object` 的结果。

综上可以看出`typeOf`对于判断类型还有一些不足，在对象的子类型和`null`情况下。

### instanceof

通过 `instanceof` 操作符也可以对对象类型进行判定，其原理就是测试构造函数的`prototype` 是否出现在被检测对象的原型链上。

[] **instanceof** Array            // true

 ({}) **instanceof** Object         // true

 (()=>{}) **instanceof** Function   // true

`instanceof` 也不是万能的。 举个例子：

let arr = []

let obj = {}

arr instanceof Array  // true

arr instanceof Object  // true

obj instanceof Object  // true

在这个例子中，`arr` 数组相当于 `new Array()` 出的一个实例，所以 `arr.__proto__ === Array.prototype`，又因为 `Array`属于 `Object` 子类型，即`Array.prototype.__proto__ === Object.prototype`，因此 `Object` 构造函数在 `arr` 的原型链上。所以 `instanceof` 仍然无法优雅的判断一个值到底属于数组还是普通对象。

还有一点需要说明下，有些开发者会说 `Object.prototype.__proto__ === null`，岂不是说 `arr instanceof null` 也应该为 `true`，这个语句其实会报错提示右侧参数应该为对象，这也印证 `typeof null` 的结果为 `object` 真的只是`javascript`中的一个`bug` 。

`Object.prototype.toString()` 可以说是判定 `JavaScript` 中数据类型的终极解决方法了，具体用法请看以下代码：

Object.prototype.toString.call({})       // '[object Object]'

Object.prototype.toString.call([])       // '[object Array]'

Object.prototype.toString.call(() => {})    // '[object Function]'

Object.prototype.toString.call('seymoe')    // '[object String]'

Object.prototype.toString.call(1)        // '[object Number]'

Object.prototype.toString.call(true)      // '[object Boolean]'

Object.prototype.toString.call(Symbol())    // '[object Symbol]'

Object.prototype.toString.call(null)      // '[object Null]'

Object.prototype.toString.call(undefined)    // '[object Undefined]'



Object.prototype.toString.call(new Date())   // '[object Date]'

Object.prototype.toString.call(Math)      // '[object Math]'

Object.prototype.toString.call(new Set())    // '[object Set]'

Object.prototype.toString.call(new WeakSet())  // '[object WeakSet]'

Object.prototype.toString.call(new Map())    // '[object Map]'

Object.prototype.toString.call(new WeakMap())  // '[object WeakMap]'