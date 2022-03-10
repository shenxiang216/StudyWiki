* 一些设置在父元素上的css属性是可以被子元素继承的，比如 `color`、`font-size`，每个在里面的元素也都会有相同的属性，除非你直接在元素上设置属性。有些属性如 `width`、`margin`、`border`等，则不会被继承
  
* CSS中的代码margin: 0 auto;一般是用来将某个元素相对于父元素居中的。
  注意：这时父元素的长度必须确定才行，否则此语句不能达到居中的效果。

* [水平垂直居中](https://blog.csdn.net/qq_42532128/article/details/102526334)

* 块级元素-行内元素

  * `display:block；(将元素变为块级元素)display:inline； (将元素变为行级元素)display：inline-block；（将元素变为行级块元素）`

  * 块级元素：

    * 块级元素会独占一行
    * 高度，行高，外边距和内边距都可以单独设置
    * 宽度默认是容器的100%
    * 可以容纳内联元素和其他的块级元素
    * ` div、p、h1、h2......hn，ol、ul、dl、li、form、table`

  * 行内元素

    * 和相邻的行内元素在一行上

    * 高度和宽度无效，但是水平方向上的padding和margin可以设置，垂直方向上的无效

    * 默认的宽度就是它本身的宽度

    * 行内元素只能容纳纯文本或者是其他的行内元素（a标签除外）

    * ``` a(锚点)
      b(加粗)
      i(斜体)
      span(常用内联容器，定义文本内区块)
      lable(input 元素定义标注（标记）)
      ```

  * 行级块元素

    * 可以设置宽高、内外边距；
    * 可以与其他行内元素、内联元素**共处一行**；

    * 常见的内联元素：` input、img`







* **Margin(外边距)** - 清除边框外的区域，外边距是透明的。
* **Border(边框)** - 围绕在内边距和内容外的边框。
* **Padding(内边距)** - 清除内容周围的区域，内边距是透明的。
* **Content(内容)** - 盒子的内容，显示文本和图像。
* ![cainiao](https://www.runoob.com/wp-content/uploads/2013/08/VlwVi.png)


```html

/* 响应式布局 - 屏幕尺寸小于 800px 时，两列布局改为上下布局 */ @media screen and (max-width: 800px) {  .leftcolumn, .rightcolumn {       width: 100%;    padding: 0;  } }  /* 响应式布局 -屏幕尺寸小于 400px 时，导航等布局改为上下布局 */ @media screen and (max-width: 400px) {  .topnav a {    float: none;    width: 100%;  } }

```



### CSS 边框



**border-style**属性用来定义边框的样式

* dotted: 定义一个点线边框

  

  dashed: 定义一个虚线边框

  

  solid: 定义实线边框

  

  double: 定义两个边框。 两个边框的宽度和 border-width 的值相同

  

  groove: 定义3D沟槽边框。效果取决于边框的颜色值

  

  ridge: 定义3D脊边框。效果取决于边框的颜色值

  

  inset:定义一个3D的嵌入边框。效果取决于边框的颜色值

  

  outset: 定义一个3D突出边框。 效果取决于边框的颜色值



边框宽度



## 边框颜色

border-color属性用于设置边框的颜色。可以设置的颜色：

- name - 指定颜色的名称，如 "red"
- RGB - 指定 RGB 值, 如 "rgb(255,0,0)"
- Hex - 指定16进制值, 如 "#ff0000"

## 边框-单独设置各边

在CSS中，可以指定不同的侧面不同的边框：

## 实例

p {    border-top-style:dotted;    border-right-style:solid;    border-bottom-style:dotted;    border-left-style:solid; }



border-style属性可以有1-4个值：

- border-style:dotted solid double dashed;
  - 上边框是 dotted
  - 右边框是 solid
  - 底边框是 double
  - 左边框是 dashed
- border-style:dotted solid double;
  - 上边框是 dotted
  - 左、右边框是 solid
  - 底边框是 double
- border-style:dotted solid;
  - 上、底边框是 dotted
  - 右、左边框是 solid
- border-style:dotted;
  - 四面边框是 dotted



## 边框-简写属性

上面的例子用了很多属性来设置边框。

你也可以在一个属性中设置边框。

你可以在"border"属性中设置：

- border-width
- border-style (required)
- border-color

## 实例

border:5px solid red;





在 CSS3 中 border-radius 属性被用于创建圆角：



CSS3 中的 box-shadow 属性被用来添加阴影:  box-shadow: 10px 10px 5px #888888;

## CSS3 边界图片

有了 CSS3 的 border-image 属性，你可以使用图像创建一个边框：

border-image 属性允许你指定一个图片作为边框！ 用于创建上文边框的原始图像：

在 div 中使用图片创建边框:

[CSS3中 4个自适应关键字: available、max-content、min-content、fit-content](https://blog.csdn.net/VickyTsai/article/details/104007576?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161864479816780274129822%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=161864479816780274129822&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-104007576.first_rank_v2_pc_rank_v29&utm_term=max-content)

## margin

`margin` 属性接受 1~4 个值。每个值可以是length、percentage、auto。

- 当只指定**一个**值时，该值会统一应用到**全部四个边**的外边距上。
- 指定**两个**值时，第一个值会应用于**上边和下边**的外边距，第二个值应用于**左边和右边**。
- 指定**三个**值时，第一个值应用于**上边**，第二个值应用于**右边和左边**，第三个则应用于**下边**的外边距。
- 指定**四个**值时，依次（顺时针方向）作为**上边**，**右边**，**下边**，和**左边**的外边距。



