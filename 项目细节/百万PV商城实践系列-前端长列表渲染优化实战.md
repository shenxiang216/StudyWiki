## 简介

本篇文章是`商城实践系列`的第二篇文章，主要内容是对商城项目中一些`长列表渲染`进行优化，提高渲染的效率、优化显示速度。

我们在使用电商平台的过程中，打开首页时，我们一直向下滑动就会有源源不断的推荐内容向我们展示。随着浏览页面操作越来越多，数据也越来越庞大，这类场景我们都可以统一称为长列表渲染。

在商城项目当中，长列表渲染出现的页面都与用户密切相关，如`订单列表`、`优惠券列表`、`购物车`等都是我们日常生活中经常浏览的一些页面，因此长列表渲染的`性能效率`与`用户体验`两者是成`正比`的。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d072876ea5494132927c0539b29b42fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

而在长列表页面做性能优化和开发设计的时候，我们大多数会碰到以下两个问题：

- `数据过多`，首次展示内容时间过长，接口返回数据过多，页面数据不好处理。
- `DOM元素过多`，页面渲染卡顿、操作不流畅，浏览器性能压力重。

这些问题该怎么解决呢？我建议使用分页加载+虚拟列表的方案。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6772d315449f4f96b19a48cc85d280bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 为什么使用分页+虚拟列表的方案？

为了方便大家查阅，我把`详细的场景`、`问题和可用的解决方案`整理在了思维导图中。其中，可用的解决方案包括`分页加载`、`切片加载`、`虚拟列表`，以及`分页+虚拟列表`。那么，我为什么选择`分页+虚拟列表`这个方案呢？

首先，我们将每个方案可以`解决的问题`和`不能解决的问题`做一个梳理，具体的优缺点如下：

- **分页加载**：解决了数据过多问题，通过数据分页的方式减少了`首次页面加载的数据和DOM数量`。是现今绝大部分的应用都会采用的实施手段。随着页面`浏览的页面数据增多`，DOM数量也越来越多，还是会存在部分问题。
- **分片加载**：与分页加载相同，只是将用户触底行为获取最新数据的时间节点在一开始进行了切片加载，优先显示页面数据在加载其他数据。`会出现页面阻塞和性能问题`。
- **虚拟列表**：将驱动交给数据，通过区间来直接`渲染区间内容中的数据DOM`，解决了页面列表内元素过多操作卡顿的问题, 与数据加载无挂钩。

当列举了`三种常见`的方式后，我们发现`单一的方案`很难满足我们的诉求。因此，我选择使用`分页的方式`处理数据加载，同时将渲染页面的事情交给`虚拟列表`进行渲染。通过结合两种不同侧重点的方案，来满足我们初步的诉求。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feb2e430439d46a0b10a7cf3d85eaa3b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 实现虚拟列表

既然敲定了解决方案，我们就先来看看虚拟列表是什么东西吧🥳。

通过下面的示意图，我们将整体列表划分为`滚动窗口`和`可视窗口`。左边是真实的列表，所有的列表项都是真实的DOM元素，而虚拟列表从图中可以看到，只有出现在可视窗口内的列表项才是真实的DOM元素，而未出现在可视窗口中的元素则只是虚拟数据，并未加载到页面上。

> 与真实列表不同的是，虚拟列表的滚动都是通过transform或者是marginTop做的偏移量，本身列表中只显示视窗区的DOM元素。

下面，我们就来从0到1实现一个基本的虚拟列表吧。

### 基本布局

如下结构图，我们先分析下基本页面构成：

- 第一层为`容器层`，选定一个固定高度，也就是我们说的可视化窗口
- 第二层为`内容层`，一般在这里撑开高度，使容器形成`scroll`。
- 第三层为`子内容层`，居于内容层内部，也就是列表中的列表项。
- `......`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d484e0dd47754b2ba8ea70c42c3df4bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

分析后，我将结构图中代码使用`JSX`实现后，就是下面这个简单的结构：

```
页面布局代码
<div>
  <div>
    ... List Item Element
  </div>
</div>;

.App {
    font-family: sans-serif;
    text-align: center;
}

.showElement {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    margin-bottom: 8px;
    border-radius: 4px;
}
```

