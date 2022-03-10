### 一、关于DTD

HTML5 不基于 SGML，所以不需要引用 DTD（HTML 4.01 基于 SGML）

### 二、HTML5结构标签

- <header> ：标记定义一个页面或一个区域的头部
- <nav> 标记定义导航链接

- <section> 标记定义一个区域
- <aside> 标记定义页面内容部分的侧边栏

- <article> 标记定义一篇文章
- <hgroup> 标记定义文件中一个区块的相关信息
- <figure> 标记定义一组媒体内容以及它们的标题
- <figcaption>标记定义 figure 元素的标题。
- <dialog> 标记定义一个对话框(会话框)类似微信

- <footer> 标记定义一个页面或一个区域的底部

> ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/7/2/16bb28ce64c66e7f~tplv-t2oaga2asx-watermark.awebp)



### 三、HTML5多媒体标签



**video（视频）**

*兼容性：*

- safari支持mp4、不支持webm和ogv
- ie8（包含）以下都不支持 video 标签
- ie9 支持 video 标签（但只支持 mp4 ）

```
<video src="..."
       autoplay="autoplay"
       controls="controls"
       loop="loop"
       width="500"
       height="500"
       poster="..."
       muted>

//其中loop设置循环 poster设置封面 muted静音

```



**audio（音频）**

*兼容性：*

- safari支持mp3和wav、不支持ogg
- JS中new Audia() 等同于 html 上加一个 <audio></audio>标签
- chrome和opera不能自动播放，需要一个页面元素上的交互才可以
- width / height 属性没有作用，必须使用 style 标签里面的样式去控制它
- 为了提升客户的体验度，可以在audio的开始和结束标签之间添加文字
- <source> 标是为媒介元素定义媒介资源，不可以在<source>开始标签里添加，而且<source> 标签是单标签，没有结束标签。

```
<audio src="..."
       autoplay="autoplay"
       controls="controls"
       loop="loop"
       width="500"
       height="500">

```

**source：媒介元素（音视频）**

```
<video autoplay="autoplay"
       controls="controls"
       loop="loop"
       width="500"
       height="500">
    <source src="..." type="video/mp4"
</video>
embed：嵌入插件（音视频）
```

```
<embed src="..."
       type="audio/mp3"
       width="300" 
       height="300" />

```



### 四、HTML5的Web应用标签

- Menu
  <menu> 命令列表（**目前所有主流浏览器都不支持**）
  <menuitem> menu命令列表标签（只有FireFox8.0+支持）
  <command> menu标记定义一个命令按钮（只有IE9支持）
- 状态标签
  <meter> 状态标签(实时状态显示：气压、气温)C、O
  <progress> 状态标签 (任务过程：安装、加载) C、F、O
- 列表标签
  <datalist> 为input标记定义一个下拉列表,配合option F、O
  <details> 标记定义一个元素的详细内容 ，配合summary C



### 五、HTML5其他标签

- <ruby> 标记定义注释或音标
- <rp> 告诉那些不支持 ruby元素的浏览器如何去显示
- <rt> 标记定义对ruby的注释内容文本
- <mark> 标记定义有标记的文本 (黄色选中状态)
- <output> 标记定义一些输出类型，计算表单结果配合oninput事件
- <keygen> 标记定义表单里一个生成的键值(加密信息传送)
- <time> 标记定义一个日期/时间，目前所有主流浏览器都不支持



### 六、HTML5重定义标签

（显示不变，只是表达的含义进行了重新定义的标签）

- <b> 代表内联文本，通常是粗体，没有传递表示重要的意思

- <i> 代表内联文本，通常是斜体，没有传递表示重要的意思

- <dd> 可以同details与figure一同使用，定义包含文本，dialog也可用

- <dt> 可以同details与figure一同使用，汇总细节，dialog也可用

- 

  表示主题结束，而不是水平线，虽然显示相同

- <menu> 重新定义用户界面的菜单，配合command或者menuitem使用

- <small> 表示小字体，例如打印注释或者法律条款

- <strong>表示重要性而不是强调符号



### 七、HTML5中Input新增的type

- email

- url

- number

- range

- Date picker：

  Date —— 选取日、月、年

  Month —— 选取月、年

  Week —— 选取周和年

  Time —— 选取时间（小时和分钟）

  Datetime —— 选取时间、日、月、年（UTC 时间）

  Datetime-local —— 选取时间、日、月、年（本地时间）

