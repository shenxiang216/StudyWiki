* HTML5 支持 HTML4 中的所有表单控件？

  正确答案: A   你的答案: B (错误)
  正确
  错误

* DHTML 包含以下哪些内容 ？
  1、HTML

  2、JavaScript

  3、HTML DOM

  4、CSS

  正确答案: C   你的答案: B (错误)
  1 和 2
  3 和 4
  都是
  都不是

* 以下 CSS 选择器，优先级最高的为
  正确答案: D   你的答案: D (正确)
  span:first-child
  #username
  .username span
  span #username

  ```css
  可以把样式的应用方式分为几个等级，按照等级来计算权重
  
  1、!important，加在样式属性值后，权重值为 10000
  2、内联样式，如：style=””，权重值为1000
  3、ID选择器，如：#content，权重值为100
  4、类，伪类和属性选择器，如： content、:hover 权重值为10
  5、标签选择器和伪元素选择器，如：div、p、:before 权重值为1
  
  6、通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0
  
  css的优先级分为4个等级，分别是A,B,C,D（A代表是否有内联样式，有为1，无为0；B代表ID选择器个数；C代表类选择器、属性选择器和伪类总个数；D代表标签选择器和伪元素总个数），比较规则就是从左往右比较。本题中，
  (选项)       A      B     C    D  (等级)
  A              0     0      1     1
  B              0     1     0     0
  C              0     0     1     1
  D              0     1     0     1
  综上，选项D的优先级最高
  ```

* A.    em 自动适应用户所使用的字体。元素像素就是指px。正确
  B.    dp 虚拟像素，在不同的像素密度的设备上会自动适配
  C.    align只能用于div
  D.    同上，dp的问题

* 如果要运用 CSS3 动画，你需要运用什么规则？
  正确答案: B   你的答案: A (错误)
  animation
  keyframes
  flash
  transition

* link属于html标签，而@import是css提供的。

  页面被加载时，link会并行加载节约时间；而@import引用的css是串行加载，会等到页面加载结束后加载，比较费时。

  link是html标签，因此没有兼容性，而@import只有IE5以上才能识别，且只能引入css文件。

  link因为是html元素，可以通过js DOM动态的添加样式，而@import却不可以。

  link方式样式的权重高于@import

  link 和 import 区别
  本质区别：link 是 html 标记提供的一种方式，import 是 css 提供的一种方式
  加载顺序：link 的方式可以让结构和样式同时加载，import 是先加载结构后加载样式，所以在网速过慢的时候会看见网页内容闪烁的情况
  兼容问题：link 没有兼容问题，import 一些老的版本的浏览器不支持（尤其是低版本IE）
  控制 DOM 区别：link 可以被DOM控制，而 import 不能被控制

* 优先级由高到低可分为：

  在属性后面使用!important会覆盖页面内任何位置定义的元素样式。
  作为style属性写在元素内的样式
  id选择器
  类选择器 = 伪类选择器=属性选择器 （后面的样式会覆盖前面的样式）
  标签选择器
  通配符选择器
  浏览器自定义的样式 

* ```html
  根据规范，以下 HTML 和 CSS 代码解析后， container.clientWidth 的值是:
  <style>
  #container {
      width: 200px;
      height: 200px;
      padding: 20px;
      margin: 20px;
      border: solide 10px black;
  }
  </style>
   
  <div id="container">
  content
  </div>
  正确答案: B   你的答案: D (错误)
  200
  240
  280
  300
  
  
  client是padding+设置的大小
  offset是padding+边框+设置的大小
  scroll是整个内容区域大小
  
  以下摘自百度：
  clientLeft,clientTop
  表示内容区域的左上角相对于整个元素左上角的位置（包括边框）。(取决于边框的像数值？)
  clientWidth,clientHeight
  内容区域的宽高，不包括边框宽度值。
  clientX、clientY
  点击位置距离当前body可视区域的x，y坐标
  offsetLeft,offsetTop
  相对于最近的祖先定位元素。
  offsetParent
  某元素的父元素 例如：this.offsetParent.tagName.toLowerCase() 得到body...
  offsetWidth,offsetHeight
  整个元素的尺寸(不包括因为滚动条变宽的宽度，包括滚动条的宽度和高度)
  offsetX, offsetY
  相对于带有定位的父盒子的x，y坐标
  scrollLeft,scrollTop
  元素滚动的距离大小
  scrollWidth,scrollHeight
  整个内容区域的宽度(包括需拉动滚动条隐藏起来的那些部分) scrollWidth = scrollTop+clientWidth
  pageX、pageY
  对于整个页面来说，包括了被卷去的body部分的长度
  screenX、screenY
  点击位置距离当前电脑屏幕的x，y坐标
  x、y
  和screenX、screenY一样
  ```

