* 表格标记的常用属性有9个： cellpadding：单元格边沿与其内容之间的空白 cellspacing：单元格之间的空白 border：表格边框的宽度（也可以理解我边框的粗细程度） height：表格高度 width：表格的宽度 bgcolor：表格背景颜色 align：表格相对周围元素的对齐方式（也可以理解为表格中的文字内容的对齐方式） frame：规定外侧边框哪些部分是可见的 rules：规定内侧边框哪些部分是可见的

* DOM中的事件对象：（符合W3C标准）

    preventDefault()     取消事件默认行为

    stopImmediatePropagation() 取消事件冒泡同时阻止当前节点上的事件处理程序被调用。

    stopPropagation()    取消事件冒泡对当前节点无影响。

  IE中的事件对象：

    cancelBubble()      取消事件冒泡

    returnValue()       取消事件默认行为

* 以下哪个不是 HTML5 中使用的媒体元素？

  正确答案: D   你的答案: D (正确)
  ```
  <source>
  <audio>
  <track>
  <time>
  ```

* URL	超链接的 URL。可能的值：
  绝对 URL - 指向另一个站点（比如 href="http://www.example.com/index.htm"）
  相对 URL - 指向站点内的某个文件（href="index.htm"）
  锚 URL - 指向页面中的锚（href="#top"）

* 在做一份调查报告时，要求将问题文类，同一表单内的数据在一组显示，并表明此类型的名称，如何将相同类型的表单进行分组（      ）
  正确答案: A   你的答案: B (错误)

  ```
  <fieldset><legend>类型名</legend>内容显示</fieldset>
  <fieldset><label>类型名</label>内容显示</fieldset>
  <tab><legend>类型名</legend>内容显示</tab>
  <tab><label>类型名</label>内容显示</tab>
  ```

  例子：

  ```
  <form>
    <fieldset>
      <legend>健康信息</legend>
      身高：<input type="text" />
      体重：<input type="text" />
    </fieldset>
  </form>
  
  legend ：为 fieldset 元素定义标题（caption）
  fieldset ：将表单内的相关元素分组。
  tab：有这个标签？
  ```

* \1. <cite>:用来定义作品的标题；

  \2. <abbr>:用来指示标签简写；

  3.<base>:为页面上的所有的相对链接规定默认URL或者默认目标；

  4.<arconym>已经抛弃。

* 哪个 HTML5 元素用于显示已知范围内的标量测量？

  正确答案: D   你的答案: A (错误)
  <gauge>
  <range>
  <measure>
  <meter>

  <meter> 标签定义已知范围或分数值内的标量测量。也被称为 gauge（尺度）。

  例子：磁盘用量、查询结果的相关性，等等。

  **注释：**<meter> 标签不应用于指示进度（在进度条中）。如果标记进度条，请使用 <progress> 标签。

* <track> 标签为诸如 video 元素之类的媒介规定外部文本轨道。

  用于规定字幕文件或其他包含文本的文件，当媒介播放时，这些文件是可见的。

  <track> 标签是 HTML 5 中的新标签。
  目前所有主流浏览器都不支持 <track> 标签

* html5中不再支持的元素有：
  1、acronym(建议abbr) ： 定义首字母缩写
  2、applet(建议object)： 定义 applet
  3、basefont(使用css控制)
  4、big(使用css控制) ：定义大号文本
  5、center(使用css控制)： 定义居中的文本
  6、font(使用css控制)
  7、strike(使用del) ：定义加删除线的文本
  8、tt（使用css控制）： 定义打字机文本。
  9、u(使用css控制) ：定义下划线文本
  10、frame(建议iframe)： 定义子窗口（框架）。
  11、frameset ：定义框架的集
  12、noframes ：定义 noframe 部分
  13、dir ：定义目录列表
  14、<xmp>： 定义预格式文本

  **废除的元素**

  1、能用css代替的元素 
  basefont、big、center、font、s、strike、tt、u。这些元素纯粹是为画面展示服务的，HTML5中提倡把画面展示性功能放在css中统一编辑。

  2、不再使用frame框架。

  frameset、frame、noframes。HTML5中不支持frame框架，只支持iframe框架，或者用服务器方创建的由多个页面组成的符合页面的形式，删除以上这三个标签。

  3、只有部分浏览器支持的元素

  applet、bgsound、blink、marquee等标签。

* slideUp()和slideDown都是jQuery函数，slideUp()通过使用滑动效果，隐藏被选元素，如果元素已显示出来的话。slideDown() 方法通过使用滑动效果，显示隐藏的被选元素。

* ```
  给定下面的 HTML 代码：
  
  <div id=”wrapper”>
  
  
  <div class=”wText”>…</div>…<!—more wText items here -->
  
  <div class=”wImg”>…</div>…<!—more wImg items here -->
  
  <div class=”wVideo”>…</div>…<!—more wVideo items here -->
  
  </div>
  怎么能够取得 ”wrapper” 中全部项的集合？
  正确答案: C   你的答案: A (错误)
  $(‘#wrapper’).children();
  $(‘#wrapper’).html();
  $(‘#wrapper’).contents();
  $(‘#wrapper’).find(“all”);
  挺好第一个题。
  $(‘#wrapper’).children();  //（只沿着 DOM 树向下遍历单一层级）查询直接的子元素。而不管子元素的子元素。
  $(‘#wrapper’).html();  //返回的是dom结构。而不是集合
  $(‘#wrapper’).contents();
  $(‘#wrapper’).find(“all”);   //并没有all这个元素
  ```

* 下面哪些特性不是HTML5新引入的特性：(        )
  正确答案: C E   你的答案: B D F (错误)
  audio和video支持
  Canvas
  AJAX
  localStorage
  ES6
  WebSocket

* 以下说法中正确的是
  正确答案: A C   你的答案: C (错误)
  canvas 中绘制的元素不可以通过浏览器提供的接口获取到。
  SVG 中绘制的元素不可以通过浏览器提供的接口获取到。
  html 中a标签 target 属性的默认取值是 _self，默认在当前窗口打开。
  为了优化网页的SEO效果，常用 javascript 动态生成网页的title、description、keyword。