在html中，通过CSS样式设置a标签超链接中的四个伪类，可以为超链接在浏览器中显示不同的效果，有关<a>标签四个伪类的使用方法介绍如下：

## <a>标签伪类定义

<a>标签伪类：是指在CSS层叠样式中，用于<a>元素添加不同的显示效果；

<a>标签伪类有四种状态，且有固定的书写顺序，否则会出现无效的情况；

<a>标签伪类正确书写顺序是：a:link、a:visited、a:hover、a:active；

## <a>标签伪类四种状态

<a>标签伪类有四种状态，分别如下：

a:link，设置连接未访问状态时的效果；

a:visited，设置连接已访问状态时的效果；

a:hover，设置鼠标移动到连接上悬停状态时的效果；

a:active，设置连接正在被点击跳转过程中的效果；

## 浏览器支持情况

所有浏览器都支持<a>标签的四种伪类状态

## <a>标签伪类默认显示效果

<a>标签四个伪类状态在所有浏览器中，在默认情况下的显示效果如下：

a:link，带有下划线而且是蓝色的；

a:visited，带有下划线而且是紫色的；

a:hover，带有下划线，但如果连接未被访问，则蓝色；如果连接已被访问，则紫色；

a:active，带有下划线而且是红色的；

## <a>标签伪类正确书写顺序

如果<a>标签四个伪类的书写顺序不正确，会导致链接的四种状态显示效果错乱，或有的状态会无效，为了避免这种情况，我们在设置的时候，务必保证书写顺序是正确的。

<a>标签伪类的书写顺序是a:link、a:visited、a:hover、a:active；

## <a>标签伪类的用法

### 1、设置伪类显示颜色

设置a标签超链接在未访问时是黑色，已访问后的链接是紫色，鼠标悬浮在链接上是蓝色，链接被点击后正在跳转过程中是白色，演示代码如下：

```css
a:link{color:#000;}
a:visited{color:#F0F;}
a:hover{color:#00F;}
a:active{color:#FFF;}
```

其中，#000表示黑色，#F0F表示紫色，#00F表示蓝色，#FFF表示白色；如果我们想要去掉四个伪类默认的下划线效果，就需要设置CSS样式表中text-decoration的属性值为none，即text-decoration:none。

### 2、删除伪类默认下划线

想要去掉下划线的效果，只需要再添加一个text-decoration:none属性即可，代码如下：

```css
a:link{color:#000;text-decoration:none;}
a:visited{color:#F0F;text-decoration:none;}
a:hover{color:#00F;text-decoration:none;}
a:active{color:#FFF;text-decoration:none;}

```

### 3、设置伪类背景颜色

设置背景颜色使用CSS样式属性background-color，演示代码如下：

```css
a:link{color:#000;text-decoration:noneback;ground-color:green;}
a:visited{color:#F0F;text-decoration:none;background-color:green;}
a:hover{color:#00F;text-decoration:none;background-color:green;}
a:active{color:#FFF;text-decoration:none;background-color:green;}
```

以上代码中的四个伪类的背景颜色background-color都设置为green，也就是背景颜色设置成绿色；也可以单独设置某个伪类的背景颜色，只需要改变background-color属性后的颜色值即可。