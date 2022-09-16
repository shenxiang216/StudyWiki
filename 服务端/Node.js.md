参考链接：

[Node.js 教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)

* 运行在服务端的 JavaScript

* 一个基于Chrome JavaScript 运行时建立的一个平台。

* 一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

* 第一个Node.js程序

* 安装配置

* Ndoe.js创建第一个应用

  ```
  var http = require('http');
  
  http.createServer(function (request, response) {
  
      // 发送 HTTP 头部 
      // HTTP 状态值: 200 : OK
      // 内容类型: text/plain
      response.writeHead(200, {'Content-Type': 'text/plain'});
  
      // 发送响应数据 "Hello World"
      response.end('Hello World\n');
  }).listen(8888);
  
  // 终端打印如下信息
  console.log('Server running at http://127.0.0.1:8888/');
  ```

  ```
  node server.js
  Server running at http://127.0.0.1:8888/
  ```

* Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

  Node 自带了交互式解释器，可以执行以下任务：

  - **读取** - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
  - **执行** - 执行输入的数据结构
  - **打印** - 输出结果
  - **循环** - 循环操作以上步骤直到用户两次按下 **ctrl-c** 按钮退出。

  Node 的交互式解释器可以很好的调试 Javascript 代码。

* 可以使用下划线(_)获取上一个表达式的运算结果：

* 按下两次 **ctrl + c** 键就能退出 REPL

* 回调函数

  * Node.js 异步编程的直接体现就是回调。

    异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。

    回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

    例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

    回调函数一般作为函数的最后一个参数出现

  * 阻塞是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内。

* 时间循环

```
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
 
// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}
 
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});
 
// 触发 connection 事件 
eventEmitter.emit('connection');
 
console.log("程序执行完毕。");
```

* EventEmitter 类

  * events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。你可以通过require("events");来访问该模块。

  * ```
    // 引入 events 模块
    var events = require('events');
    // 创建 eventEmitter 对象
    var eventEmitter = new events.EventEmitter();
    ```

  * EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。

    当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。

    我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。

* Buffer(缓冲区)

  * JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

    但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

    在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

  * 方法参考手册

* 日拱一卒，功不唐捐。涓流所积，终成沧海。

* Stream(流)

  * Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

    Node.js，Stream 有四种流类型：

    - **Readable** - 可读操作。

    - **Writable** - 可写操作。

    - **Duplex** - 可读可写操作.

    - **Transform** - 操作被写入数据，然后读出结果。

      所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

    - **data** - 当有数据可读时触发。

    - **end** - 没有更多的数据可读时触发。

    - **error** - 在接收和写入过程中发生错误时触发。

    - **finish** - 所有数据已被写入到底层系统时触发。
  
* 模块系统

  * 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。

    模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

* 函数

  * 在 JavaScript中，一个函数可以作为另一个函数的参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。

    Node.js 中函数的使用与 JavaScript 类似

  * ```
    function say(word) {
      console.log(word);
    }
    
    function execute(someFunction, value) {
      someFunction(value);
    }
    
    execute(say, "Hello");
    ```

  * 匿名函数

* 路由

* 全局对象

  * JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。

    在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

    

    在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。

  * global 最根本的作用是作为全局变量的宿主。

  * console方法

* 常用工具

  * util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能 过于精简的不足。

    使用方法如下：

    ```
    const util = require('util')
    ```

  * **util.callbackify(original)** 将 `async` 异步函数（或者一个返回值为 `Promise` 的函数）转换成遵循异常优先的回调风格的函数，例如将 `(err, value) => ...` 回调作为最后一个参数。 在回调函数中，第一个参数为拒绝的原因（如果 `Promise` 解决，则为 `null`），第二个参数则是解决的值。

  * **util.inherits(constructor, superConstructor)** 是一个实现对象间原型继承的函数。

    JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有提供对象继承的语言级别特性，而是通过原型复制来实现的。

  * **util.inspect(object,[showHidden],[depth],[colors])** 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。

  * util.isArray(object)如果给定的参数 "object" 是一个数组返回 true，否则返回 false。

