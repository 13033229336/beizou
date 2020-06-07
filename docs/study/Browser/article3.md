# WebSocket

##  为什么需要WebSocket

我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？

答案很简单，因为 HTTP 协议有一个缺陷：**通信只能由客户端发起，做不到服务器主动向客户端推送信息**

这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用["轮询"](https://www.pubnub.com/blog/2014-12-01-http-long-polling/)：**每隔一段时候，就发出一个询问，了解服务器有没有新的信息。**最典型的场景就是聊天室。

**轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）**。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

**短轮询（客户端浏览器轮询服务器（polling））**
这是最简单的一种解决方案，其原理是在客户端通过Ajax的方式的方式每隔一小段时间就发送一个请求到服务器，服务器返回最新数据，然后客户端根据获得的数据来更新界面，这样就间接实现了即时通信。

优点：兼容性强，实现非常简单
缺点：延迟性高，非常消耗请求资源，影响性能（通常情况下数据都是没有发生改变的）

**长轮询（long-polling）**
这种方式是客户端发送一个请求到服务器，服务器查看客户端请求的数据是否发生了变化（是否有最新数据），如果发生变化则立即响应返回，否则保持这个连接并定期检查最新数据，直到发生了数据更新或连接超时。同时客户端连接一旦断开，则再次发出请求，这样在相同时间内大大减少了客户端请求服务器的次数。

长轮询优缺点：
优点：兼容性好，资源浪费较小
缺点：服务器 hold 连接会消耗资源，返回数据顺序无保证，难于管理维护
**WebSocket的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力,这就是`WebSocket`解决的问题**

**example：**
```js
function socketConnect(url) {
    // 客户端与服务器进行连接
    let ws = new WebSocket(url); // 返回`WebSocket`对象，赋值给变量ws
    // 连接成功回调
    ws.onopen = e => {
        console.log('连接成功', e)
        ws.send('我发送消息给服务端'); // 客户端与服务器端通信
    }
    // 监听服务器端返回的信息
    ws.onmessage = e => {
        console.log('服务器端返回：', e.data)
        // do something
    }
    return ws; // 返回websocket对象
}
let wsValue = socketConnect('ws://121.40.165.18:8800'); // websocket对象
```
###  WebSocket不稳定

WebSocket并不稳定，在使用一段时间后，可能会断开连接，貌似至今没有一个为何会断开连接的公论，所以我们需要让WebSocket保持连接状态，这里推荐两种方法。

#### WebSocket设置变量，判断是否手动关闭连接：

**`class`类中就是用的这种方式**:设置一个变量，在webSocket关闭/报错的回调中，判断是不是手动关闭的，如果不是的话，就重新连接，这样做的优缺点如下：

- 优点：请求较少(相对于心跳连接)，易设置。
- 缺点：可能会导致丢失数据,在断开重连的这段时间中，恰好双方正在通信。

#### WebSocket心跳机制：

> 因为第一种方案的缺点，并且可能会有其他一些未知情况导致断开连接而没有触发Error或Close事件。这样就导致实际连接已经断开了，而客户端和服务端却不知道，还在傻傻的等着消息来。

然后聪明的程序猿们想出了一种叫做**心跳机制**的解决方法：

客户端就像心跳一样每隔固定的时间发送一次`ping`，来告诉服务器，我还活着，而服务器也会返回`pong`，来告诉客户端，服务器还活着。

#### WebSocket的当前状态:`WebSocket.readyState`

下面是`WebSocket.readyState`的四个值(四种状态)：

- 0: 表示正在连接
- 1: 表示连接成功，可以通信了
- 2: 表示连接正在关闭
- 3: 表示连接已经关闭，或者打开连接失败

if (this.ws.readyState === 1) {
    // 检查ws为链接状态 才可发送
    this.ws.send('ping'); // 客户端发送ping
}

#### `WebSocket`还可以发送/接收 二进制数据

二进制数据包括：`blob`对象和`Arraybuffer`对象，所以我们需要分开来处理。
```js
    // 接收数据
ws.onmessage = function(event){
    if(event.data instanceof ArrayBuffer){
        // 判断 ArrayBuffer 对象
    }
    

    if(event.data instanceof Blob){
        // 判断 Blob 对象
    }
}

// 发送 Blob 对象的例子
let file = document.querySelector('input[type="file"]').files[0];
ws.send(file);

// 发送 ArrayBuffer 对象的例子
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
    binary[i] = img.data[i];
}
ws.send(binary.buffer);

**如果你要发送的二进制数据很大的话，如何判断发送完毕：**

`webSocket.bufferedAmount`属性，表示还有多少字节的二进制数据没有发送出去：

var data = new ArrayBuffer(10000000);
socket.send(data);
if (socket.bufferedAmount === 0) {
    // 发送完毕
} else {
    // 发送还没结束
}
```
上述栗子出自阮一峰老师的[WebSocket教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)



### WebSocket的优点：

最后再吹一波WebSocket：

1. 双向通信(一开始说的，也是最重要的一点)。

2. 数据格式比较轻量，性能开销小，通信高效

   协议控制的数据包头部较小，而HTTP协议每次通信都需要携带完整的头部

3. 更好的二进制支持

4. 没有同源限制，客户端可以与任意服务器通信

5. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器

作者：OBKoro1
链接：https://juejin.im/post/5bcad1326fb9a05cda779d0b
来源：掘金

## WebSocket的安全性问题

#### 2.1 认证

WebSocket 协议没有规定服务器在握手阶段应该如何认证客户端身份。服务器可以采用任何 HTTP 服务器的客户端身份认证机制，如 cookie认证，HTTP 基础认证，TLS 身份认证等。在WebSocket应用认证实现上面临的安全问题和传统的Web应用认证是相同的，如：[CVE-2015-0201](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0201), Spring框架的Java SockJS客户端生成可预测的会话ID，攻击者可利用该漏洞向其他会话发送消息; [CVE-2015-1482](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1482), Ansible Tower未对用户身份进行认证，远程攻击者通过websocket连接获取敏感信息。

#### 2.2 授权

同认证一样，WebSocket协议没有指定任何授权方式，应用程序中用户资源访问等的授权策略由服务端或开发者实现。WebSocket应用也会存在和传统Web应用相同的安全风险，如：垂直权限提升和水平权限提升。

#### 2.3 跨域请求

WebSocket使用基于源的安全模型，在发起WebSocket握手请求时，浏览器会在请求中添加一个名为Origin的HTTP头，Oringin字段表示发起请求的源，以此来防止未经授权的跨站点访问请求。WebSocket 的客户端不仅仅局限于浏览器，因此 WebSocket 规范没有强制规定握手阶段的 Origin 头是必需的，并且WebSocket不受浏览器同源策略的限制。如果服务端没有针对Origin头部进行验证可能会导致跨站点WebSocket劫持攻击。该漏洞最早在 2013 年被Christian Schneider 发现并公开，Christian 将之命名为跨站点 WebSocket 劫持 (Cross Site WebSocket Hijacking)(CSWSH)。跨站点 WebSocket 劫持危害大，但容易被开发人员忽视。相关案例可以参考: IPython Notebook([CVE-2014-3429](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-3429)), OpenStack Compute([CVE-2015-0259](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0259)), [Zeppelin WebSocket服务器](https://issues.apache.org/jira/browse/ZEPPELIN-173)等跨站WebSocket劫持。

#### 2.4 拒绝服务

WebSocket设计为面向连接的协议，可被利用引起客户端和服务器端拒绝服务攻击，相关案例可参考: F5 BIG-IP远程拒绝服务漏洞([CVE-2016-9253](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-9253))。

**(1). 客户端拒绝服务**

WebSocket连接限制不同于HTTP连接限制，和HTTP相比，WebSocket有一个更高的连接限制，不同的浏览器有自己特定的最大连接数,如：火狐浏览器默认最大连接数为200。通过发送恶意内容，用尽允许的所有Websocket连接耗尽浏览器资源，引起拒绝服务。

**(2). 服务器端拒绝服务**

WebSocket建立的是持久连接，只有客户端或服务端其中一发提出关闭连接的请求，WebSocket连接才关闭，因此攻击者可以向服务器发起大量的申请建立WebSocket连接的请求，建立持久连接，耗尽服务器资源，引发拒绝服务。针对这种攻，可以通过设置单IP可建立连接的最大连接数的方式防范。攻击者还可以通过发送一个单一的庞大的数据帧(如, 2^16)，或者发送一个长流的分片消息的小帧，来耗尽服务器的内存，引发拒绝服务攻击, 针对这种攻击，通过限制帧大小和多个帧重组后的总消息大小的方式防范。

#### 2.5 中间人攻击

WebSocket使用HTTP或HTTPS协议进行握手请求，在使用HTTP协议的情况下，若存在中间人可以嗅探HTTP流量，那么中间人可以获取并篡改WebSocket握手请求，通过伪造客户端信息与服务器建立WebSocket连接，如下图所示。防范这种攻击，需要在加密信道上建立WebSocket连接，使用HTTPS协议发起握手请求。