先搭建一个简单的页面，然后通过`currentViewList`渲染出对应的列表项内容。

### 初始化页面

当我们确定了页面的基本结构后，我们再来完善一些布局与配置，实现一个真实渲染上千条数据的列表。

我先定义了一些配置，包含容器高度、列表项高度、预加载偏移数量等需要用到的固定内容。

- **容器高度**：当前虚拟列表的高度
- **列表项高度**： 列表项的高度
- **预加载偏移**：可视窗上下做预加载时需要额外展示几个预备内容

```
页面属性
/** @name 页面容器高度 */

const SCROLL_VIEW_HEIGHT: number = 500;

/** @name 列表项高度 */

const ITEM_HEIGHT: number = 50;

/** @name 预加载数量 */

const PRE_LOAD_COUNT: number = SCROLL_VIEW_HEIGHT / ITEM_HEIGHT;
```

接着，创建一个`useRef`用来存储元素，然后获取视窗高度和偏移属性。

```ts
/** 容器Ref */

const containerRef = useRef<HTMLDivElement | null>(null);
```

然后，创建数据源，并且生成`3000`条随机数据做显示处理。

```ts
const [sourceData, setSourceData] = useState<number[]>([]);

/**
 * 创建列表显示数据
 */
const createListData = () => {
  const initnalList: number[] = Array.from(Array(4000).keys());
  setSourceData(initnalList);
};

useEffect(() => {
  createListData();
}, []);
```

最后，为相对应的容器绑定高度。在最外层div标签设置高度为`SCROLL_VIEW_HEIGHT`，对列表div的高度则设置为`sourceData.length * ITEM_HEIGHT`。

```react
获取列表整体高度
/**
 * scrollView整体高度
 */
 const scrollViewHeight = useMemo(() => {
  return sourceData.length * ITEM_HEIGHT;
}, [sourceData]);
绑定页面视图
<div
  ref={containerRef}
  style={{
    height: SCROLL_VIEW_HEIGHT,
    overflow: "auto",
  }}
  onScroll={onContainerScroll}
>
  <div
    style={{
      width: "100%",
      height: scrollViewHeight - scrollViewOffset,
      marginTop: scrollViewOffset,
    }}
  >
    {sourceData.map((e) => (
      <div
        style={{
          height: ITEM_HEIGHT,
        }}
        className="showElement"
        key={e}
      >
        Current Position: {e}
      </div>
    ))}
  </div>
</div>;
```

当数据初始化后，我们的列表页面就初步完成了，来看下效果吧。

### 内容截取

对于虚拟列表来说，并不需要全量将数据渲染在页面上。那么，在这里我们就要开始做数据截取的工作了。

首先，如下图，我们通过`showRange`来控制页面显示元素的数量。通过`Array.slice`的函数方法对`sourceData`进行数据截取, 返回值就是我们在页面上去显示的列表数据了。我将上面代码中直接遍历`souceData`换成我们的新数据列表。如下：

```ts
{currentViewList.map((e) => (
  <div
    style={{
      height: ITEM_HEIGHT
    }}
    className="showElement"
    key={e.data}
  >
    Current Position: {e.data}
  </div>
))}
```

上面使用到的`currentViewList`是一个`useMemo`的返回值，它会随着`showRange`和`sourceData`的更新发生变化。

```ts
/**
 * 当前scrollView展示列表
 */
 const currentViewList = useMemo(() => {
  return sourceData.slice(showRange.start, showRange.end).map((el, index) => ({
    data: el,
    index,
  }));
}, [showRange, sourceData]);
```

### 滚动计算

至此，已经完成了一个基本的虚拟列表雏形，下一步我们就需要监听视窗滚动事件来计算`showRange`中的`start`和`end`的偏移量，同时调整对应的滚动条进度来实现一个真正的列表效果。

首先，我先为滚动视窗(scrollContainer)绑定onScroll事件，也就是下面的`onContainerScroll`函数方法。

```ts
/**
 * onScroll事件回调
 * @param event { UIEvent<HTMLDivElement> } scrollview滚动参数
 */
 const onContainerScroll = (event: UIEvent<HTMLDivElement>) => {
  event.preventDefault();
  calculateRange();
};
```

