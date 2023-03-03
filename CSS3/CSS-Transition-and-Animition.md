# CSS Transition and Animition

## 一、CSS Transition

在CSS 3引入Transition（过渡）这个概念之前，CSS是没有时间轴的。也就是说，所有的状态变化，都是即时完成。

###  transition的使用注意

（1）目前，各大浏览器（包括IE 10）都已经支持无前缀的transition，所以transition已经可以很安全地不加浏览器前缀。

（2）不是所有的CSS属性都支持transition

（3）transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。

### transition的局限

transition的优点在于简单易用，但是它有几个很大的局限。

（1）transition需要事件触发，所以没法在网页加载时自动发生。

（2）transition是一次性的，不能重复发生，除非一再触发。

（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

CSS Animation就是为了解决这些问题而提出的。

### 定义和用法

transition 属性是一个简写属性，用于设置四个过渡属性：

- transition-property
- transition-duration
- transition-timing-function
- transition-delay

**注释：**请始终设置 [transition-duration](https://www.w3school.com.cn/cssref/pr_transition-duration.asp) 属性，否则时长为 0，就不会产生过渡效果。

| 默认值：          | all 0 ease 0                         |
| ----------------- | ------------------------------------ |
| 继承性：          | no                                   |
| 版本：            | CSS3                                 |
| JavaScript 语法： | *object*.style.transition="width 2s" |

**语法：**

`transition: property duration timing-function delay;`



- **transition-property**

​	transition-property 属性规定应用过渡效果的 CSS 属性的名称。（当指定的 CSS 属性改变时，过渡效果将开始）。

​	**提示：**过渡效果通常在用户将鼠标指针浮动到元素上时发生。

| 默认值：          | all                                              |
| ----------------- | ------------------------------------------------ |
| 继承性：          | no                                               |
| 版本：            | CSS3                                             |
| JavaScript 语法： | *object*.style.transitionProperty="width,height" |

**语法**

```
transition-property: none|all|property;
```

| 值         | 描述                                                  |
| :--------- | :---------------------------------------------------- |
| none       | 没有属性会获得过渡效果。                              |
| all        | 所有属性都将获得过渡效果。                            |
| *property* | 定义应用过渡效果的 CSS 属性名称列表，列表以逗号分隔。 |

- **transition-duration**

   **定义和用法**

  transition-duration 属性规定完成过渡效果需要花费的时间（以秒或毫秒计）。

  | 默认值：          | 0                                      |
  | ----------------- | -------------------------------------- |
  | 继承性：          | no                                     |
  | 版本：            | CSS3                                   |
  | JavaScript 语法： | *object*.style.transitionDuration="5s" |

  **语法**

  ```
  transition-duration: time;
  ```

  | 值     | 描述                                                         |
  | :----- | :----------------------------------------------------------- |
  | *time* | 规定完成过渡效果需要花费的时间（以秒或毫秒计）。默认值是 0，意味着不会有效果。 |

- **transition-timing-function**

  **定义和用法**

  transition-timing-function 属性规定过渡效果的速度曲线。

  该属性允许过渡效果随着时间来改变其速度。

  | 默认值：          | ease                                             |
  | ----------------- | ------------------------------------------------ |
  | 继承性：          | no                                               |
  | 版本：            | CSS3                                             |
  | JavaScript 语法： | *object*.style.transitionTimingFunction="linear" |

  **语法**

  ```
  transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-
  bezier(n,n,n,n);
  ```

  | 值                            | 描述                                                         |
  | :---------------------------- | :----------------------------------------------------------- |
  | linear                        | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
  | ease                          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
  | ease-in                       | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
  | ease-out                      | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
  | ease-in-out                   | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
  | cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |

  **提示：**请在实例中测试不同的值，这样可以更好地理解它们的工作原理。 最后那个cubic-bezier，可以使用[工具网站](http://cubic-bezier.com/)来定制。

- **transition-delay**

  **定义和用法**

  transition-delay 属性规定过渡效果何时开始。

  transition-delay 值以秒或毫秒计。

  | 默认值：          | 0                                   |
  | ----------------- | ----------------------------------- |
  | 继承性：          | no                                  |
  | 版本：            | CSS3                                |
  | JavaScript 语法： | *object*.style.transitionDelay="2s" |

  **语法**

  ```
  transition-delay: time;
  ```

  | 值     | 描述                                                 |
  | :----- | :--------------------------------------------------- |
  | *time* | 规定在过渡效果开始之前需要等待的时间，以秒或毫秒计。 |

## 二、CSS Animation

首先，CSS Animation需要指定动画一个周期持续的时间，以及动画效果的名称。

```

div:hover {
  animation: 1s rainbow;
}

@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

### animation

**定义和用法**

animation 属性是一个简写属性，用于设置六个动画属性：

- animation-name
- animation-duration
- animation-timing-function
- animation-delay
- animation-iteration-count
- animation-direction

**注释：**请始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了。

| 默认值：          | none 0 ease 0 1 normal                        |
| ----------------- | --------------------------------------------- |
| 继承性：          | no                                            |
| 版本：            | CSS3                                          |
| JavaScript 语法： | *object*.style.animation="mymove 5s infinite" |

**语法**

```
animation: name duration timing-function delay iteration-count direction;
```

| 值                                                           | 描述                                                         |                                                 |
| :----------------------------------------------------------- | :----------------------------------------------------------- | ----------------------------------------------- |
| *[animation-name](https://www.w3school.com.cn/cssref/pr_animation-name.asp)* none | 规定需要绑定到选择器的 keyframe 名称。。                     | *object*.style.animationName="mymove"           |
| *[animation-duration](https://www.w3school.com.cn/cssref/pr_animation-duration.asp)* 0 | 规定完成动画所花费的时间，以秒或毫秒计。                     | *object*.style.animationDuration="3s"           |
| *[animation-timing-function](https://www.w3school.com.cn/cssref/pr_animation-timing-function.asp)* ease | 规定动画的速度曲线。                                         | *object*.style.animationTimingFunction="linear" |
| *[animation-delay](https://www.w3school.com.cn/cssref/pr_animation-delay.asp)* 0 | 规定在动画开始之前的延迟。                                   | *object*.style.animationDelay="2s"              |
| *[animation-iteration-count](https://www.w3school.com.cn/cssref/pr_animation-iteration-count.asp)*  1 | 规定动画应该播放的次数。 infinite 规定动画应该无限次播放。   | *object*.style.animationIterationCount=3        |
| *[animation-direction](https://www.w3school.com.cn/cssref/pr_animation-direction.asp)*  normal | 规定是否应该轮流反向播放动画。如果 animation-direction 值是 "alternate"，则动画会在奇数次数（1、3、5 等等）正常播放，而在偶数次数（2、4、6 等等）向后播放。 | *object*.style.animationDirection="alternate"   |