# Promise

Promise是异步编程的一种解决方案：从语法上，promise是一个对象，

## promise出现的原因

解决回调地狱。

回调地狱：

```js
请求1(function(请求结果1){
    请求2(function(请求结果2){
        请求3(function(请求结果3){
            请求4(function(请求结果4){
                请求5(function(请求结果5){
                    请求6(function(请求结果3){
                        ...
                    })
                })
            })
        })
    })
})

```



- 代码臃肿
- 可读性差
- 耦合度过高，可维护性差
- 代码复用性差
- 容易滋生bug
- 只能在回调里处理异常

## Promise的状态

- pending，异步任务正在进行。
- resolved,异步任务执行成功。
- rejected 异步任务执行失败

状态一旦改变，就不能再改为其他状态



## 常用API

Promise.resolve()

Promise.rejected()

Promise.prototype.then()

Promise.prototype.catch()

Promise.race():类方法，多个Promise任务同时执行，返回最先结束的Promise任务的结果，不管这个Promsie结果是成功还是失败。

Promise.all():类方法，多个Promise任务同时执行。如果全部成功执行，这一数组的方式返回所有Promsie的执行结果，有一个为rejected,则只返回rejected任务的结果





promise的缺陷

promise一旦创建就不能销毁

每次then都会穿件一个promise对象，造成内存的浪费

pending状态的时候，无法得知进展到哪一步

promise会吞掉内部抛出的错误，不能反映到外部。如果最后一个then方法里出现了错误，就无法发现