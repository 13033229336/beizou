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

Promise.any():接收一组promise实例为参数，只要有一个参数实例变成fulfilled状态，包装实例就会变成fulfilled状态，反之只要有一个参数实例变成rejected,包装实例就会变成rejected状态

Promsie.allSettled:接收一组promsie实例作为参数，只有所有的参数实例都返回结果，不管是fulfilled还是rejected,包装实例才会结束，在ES11引入







promise的缺陷

promise一旦创建就不能销毁

每次then都会穿件一个promise对象，造成内存的浪费

pending状态的时候，无法得知进展到哪一步

promise会吞掉内部抛出的错误，不能反映到外部。如果最后一个then方法里出现了错误，就无法发现

```js
function myPromise(executor){
    this.status='pending';
    this.value=null;
    this.reason=null;
    this.onFulfilled=[];
    this.onRejected=[]

    //怎么知道调用了
    //resolve ---->fulfilled
    //reject=rejected
    let that=this;
    function resolve(value){
        console.log('resolve called');
        that.status='fulfilled';
        that.value=value;
        for(let fn of that.onFulfilled){
            fn(value)
        }
    }

    function reject(reason){
        console.log('reject called');
        that.status='rejected';
        that.reason=reason;
        for(let fn of that.onRejected){
            fn(reason)
        }
    }
    executor(resolve,reject);
}

myPromise.prototype.then=function(onFulfilled,onRejected){
    let that=this;
    if(that.status==='fulfilled'){
        onFulfilled(that.value)
    }else if(that.status==='rejected'){
        onRejected(that.reason)
    }else if(that.status==='pending'){
        //onFulfilled onRejected 先等着，等着resolve(),reject() 才会执行
        that.onFulfilled.push(onFulfilled);
        that.onRejected.push(onRejected)
    }
}

let o = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(6);
    },1000)
})

let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(6666);
    },2000)
})

Promise.myAll=function (promises){
    return new Promise((resolve,reject)=>{
        let count=0;
        let res=[];
        for(let i=0;i<promises.length;i++){
            promises[i].then(x=>{
                count++;
                res[i]=x;
                if(count==promises.length){
                    resolve(res)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    })
}

Promise.myAll([p,o]).then(x=>{
    console.log(x)
})
```