- search

- color

- tel



### 八、HTML5表单属性

- autocomplete：自动完成，适用于 <form> 标签，以及以下类型的 <input> 标签：
  text, search, url, telephone, email, password, datepickers, range, color。
  用法：<form autocomplete="on“></form>或者单独在input中用off
- autofocus：自动地获得焦点，适用于所有 <input> 标签的类型
  用法：<input autofocus="autofocus" />
- multiple：可选择多个值，适用于<input>中type为email和file
  用法：<input type="file" multiple="multiple" />
- placeholder：适用于<input>中type为：text, search, url, telephone, email, password
- required：规定不能为空，适用于以下类型的 <input> 标签：
  text, search, url, telephone, email, password, date pickers, number, checkbox, radio, file
  用法：<input type="text" required="required" />



### 九、HTML5链接属性

- size
  <link rel=“icon” href=“icon.gif” type=“image/gif” size=“16x16”>
- target
  
  <base href=“http://localhost/” target=“_blank”>
- 超链接
  a：media=""（表示对设备进行优化，handhelp对“手持“设备进行支持，tv对”电视）；
  a：hreflang="zh"（设置语言，这里设置语言是中文）；
  a：ref=“external”（设置超链接的引用，这里超链接为外部链接）



### 十、HTML5其他属性

- defer:加载完脚本后并不执行，而是等整个页面加载完之后再执行
  
  <script defer src=“URL”></script>
- async:加载完脚本后立刻执行，不用等整个页面都加载完，属于异步执行。
  
  <script async src=“URL”></script>
- Start —— 起始值
- Reversed —— 倒叙排列
  <ol start=“10” reversed>
  <li>Html</li>
  <li>Css</li>
  <li>JavaScript</li>
  </ol>
- manifest=“cache.manifest”（定义页面离线应用文件）
  <html manifest="cache.manifest">

## 全局属性是可与所有 HTML 元素一起使用的属性。

| 属性                                                         | 描述                                                   |
| :----------------------------------------------------------- | :----------------------------------------------------- |
| [accesskey](https://www.w3school.com.cn/tags/att_standard_accesskey.asp) | 规定激活元素的快捷键。                                 |
| [class](https://www.w3school.com.cn/tags/att_standard_class.asp) | 规定元素的一个或多个类名（引用样式表中的类）。         |
| [contenteditable](https://www.w3school.com.cn/tags/att_global_contenteditable.asp) | 规定元素内容是否可编辑。                               |
| [contextmenu](https://www.w3school.com.cn/tags/att_global_contextmenu.asp) | 规定元素的上下文菜单。上下文菜单在用户点击元素时显示。 |
| [data-*](https://www.w3school.com.cn/tags/att_global_data.asp) | 用于存储页面或应用程序的私有定制数据。                 |
| [dir](https://www.w3school.com.cn/tags/att_standard_dir.asp) | 规定元素中内容的文本方向。                             |
| [draggable](https://www.w3school.com.cn/tags/att_global_draggable.asp) | 规定元素是否可拖动。                                   |
| [dropzone](https://www.w3school.com.cn/tags/att_global_dropzone.asp) | 规定在拖动被拖动数据时是否进行复制、移动或链接。       |
| [hidden](https://www.w3school.com.cn/tags/att_global_hidden.asp) | 规定元素仍未或不再相关。                               |
| [id](https://www.w3school.com.cn/tags/att_standard_id.asp)   | 规定元素的唯一 id。                                    |
| [lang](https://www.w3school.com.cn/tags/att_standard_lang.asp) | 规定元素内容的语言。                                   |
| [spellcheck](https://www.w3school.com.cn/tags/att_global_spellcheck.asp) | 规定是否对元素进行拼写和语法检查。                     |
| [style](https://www.w3school.com.cn/tags/att_standard_style.asp) | 规定元素的行内 CSS 样式。                              |
| [tabindex](https://www.w3school.com.cn/tags/att_standard_tabindex.asp) | 规定元素的 tab 键次序。                                |
| [title](https://www.w3school.com.cn/tags/att_standard_title.asp) | 规定有关元素的额外信息。                               |
| [translate](https://www.w3school.com.cn/tags/att_global_translate.asp) | 规定是否应该翻译元素内容。                             |