* 要将下面代码中超链接文本呈现为红色，不可以使用的样式表是（      ）。

  `<div><a href="http://www.w3.org/">链接到W3C</a></div>`
  正确答案: D   你的答案: B (错误)
  a:link{color:red}
  div a:link{color:red}
  div>a:link{color:red}
  div:first-child{color:red}
  
  1.div:first-child
  要满足的条件，首先必须得是div元素，还得是第一个子元素，如果不满足 就不会被选中
  
  2.div:first-of-type
  要满足的条件，首先必须得是div元素，还得是第一个出现的div元素，如果不满足 就不会被选中
  
  3.nth-child
  a:nth-child(5)： 必须是a元素 必须是第五个子元素
  
  4.nth-of-type：
  a:nth-of-type:选中所有a元素中的第n个a元素
  
  看来规律就是child相关的是绝对位置，type相关的是相对位置
  
* 下列哪个元素表示外部资源？该元素可以被视为图像、嵌套的浏览上下文或插件要处理的资源。它包括各种属性，如存档、边框、分类、代码库、代码类型等

  正确答案: A   你的答案: B (错误)

  ```
  <object>
  <source>
  <param>
  <picture>
  ```

* 以下几种 margin 写法不正确的有（      ）
  正确答案: A B C   你的答案: A (错误)
  margin：20px，10px，0；
  margin：10px，10px；
  margin：20px，auto；
  margin：20px  auto；

* B：<caption> 标签表示表格标题，标题一般被居中表格之上，但不加粗文本
  C：<em> 标签表示强调内容，显示为斜体，但不加粗文本

* 下列关于背景定位属性 background-position 说法正确的是（     ）
  正确答案: A B D   你的答案: A C D (错误)
  该属性可有两个取值，第一个取值为背景图像与其容器在水平方向上的距离，第二个取值为背景图像与其容器在垂直方向上的距离
  若只有一个取值，则其第二个取值默认为 50%
  若此取值用百分数表示，如：20% 60%，则表示此背景图像离其容器左边的距离为整个容器宽度的 20%，离容器上边的距离为整个容器高度的 60%
  若属性取值用 left、center、right、top、bottom 表示，则该属性取值的顺序可以颠倒，否则其取值顺序不能颠倒

  Background-position属性

  用处：配合background-image属性一起使用，用于设置背景图片在盒子中的位置

  参数：xpos ypos |x% y% |x y三种,

  如果只写第一个水平方向的参数，第二个垂直方向的参数会默认为：

  center|50%|容器高度的一半px


  Xpos：规定水平方向的对齐方式,值有left,right,center

  Ypos：规定垂直方向的对齐方式,值有top,bottom,center


  x%:规定图片水平方向的距离。
  你会不会以为这个x%就是父级容器宽度的x%？那你就想错了哦，这里的x%指的是父级容器的宽度减去图片的宽度后的差值的x%。
  举个栗子：background-position：50%，20%；
  图片的宽度为     imgwidth：100px；高度为     imgheight：100px；
  容器的宽度为     conwidth：200px；高度为     conheight：200px；
  那么此时图片的左顶点距离容器的左顶点的水平距离就是(conwidth-imgwidth)*50%=50px,而不是conwidth*50%=100px；(很好理解的吧，不然盒子宽度200px，图片宽度100px，又距离左边100px，岂不是50%没实现水平居中而紧靠右了吗？)
  由此也可以算出图片的左顶点距离容器的左顶点的垂直距离为20px
  y%:对应x%


  x:图片距离容器水平方向距离

  y:图片距离容器垂直方向距离

* 以下关于跨域的描述哪些是正确的:
  正确答案: B C D   你的答案: B C (错误)
  Web 字体、图片等资源文件加载都不受浏览器跨域限制
  CSS 文件的加载不受跨域限制
  window.onerror 方法默认情况下无法获取跨域脚本的报错详情
  canvas 中使用 drawImage 贴图会受跨域限制

  css文件的加载肯定不收跨域限制，a站点能引用B站点的样式d
  canvas的drawImage使用跨域图片，会报错
  解决方案1、
  如果图片不大不多可以使用base64
  解决方案2、
  实例的image对象的设置img.crossOrigin = ' ';并且在服务器端设置Access-Control-Allow-Origin:*(或运行的域名)

