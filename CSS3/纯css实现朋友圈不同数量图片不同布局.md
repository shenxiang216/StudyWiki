### 效果图

![img](https://upload-images.jianshu.io/upload_images/17653016-c876035458c25549.png?imageMogr2/auto-orient/strip|imageView2/2/w/161/format/webp)





![img](https://upload-images.jianshu.io/upload_images/17653016-fd7492da63abf26c.png?imageMogr2/auto-orient/strip|imageView2/2/w/225/format/webp)





![img](https://upload-images.jianshu.io/upload_images/17653016-0bed685f8201bb89.png?imageMogr2/auto-orient/strip|imageView2/2/w/368/format/webp)



![img](https://upload-images.jianshu.io/upload_images/17653016-b971b679c26abb71.png?imageMogr2/auto-orient/strip|imageView2/2/w/342/format/webp)





![img](https://upload-images.jianshu.io/upload_images/17653016-93a7156b71adb4d0.png?imageMogr2/auto-orient/strip|imageView2/2/w/512/format/webp)思路

* 1.设置flex实现正常的三列布局

  ```css
  ul{
      padding:0px;
      width:300px;
      display: flex;
      /* justify-content: flex-end; //用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 */
      flex-wrap: wrap; //换行   
  }
  ```

* 2.每个元素占32%，除每行最后一个元素外设置右外边距为2%

  ```css
  li{
      list-style: none;
      width:32%;
      height:100px;
      margin-top: 5px;
  }
  /* 除了每行最后的元素,其他都留右外边距 (100-32*3)/2*/
  li:not(:nth-child(3n)){
      margin-right: 2%; 
  }
  ```

* 3.特殊情况1，只有一张图，用css选择器判断为一张图片时，改变图片大小

  ```css
  /* 当ul只有唯一的li时 */
  li:only-child{
      width: 200px;
      height: 200px;
  }
  ```

  只有一张图，不固定宽高，宽高自适应

  ```css
  /* 当只有唯一一张图时 自适应宽高*/
  li:only-child img{
      max-height: 200px;
      width: auto;
      max-width: 200px;
      height: auto
  }
  ```

* 4.特殊情况2，只有四张图，图片需呈两行两列布局（偶数个数的图右外边距加大，奇数个数的图外边距仍为2%）
   伪元素选择器思路：
   元素为 倒数第4个 && 第一个的元素时， 判断为共有四个元素；
   选择 其后的 同级元素 的 偶数 个设置比较大的右外边距；
   选择 其后的 同级元素 的 奇数 个设置原来的右外边距；（对第三个元素恢复间隔）

  ```css
  /* 有四张图时  even偶数  odd奇数 */
  li:nth-last-child(4):first-child ~ li:nth-child(even){
      margin-right: 32%;
  }
  li:nth-last-child(4):first-child ~ li:nth-child(odd){
      margin-right: 2%;
  }
  ```

### 完整代码：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>九宫格</title>
  </head>
  <style type="text/css">
    ul{
        padding:0px;
        width:300px;
        display: flex;
        /* justify-content: flex-end; //用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 */
        flex-wrap: wrap;
    }
    li{
        list-style: none;
        width:32%;
        height:100px;
        margin-top: 5px;
    }
    /* 除了每行最后的元素,其他都留右外边距 (100-32*3)/2*/
    li:not(:nth-child(3n)){
        margin-right: 2%; 
    }
    /* 当只有唯一一张图时 定宽高*/
    /* li:only-child img{
        height: 200px;
        width: 200px;
    } */
    /* 当只有唯一一张图时 自适应宽高*/
    li:only-child img{
        max-height: 200px;
        width: auto;
        max-width: 200px;
        height: auto
    }
    /* 有四张图时 */
    li:nth-last-child(4):first-child ~ li:nth-child(even){
        margin-right: 32%;
    }
    li:nth-last-child(4):first-child ~ li:nth-child(odd){
        margin-right: 2%;
    }
    li img{
        width:100%;
        height: 100%;
    }
</style>
</head>
<body>
朋友圈文字...
<ul id="ul">
    <li v-for="(item,i) in picture" :key="i">
        <img :src="item.src" >
    </li>
</ul>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: "#ul",
        data: {
            picture :[
                { src: './pic.jpg' },
                { src: './pic.jpg' },
                { src: './pic.jpg' },
                { src: './pic.jpg' },
                { src: './pic.jpg' },
                // { src: './pic.jpg' },
                // { src: './pic.jpg' },
                // { src: './pic.jpg' },
                // { src: './pic.jpg' },
            ]
        }
    });
</script>
</body>
</html>
```

