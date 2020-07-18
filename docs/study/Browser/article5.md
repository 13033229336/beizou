#  跨域



## 什么是跨域



在一台服务器的页面，请求另外一台服务器的数据（非同源下）



## 同源策略



1.同源，指得是****协议+域名+端口****相同。



浏览器出于安全方面对的考虑，只允许本域名下的接口交互，不同源的客户端脚本，在没有明确授权的情况下，不能读写对方的资源。



2.限制内容：Cookie，localStorage,indexedDB等存储性内容；DOM节点



注意：



- 如果是协议和端口造成的跨域，前端无法处理

- 是否跨域，只通过URL的首部来判断，不会通过域名所对应的ip是否相同来判断

- 跨域并不是请求发不出去，而是请求发出去了，也返回结果了，但是结果被服务器拦截了。



## 解决方案



### JSONP



原理：利用<script.标签不受同源策略限制的特性进行跨域操作



​       通过动态创建script，再请求一个带参网址实现跨域通信



优点：1.实现简单。2.兼容性好



缺点：1.只支持****get****请求（因为<script>标签只能get）



​       2.可能受到XSS攻击



​       3.需要服务器端配合JSONP进行一定的改造



实现流程：



1. 声明一个回调函数，将回调函数名作为参数传递给跨域请求的服务器，函数形参为要获取的数据

2. 创建一个script标签，跨域请求地址作为script标签的src属性值

3. 服务器收到请求后取出参数和回调函数名，将对应的数据作为回调函数的参数返回给客户端调用回调函数



```js

function jsonp({url,params,callback}){

  return new Promise((resolve,reject)=>{

​    let script=document.createElement('script') //创建script标签

​    params=JSON.parse(JSON.stringify(params));

​    let arrs=[];

​    for(let key in params){

​      arrs.push(`S{key}=${params[key]}`);

​    }

​    arrs.push(`callback=${callback}`);

​    script.src=`${url} ? ${arrs.join('&')}`;

​    document.body.appendChild(script);

​    window[callback]=function(data){

​      resolve(data);

​      document.body.removeChild(script)

​    }

  })

}

//前端调用

jsonp({

  url:'http://localhost:3000/say',

  params:{

​    wd:'I love you'

  },

  callback:'show'

}).then(data=>{

  console.log(data)

})

```



### CROS 跨域资源共享



CORS是目前主流的跨域解决方案，它使用额外的HTTP头来告诉浏览器，让运行在一个origin(domain)上的web应用被准许访问来自不同源服务器上的指定资源。



cros 需要浏览器和后端同时支持。



服务端设置Access-Control-Allow-Origin 就可以开启CORS



- 简单请求



1. GET，HEAD，POST



2. Content-Type为：text/plain,multipart/form-data,application/x-www-urlencoded



- 复杂请求



 **复杂请求跨域在正式通信前会先发送一个OPTIONS请求---“预检”请求，确认后端是否允许跨域**



1. Access-Control-Allow-Origin 设置哪个请求源可以访问

2. Access-Control-Allow-Headers 允许携带哪个头访问

3. Access-Control-Allow-Methods 允许哪个方法访问

4. Access-Control-Allow-Credentials 允许携带cookie

5. Access-Control-Max-Age 预检的存活时间

6. Access-Control-Expose-Headers 允许返回的头，把响应头暴露出去个前端



### postMessage



postMessage 是 HTML5 XMLHttRequest Level2中的API，允许来自不同源的脚本采用异步的方式进行优先的通信，可以实现跨文本档、多窗口、跨域消息传递



### node中间件代理



实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就不遵循此标准



1.接收客户端请求



2.将请求转发给服务器



3.拿到服务器响应数据



4.将响应转发给客户端



### websocket



因为websocket是一种双向通信协议，建立连接后，客户端和服务端都能主动向对方发送或接收请求，连接建立好后，客户端和服务端之间的双向通信就和HTTP无关，因此可以跨域



### Nginx反向代理



所有的客户端的请求都必须经过nginx的处理，nginx作为代理服务器再将请求转发给node或者java服务，这样就规避的同源策略