* ```
  在CSS中，html中的标签元素大体被分为三种不同的类型： 块状元素、内联元素(又叫行内元素)和内联块状元素。 
  
  常用的块状元素有：
   <div>、<p>、<h1>…<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>
   什么是块级元素？ 
  在html中<div>、<p>、<h1>、<form>、<ul>和<li>就是块级元素。设置display:block就是将元素显示为块级元素。如下代码就是将内联元素a转换为块状元素，从而使a元素具有块状元素特点。 a{display:block;} 
  块级元素特点：
   1、每个块级元素都从新的一行开始，并且其后的元素也另起一行。（真霸道，一个块级元素独占一行）;
   2、元素的高度、宽度、行高以及顶和底边距都可设置。
   3、元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。 
  
  常用的内联元素有： 
  <a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code> 在html中，<span>、<a>、<label>、<strong> 和<em>就是典型的内联元素（行内元素）（inline）元素。
  当然块状元素也可以通过代码display:inline将元素设置为内联元素。如下代码就是将块状元素div转换为内联元素，从而使div 元素具有内联元素特点。
   div{ display:inline; } ...... <div>我要变成内联元素</div> 
  内联元素特点： 
  1、和其他元素都在一行上； 
  2、元素的高度、宽度及顶部和底部边距不可设置； （这是答案^-^）
  3、元素的宽度就是它包含的文字或图片的宽度，不可改变。 
  
  常用的内联块状元素有：
   <img>、<input>
   内联块状元素（inline-block）就是同时具备内联元素、块状元素的特点，代码display:inline-block就是将元素设置为内联块状元素。
  inline-block 元素特点： 
  1、和其他元素都在一行上； 
  2、元素的高度、宽度、行高以及顶和底边距都可设置。
  ```

* 解析：a:link,a:visited,a:hover,a:active 分别是什么意思?

  \1. link:连接平常的状态

  \2. visited:连接被访问过之后

  \3. hover:鼠标放到连接上的时候

  \4. active:连接被按下的时候

  

  正确顺序：“爱恨原则”（LoVe/HAte），即四种伪类的首字母:LVHA。再重复一遍正确的顺序：a:link、a:visited、a:hover、a:active .

  

  因为当鼠标经过未访问的链接，会同时拥有a:link、a:hover两种属性，a:link离它最近，所以它优先满足a:link，而放弃a:hover的重复定义。当鼠标经过已经访问过的链接，会同时拥有a:visited、a:hover两种属性，a:visited离它最近，所以它优先满足a:visited，而放弃a:hover的重复定义。究其原因，是css的就近原则“惹的祸”。

* **浮动元素重叠**

  1、行内元素与浮动元素发生重叠，边框、背景、内容都会显示在浮动元素之上

  2、块级元素与浮动元素发生重叠，边框、背景会显示在浮动元素之下，内容会显示在浮动元素之上

* 关于 CSS 的单位，以下说法错误的是：
  正确答案: A   你的答案: B (错误)
  百分比单位始终根据父元素相应值来计算
  vw、vh、em、rem 都是相对单位
  90deg 表示顺时针旋转 90 度
  1s = 1000ms

  %

  一般宽泛的讲是相对于父元素，但是并不是十分准确。

  对于普通定位元素就是我们理解的父元素
  对于position: absolute;的元素是相对于已定位的父元素
  对于position: fixed;的元素是相对于ViewPort（可视窗口）

* 下面 CSS3 新增伪类中不正确的一个是？
  正确答案: B   你的答案: D (错误)
  p:first-of-type
  p:only-of-child
  p:nth-child(2)
  :disabled

  :only-child 选择器匹配属于其父元素的唯一子元素的每个元素。

* 主流浏览器内核私有属性css前缀：mozilla内核 (firefox,flock等)     -moz
                                                        webkit内核(safari,chrome等)   -webkit
                                                        opera内核(opera浏览器)         -o
                                                        trident内核(ie浏览器)               -ms

* ```
  button	定义可点击的按钮（大多与 JavaScript 使用来启动脚本）
  checkbox	定义复选框。
  color	定义拾色器。
  date	定义日期字段（带有 calendar 控件）
  datetime	定义日期字段（带有 calendar 和 time 控件）
  datetime-local	定义日期字段（带有 calendar 和 time 控件）
  month	定义日期字段的月（带有 calendar 控件）
  week	定义日期字段的周（带有 calendar 控件）
  time	定义日期字段的时、分、秒（带有 time 控件）
  email	定义用于 e-mail 地址的文本字段
  file	定义输入字段和 "浏览..." 按钮，供文件上传
  hidden	定义隐藏输入字段
  image	定义图像作为提交按钮
  number	定义带有 spinner 控件的数字字段
  password	定义密码字段。字段中的字符会被遮蔽。
  radio	定义单选按钮。
  range	定义带有 slider 控件的数字字段。
  reset	定义重置按钮。重置按钮会将所有表单字段重置为初始值。
  search	定义用于搜索的文本字段。
  submit	定义提交按钮。提交按钮向服务器发送数据。
  tel	定义用于电话号码的文本字段。
  text	默认。定义单行输入字段，用户可在其中输入文本。默认是 20 个字符。
  url	定义用于 URL 的文本字段。
  ```

