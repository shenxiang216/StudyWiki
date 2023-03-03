![截屏2022-03-25 17.37.22.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46a903ae62004e68a08b8f663be0905c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

# 目录

* useEffect的构成
* useEffect第一个参数
* useEffect第二个参数
* 使用useEffect模拟react生命周期

> ​	1React-Hooks的生命周期：
>
> 函数组件被调用 -> 执行代码 ->根据return的JSX渲染DOM -> 执行useEffect -> 函数组件被重新调用 -> 执行代码 -> 根据return的JSX重新渲染DOM -> 执行useEffect。（循环往复）

# 1. useEffect的构成

![carbon (3).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b64b542115b04bd9ab5e3a893759c6f9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

## 用途：

* 获取数据
* 事件监听或订阅
* 监控/改变DOM
* 设置定时器，输出日志
* 该 Hook 接收一个包含命令式、且可能有副作用代码的函数。

# 

# 2. 参数一：effect

> 第一个参数是一个`函数`，必传项。是组件要执行的副作用。可以看做`componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

```js
useEffect(() => {
    console.log('执行副作用');   // 普通函数，执行副作用，可以实现componentDidMount、componentDidUpdate
    return () => {             // return函数, 组件销毁时清除副作用，可以实现componentWillUnmount
        console.log("清除副作用");
    };
}, [count]);
```

# 

# 3. 参数二：deps

> 第二个参数可以`不传`或者是一个`数组`，非必传项。数组里面依赖改变时候副作用函数才会重新更新。所谓依赖改变就是 [ 之前值 === 之后值 ] ，如果为`true不执行useEffect`，为`false重新执行useEffect`。

**第二个参数可以是**

1. 不传
2. 空数组
3. 由基本类型或者引用类型组成的数组

# 

## 1. 不传值

```js
const [count, setCount] = useState<number>(1);
useEffect(() => {
    setTimeout(() => {
        setCount(count + 1);
    }, 1000);
    console.log(`第二个参数: 不传值, 第 ${count} 次执行`);
});
// 打印log，无限循环
第二个参数: 不传值, 第 1 次执行
第二个参数: 不传值, 第 2 次执行
第二个参数: 不传值, 第 3 次执行
第二个参数: 不传值, 第 ... 次执行
```

**现象：** useEffect 会在第一次渲染以及每次更新渲染后都执行。

![截屏2022-03-20 22.37.03.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25b18ee0995e41959dd11bcd0fa03a0e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**原因：** 第一次渲染后执行一次useEffect，useEffect中回调函数改变state值，state值改变触发组件重新渲染，useEffect没有比较值，useEffect重新执行，useEffect中回调函数改变state值，state值改变触发组件重新渲染，无限循环。

> ⚠️ 不传值是一种`缺失依赖关系`的情况，不建议这么做。

# 

## 2. 空数组作为依赖

```js
const [count, setCount] = useState<number>(1);
useEffect(() => {
    setTimeout(() => {
        setCount(count + 1);
    }, 1000);
    console.log(`第二个参数: 空数组, 第 ${count} 次执行`);
}, []);
// 打印log，执行一次
第二个参数: 空数组, 第 1 次执行
```

**现象：** useEffect 会在第一次渲染后执行一次。

![shuzu.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/475430f27f9b4e2ba61da3a4d956f7ec~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**原因：** 第一次渲染后执行一次一次useEffect，useEffect中回调函数改变state值，state值改变触发组件重新渲染，useEffect中 [] 没有值，依赖没变，不触发useEffect，不执行回调函数, state 无更新，不触发组件重新渲染，至此结束。

> 空数组算是`省略依赖关系`的情况，`有一定概率引起bug`，比如使用空数组的useEffect中回调函数依赖一个变化的state，后续state的变化将影响不到回调函数，你可能就看不变化了。如果确定只更新一次就没问题，那么设置为空数组完全没有问题。

# 

## 3. 基本类型作为依赖

```js
const [count, setCount] = useState<number>(1);  // 基本类型以number为例
useEffect(() => {
    setTimeout(() => {
        setCount(count + 1);
    }, 1000);
    console.log(`第二个参数: 基本类型, 第 ${count} 次执行`);
}, [count]);
// 打印log，无限循环
第二个参数: 基本类型, 第 1 次执行
第二个参数: 基本类型, 第 2 次执行
第二个参数: 基本类型, 第 3 次执行
第二个参数: 基本类型, 第 ... 次执行
```

**现象：** useEffect 会在第一次渲染以及每次更新渲染后都执行。

![jiben.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c76f1585b0146f9919af08e8a285e5a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**原因：** 第一次渲染后执行一次useEffect，useEffect中回调函数改变state值，state值改变触发组件重新渲染，useEffect比较值（count）改变，useEffect重新执行，useEffect中回调函数改变state值，state值改变触发组件重新渲染，无限循环。

> 传入第二个参数，只有`一个值`，比较该值有变化就执行，如果有`多个值`的数组，会比较每一个值，有一个变化就执行

# 

## 4.引用类型

### 4.1数组作为依赖

```react
const [count, setCount] = useState(1);
const newArr = [4,5];
useEffect(() => {
    setTimeout(() => {
        setCount(count+1);
    }, 1000);
    console.log(`第二个参数: 数组, 第 ${count} 次执行`);
}, [newArr]);
// 打印log，无限循环
第二个参数: 数组, 第 1 次执行
第二个参数: 数组, 第 2 次执行
第二个参数: 数组, 第 3 次执行
第二个参数: 数组, 第 ... 次执行
```

**现象**：useEffect 会在第一次渲染以及每次更新渲染后都执行。

![array.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8041330712f4ada9a1ed46b3fe65cd0~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**原因**：第一次渲染后执行一次useEffect，useEffect中回调函数改变state值，state值改变触发组件重新渲染，useEffect依赖项arr发生变化，此处依赖数组执行`浅层比较`（`[...] === [...] 为false`）useEffect重新执行，useEffect中回调函数改变state值，state值改变触发组件`重新渲染，无限循环`。

**上述数组作为依赖代码，去除setTimeout会出现什么情况？**

```js
const [count, setCount] = useState(1);
const newArr = [4,5];
useEffect(() => {
    setCount(count+1);
    console.log(`第二个参数: 基本类型, 第 ${count} 次执行`);
}, [newArr]);
    
// 打印log报错，如下图
```

![error.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/683113f1b9384defa6ccae6a50cf4c67~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**现象**： 控制台报错 "超过最大更新深度"

**原因**：因为useEffect频繁调用setState，state不断改变。

**如何解决：** 使用useRef，useRef会在每次渲染时返回同一个ref对象，返回的`ref`在组件的`整个生命周期内保持不变`。

```js
const [count, setCount] = useState(1);
const refArr = useRef([4, 5, 6]);
useEffect(() => {
    setCount(count+1);
    console.log(`第二个参数: 数组, 第 ${count} 次执行`);
}, [refArr.current]);
// 打印log，执行一次
第二个参数: 数组, 第 1 次执行
```

# 

### 4.2 函数作为依赖

```
const [count, setCount] = useState(1);
const consoleFunction = () => {
    console.log('consoleFunction');
};
useEffect(() => {
    setTimeout(() => {
        setCount(count + 1);
    }, 1000);
    console.log(`第二个参数: 函数, 第 ${count} 次执行`);
}, [consoleFunction]);
// 打印log，无限循环
第二个参数: 函数, 第 1 次执行
第二个参数: 函数, 第 2 次执行
第二个参数: 函数, 第 3 次执行
第二个参数: 函数, 第 ... 次执行
```

**现象**：useEffect 会在第一次渲染以及每次更新渲染后都执行。

![fn.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c31a726bacac4a8ab8d8e3d213dfbe4b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**原因**：第一次渲染后执行一次useEffect，useEffect中回调函数改变state值，state值改变触发组件重新渲染，useEffect依赖项consoleFunction函数发生变化，此处依赖函数执行`浅层比较`（每次渲染都重新创建一个新的函数 `function(前) === function（后）为false`）useEffect重新执行，useEffect中回调函数改变state值，state值改变触发组件`重新渲染，无限循环`。

**上述函数作为依赖代码，去除setTimeout会出现什么情况？**

```js
const [count, setCount] = useState(1);
const consoleFunction = () => {
    console.log('consoleFunction');
};
useEffect(() => {
    setCount(count + 1);
    console.log("第二个参数: 函数");
}, [consoleFunction]);
// 打印log报错，如下图
```

![error.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/683113f1b9384defa6ccae6a50cf4c67~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**现象**： 控制台报错 "超过最大更新深度"。

**原因**： 因为useEffect频繁调用setState，state不断改变。

**如何解决：** 使用useCallback，useCallback返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。

```js
const [count, setCount] = useState(1);
const consoleFunction = useCallback(() => {
    console.log('consoleFunction');
}, []);
useEffect(() => {
    setCount(count + 1);
    console.log(`第二个参数: 函数, 第 ${count} 次执行`);
}, [consoleFunction]);
// 打印log，执行一次
第二个参数: 函数, 第 1 次执行
```

# 

### 4.3对象作为依赖

```
const [count, setCount] = useState(1);
const obj = {name: 'zhangsan'};
useEffect(() => {
    setTimeout(() => {
        setCount(count + 1);
    }, 1000);
    console.log(`第二个参数: 对象, 第 ${count} 次执行`);
}, [obj]);
// 打印log，无限循环
第二个参数: 对象, 第 1 次执行
第二个参数: 对象, 第 2 次执行
第二个参数: 对象, 第 3 次执行
第二个参数: 对象, 第 ... 次执行
```

**现象**：useEffect 会在第一次渲染以及每次更新渲染后都执行。

![obj.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaf260a405704bc5a11a50e54e529f71~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**原因**：第一次渲染后执行一次useEffect，useEffect中回调函数改变state值，state值改变触发组件重新渲染，useEffect依赖项obj发生变化，此处依赖对象执行`浅层比较`（ `{...}=== {...} 为false`）useEffect重新执行，useEffect中回调函数改变state值，state值改变触发组件重新渲染，无限循环。

**上述对象作为依赖代码，去除setTimeout会出现什么情况？**

```
const obj = {name: 'zhangsan'};
useEffect(() => {
    setCount(count + 1);
    console.log(`第二个参数: 对象, 第 ${count} 次执行`);
}, [obj]);
  
// 打印log报错, 如下图
```

![error.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/683113f1b9384defa6ccae6a50cf4c67~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

**现象**： 控制台报错 "超过最大更新深度"。

**原因**： 因为useEffect频繁调用setState，state不断改变。

**如何解决：** 使用useMemo，useMemo该回调函数仅在某个依赖项改变时才会更新。此处使用[]依赖，组件重新渲染后对象不再重新定义。

```js
const [count, setCount] = useState(1);
const obj = useMemo(() => ({name: 'zhangsan'}), []);
useEffect(() => {
    setCount(count + 1);
    console.log(`第二个参数: 对象, 第 ${count} 次执行`);
}, [obj]);
// 打印log
第二个参数: 对象, 第 1 次执行
```

# 

# 4. 使用useEffect模拟react三个生命周期

## 实现componentDidMount

```js
const Home: React.FC<Iprops> = () => {
  useEffect(() => {
    getList() // 调用方法发起异步请求
  }, [])；
  
 return (
      <div>
            hello world
      </div>
  )
}
```

* `useEffect`的第二个参数，传入了一个`[]`，表示我们只需在页面`初始化时候执行副作用`，此处为发起请求。
* 相当于class组件的**componentDidMount**。

## 实现componentDidUpdate

```js
const Home: React.FC<Iprops> =() => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    getList();  // 调用发起异步请求
  }, [count])   // 仅在count更改时更新
  return (
      <div>
            hello world
      </div>
  )
}
```

* `useEffect`的第二个参数，传入`[count]`，只有`count的值发生改变，执行副作用` 此处为重新发起请求。count也可换成其他依赖项。
* 相当于class组件的**componentDidUpdate**。

## 实现componentWillUnmount

```js
useEffect(() => {
    getList();
    return () => {
        console.log('组件注销, 实现componentWillUnmount');
    };
}, [])
```

* `useEffect` 第一个参数， `return 一个函数`，可以用来`清除副作用`。
* 相当于class 组件的 **componentWillUnmount**。

## 参考链接

* [React useEffect 两个参数你用对了吗](https://juejin.cn/post/7083308347331444750#heading-16)