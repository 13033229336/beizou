# Javascript 异步

### JS 中的异步编程方法

ES6 以前 ：

- 回调函数
- 事件监听(发布/订阅模式)
- Promise对象

ES6：

- Generator函数

ES7:

- async 和 await

#### 1.回调函数

回调函数在Javascript中非常常见，一般是需要在一个耗时操作之后执行某个操作时可以使用回调函数。

example 1:

```
 //一个定时器
 2 function timer(time, callback){
 3     setTimeout(function(){
 4         callback();
 5     }, time);
 6 }
 7 
 8 timer(3000, function(){
 9     console.log(123);
10 })
```

example 2:

```
//读文件后输出文件内容
2 var fs = require('fs');
3 
4 fs.readFile('./text1.txt', 'utf8', function(err, data){
5     if (err){
6         throw err;
7     }
8     console.log(data);
9 });
```

example 3:

```
//嵌套回调，读一个文件后输出，再读另一个文件，注意文件是有序被输出的，先text1.txt后text2.txt
2 var fs = require('fs');
3 
4 fs.readFile('./text1.txt', 'utf8', function(err, data){
5     console.log("text1 file content: " + data);
6     fs.readFile('./text2.txt', 'utf8', function(err, data){
7         console.log("text2 file content: " + data);
8     });
9 });
```

example 4:

```
 //callback hell
 2 
 3 doSomethingAsync1(function(){
 4     doSomethingAsync2(function(){
 5         doSomethingAsync3(function(){
 6             doSomethingAsync4(function(){
 7                 doSomethingAsync5(function(){
 8                     // code...
 9                 });
10             });
11         });
12     });
13 });
```

​        通过观察以上4个例子，可以发现一个问题，在回调函数嵌套层数不深的情况下，代码还算容易理解和维护，一旦嵌套层数加深，就会出现“回调金字塔”的问题，就像example 4那样，如果这里面的每个回调函数中又包含了很多业务逻辑的话，整个代码块就会变得非常复杂。从逻辑正确性的角度来说，上面这几种回调函数的写法没有任何问题，但是随着业务逻辑的增加和趋于复杂，这种写法的缺点马上就会暴露出来，想要维护它们实在是太痛苦了，这就是“回调地狱(callback hell)”。
​        一个衡量回调层次复杂度的方法是，在example 4中，假设doSomethingAsync2要发生在doSomethingAsync1之前，我们需要忍受多少重构的痛苦。

​       回调函数还有一个问题就是我们在回调函数之外无法捕获到回调函数中的异常，我们以前在处理异常时一般这么做:

example 5:

```
try{
2     //do something may cause exception..
3 }
4 catch(e){
5     //handle exception...
6 }
```

在同步代码中，这没有问题。现在思考一下下面代码的执行情况：

example 6:

```
 var fs = require('fs');
 2 
 3 try{
 4     fs.readFile('not_exist_file', 'utf8', function(err,   data){
 5         console.log(data);
 6     });
 7 }
 8 catch(e){
 9     console.log("error caught: " + e);
10 }
```

​         输出答案是undefined。我们尝试读取一个不存在的文件，这当然会引发异常，但是最外层的try/catch语句却无法捕获这个异常。这是异步代码的执行机制导致的。

#### 2.事件监听(事件发布/订阅)

事件监听是一种非常常见的异步编程模式，它是一种典型的逻辑分离方式，对代码解耦很有用处。通常情况下，我们需要考虑哪些部分是不变的，哪些是容易变化的，把不变的部分封装在组件内部，供外部调用，需要自定义的部分暴露在外部处理。从某种意义上说，事件的设计就是组件的接口设计。

example 7:

```
 //发布和订阅事件
 2 
 3 var events = require('events');
 4 var emitter = new events.EventEmitter();
 5 
 6 emitter.on('event1', function(message){
 7     console.log(message);
 8 });
 9 
10 emitter.emit('event1', "message for you");
```

这种使用事件监听处理的异步编程方式很适合一些需要高度解耦的场景。例如在之前一个游戏服务端项目中，当人物属性变化时，需要写入到持久层。解决方案是先写一个订阅方，订阅'save'事件，在需要保存数据时让发布方对象(这里就是人物对象)上直接用emit发出一个事件名并携带相应参数，订阅方收到这个事件信息并处理。

