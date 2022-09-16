# AJAX

## 一、前端开发的演变

- **静态网页阶段**

  这个阶段的网页没有数据交互，所有的前端数据都由后端生成、维护，前端只负责纯粹的展示功能。如果需要更新页面内容，必须重新加载整个网页。

  带来的问题是：当我们只希望更新页面中一小部分的内容时，会因为重载网页而对页面中的所有资源也重新加载一遍，不仅用户体验不友好，还增加了服务器的负担。

![img](https://pic3.zhimg.com/50/v2-5da47c30d308807581e5140b39f5632e_hd.jpg?source=1940ef5c)

- **Ajax 阶段**

  为了解决上述问题，在 2004 年诞生了 Ajax 技术，让页面的局部刷新成为了可能，从而改变了前端开发，使得前端不仅仅是展示页面，还可以管理数据并与用户互动。

  Ajax 技术指的是脚本独立向服务器请求数据，拿到数据以后，进行处理并更新网页。整个过程中，后端只是负责提供数据，其他事情都由前端处理，实现了 "获取数据 → 处理数据 → 展示数据" 的完整业务逻辑。

![img](https://pic2.zhimg.com/50/v2-f0d2cde818a59fdf2b803b2f7bfb957d_hd.jpg?source=1940ef5c)



## 二、AJAX技术介绍

### AJAX简介

全称：Asynchronous JavaScript and XML

直译：异步的JavaScript与XML技术

使用JavaScript向服务器提出请求并处理响应而不阻塞用户！

核心对象XMLHTTPRequest。通过这个对象，JavaScript 可在不重载页面的情况与 Web 服务器交换数据，即在不需要刷新页面的情况下，就可以产生局部刷新的效果。

因为Ajax的出现，成为了前端的转折点，从此不再叫「切图仔」。

![img](https://pic4.zhimg.com/50/v2-25b7e11c524cc90ec18982ebdf8087e0_hd.jpg?source=1940ef5c)



> 同步与异步
>
>  关注的是消息通信机制 (synchronous communication/ asynchronous communication)
>
> 所谓同步，就是在发出一个*调用*时，在没有得到结果之前，该*调用*就不返回。但是一旦调用返回，就得到返回值了。换句话说，就是由*调用者*主动等待这个*调用*的结果。
>
> 而异步则是相反，*调用*在发出之后，这个调用就直接返回了，所以没有返回结果。换句话说，当一个异步过程调用发出后，调用者不会立刻得到结果。而是在*调用*发出后，*被调用者*通过状态、通知来通知调用者，或通过回调函数处理这个调用。

### Ajax的工作原理

接下来来张正儿八经的知识点的图。在用户界面和服务器之间加上一个Ajax引擎，便是实现异步的关键点。

![img](https://pic2.zhimg.com/50/v2-c0415edd0ed2db9f279ae78f2409021c_hd.jpg?source=1940ef5c)

### Ajax的一个例子

这里就用“勾诶斯”来实例化一个简单的Ajax吧。

```js
function AjaxRequest(){
    //实例化一个Ajax对象（经典new对象）
    var xhr = XMLHttpRequest();
    //open方法，后面细讲
    xhr.open("GET","某个url",true)
    //将请求发到服务器去，跟open一起用
    xhr.send();
    //这里做两个简单判断，一是看访问进程，二是看访问结果
    xhr.onreadystatechange = function(){
        // 当 readyState 等于 4 且状态为正常时，表示响应已就绪
        if (xhr.readyState === 4) {
            alert("流程给走完了");
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                alert("访问也没啥问题");
            }
        }                
    }
}
```

### Ajax的优缺点

**Ajax 的优点：**

1. 最大的优点是页面无刷新更新，用户的体验非常好；
2. 使用异步方式与服务器通信，具有更迅速的响应能力；
3. 可以将一些服务器工作转移到客户端，利用客户端资源来处理，减轻服务器和带宽的压力，节约空间和带宽租用成本；
4. 技术标准化，并被浏览器广泛支持，不需要下载插件或者小程序；
5. Ajax 可使因特网应用程序更小、更快、更友好。

**Ajax 的缺点：**

1. Ajax 不支持浏览器 back 返回按钮；
2. 有安全问题，Ajax 暴露了与服务器交互的细节；
3. 对搜索引擎不友好；
4. 破坏了程序的异常机制；
5. 不容易调试。

以上都是网上找的说法，优点的中心思想**快，方便，节约空间、兼容性高**，缺点的话就是**不太安全，偶尔也不太稳定**，但是写代码嘛，找bug才是快乐源泉呐。

> 上面的例子其实也就把Ajax和核心部分大致地体现出来了，接下来我们就一行一行代码的看看。

### XMLHttpRequest()

这玩意儿其实就是个类，那么对面向对象有那么一丁点儿感觉的应该都知道，第一件要做的事儿就是先去实例化一下这个对象。毕竟是前端的东西，浏览器几经更迭，自然有些许跟不上时代的节奏。

![img](https://pic1.zhimg.com/50/v2-7029dd9eaeabe725c2bf46759df97ff7_hd.jpg?source=1940ef5c)

但好在，IE7以后就都没问题了，但为了严谨，也为了使用方便，这儿就直接给大家整个可以兼容的代码，以后实例化直接拿去用就完事儿。

```js
// 三元表达式,其中问号前面的是条件,当条件是正确的就执行冒号前面的语句,否则执行冒号后面的语句
var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
```



### open()方法

实例化的工作已经结束了，那我们用啥子东西去找这个服务器诶，**open()**就来了。

**解析：xhr.open(method, url, async)**

- **method：**

- - 第一个参数用于指定 HTTP 请求的方法，不区分大小写；
  - 该参数可取的值包括："GET"、"POST"、"HEAD"、"PUT"、"OPTIONS"、"DELETE"，其中，"GET" 和 "POST" 是得到广泛支持的请求方法；

- **url：**

- - 第二个参数用于指定 HTTP 请求的 URL 地址，可以是 **绝对URL** 或 **相对URL**；
  - 绝对URL：需要满足 "同源策略"（服务器明确允许跨域请求的情况除外）；
  - 相对URL：即相对于文档的 URL；

- **async：**

- - 第三个参数是可选的，可用布尔值指定脚本是否以异步的方式调用此次 Ajax 请求；
  - 该参数默认为 true，表示异步调用此次 Ajax 请求，不阻塞后续脚本的执行；

前两个参数应该没啥问题，在很多地方都有，第三个参数的话便是之前说的Ajax的核心，即是否异步处理这一块儿，后面等几行代码都说完了再来说一下这个。

### send()方法

既然都已经访问到了服务器，那还不得传点儿东西东西过去？总不能占着茅坑不拉屎嘛。这时候send()方法就出现了。

大家都是上流社会的人，**GET**和**POST**的区别不会不知道吧。

![img](https://pic1.zhimg.com/50/v2-2f6d77817d270ac46f2016a2b61a3d49_hd.jpg?source=1940ef5c)

简单举个 。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "某个url");

// 无请求主体
xhr.send(null);
```

**代码解析：**由于 GET 请求 **绝对** 没有请求主体，所以在调用 send 方法时可以传递 null 或 省略这个参数；

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", "某个url");

// 把 msg 作为请求主体发送
xhr.send(msg);
```

**代码解析：**

1. POST 请求通常都拥有请求主体，可在 send 方法中指定它；
2. POST 请求的请求主体，应该匹配**setRequestHeader**方法所指定的 "Content-Type" 头。



### 服务器什么时候理（响应）我们呢？

![img](https://pic1.zhimg.com/50/v2-bd619bbc9e3349c6cb823a57e4a4be55_hd.jpg?source=1940ef5c)

这里就需要用到**XMLHttpRequest**这个里面一个经典的属性值**readyState**。

**readyState**的值会从0—1—2—3—4地变化。

- 0：初始值，表示请求未初始化，`open`方法尚未调用；
- 1：启动请求，open 方法已经调用，但尚未调用 send 方法；
- 2：请求发送，已经调用 send 方法，但尚未接收到响应；
- 3：接收响应，已经接受到部分响应数据，主要是响应头；
- 4：HTTP 响应完成，已经接收到全部响应数据，而且可以在客户端使用。 
- ![readyState](https://pic2.zhimg.com/80/v2-4b388ee934d477ecedc2942e98a699fd_720w.jpg)

所以其实只有当readyState的值变成4的时候，我们才能认为服务器给我们整明白了。

那么兄弟萌，是不是readyState的值成了4就说明这个过程完全没问题了呢？当然不是，我们在前面的例子中的最后有一个小小的判断，还判断了一个值——**status**。

**status**反映了HTTP 状态码，是用来表示网页服务器响应状态的 3 位数字代码，所有状态码的第一个数字代表了响应的五种状态之一：

- 1xx：临时响应
- 2xx：成功
- 3xx：重定向
- 4xx：请求错误
- 5xx：服务器错误

![img](https://pic4.zhimg.com/50/v2-3865152d21261047de98f62a475e9441_hd.jpg?source=1940ef5c)



当**status**的值控制在200以内或者是304的话，基本上就没啥问题，恭喜通关，如果是其他的值的话估计就快乐不起来了。



### 拿什么型号的箱子来装我们收到的东西呢？

**responseText**属性以字符串的形式存储了响应主体，即：服务器的响应数据。

又来举个 （HTML 文本）

```js
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        // 当响应成功，获取响应数据,将数据赋值给本地
        oView.innerHTML = xhr.responseText;
    }
};

xhr.open("GET", "某个url");
xhr.send();
```

再来举个 （JSON 数据）

```js
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        // 使用JSON.parse把 响应数据转换为json数据
        var res = JSON.parse(xhr.responseText);
        // 将响应数据中的date属性赋值给oTime做内容
        oTime.innerText = res.date;
    }
};

xhr.open("GET", "某个url");
xhr.send();
```

**扩展（一些不那么重要的东西）：**实际上，响应主体有时还可以从`XMLHttpRequest`对象的`response`、`responseXML`属性获取，它们的使用相对不频繁。

- responseText：无论返回的数据类型是什么，响应主体的内容都会保存在`responseText`属性中；
- responseXML：只对 XML 数据有效，若响应主体是非 XML 数据，该属性值为`null`；
- response：通常配合`responseType`使用。若指定了`XMLHttpRequest`实例的`responseType`属性，则将响应内容转换为该属性所指定的格式并返回，否则按默认情况处理。

最后一个 （response 与 responseType 的使用）

```js
var xhr = new XMLHttpRequest();

// 指定响应主体的数据格式为 json
xhr.responseType = "json";

xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        oTime.innerText = xhr.response.date;
    }
};

xhr.open("GET", "某个url");
xhr.send();
```

**值得注意的是：**若指定了`responseType`的值为非 "text" 或 非空最后一个 ，则`responseText`属性就会失效，因此时的响应主体已不再是 "text" 文本形式，继续使用它获取响应主体浏览器会给出相应的报错信息，可自行尝试。

![img](https://pic4.zhimg.com/50/v2-61f872e4694b7eb24053370b21ac9b66_hd.jpg?source=1940ef5c)

然后再給老板们介绍一个小玩意儿——**abort**（中止访问）

```js
var xhr = new XMLHttpRequest();
var timer = null;    // 用于存储定时器标识

xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        clearTimeout(timer);    // 未超时则取消定时器
    }
};

xhr.open("GET", "/statics/demosource/demo_get_json.php");
xhr.send();

// 2秒后中止此次 GET 请求
timer = setTimeout(function(){
    xhr.abort();
}, 2000)
```

至此差不多哈，有关于Ajax的的那点儿用法大家都应该有个初步的了解了，让我们回到最开始的那个问题，关于**open**方法的第三个三参数，我如果头铁一定要整成**False**呢？

也不是不行，也不是不行哈。

简单来说的话就是可以少到判断readyState属性值的步骤，意味着我们了解不到服务器的态度，把send的东西全都堵在了等 **直到 HTTP 请求完成**完成后再整，也就是所谓的同步请求。

emmmmm....

懂得都懂。

最后给各位上流人士整个jQuery的Ajax代码，请老板们以后写这点儿代码的时候旁边一定要来整个高脚杯。

```js
// 使用jQuery发起ajax请求
$.ajax("/statics/demosource/demo_get_json.php", {
    //请求类型
    type: "GET",
    //要发送的数据
    data: {
        country: country,
        city: city
    },
    //数据格式
    dataType: "json",
    //请求成功后执行
    success: function (res) {    // res为响应成功返回的数据
        oIpt_country.innerText = res.params.country;
        oIpt_city.innerText = res.params.city;
    },
    //请求失败后执行
    error: function (res) {    // 这里的res为响应失败返回的数据
        alert("请求失败：" + res.status);
    }
});
```

### Ajax应用场景

> AJAX 就是浏览器提供的一套 API，可以通过 JavaScript 调用，从而实现通过代码控制请 求与响应。实现通过 JavaScript 进行网络编程。

> XML：最早在客户端与服务端之间传递数据时所采用的数据格式

1. 按需获取数据

2. 对用户数据校验

3. 自动更新页面内容

4. 提升用户体验，无刷新的体验



## 三、jquery&axios

### jQuery 中的 AJAX

- jQuery 中有一套专门针对 AJAX 的封装，功能十分完善

**$.ajax()**

- 常用选项参数介绍：
- url：请求地址
- type：请求方法，默认为 `get`
- dataType：服务端响应数据类型
- contentType：请求体内容类型，默认 `application/x-www-form-urlencoded`
- data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递
- timeout：请求超时时间
- beforeSend：请求发起之前触发
- success：请求成功之后触发（响应状态码 200）
- error：请求失败触发
- complete：请求完成触发（不管成功与否）
- get是获取数据，post是添加数据

**GET 请求**

- $.get()
- GET 请求快捷方法
- $.get(url, data, callback)

**POST 请求**

- $.post()
- POST 请求快捷方法
- $.post(url, data, callback)

**其他请求**

- put 更改
- delete 删除

### Axios

- Axios 是目前应用最为广泛的 AJAX 封装库
- Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
- Axios 库
- 地址：[https://unpkg.com/axios/dist/axios.min.js](https://link.zhihu.com/?target=https%3A//unpkg.com/axios/dist/axios.min.js)
- 使用 script 标签引入

**Axios API**

- 可以通过向 axios() 传递相关配置来创建请求
- axios(config) config为对象格式的配置选项
- axios(url, config) config 可选

**常用配置项**

- url 用于请求的服务器 URL，必需
- method 创建请求时使用的方法 (不设置时默认为get)
- baseURL 传递相对 URL 前缀，将自动加在 url 前面
- headers 即将被发送的自定义请求头
- params 即将与请求一起发送的 URL 参数
- data 作为请求主体被发送的数据
- timeout 指定请求超时的毫秒数(0 表示无超时时间)
- responseType 表示服务器响应的数据类型，默认 “json”

**then 和 catch**

```js
axios()
.then(function (response) {
// 正常请求的响应信息对象 response
})
.catch(function (error) {
//捕获错误
})
```

**全局配置默认值**

- 可以指定将被用在各个请求的配置默认值
- axios.defaults.baseURL = 'https://api.example.com';
- axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

**拦截器**

- 在请求或响应被 then 或 catch 处理前拦截它

![img](https://pic4.zhimg.com/80/v2-6683f8d9f6f4e07c90ec04d6abdec3eb_720w.jpg)

**快速请求方法**

- axios.get(url[, config])
- axios.post(url[, data[, config]])
- axios.delete(url[, config])
- axios.put(url[, data[, config]])

### 四、XMLHttpRequest 2.0

- HTML5 中对 XMLHttpRequest 类型全面升级，更易用，更强大

**onload / onprogress**

- xhr.onload 事件：只在请求完成时触发
- xhr.onprogress 事件：只在请求进行中触发

**response** 属性

- 以对象的形式表述响应体，其类型取决于 responseType 的值。你可以尝试设置responseType 的值，以便通过特定的类型请求数据。
- responseType 要在调用 open() 初始化请求之后，在调用 send() 发送请求到服务器之前设置方可生效

**跨域-同源策略**

- 同源策略是浏览器的一种安全策略，所谓同源是指域名，协议，端口完全相同
- 在同源策略下，只有同源的地址才可以相互通过 AJAX 的方式请求。
- 同源或者不同源说的是两个地址之间的关系，不同源地址之间请求我们称之为跨域请求

## 五、思维导图

![ajax](https://pic2.zhimg.com/80/v2-ca0fe93fdd2e49a6e7ee5fee11a7a4a9_720w.jpg)



![同源检测](https://pic1.zhimg.com/80/v2-a5a91946dabbb93ea89ad6cfb8cf989c_720w.jpg)



## 六、常见的状态码

仅记录在 RFC2616 上的 HTTP 状态码就达 40 种，若再加上 WebDAV（RFC4918、5842）和附加 HTTP 状态码 （RFC6585）等扩展，数量就达 60 余种。接下来，我们就介绍一下这些具有代表性的一些状态码。

- 200 表示从客户端发来的请求在服务器端被正常处理了。
- 204 表示请求处理成功，但没有资源返回。
- 301 表示永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源现在所指的URI。
- 302 表示临时性重定向。
- 304 表示客户端发送附带条件的请求时（指采用GET方法的请求报文中包含if-matched,if-modified-since,if-none-match,if-range,if-unmodified-since任一个首部）服务器端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回304Modified（服务器端资源未改变，可直接使用客户端未过期的缓存）
- 400 表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。
- 401 表示未授权（Unauthorized)，当前请求需要用户验证
- 403 表示对请求资源的访问被服务器拒绝了
- 404 表示服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。
- 500 表示服务器端在执行请求时发生了错误。也有可能是Web应用存在的bug或某些临时的故障。
- 503 表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

### GET和POST请求数据区别

- 使用Get请求时,参数在URL中显示,而使用Post方式,则放在send里面
- 使用Get请求发送数据量小,Post请求发送数据量大
- 使用Get请求安全性低，会被缓存，而Post请求反之



## 七、开发挑战及解决方案

- Ajax技术之主要目的在于局部交换客户端及服务器之间的数据。如同传统之主从架构，无可避免的会有部分的业务逻辑会实现在客户端，或部分在客户端部分在服务器。由于业务逻辑可能分散在客户端及服务器，且以不同之程序语言实现，这导致Ajax应用程序极难维护。针对业务逻辑分散的问题，Ajax开发框架大致可分为两类：

- 将业务逻辑及表现层放在浏览器，数据层放在服务器：因为所有的程序以JavaScript执行在客户端，只有需要数据时才向服务器要求服务，此法又称为**胖客户端**（fat client）架构。服务器在此架构下通常仅用于提供及储存数据。此法的好处在于程序员可以充分利用JavaScript搭配业务逻辑来做出特殊的用户接口，以符合终端用户的要求。但是问题也不少，主因在第一，JavaScript语言本身之能力可能不足以处理复杂的业务逻辑。第二，JavaScript的执行性能一向不好。第三，JavaScript访问服务器数据，仍需适当的服务器端程序之配合。

- 将表现层、业务逻辑、及数据层放在服务器，浏览器仅有用户接口引擎（User Interface engine）；此法又称为**瘦客户端**（thin client）架构，或中心服务器（server-centric）架构。浏览器的用户接口引擎仅用于反映服务器的表现层以及传达用户的输入回到服务器的表现层。由浏览器所触发之事件亦送回服务器处理，根据业务逻辑来更新表现层，然后反映回浏览器。因为所有应用程序完全在服务器执行，数据及表现层皆可直接访问，程序员只需使用服务器端相对较成熟之程序语言（如Java语言）即可，不需再学习JavaScript/DOM/CSS，在开发应用程序时相对容易。

- Ajax是以异步的方式向服务器提交需求。对服务器而言，其与传统的提交窗体需求并无不同，而且由于是以异步之方式提交，如果同时有多个Ajax需求及窗体提交需求，将无法保证哪一个需求先获得服务器的响应。这会造成应用程序典型的多进程（process）或多线程（thread）的竞争（racing）问题。程序员因此必须自行处理或在JavaScript里面动手脚以避免这类竞争问题的发生（如Ajax需求未响应之前，先disable提交按钮）

- Google Suggest

  在 2005 年，Google 通过其 Google Suggest 使 AJAX 变得流行起来。

  Google Suggest 使用 AJAX 创造出动态性极强的 web 界面：当您在谷歌的搜索框输入关键字时，JavaScript 会把这些字符发送到服务器，然后服务器会返回一个搜索建议的列表。

> ajax是过时概念了?

ajax并非过时，只是科技发展，ajax被包装起来，以另一种形态出现。

其实通过 XMLHttpRequest或者封装后的框架进行网络请求,这种方式已经有点老旧了，配置和调用方式非常混乱，近几年刚刚出来的Fetch提供了一个更好的替代方法，它不仅提供了一种简单，合乎逻辑的方式来跨网络异步获取资源，而且可以很容易地被其他技术使用。

