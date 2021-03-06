究竟get和post有什么样的区别呢？

1、get是从服务器上获取数据；而post是向服务器发送数据；

2、get传送数据量较小，不能大于2kb;而post传送量大，不受限制；

3、get安全性非常低，post安全性较高，但执行效率比post好；

4、get是把参数数据队列加到提交表单的Action属性，所指的url中在url中可以看到；而post通过HTTP post机制，放在body里 用户看不到；

仅仅只有这些吗？NO NO NO!知道这些还远远不够，那么get和post究竟还有什么区别呢？

> **其实get和post本质上没有区别**，他们都是http协议中请求的方法，底层的实现都是基于TCP/IP，上述的所谓区别，只是浏览器厂家根据约定，做得限制而已。   

### http请求最初设定了8种方法，这8种方法本质没有区别，只是让请求更加有语义而已。

- 1、options 返回服务器所支持的请求方法

- 2、get向服务器获取指定资源

- 3、head和get一致，只不过响应体不返回，只返回响应头
- 4、post向服务器提交数据，数据放在请求体里

- 5、put和post相似，只是添加了幂属性，常用于更新

- 6、delete用于删除服务器指定资源
- 7、trace 回显服务器端收到的请求，测试的时候一般会用到这个

- 8、connect预留，暂无使用

### Restful API：

服务端根据不同的请求方式，可以做不同的处理，同时，根据不同的请求，还可以设计出不同风格的应用程序接口，这就引出了Representational State Transfer，英文缩写就是REST，中文意思是表述性状态转移（和没翻译差不多），可以理解为客户端和服务端的交互形式。而符合这种交互形式的接口设计，就被叫做RESTful API。这种风格有如下特点：

- 使用名词而不使用动词 例如：/getStudent 或者 /searchStudents 应该改成 /students
- GET用于查询，PUT、POST、DELETE用于修改

- 使用名词复数不使用单数

- 在HTTP请求的head体里定义序列化类型  例如：Content-Type:application/json

- 求的集合应设定好过滤条件、排序、字段、分页   例如：/students?page=1&size=10

- 接口要版本化   例如：/api/v1/students

- 要有HTTP状态码

- 允许重写HTTP请求方法

- HTTP状态码


### HTTP协议中提供了好多状态码，列举我们常用的：

1. 200 返回正常

2. 304 服务端资源无变化，可使用缓存资源
3. 400 请求参数不合法
4. 401 未认证

5. 403 服务端禁止访问该资源

6. 404 服务端未找到该资源
7. 500 服务端异常

 

### get和post的重大区别：

GET产生一个TCP数据包；POST产生两个TCP数据包。

对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；

而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

也就是说，GET只需要汽车跑一趟就把货送到了，而POST得跑两趟，第一趟，先去和服务器打个招呼“嗨，我等下要送一批货来，你们打开门迎接我”，然后再回头把货送过去。

因为POST需要两步，时间上消耗的要多一点，看起来GET比POST更有效。因此Yahoo团队有推荐用GET替换POST来优化网站性能。但这是一个坑！跳入需谨慎。为什么？

1. GET与POST都有自己的语义，不能随便混用。

2. 据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点。

3. 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。