#### 3.Promise 对象

ES 6中原生提供了Promise对象，Promise对象代表了某个未来才会知道结果的事件(一般是一个异步操作)，并且这个事件对外提供了统一的API，可供进一步处理。
使用Promise对象可以用同步操作的流程写法来表达异步操作，避免了层层嵌套的异步回调，代码也更加清晰易懂，方便维护。

**Promise.prototype.then()**

Promise.prototype.then()方法返回的是一个新的Promise对象，因此可以采用链式写法，即一个then后面再调用另一个then。如果前一个回调函数返回的是一个Promise对象，此时后一个回调函数会等待第一个Promise对象有了结果，才会进一步调用。

example 8:

```
//ES 6原生Promise示例
 2 var fs = require('fs')
 3 
 4 var read = function (filename){
 5     var promise = new Promise((resolve, reject)=>{
 6         fs.readFile(filename, 'utf8',(err, data)=>{
 7             if (err){
 8                 reject(err);
 9             }
10             resolve(data);
11         })
12     });
13     return promise;  //返回Promise对象
14 }
15 
16 read('./text1.txt')
17 .then(function(data){
18     console.log(data);
19 }, function(err){
20     console.log("err: " + err);
21 });
```

以上代码中，read函数是Promise化的，在read函数中，实例化了一个Promise对象，Promise的构造函数接受一个函数作为参数，这个函数的两个参数分别是resolve方法和reject方法。如果异步操作成功，就是用resolve方法将Promise对象的状态从“未完成”变为“完成”(即从pending变为resolved)，如果异步操作出错，则是用reject方法把Promise对象的状态从“未完成”变为“失败”(即从pending变为rejected)，read函数返回了这个Promise对象。Promise实例生成以后，可以用then方法分别指定resolve方法和reject方法的回调函数。

上面这个例子，Promise构造函数的参数是一个函数，在这个函数中我们写异步操作的代码，在异步操作的回调中，我们根据err变量来选择是执行resolve方法还是reject方法，一般来说调用resolve方法的参数是异步操作获取到的数据(如果有的话)，但还可能是另一个Promise对象，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，调用reject方法的参数是异步回调用的err参数。

调用read函数时，实际上返回的是一个Promise对象，通过在这个Promise对象上调用then方法并传入resolve方法和reject方法来指定异步操作成功和失败后的操作。

example 9:

```
read('./text1.txt')
17 .then(function(data){
18     console.log(data);
19 return read('./text2.txt');
20 })
21 .then(function(data){
22     console.log(data);
23 });
```

在Promise的顺序嵌套回调中，第一个then方法先输出text1.txt的内容后返回read('./text2.txt')，注意这里很关键，这里实际上返回了一个新的Promise实例，第二个then方法指定了异步读取text2.txt文件的回调函数。这种形似同步调用的Promise顺序嵌套回调的特点就是有一大堆的then方法，代码冗余略多。

**Promise.prototype.catch()**

Promise.prototype.catch方法是Promise.prototype.then(null, rejection)的别名，用于指定发生错误时的回调函数。

example 10:

```
read('./text1.txt')
16 .then(function(data){
17     console.log(data);
18     return read('not_exist_file');
19 })
20 .then(function(data){
21     console.log(data);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25 })
26 .then(function(data){
27     console.log("completed");
28 })
```

使用Promise对象的catch方法可以捕获异步调用链中callback的异常，Promise对象的catch方法返回的也是一个Promise对象，因此，在catch方法后还可以继续写异步调用方法。这是一个非常强大的能力。

如果在catch方法中发生了异常：

example 11

```
15  
read('./text1.txt')
16 .then(function(data){
17     console.log(data);
18     return read('not_exist_file');
19 })
20 .then(function(data){
21     console.log(data);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25     x+1;
26 })
27 .then(function(data){
28     console.log("completed");
29 })
```

