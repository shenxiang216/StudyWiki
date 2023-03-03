1、什么是Ajax和JSON，它们的优缺点

　　Ajax是全称是asynchronous JavaScript andXML，即异步JavaScript和xml，用于在Web页面中实现异步数据交互，实现页面局部刷新

　　优点：可以实现异步通信效果，页面局部刷新，带来更好的用户体验

　　JSON是一种轻量级的数据交换格式，看着像对象，本质是字符串

　　优点：轻量级、易于人的阅读和编写，便于js解析，支持复合数据类型

 

2、ajax的交互流程有哪几步？

　　1）创建ajax对象

　　　　xhr = new XMLHttpRequest

　　2）规定请求地址

　　　　xhr.open(method,url,async)

　　3）等待服务器相应

　　　　xhr.onload

　　4）向服务器发送请求

　　　　xhr.send()

 

3、AJAX应用和传统Web应用有什么不同

　　在传统的Js中，如果想发送客户端信息到服务器，需要建立一个HTML 表单然后GET或者POST数据到服务器端

　　用户需要点击提交按钮来发送数据信息，然后等待服务器响应请求，页面重新加载

　　使用AJAX技术，就可以使Javascript通过XMLHttpRequest对象直接与服务器进行交互

 

4、XMLHttpRequest对象在IE和Firefox中创建方式有没有不同？

　　IE中通过new ActiveXObject()得到，Firefox中通过newXMLHttpRequest()得到

　　使用jquery封装好的ajax，会避免这些问题

 

5、ajax如何解决浏览器缓存问题

　　1）在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")

　　2）在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")

　　3）在URL后面加上一个随机数： "fresh=" + Math.random();

　　4）在URL后面加上时间戳："nowtime=" + new Date().getTime()

　　5）在jq ajax下，使用 $.ajaxSetup({cache:false}) 这样就不会保存缓存记录

 

6、简述ajax的优缺点

　　优点：

　　1）无刷新更新数据（在不刷新整个页面的情况下维持与服务器通信）

　　2）异步与服务器通信（使用异步的方式与服务器通信，不打断用户的操作）

　　3）前端和后端负载均衡（将一些后端的工作交给前端，减少服务器与宽度的负担）

　　4）界面和应用相分离（ajax将界面和应用分离也就是数据与呈现相分离）

　　缺点：

　　1）ajax不支持浏览器back按钮

　　2）安全问题 Aajax暴露了与服务器交互的细节

　　3）对搜索引擎的支持比较弱

　　4）破坏了Back与History后退按钮的正常行为等浏览器机制

 

7、阐述一下异步加载JS

　　1）异步加载的方案： 动态插入 script 标签

　　2）通过 ajax 去获取 js 代码，然后通过 eval 执行

　　3）script 标签上添加 defer 或者 async 属性

　　4）创建并插入 iframe，让它异步执行 js

 

8、json字符串与对象如何相互转换

　　把JSON格式转成对象：JSON.parse()

　　把对象转成标准json：JSON.stringify()

　　使用eval能够把字符串尽量转成js运行的代码 eval('(' + jsonstr + ')') 

　　eval是不安全的（可能会注入不必要的东西），通过new Function('','return'+json)();可以解决该问题

 

9、get与post的区别，什么时候使用post？

　　get和post在HTTP中都代表着请求数据，其中get请求相对来说更简单、快速，效率高些

　　get相对post安全性低

　　get有缓存，post没有

　　get体积小，post可以无限大

　　get的url参数可见，post不可见

　　get只接受ASCII字符的参数数据类型，post没有限制

　　get请求参数会保留历史记录，post中参数不会保留

　　get会被浏览器主动catch，post不会，需要手动设置

　　get在浏览器回退时无害，post会再次提交请求

 

post一般用于修改服务器上的资源，对所发送的信息没有限制。比如

　　1. 无法使用缓存文件（更新服务器上的文件或数据库）
　　2. 向服务器发送大量数据（POST 没有数据量限制）
　　3. 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

 

10、介绍一下XMLHttpRequest对象，他有哪些常用方法和属性