* ```text
  一、无继承性的属性
  
  1、display：规定元素应该生成的框的类型
  
  2、文本属性：
  
  vertical-align：垂直文本对齐
  
  text-decoration：规定添加到文本的装饰
  
  text-shadow：文本阴影效果
  
  white-space：空白符的处理
  
  unicode-bidi：设置文本的方向
  
  3、盒子模型的属性：width、height、margin 、margin-top、margin-right、margin-bottom、margin-left、border、border-style、border-top-style、border-right-style、border-bottom-style、border-left-style、border-width、border-top-width、border-right-right、border-bottom-width、border-left-width、border-color、border-top-color、border-right-color、border-bottom-color、border-left-color、border-top、border-right、border-bottom、border-left、padding、padding-top、padding-right、padding-bottom、padding-left
  
  4、背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
  
  5、定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
  
  6、生成内容属性：content、counter-reset、counter-increment
  
  7、轮廓样式属性：outline-style、outline-width、outline-color、outline
  
  8、页面样式属性：size、page-break-before、page-break-after
  
  9、声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during
  
   
  
  二、有继承性的属性
  
  1、字体系列属性
  
  font：组合字体
  
  font-family：规定元素的字体系列
  
  font-weight：设置字体的粗细
  
  font-size：设置字体的尺寸
  
  font-style：定义字体的风格
  
  font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。
  
  font-stretch：对当前的 font-family 进行伸缩变形。所有主流浏览器都不支持。
  
  font-size-adjust：为某个元素规定一个 aspect 值，这样就可以保持首选字体的 x-height。
  
  2、文本系列属性
  
  text-indent：文本缩进
  
  text-align：文本水平对齐
  
  line-height：行高
  
  word-spacing：增加或减少单词间的空白（即字间隔）
  
  letter-spacing：增加或减少字符间的空白（字符间距）
  
  text-transform：控制文本大小写
  
  direction：规定文本的书写方向
  
  color：文本颜色
  
  3、元素可见性：visibility
  
  4、表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout
  
  5、列表布局属性：list-style-type、list-style-image、list-style-position、list-style
  
  6、生成内容属性：quotes
  
  7、光标属性：cursor
  
  8、页面样式属性：page、page-break-inside、windows、orphans
  
  9、声音样式属性：speak、speak-punctuation、speak-numeral、speak-header、speech-rate、volume、voice-family、pitch、pitch-range、stress、richness、、azimuth、elevation
  
   
  
  三、所有元素可以继承的属性
  
  1、元素可见性：visibility
  
  2、光标属性：cursor
  
   
  
  四、内联元素可以继承的属性
  
  1、字体系列属性
  
  2、除text-indent、text-align之外的文本系列属性
  
   
  
  五、块级元素可以继承的属性
  
  1、text-indent、text-align
  ```

* 关于 SVG 和 CANVAS，下面陈述正确的有?
  正确答案: D F   你的答案: A C E (错误)
  SVG 做动画性能要优于 CANVAS
  CANVAS 做动画性能要优于 SVG
  SVG 产生的 DOM 数量比 CANVAS 要少
  CANVAS 产生的 DOM 数量比 SVG 要少
  CANVAS 可以使用 CSS 设置动画样式
  SVG 可以使用 CSS 设置动画样式

* 伪元素

  - 每条选择器最多只能包含一个伪元素
    ![伪元素](https://uploadfiles.nowcoder.com/files/20201207/2814591_1607305247491/20201202122048307.png)

    #### 伪类

  - 每条选择器可以包含多个伪类
    ![伪类](https://uploadfiles.nowcoder.com/files/20201207/2814591_1607305247479/20201202122114203.png)

    #### 总结

  - 伪元素的操作对象是新生成的dom元素，而不是原来dom结构里就存在的；而伪类恰好相反，伪类的操作对象是原来的dom结构里就存在的元素。

  - 伪元素与伪类的根本区别在于：操作的对象元素是否存在于原来的dom结构里。

  :nth-child(n),n从1开始计数

  :nth-child(odd)和:nth-child(even),从1开始计数

  :nth-child(an+b),n从0开始计数

* 