* 文件系统

  * 异步和同步 

    ```
    var fs = require("fs");
    
    // 异步读取
    fs.readFile('input.txt', function (err, data) {
       if (err) {
           return console.error(err);
       }
       console.log("异步读取: " + data.toString());
    });
    
    // 同步读取
    var data = fs.readFileSync('input.txt');
    console.log("同步读取: " + data.toString());
    
    console.log("程序执行完毕。");
    ```

    以上代码执行结果如下：

    ```
    $ node file.js 
    同步读取: 菜鸟教程官网地址：www.runoob.com
    文件读取实例
    
    程序执行完毕。
    异步读取: 菜鸟教程官网地址：www.runoob.com
    文件读取实例
    ```

  * 文件模块参考手册

* GET/POST请求

  * 表单提交到服务器一般都使用 GET/POST 请求。

* 工具模块

  * OS  Path  Net  DNS Domain

* web模块

  * Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。

    大多数 web 服务器都支持服务端的脚本语言（php、python、ruby）等，并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器。目前最主流的三个Web服务器是Apache、Nginx、IIS。

  * ![web应用架构](https://www.runoob.com/wp-content/uploads/2015/09/web_architecture.jpg)

  * 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。

  * 使用Node创建web服务器

  * ```
    var http = require('http');
    var fs = require('fs');
    var url = require('url');
     
     
    // 创建服务器
    http.createServer( function (request, response) {  
       // 解析请求，包括文件名
       var pathname = url.parse(request.url).pathname;
       
       // 输出请求的文件名
       console.log("Request for " + pathname + " received.");
       
       // 从文件系统中读取请求的文件内容
       fs.readFile(pathname.substr(1), function (err, data) {
          if (err) {
             console.log(err);
             // HTTP 状态码: 404 : NOT FOUND
             // Content Type: text/html
             response.writeHead(404, {'Content-Type': 'text/html'});
          }else{             
             // HTTP 状态码: 200 : OK
             // Content Type: text/html
             response.writeHead(200, {'Content-Type': 'text/html'});    
             
             // 响应文件内容
             response.write(data.toString());        
          }
          //  发送响应数据
          response.end();
       });   
    }).listen(8080);
     
    // 控制台会输出以下信息
    console.log('Server running at http://127.0.0.1:8080/');
    ```

  * 使用Node创建客户端

  * ```
    # 创建 client.js 文件
    var http = require('http');
     
    // 用于请求的选项
    var options = {
       host: 'localhost',
       port: '8080',
       path: '/index.html'  
    };
     
    // 处理响应的回调函数
    var callback = function(response){
       // 不断更新数据
       var body = '';
       response.on('data', function(data) {
          body += data;
       });
       
       response.on('end', function() {
          // 数据接收完成
          console.log(body);
       });
    }
    // 向服务端发送请求
    var req = http.request(options, callback);
    req.end();
    新开一个终端，执行 client.js 文件，输出结果如下：
    
    $ node  client.js 
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>菜鸟教程(runoob.com)</title>
    </head>
    <body>
        <h1>我的第一个标题</h1>
        <p>我的第一个段落。</p>
    </body>
    </html>
    执行 server.js 的控制台输出信息如下：
    
    Server running at http://127.0.0.1:8080/
    Request for /index.html received.   # 客户端请求信息
    ```

* Express框架

  * 一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。使用 Express 可以快速地搭建一个完整功能的网站。

  * Express 框架核心特性：

    - 可以设置中间件来响应 HTTP 请求。
    - 定义了路由表用于执行不同的 HTTP 请求动作。
    - 可以通过向模板传递参数来动态渲染 HTML 页面。

  * Express框架实例

    * ```
      //express_demo.js 文件
      var express = require('express');
      var app = express();
       
      app.get('/', function (req, res) {
         res.send('Hello World');
      })
       
      var server = app.listen(8081, function () {
       
        var host = server.address().address
        var port = server.address().port
       
        console.log("应用实例，访问地址为 http://%s:%s", host, port)
       
      })
      执行以上代码：
      
      $ node express_demo.js 
      应用实例，访问地址为 http://0.0.0.0:8081
      ```
  
* RESTful API

  * REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful

* 多进程

* JXcore库未安装

* Node.js连接MySQl

* Node.js 连接 MongoDB

* ## Node.js --2021.6.30

  * CommonJS是一个项目，其目标是为JavaScript在网页浏览器之外创建模块约定。创建这个项目的主要原因是当时缺乏普遍可接受形式的JavaScript脚本模块单元，模块在与运行JavaScript脚本的常规网页浏览器所提供的不同的环境下可以重复使用。

  * 众所周知，在Netscape设计出JavaScript后的短短几个月，JavaScript事实上已经是前端开发的唯一标准。后来，微软通过IE击败了Netscape后一统桌面，结果几年时间，浏览器毫无进步。（2001年推出的古老的IE 6到今天仍然有人在使用！）

  * WebKit 是一个开源的浏览器引擎

  * Chrome浏览器是跨Windows和Mac平台的，并且，Google认为要运行现代Web应用，浏览器必须有一个性能非常强劲的JavaScript引擎，于是Google自己开发了一个高性能JavaScript引擎，名字叫V8，以BSD许可证开源。

  * 于高性能，异步IO、事件驱动

  * 同步、异步IO

    * linux系统中，所有的设备读写都可以看做文件的读写来操作，对文件的读写一般要经过内核态和用户态的切换，**正因为有切换才导致了IO有同步和异步的说法**。
    * 当请求被阻塞，就是同步IO，否则就是异步IO
    * 同步IO指的是用户进程触发I/O操作并等待或者轮询的去查看I/O操作是否就绪。
      同步IO的执行者是IO操作的发起者。
      同步IO需要发起者进行内核态到用户态的数据拷贝过程，所以这里必须阻塞
    * 异步IO是指用户进程触发I/O操作以后就立即返回，继续开始做自己的事情，而当I/O操作已经完成的时候会得到I/O完成的通知。
      异步IO的执行者是内核线程，内核线程将数据从内核态拷贝到用户态，所以这里没哟阻塞

  * 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

  * Node.js 不是一门语言也不是框架，它只是基于 Google V8 引擎的 JavaScript 运行时环境，同时结合 Libuv 扩展了 JavaScript 功能，使之支持 io、fs 等只有语言才有的特性，使得 JavaScript 能够同时具有 DOM 操作(浏览器)和 I/O、文件读写、操作数据库(服务器端)等能力，是目前最简单的全栈式语言。

  * Node.js通常被用来开发低延迟的网络应用，也就是那些需要在服务器端环境和前端实时收集和交换数据的应用（API、即时聊天、微服务）。阿里巴巴、腾讯、Qunar、百度、PayPal、道琼斯、沃尔玛和 LinkedIn 都采用了 Node.js 框架搭建应用。

  * Node.js 经常被人们吐槽的一点就是：回调太多难于控制（俗称回调地狱）和 CPU 密集任务处理的不是很好。

  * 《Node.js in action》一书里说，Node.js 所针对的应用程序有一个专门的简称：DIRT。它表示数据密集型实时（data-intensive real-time）程序。因为 Node.js 自身在 I/O 上非常轻量，它善于将数据从一个管道混排或代理到另一个管道上，这能在处理大量请求时持有很多开放的连接，并且只占用一小部分内存。它的设计目标是保证响应能力，跟浏览器一样。这话不假，但在今天来看，DIRT 还是范围小了。其实 DIRT 本质上说的 I/O 处理的都算，但随着大前端的发展，Node.js 已经不再只是 I/O 处理相关，而是更加的“Node”！

  * 回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

  * Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。

  * 

    

  

