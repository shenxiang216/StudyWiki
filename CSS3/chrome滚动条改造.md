# chrome 自定义滚动条样式

对于 chrome 浏览器，它提供了修改滚动条样式的接口，可以修改原生滚动条的样式。

![滚动条组成图解](http://www.rem486.top/img/chrome-scrollerbar-1.png)

先说一下滚动条的参数：

```text
::-webkit-scrollbar 1 滚动条整体部分，其中的属性有 width,height,background,border（就和一个块级元素一样）等
::-webkit-scrollbar-button 2 滚动条两端的按钮，可以用 display:none 让其不显示，也可以添加背景图片，颜色改变显示效果。
::-webkit-scrollbar-track 3 外层轨道，可以用 display:none 让其不显示，也可以添加背景图片，颜色改变显示效果。
::-webkit-scrollbar-track-piece 4  内层滚动槽
::-webkit-scrollbar-thumb 5 滚动的滑块
::-webkit-scrollbar-corner 6 边角
::-webkit-resizer 7 定义右下角拖动块的样式
```

1
2
3
4
5
6
7

注意：对以上部分定义 width 和 height 时，有如下功能：

若是水平滚动条，则 width 属性不起作用，height 属性用来控制滚动条相应部分竖直方向高度；

若是竖直滚动条，则 height 属性不起作用，width 属性用来控制滚动条相应部分水平方向的宽度

下面是 css 样式，可以直接拷贝生效，当前 blog 滚动条就是使用的这个样式：

```css
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    border-radius: 8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #bbb;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
}
/* 非激活窗口 */
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0,255,0,0.4);
}
```

#### [#](http://www.rem486.top/web/css/chrome-scroll-bar.html#参考)参考

* [自定义滚动条样式 --- 适用于webkit浏览器 Google Chrome 和 Opera(opens new window)](https://blog.51cto.com/dapengtalk/1867710)
* [各浏览器中自定义滚动条的样式](https://www.w3cways.com/1670.html)