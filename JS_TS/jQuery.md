#### 简介

jQuery 是一个 JavaScript 库。

jQuery 极大地简化了 JavaScript 编程。

jQuery 库可以通过一行简单的标记被添加到网页中。

jQuery是一个JavaScript函数库。

jQuery是一个轻量级的"写的少，做的多"的JavaScript库。

jQuery库包含以下功能：

- HTML 元素选取
- HTML 元素操作
- CSS 操作
- HTML 事件函数
- JavaScript 特效和动画
- HTML DOM 遍历和修改
- AJAX
- Utilities

**提示：** 除此之外，Jquery还提供了大量的插件。

## 网页中添加 jQuery

- 从 [jquery.com](http://jquery.com/download/) 下载 jQuery 库

- 从 CDN 中载入 jQuery, 如从 Google 中加载 jQuery 

- ## 菜鸟CDN

  <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
  </script>`

- ## 百度 CDN:

  <head> <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"> </script> </head>

  
  

  

  ## 又拍云 CDN:

  <head> <script src="https://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.2.min.js"> </script> </head>

  
  

  

  ## 新浪 CDN:

  <head> <script src="https://lib.sinaapp.com/js/jquery/2.0.2/jquery-2.0.2.min.js"> </script> </head>

  
  

  

  ## Google CDN:（在中国不稳定）

  <head> <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"> </script> </head>

## jQuery 语法

jQuery 语法是通过选取 HTML 元素，并对选取的元素执行某些操作。

基础语法： `$(selector).action()`

- 美元符号定义 jQuery
- 选择符（selector）"查询"和"查找" HTML 元素
- jQuery 的 action() 执行对元素的操作

实例:

- $(this).hide() - 隐藏当前元素
- $("p").hide() - 隐藏所有 <p> 元素
- $("p.test").hide() - 隐藏所有 class="test" 的 <p> 元素
- $("#test").hide() - 隐藏 id="test" 的元素

## 文档就绪事件

您也许已经注意到在我们的实例中的所有 jQuery 函数位于一个 document ready 函数中：

$(document).ready(function(){    // 开始写 jQuery 代码...  });

这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作。

如果在文档没有完全加载之前就运行函数，操作可能失败。下面是两个具体的例子：

- 试图隐藏一个不存在的元素
- 获得未完全加载的图像的大小

## jQuery 入口函数:

```
$(document).ready(function(){
    // 执行代码
});
或者
$(function(){
    // 执行代码
});
```

## jQuery 选择器

### 元素选择器

用户点击按钮后，所有 <p> 元素都隐藏：

```javascript
$(document).ready(function(){  
    $("button").click(function(){  
        $("p").hide(); 
    }); 
});


```

### #id 选择器

当用户点击按钮后，有 id="test" 属性的元素将被隐藏：

```javascript
$(document).ready(function(){  
    $("button").click(function(){  
    $("#test").hide(); 
    }); 
});
```

### .class 选择器

jQuery 类选择器可以通过指定的 class 查找元素。

```javascript
$(document).ready(function(){
  $("button").click(function(){
    $(".test").hide();
  });
});
```

| 语法                     | 描述                                                    |      |
| :----------------------- | :------------------------------------------------------ | :--- |
| $("*")                   | 选取所有元素                                            |      |
| $(this)                  | 选取当前 HTML 元素                                      |      |
| $("p.intro")             | 选取 class 为 intro 的 <p> 元素                         |      |
| $("p:first")             | 选取第一个 <p> 元素                                     |      |
| $("ul li:first")         | 选取第一个 <ul> 元素的第一个 <li> 元素                  |      |
| $("ul li:first-child")   | 选取每个 <ul> 元素的第一个 <li> 元素                    |      |
| $("[href]")              | 选取带有 href 属性的元素                                |      |
| $("a[target='_blank']")  | 选取所有 target 属性值等于 "_blank" 的 <a> 元素         |      |
| $("a[target!='_blank']") | 选取所有 target 属性值不等于 "_blank" 的 <a> 元素       |      |
| $(":button")             | 选取所有 type="button" 的 <input> 元素 和 <button> 元素 |      |
| $("tr:even")             | 选取偶数位置的 <tr> 元素                                |      |
| $("tr:odd")              | 选取奇数位置的 <tr> 元素                                |      |

## 什么是事件？

页面对不同访问者的响应叫做事件。

事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。

实例：

- 在元素上移动鼠标。
- 选取单选按钮
- 点击元素

在事件中经常使用术语"触发"（或"激发"）例如： "当您按下按键时触发 keypress 事件"。

常见 DOM 事件：

| 鼠标事件                                                     | 键盘事件                                                     | 表单事件                                                  | 文档/窗口事件                                             |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------- |
| [click](https://www.runoob.com/jquery/event-click.html)      | [keypress](https://www.runoob.com/jquery/event-keypress.html) | [submit](https://www.runoob.com/jquery/event-submit.html) | [load](https://www.runoob.com/jquery/event-load.html)     |
| [dblclick](https://www.runoob.com/jquery/event-dblclick.html) | [keydown](https://www.runoob.com/jquery/event-keydown.html)  | [change](https://www.runoob.com/jquery/event-change.html) | [resize](https://www.runoob.com/jquery/event-resize.html) |
| [mouseenter](https://www.runoob.com/jquery/event-mouseenter.html) | [keyup](https://www.runoob.com/jquery/event-keyup.html)      | [focus](https://www.runoob.com/jquery/event-focus.html)   | [scroll](https://www.runoob.com/jquery/event-scroll.html) |
| [mouseleave](https://www.runoob.com/jquery/event-mouseleave.html) |                                                              | [blur](https://www.runoob.com/jquery/event-blur.html)     | [unload](https://www.runoob.com/jquery/event-unload.html) |
| [hover](https://www.runoob.com/jquery/event-hover.html)      |                                                              |                                                           |                                                           |