在上述代码中，x+1会抛出一个异常，但是由于后面没有catch方法了，导致这个异常不会被捕获，而且也不会传递到外层去，也就是说这个异常就默默发生了，没有惊动任何人。

我们可以在catch方法后再加catch方法来捕获这个x+1的异常：

example 12

```
read('./text1.txt')
16 .then(function(data){
17     console.log(data);
18     return read('not_exist_file');
19 })
20 .then(function(data){
21     console.log(data);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25     x+1;
26 })
27 .catch(function(err){
28     console.log("error caught: " + err);
29 })
30 .then(function(data){
31     console.log("completed");
32 })
```

**Promise.all()**

Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。

var p = Promise.all([p1,p2,p3]);

Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象实例。

p的状态由p1、p2、p3决定，分两种情况：

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

一个具体的例子：

example 13：

```
var fs = require('fs')
 2 
 3 var read = function (filename){
 4     var promise = new Promise(function(resolve, reject){
 5         fs.readFile(filename, 'utf8', function(err, data){
 6             if (err){
 7                 reject(err);
 8             }
 9             resolve(data);
10         })
11     });
12     return promise;
13 }
14 
15 var promises = [1, 2].map(function(fileno){
16     return read('./text' + fileno + '.txt');
17 });
18 
19 Promise.all(promises)
20 .then(function(contents){
21     console.log(contents);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25 })
```

上述代码会并发执行读取text1.txt和text2.txt的操作，当两个文件都读取完毕时，输出它们的内容，contents是一个数组，每个元素对应promises数组的执行结果 (顺序完全一致)，在这里就是text1.txt和text2.txt的内容。

#### 3.Generator函数

Generator函数是协程在ES 6中的实现，最大特点就是可以交出函数的执行权（暂停执行）。
注意：在node中需要开启--harmony选项来启用Generator函数。
整个Generator函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。

协程的运行方式如下：

第一步：协程A开始运行。
第二步：协程A执行到一半，暂停，执行权转移到协程B。
第三步：一段时间后，协程B交还执行权。
第四步：协程A恢复执行。

上面的协程A就是异步任务，因为分为两步执行。

比如一个读取文件的例子：

example 14:

```
 function asnycJob() {
2     // ...其他代码
3     var f = yield readFile(fileA);
4     // ...其他代码
5 }
```

asnycJob函数是一个协程，yield语句表示，执行到此处执行权就交给其他协程，也就是说，yield是两个阶段的分界线。协程遇到yield语句就暂停执行，直到执行权返回，再从暂停处继续执行。这种写法的优点是，可以把异步代码写得像同步一样。

看一个简单的Generator函数例子：

example 15:

```
function* gen(x){
 2     var y = yield x + 2;
 3     return y;
 4 }
 5 
 6 var g = gen(1);
 7 var r1 = g.next(); // { value: 3, done: false }
 8 console.log(r1);
 9 var r2 = g.next() // { value: undefined, done: true }
10 console.log(r2);
```

需要注意的是Generator函数的函数名前面有一个"*"。
上述代码中，调用Generator函数，会返回一个内部指针(即遍历器)g，这是Generator函数和一般函数不同的地方，调用它不会返回结果，而是一个指针对象。调用指针g的next方法，会移动内部指针，指向第一个遇到的yield语句，上例就是执行到x+2为止。
换言之，**next方法的作用是分阶段执行Generator函数**。每次调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。value属性是yield语句后面表达式的值，表示当前阶段的值；**done属性是一个布尔值，表示Generator函数是否执行完毕，即是否还有下一个阶段。**

**Generator函数的数据交换和错误处理**

next方法返回值的value属性，是Generator函数向外输出数据；next方法还可以接受参数，这是向Generator函数体内输入数据。

example 16:

```
function* gen(x){
 2     var y = yield x + 2;
 3     return y;
 4 }
 5 
 6 var g = gen(1);
 7 var r1 = g.next(); // { value: 3, done: false }
 8 console.log(r1);
 9 var r2 = g.next(2) // { value: 2, done: true }
10 console.log(r2);
```

第一个next的value值，返回了表达式x+2的值(3)，第二个next带有参数2，这个参数传入Generator函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收，因此这一阶段的value值就是2。