在事件主要做的事情就计算当前`showRange`中的`start`和`end`所处位置，同时更新页面视图数据。下面，我们来看看它是怎么处理的吧！

首先，通过`containerRef.current.scrollTop`可以知道元素滚动条内的顶部隐藏列表的高度，然后使用`Math.floor`方法向下取整后，来获取当前偏移的元素数量，在减去一开始的上下文预加载数量`PRE_LOAD_COUNT`，就可以得出截取内容开始的位置。

其次，通过`containerRef.current.clientHeight`可以获取滚动视窗的高度，那么通过`containerRef.current.clientHeight / ITEM_HEIGHT`这个公式就可以得出当前容器窗口可以容纳几个列表项。

当我通过当前滚动条位置下之前滚动的元素个数且已经计算出截取窗口的起始位置后，就可以通过`启动位置 + 容器显示个数 + 预加载个数`这个公式计算出了当前截取窗口的结束位置。使用`setShowPageRange`方法更新新的位置下标后，当我上下滑动窗口，显示的数据会根据`showRange`切割成为不同的数据渲染在页面上。

```ts
/**
 * 计算元素范围
 */
 const calculateRange = () => {
  const element = containerRef.current;
  if (element) {
    const offset: number = Math.floor(element.scrollTop / ITEM_HEIGHT) + 1;
    console.log(offset, "offset");
    const viewItemSize: number = Math.ceil(element.clientHeight / ITEM_HEIGHT);
    const startSize: number = offset - PRE_LOAD_COUNT;
    const endSize: number = viewItemSize + offset + PRE_LOAD_COUNT;
    setShowPageRange({
      start: startSize < 0 ? 0 : startSize,
      end: endSize > sourceData.length ? sourceData.length : endSize,
    });
  }
};
```

### 滚动条偏移

上面，我们提到会根据`containerRef.current.scrollTop`计算当前滚动过的高度。那么问题来了，页面上其实并没有真实的元素，又该如何去撑开这个高度呢？

目前而言，比较流行的解决方案分为`MarinTop`和`TranForm`做距离顶部的偏移来实现高度的撑开。

- margin是属于布局属性，该属性的变化会导致页面的重排
- transform是合成属性，浏览器会为元素创建一个独立的复合层，当元素内容没有发生变化，该层不会被重绘，通过重新复合来创建动画帧。

两种方案并没有太大的区别，都可以用来实现距离顶部位置的偏移，达到撑开列表实际高度的作用。

下面，我就以`MarinTop`的方法来处理这个问题，来完善当前的虚拟列表。

首先，我们需要计算出列表页面距离顶部的`MarginTop`的距离，通过公式：`当前虚拟列表的起始位置 * 列表项高度`，我们可以计算出当前的`scrollTop`距离。

通过`useMemo`将逻辑做一个缓存处理，依赖项为`showRange.start`, 当`showRange.start`发生变化时会更新`marginTop`的高度计算。

```ts
/**
 * scrollView 偏移量
 */
 const scrollViewOffset = useMemo(() => {
  console.log(showRange.start, "showRange.start");
  return showRange.start * ITEM_HEIGHT;
}, [showRange.start]);
```

在页面上为列表窗口绑定`marginTop: scrollViewOffset`属性，并且在总高度中减去`scrollViewOffset`来维持平衡，防止多出距离的白底。

```
如下代码
<div
    style={{
        width: "100%",
        height: scrollViewHeight - scrollViewOffset,
        marginTop: scrollViewOffset
    }}
>
```

至此，我们已经完成了一个基本的虚拟列表，下面我们来一起看看实际的效果吧。

## 结合分页加载

当我们有了一个虚拟列表后，就可以尝试结合分页加载来实现一个懒加载的长虚拟列表了。

如果做过分页滚动加载的小伙伴可能立马就想到实现思路了，不了解的同学也不要着急，下面我就带大家一起来实现一个带分页加载的虚拟列表，相信你看完之后会对这类问题有一个更加深入的理解。

### 判断是否到底部

想要实现列表的分页加载，我们需要绑定`onScroll`事件来判断当前滚动视窗是否滚动到了底部，当滚动到底部后需要为`sourceData`进行数据的添加。同时将挪动指针，将数据指向下一个起始点。