　　XMLHttpRequest是ajax的核心，通过XMLHttpRequest对象，Web开发人员可以在页面加载以后进行页面的局部更新

　　常用的方法：

　　open(get/post,url,是否异步)创建http请求

　　send()发送请求给服务器

　　setRequestHeader()设置头信息（使用post才会用到，get并不需要调用该方法）

　　常用的属性：

　　onreadystatechange 用于监听ajax的工作状态（readyState变化时会调用此方法）

　　readyState 用来存放XMLHttpRequest的状态

　　status 服务器返回的状态码

　　responseText 服务器返回的文本内容

 

11、说下readyState属性是干嘛的，都有哪几个状态

　　readyState属性用来存放XMLHttpRequest的状态，监听从0-4发生不同的变化

　　0：请求未初始化（此时还没有调用open）

　　1：服务器连接已建立，已经发送请求开始监听

　　2：请求已接收，已经收到服务器返回的内容

　　3：请求处理中，解析服务器响应内容

　　4：请求已完成，且响应就绪

 

12、jquery ajax怎么实现,你认为他有什么不足之处

　　

```javascript
$.ajax({
     url:发送请求的地址,
     data:数据的拼接,//发送到服务器的数据
     type:'get',//请求方式，默认get请求
     dataType:'json',//服务器返回的数据类型
     async:true,//是否异步，默认true
     cache:false,//设置为 false 将不会从浏览器缓存中加载请求信息
     success:function(){},//请求成功后的回调函数
     error: function(){}//请求失败时调用此函数
})
```

　　不足之处：

　　（1）针对MVC的编程,不符合现在前端MVVM的浪潮

　　（2）基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案

 

13、说一下同步和异步的区别

　　同步会阻塞，异步不会阻塞

　　同步：程序运行从上而下，浏览器必须把这个任务执行完毕，才能继续执行下一个任务

　　异步：程序运行从上而下，浏览器任务没有执行完，但是可以继续执行下一行代码

 

14、解释一下 JavaScript的同源策略

　　同源策略是客户端脚本的安全度量标准，为了防止某个文档或脚本从多个不同源装载

　　同源策略是一种安全协议，指一段脚本只能读取来自同一来源的窗口和文档的属性

　　所谓同源就是同域名、同协议、同端口，只有同源的地址才能相互通过ajax方式请求

 

15、如何解决跨域问题？

　　跨域的概念：协议、域名、端口都相同才同域，否则都是跨域

　　解决跨域问题：

　　1）使用JSONP（json+padding）把数据内填充起来

　　2）CORS方式（跨域资源共享），在后端上配置可跨域

　　3）服务器代理，通过服务器的文件能访问第三方资源

 

16、解释jsonp的原理

　　ajax请求受同源策略影响，不允许进行跨域请求，而script标签src属性中的链接却可以访问跨域的js脚本，利用这个特性，服务端不再返回JSON格式的数据，

　　而是返回一段调用某个函数的js代码，在src中进行了调用，这样实现了跨域。

 

17、请问jsonp是不是ajax中实现跨域访问的技术

　　jsonp不是AJAX中实现跨域访问的技术

　　jsonp没有使用XMLHttpRequest对象

　　jsonp只是一种跨域的协议

　　jsonp只支持Get方式

 

18、页面编码和被请求的资源编码如果不一致如何处理？

　　对于ajax请求传递的参数，如果是get请求，参数传递中文，在有些浏览器会乱码

　　不同的浏览器对参数编码的处理方式不同，所以对于get请求的参数需要使用 encodeURIComponent函数对参数进行编码处理

　　于post请求不需要进行编码

 

19、AJAX请求总共有多少种CALLBACK

　　总共有八种Callback

　　onSuccess、onFailure、onUninitialized、onLoading

　　onLoaded、onInteractive、onComplete、onException

 

20、拿到数据怎么区分是ajax还是jsonp

　　ajax: {}

　　jsonp:fn({})

　　ajax的数据jsonp不能用，jsonp的数据ajax是可以用的

　　jsonp本质是通过URL的方式进行请求的，所以它是get方式请求，没有post