***Generator函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。***

example 17:

```
1 function* gen(x){
2     try {
3         var y = yield x + 2;
4     }
5     catch (e){
6         console.log(e);
7     }
8     return y;
9 }
10 
11 var g = gen(1);
12 g.next();     
13 g.throw('error!'); //error!
```

下面是一个读取文件的真实异步操作的例子。

example 18：

```
 1 var fs = require('fs');
 2 var thunkify = require('thunkify');
 3 var readFile = thunkify(fs.readFile);
 4 
 5 var gen = function* (){
 6     var r1 = yield readFile('./text1.txt', 'utf8');
 7     console.log(r1);
 8     var r2 = yield readFile('./text2.txt', 'utf8');
 9     console.log(r2);
10 };
11 
12 //开始执行上面的代码
13 var g = gen();
14 
15 var r1 = g.next();
16 r1.value(function(err, data){
17     if (err) throw err;
18     var r2 = g.next(data);
19     r2.value(function(err, data){
20         if (err) throw err;
21         g.next(data);
22     });
23 });
```

这就是一个基本的Generator函数定义和执行的流程。可以看到，虽然这里的Generator函数写的很简洁，和同步方法的写法很像，但是执行起来却很麻烦，流程管理比较繁琐。

**yield \*语句**

普通的yield语句后面跟一个异步操作，yield *语句后面需要跟一个遍历器，可以理解为yield *后面要跟另一个Generator函数，讲起来比较抽象，看一个实例。

```
//嵌套异步操作流
 2 var fs = require('fs');
 3 var thunkify = require('thunkify');
 4 var readFile = thunkify(fs.readFile);
 5 
 6 var gen = function* (){
 7     var f1 = yield readFile('./text1.txt', 'utf8');
 8     console.log(f1);
 9 
10     var f_ = yield * gen1(); //此处插入了另外一个异步流程
11 
12     var f2 = yield readFile('./text2.txt', 'utf8');
13     console.log(f2);
14 
15     var f3 = yield readFile('./text3.txt', 'utf8');
16     console.log(f3);
17 };
18 
19 var gen1 = function* (){
20     var f4 = yield readFile('./text4.txt', 'utf8');
21     console.log(f4);
22     var f5 = yield readFile('./text5.txt', 'utf8');
23     console.log(f5);
24 }
25 
26 function run(fn) {
27     var gen = fn();
28 
29     function next(err, data) {
30     var result = gen.next(data);
31     if (result.done) return;
32     result.value(next);
33 }
34 
35 next();
36 }
37 
38 run(gen); //自动执行
```

上面这个例子会输出
1
4
5
2
3
也就是说，使用yield *可以在一个异步操作流程中直接插入另一个异步操作流程，我们可以据此构造可嵌套的异步操作流，更为重要的是，写这些代码完全是同步风格的。

目前业界比较流行的Generator函数自动执行的解决方案是co库，此处也只给出co的例子。顺带一提[node-fibers](https://github.com/laverdet/node-fibers/)也是一种解决方案。

顺序执行3个异步读取文件的操作，并依次输出文件内容：

**ES 7中的async和await**

async和await是ES 7中的新语法，新到连ES 6都不支持，但是可以通过Babel一类的预编译器处理成ES 5的代码。目前比较一致的看法是async和await是js对异步的终极解决方案。

async函数实际上是Generator函数的语法糖(js最喜欢搞语法糖，包括ES 6中新增的“类”支持其实也是语法糖)。

```
1 var fs = require('fs');
 2 
 3 var readFile = function (fileName){
 4     return new Promise(function (resolve, reject){
 5         fs.readFile(fileName, function(error, data){
 6             if (error){
 7                 reject(error);
 8             }
 9             else {
10                 resolve(data);
11             }
12         });
13     });
14 };
15 
16 var asyncReadFile = async function (){
17     var f1 = await readFile('./text1.txt');
18     var f2 = await readFile('./text2.txt');
19     console.log(f1.toString());
20     console.log(f2.toString());
21 };
22 
23 asyncReadFile();
```

输出：

1

2 

详情：https://www.cnblogs.com/nullcc/p/5841182.html