具体实现代码如下，`reachScrollBottom`函数的返回值是当前滚动窗口是否已经到达了底部。因此，我们通过函数的返回值进行条件判断。到达底部后，我们模拟一批数据后通过`setSourceData`设置源数据。结束之后在执行`calculateRange`重新设置内容截取的区间。

```ts
/**
 * onScroll事件回调
 * @param event { UIEvent<HTMLDivElement> } scrollview滚动参数
 */
 const onContainerScroll = (event: UIEvent<HTMLDivElement>) => {
  event.preventDefault();
  if (reachScrollBottom()) {
    // 模拟数据添加，实际上是 await 异步请求做为数据的添加
    let endIndex = showRange.end;
    let pushData: number[] = [];
    for (let index = 0; index < 20; index++) {
      pushData.push(endIndex++);
    }
    setSourceData((arr) => {
      return [...arr, ...pushData];
    });
  }
  calculateRange();
};
```

那么，`calculatScrollTop`是如何判断当前是否已经触底呢？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47ba10f8c1c84943877caccdbd5c9b33~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

分析上图，我通过`containerRef`可以拿到滚动窗口的高度`scrollHeight`或者直接使用`soureData.length * ITEM_HEIGHT`充当滚动窗口的高度两者作用是一样的。

同时，我也可以拿到`scrollTop`滚动位置距离顶部的高度和`clientHeight`当前视窗高度。通过三者的关系，可以得出条件公式：`scrollTop + clientHeight >= scrollHeight`，满足这个条件就说明当前窗口已经到达底部。我们将其写成`reachScrollBottom`方法，如下：

```ts
/**
 * 计算当前是否已经到底底部
 * @returns 是否到达底部
 */
 const reachScrollBottom = (): boolean => {
  //滚动条距离顶部
  const contentScrollTop = containerRef.current?.scrollTop || 0; 
  //可视区域
  const clientHeight = containerRef.current?.clientHeight || 0; 
  //滚动条内容的总高度
  const scrollHeight = containerRef.current?.scrollHeight || 0;
  if (contentScrollTop + clientHeight >= scrollHeight) {
    return true;
  }
  return false;
};
```

### 无限列表演示

至此，我们的虚拟列表实现已经基本完成了，下面我们一起来看看效果吧，这里先简单的模拟一个商品列表来作为演示页面，效果如下：

![Kapture 2021-08-08 at 22.51.01.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ab17038bd5e4718990bf2387bce4d85~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 资源推荐

- [# 文章源码地址](https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fxuniliebiaodaimashili-moi5f%3Ffile%3D%2Fsrc%2FApp.tsx%3A3138-3148)
- [# 「前端进阶」高性能渲染十万条数据(虚拟列表)](https://juejin.cn/post/6844903982742110216)
- [# 如何实现一个高度自适应的虚拟列表](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F366416646)
- [# ahooks虚拟列表](https://link.juejin.cn?target=https%3A%2F%2Fahooks.js.org%2Fhooks%2Fui%2Fuse-virtual-list)

## 总结

本篇文章中，我讲了针对商城项目中出现长列表的部分场景，同时针对这些场景列举了不同的解决方案及其优缺点。在选择`分页 + 虚拟列表`的组合方式来解决问题的过程中，我一步一步带大家实现了一个简单的分页虚拟列表，帮助大家了解其内部的原理。

当然，这个方案还有很多需要完善的地方，我也在这里说说它需要优化的地方。

- 滚动事件可以添加节流事件避免造成性能浪费。
- 列表项高度不固定需要给定一个默认高度后设置新的高度在重新刷新容易截取的开始和结束位置。
- 滑动过快出现白屏问题可以尝试动态加载loading显示过渡，优化一些细节体验。
- 列表项中存在阴影元素需要考虑缓存处理，不然滚动时必然会引起重新加载。

市面上已经有很多`开源库`可以解决这些问题，如react中`ahooks`就有相对完善的虚拟列表实践，本文的代码相对而言也是对其的源码分析。

总的来说，我们在真实开发中并不需要从零开始造一个完善的轮子，直接使用成熟的方案，搭配好的产品设计可以很好地解决大部分的问题。