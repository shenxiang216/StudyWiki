# css3动画与js动画的区别

## JS动画

缺点：

(1)JavaScript在浏览器的主线程中运行，而主线程中还有其它需要运行的JavaScript脚本、样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情况。

(2)代码的复杂度高于CSS动画

优点：

(1)JavaScript动画控制能力很强, 可以在动画播放过程中对动画进行控制：开始、暂停、回放、终止、取消都是可以做到的。

(2)动画效果比css3动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只有JavaScript动画才能完成

(3)CSS3有兼容性问题，而JS大多时候没有兼容性问题

## CSS动画

缺点：

(1)运行过程控制较弱,无法附加事件绑定回调函数。CSS动画只能暂停,不能在动画中寻找一个特定的时间点，不能在半路反转动画，不能变换时间尺度，不能在特定的位置添加回调函数或是绑定回放事件,无进度报告

(2)代码冗长。想用 CSS 实现稍微复杂一点动画,最后CSS代码都会变得非常笨重。

优点：

(1)浏览器可以对动画进行优化。

(2)代码相对简单,性能调优方向固定

(3)对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码

## CSS动画流畅的原因

渲染线程分为main thread(主线程)和compositor thread(合成器线程)。

如果CSS动画只是改变`transform`和`opacity`，这时整个CSS动画得以在compositor thread完成（而JS动画则会在main thread执行，然后触发compositor进行下一步操作）。

在JS执行一些昂贵的任务时，main thread繁忙，CSS动画由于使用了compositor thread可以保持流畅。

## CSS动画比JS流畅的前提：

1. JS在执行一些昂贵的任务
2. 同时CSS动画不触发layout或paint，在CSS动画或JS动画触发了paint或layout时，需要main thread进行Layer树的重计算，这时CSS动画或JS动画都会阻塞后续操作。

   只有如下属性的修改才符合“仅触发Composite，不触发layout或paint”：

- backface-visibility
- opacity
- perspective
- perspective-origin
- transfrom

所以只有用上了3D加速或修改opacity时，css3动画的优势才会体现出来。

## 结论

如果动画只是简单的状态切换，不需要中间过程控制，在这种情况下，css动画是优选方案。它可以让你将动画逻辑放在样式文件里面，而不会让你的页面充斥 Javascript 库。然而如果你在设计很复杂的富客户端界面或者在开发一个有着复杂UI状态的 APP。那么你应该使用js动画，这样你的动画可以保持高效，并且你的工作流也更可控。所以，在实现一些小的交互动效的时候，就多考虑考虑CSS动画。对于一些复杂控制的动画，使用javascript比较可靠。

## 参考资料

[css3动画与js动画的区别](https://juejin.cn/post/6997255364857036813)

