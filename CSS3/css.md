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

## ● visibility=hidden, opacity=0，display:none

- opacity=0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能触发点击事件 
- visibility=hidden，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件。
- display=none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉一样。

## ● 双边距重叠问题（外边距折叠）

多个相邻（兄弟或者父子关系）普通流的块元素垂直方向marigin会重叠

折叠的结果为：

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
两个外边距一正一负时，折叠结果是两者的相加的和。

## ● css动画如何实现

创建动画序列，需要使用animation属性或其子属性，该属性允许配置动画时间、时长以及其他动画细节，但该属性不能配置动画的实际表现，动画的实际表现是由 @keyframes规则实现，具体情况参见使用keyframes定义动画序列小节部分。

transition也可实现动画。transition强调过渡，是元素的一个或多个属性发生变化时产生的过渡效果，同一个元素通过两个不同的途径获取样式，而第二个途径当某种改变发生（例如hover）时才能获取样式，这样就会产生过渡动画。

## ● 如何实现图片在某个容器中居中的？

父元素固定宽高，利用定位及设置子元素margin值为自身的一半。

父元素固定宽高，子元素设置position: absolute，margin：auto平均分配margin

css3属性transform。子元素设置position: absolute; left: 50%; top: 50%;transform: translate(-50%,-50%);即可。

将父元素设置成display: table, 子元素设置为单元格 display: table-cell。

弹性布局display: flex。设置align-items: center; justify-content: center

## ● 如何实现元素的垂直居中

法一：父元素display:flex,align-items:center;

法二：元素绝对定位，top:50%，margin-top：-（高度/2）

法三：高度不确定用transform：translateY（-50%）

法四：父元素table布局，子元素设置vertical-align:center;

## ● 三栏布局的实现方式，尽可能多写，浮动布局时，三个div的生成顺序有没有影响

三列布局又分为两种，两列定宽一列自适应，以及两侧定宽中间自适应

两列定宽一列自适应：

1、使用float+margin：

给div设置float：left，left的div添加属性margin-right：left和center的间隔px,right的div添加属性margin-left：left和center的宽度之和加上间隔

2、使用float+overflow：

给div设置float：left，再给right的div设置overflow:hidden。这样子两个盒子浮动，另一个盒子触发bfc达到自适应

3、使用position：

父级div设置position：relative，三个子级div设置position：absolute，这个要计算好盒子的宽度和间隔去设置位置，兼容性比较好，

4、使用table实现：

父级div设置display：table，设置border-spacing：10px//设置间距，取值随意,子级div设置display:table-cell，这种方法兼容性好，适用于高度宽度未知的情况，但是margin失效，设计间隔比较麻烦，

5、flex实现：

parent的div设置display：flex；left和center的div设置margin-right；然后right 的div设置flex：1；这样子right自适应，但是flex的兼容性不好

6、grid实现：

parent的div设置display：grid，设置grid-template-columns属性，固定第一列第二列宽度，第三列auto，

对于两侧定宽中间自适应的布局，对于这种布局需要把center放在前面，可以采用双飞翼布局：圣杯布局，来实现，也可以使用上述方法中的grid，table，flex，position实现



## ● 有一个width300，height300，怎么实现在屏幕上垂直水平居中

对于行内块级元素，

1、父级元素设置text-alig：center，然后设置line-height和vertical-align使其垂直居中，最后设置font-size：0消除近似居中的bug

2、父级元素设置display：table-cell，vertical-align：middle达到水平垂直居中

3、采用绝对定位，原理是子绝父相，父元素设置position：relative，子元素设置position：absolute，然后通过transform或margin组合使用达到垂直居中效果，设置top：50%，left：50%，transform：translate（-50%，-50%）

4、绝对居中，原理是当top,bottom为0时，margin-top&bottom设置auto的话会无限延伸沾满空间并平分，当left，right为0时,margin-left&right设置auto会无限延伸占满空间并平分，

5、采用flex，父元素设置display：flex，子元素设置margin：auto

6、视窗居中，vh为视口单位，50vh即是视口高度的50/100，设置margin：50vh auto 0，transform：translate(-50%)

## ● display：table和本身的table有什么区别

Display:table和本身table是相对应的，区别在于，display：table的css声明能够让一个html元素和它的子节点像table元素一样，使用基于表格的css布局，是我们能够轻松定义一个单元格的边界，背景等样式，而不会产生因为使用了table那样的制表标签导致的语义化问题。

之所以现在逐渐淘汰了table系表格元素，是因为用div+css编写出来的文件比用table边写出来的文件小，而且table必须在页面完全加载后才显示，div则是逐行显示，table的嵌套性太多，没有div简洁

## ● 设置一个元素的背景颜色，背景颜色会填充哪些区域？

background-color设置的背景颜色会填充元素的content、padding、border区域，

## ● 用css实现一个硬币旋转的效果

```
#euro {
width: 150px;
height: 150px;
margin-left: -75px;
margin-top: -75px;
position: absolute;
top: 50%;
left: 50%;
transform-style: preserve-3d;
animation: spin 2.5s linear infinite;
}
.back {
background-image: url("/uploads/160101/backeuro.png");
width: 150px;
height: 150px;
}
.middle {
background-image: url("/uploads/160101/faceeuro.png");
width: 150px;
height: 150px;
transform: translateZ(1px);
position: absolute;
top: 0;
}
.front {
background-image: url("/uploads/160101/faceeuro.png");
height: 150px;
position: absolute;
top: 0;
transform: translateZ(10px);
width: 150px;
}
@keyframes spin {
0% {
transform: rotateY(0deg);
}
100% {
transform: rotateY(360deg);
}
}
```

## ● 实现一个两列等高布局，讲讲思路

为了实现两列等高，可以给每列加上 padding-bottom:9999px;

margin-bottom:-9999px;同时父元素设置overflow:hidden;
