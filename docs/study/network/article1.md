# Cookie,Session,Token, JWT

## 1. Cookie

- Cookie的作用：**因为HTTP是无状态协议，对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务器端不会保存任何会话信息。**所以需要一个状态来对服务器和浏览器进行会话跟踪，告知服务器端前后两个请求是否来自同一浏览器。
- cookie 存储在客户端： cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
- **cookie 是不可跨域的：** 每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，**一级域名和二级域名之间是允许共享使用的**（**靠的是 domain）**。
### 字段
1. name: cookie的名称
2. value: cookie的值
3. domain: 可以访问此cookie的域名
4. path:可访问此cookie的页面路径
5. expires/max-age： cookie的有效期
6. size:cookie的大小
7. httponly:是否携带cookie
8. secure：设置是否只通过https来传递此条cookie.
## 2. Session

- session是基于cookie实现的，session存储在服务器端，session会被存储到客户端的cookie中

## 3. Cookie和Session的区别

- 作用范围不同，Cookie 保存在客户端（浏览器），Session 保存在服务器端。
- 存取方式的不同，Cookie 只能保存 ASCII，Session 可以存任意数据类型，一般情况下我们可以在 Session 中保持一些常用变量信息，比如说 UserId 等。
- 有效期不同，Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭或者 Session 超时都会失效。
- 隐私策略不同，Cookie 存储在客户端，比较容易遭到不法获取，早期有人将用户的登录名和密码存储在 Cookie 中导致信息被窃取；Session 存储在服务端，安全性相对 Cookie 要好一些。
- 存储大小不同， 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie。

## 4. Cookie与Session的配合

![](https://user-gold-cdn.xitu.io/2019/5/13/16aafb5d90f398e2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建创建对应的 Session ，请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器，浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名。

当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。

根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，大部分系统也是根据此原理来验证用户登录状态。

出处。

## 5. Token(令牌)

- **访问资源接口的（API ）时所需要的资源凭证**

- **简单的token的组成：**uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）

- 特点

  - **服务端无状态化、可扩展性好**
  - **支持移动端设备**
  - 安全
  - 支持跨程序调用

- **token 的身份验证流程：**

  ![](https://user-gold-cdn.xitu.io/2019/12/29/16f523a04d9c745f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

1.客户端使用用户名跟密码请求登录

2.服务端收到请求，去验证用户名与密码

3.验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端

4.客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里

5.客户端每次向服务端请求资源的时候需要带着服务端签发的 token

6.服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据

- **每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里**

**基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 **

- **token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库**

- **token 完全由应用管理，所以它可以避开同源策略**

## 6. Token 和 Session 的区别

- Session 是一种**记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息**。而 Token 是**令牌**，**访问资源接口（API）时所需要的资源凭证**。Token **使服务端无状态化，不会存储会话信息。**

- Session 和 Token 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重放攻击，而 Session 就必须依赖链路层来保障通讯安全了。**如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。**

- 所谓 Session 认证只是简单的把 User 信息存储到 Session 里，因为 SessionID 的不可预测性，暂且认为是安全的。而 Token ，如果指的是 OAuth Token 或类似的机制的话，提供的是 认证 和 授权 ，认证是针对用户，授权是针对 App 。其目的是让某 App 有权利访问某用户的信息。这里的 Token 是唯一的。不可以转移到其它 App上，也不可以转到其它用户上。Session 只提供一种简单的认证，即只要有此 SessionID ，即认为有此 User 的全部权利。是需要严格保密的，这个数据应该只保存在站方，不应该共享给其它网站或者第三方 App。所以简单来说：**如果你的用户数据可能需要和第三方共享，或者允许第三方调用 API 接口，用 Token 。如果永远只是自己的网站，自己的 App，用什么就无所谓了。**


## 7. JWT

- JSON  Web Token（简称JWT） 是目前最流行的**跨域认证**解决方案
- 是一种**认证授权机制**
- JWT 是为了在网络应用环境间**传递声明**而执行的一种基于 JSON 的开放标准（[RFC 7519](https://tools.ietf.org/html/rfc7519)）。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。
- 可以使用 HMAC 算法或者是 RSA 的公/私秘钥对 JWT 进行签名。因为数字签名的存在，这些传递的信息是可信的。



### 原理

![](https://user-gold-cdn.xitu.io/2019/12/29/16f523a04e881087?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 用户输入用户名/密码登录，服务端认证成功后，会返回给客户端一个 JWT

- 客户端将 token 保存到本地（通常使用 localstorage，也可以使用 cookie）
- 当用户希望访问一个受保护的路由或者资源的时候，需要请求头的 Authorization 字段中使用Bearer 模式添加 JWT

- 服务端的保护路由将会检查请求头 Authorization 中的 JWT 信息，如果合法，则允许用户的行为

- 因为 JWT 是自包含的（内部包含了一些会话信息），因此减少了需要查询数据库的需要

- 因为 JWT 并不使用 Cookie 的，所以你可以使用任何域名提供你的 API 服务而不**需要担心跨域资源共享问题（CORS）**

- 因为用户的状态不再存储在服务端的内存中，所以这是一种无状态的认证机制



## 8. Token 和 JWT 的区别

**相同：**

- 都是访问资源的令牌
- 都可以记录用户的信息
- 都是使服务端无状态化
- 都是只有验证成功后，客户端才能访问服务端上受保护的资源

**区别：**

- Token：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效。
- JWT： 将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。


