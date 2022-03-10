* 链接通过<a href="链接">

* 标签对大小写不敏感

* 双引号是最常用的，不过使用单引号也没有问题。

* class 属性可以多用 **class=" "** （引号里面可以填入多个class属性）

* id 属性只能单独设置 **id=" "**（只能填写一个，多个无效）

* 浏览器会自动地在标题的前后添加空行。

* 搜索引擎使用标题为您的网页的结构和内容编制索引

* 因为用户可以通过标题来快速浏览您的网页，所以用标题来呈现文档结构是很重要的。

* <hr> 标签在 HTML 页面中创建水平线。
  
  
* <!-- 这是一个注释 -->

* 如果您希望在不产生一个新段落的情况下进行换行（新行），请使用 **<br>** 标签

* [html文本格式化](https://www.runoob.com/html/html-formatting.html)使用 target 属性，你可以定义被链接的文档在何处显示。<a href="https://www.runoob.com/" target="_blank" rel="noopener noreferrer">访问菜鸟教程!</a>

* 图片链接：

  ```
  <p>创建图片链接:
  <a href="//www.runoob.com/html/html-tutorial.html">
  <img  border="10" src="smiley.gif" alt="HTML 教程" width="32" height="32"></a></p>
  
  <p>无边框的图片链接:
  <a href="//www.runoob.com/html/html-tutorial.html">
  <img border="0" src="smiley.gif" alt="HTML 教程" width="32" height="32"></a></p>
  ```

* 可以添加在头部区域的元素标签为: <title>, <style>, <meta>, <link>, <script>, <noscript> 和 <base>

* ## <meta> 标签- 使用实例

  为搜索引擎定义关键词:

  ```
  <meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">
  ```

  为网页定义描述内容:

  ```
  <meta name="description" content="免费 Web & 编程 教程">
  ```

  定义网页作者:

  ```
  <meta name="author" content="Runoob">
  ```

  每30秒钟刷新当前页面:

  ```
  <meta http-equiv="refresh" content="30">
  ```

* font-family（字体），color（颜色），和font-size（字体大小）

* text-align（文字对齐）属性指定文本的水平与垂直对齐方式

* alt 属性用来为图像定义一串预备的可替换的文本。替换文本属性的值是用户定义的。

* 表格由 <table> 标签来定义。每个表格均有若干行（由 <tr> 标签定义），每行被分割为若干单元格（由 <td> 标签定义）。字母 td 指表格数据（table data），即数据单元格的内容。数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等。表格的表头使用 <th> 标签进行定义。大多数浏览器会把表头显示为粗体居中的文本

* 无序列表使用 <ul> 标签，此列项目使用粗体圆点（典型的小黑圆圈）进行标记。 有序列表始于 <ol> 标签。每个列表项始于 <li> 标签。

  列表项使用数字来标记。

  `<ol>
  <li>Coffee</li>
  <li>Milk</li>
  </ol>`

* 自定义列表不仅仅是一列项目，而是项目及其注释的组合。

  自定义列表以 <dl> 标签开始。每个自定义列表项以 <dt> 开始。每个自定义列表项的定义以 <dd> 开始。

  `<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
  </dl>`

* HTML <span> 元素是内联元素，可用作文本的容器

  <span> 元素也没有特定的含义。

  当与 CSS 一同使用时，<span> 元素可用于为部分文本设置样式属性。

* <form>
  First name: <input type="text" name="firstname"><br>
  Last name: <input type="text" name="lastname">
  </form>

* <form>
  Password: <input type="password" name="pwd">
  </form>

* <input type="radio"> 标签定义了表单单选框选项

  <form>
  <input type="radio" name="sex" value="male">Male<br>
  <input type="radio" name="sex" value="female">Female
  </form>

* <input type="checkbox"> 定义了复选框. 用户需要从若干给定的选择中选取一个或若干选项。

  <form>
  <input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
  <input type="checkbox" name="vehicle" value="Car">I have a car</form>

* <input type="submit"> 定义了提交按钮.

  当用户单击确认按钮时，表单的内容会被传送到另一个文件。表单的动作属性定义了目的文件的文件名。由动作属性定义的这个文件通常会对接收到的输入数据进行相关的处理。:

  <form name="input" action="html_form_action.php" method="get">
  Username: <input type="text" name="user">
  <input type="submit" value="Submit">
  </form>

* 通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面。<iframe src="URL"></iframe>height 和 width 属性用来定义iframe标签的高度与宽度。frameborder 属性用于定义iframe表示是否显示边框。

  设置属性值为 "0" 移除iframe的边框:

* ## 使用iframe来显示目标链接页面

  iframe可以显示一个目标链接的页面

  目标链接的属性必须使用iframe的属性，如下实例:

  ## 实例

  <iframe src="demo_iframe.htm" name="iframe_a"></iframe> <p><a href="http://www.runoob.com" target="iframe_a">RUNOOB.COM</a></p>

* [HTML 拾色器](https://www.runoob.com/tags/html-colorpicker.html)