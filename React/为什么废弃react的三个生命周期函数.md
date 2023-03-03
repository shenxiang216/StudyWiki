# 为什么废弃react三个生命周期函数？
自从React发布Fiber之后，更新速度日新月异，而生命周期也随之改变，虽然原有的一些生命周期函数面临废弃，但理解其背后更新的机制也是一种学习。

[「React Fiber」 详细解析](https://zhuanlan.zhihu.com/p/424967867)

新的生命周期增加了`static getDerivedStateFromProps()`以及`getSnapshotBeforeUpdate()`，废弃了原有的`componentWillMount()`、`componentWillUpdate()`以及`componentWillReceiveProps()`，

分别如以下图

原生命周期：

![image](https://segmentfault.com/img/remote/1460000021272661)

新生命周期（图引用自React v16.3之后的组件生命周期函数）：

![image](https://segmentfault.com/img/remote/1460000021272660)

## 为什么数据获取要在componentDidMount中进行?

作者一开始也喜欢在React的willMount函数中进行异步获取数据（认为这可以减少白屏的时间），后来发现其实应该在didMount中进行。

首先，分析一下两者请求数据的区别：

componentWillMount获取数据：

1. 执行willMount函数，等待数据返回
2. 执行render函数
3. 执行didMount函数
4. 数据返回， 执行render

didMount获取数据：

1. 执行willMount函数
2. 执行render函数
3. 执行didMount函数， 等待数据返回
4. 数据返回， 执行render

很明显，在willMount中获取数据，可以节省时间（render函数和didMount函数的执行时间），但是为什么我们还要在didMount中获取数据

1. 如果使用服务端渲染的话，willMount会在服务端和客户端各自执行一次，这会导致请求两次（接受不了~），而didMount只会在客户端进行
2. 在Fiber之后， 由于任务可中断，willMount可能会被执行多次(fiber算法是异步渲染，异步的渲染，很可能因为高优先级任务的出现而打断现有任务导致componentWillMount就可能执行多次)
3. willMount会被废弃，目前被标记为不安全
4. 节省的时间非常少，跟其他的延迟情况相比，这个优化可以使用九牛一毛的形容（为了这么一点时间而一直不跟进技术的发展，得不偿失），并且render函数是肯定比异步数据到达先执行，白屏时间并不能减少

关于第一点，如果你想在服务端渲染时先完成数据的展示再一次性给用户，官方的推荐做法是用constructor代替willMount

## 为什么要改变生命周期

从上面的生命周期的图中可以看出，被废弃的三个函数都是在render之前，因为fiber的出现，很可能因为高优先级任务的出现而打断现有任务导致它们会被执行多次

另外的一个原因则是，React想约束使用者，好的框架能够让人不得已写出容易维护和扩展的代码，这一点又是从何谈起，我们可以从新增加以及即将废弃的生命周期分析入手

#### componentWillMount（）

首先这个函数的功能完全可以使用componentDidMount和constructor来代替，异步获取的数据的情况上面已经说明了，而如果抛去异步获取数据，其余的即是初始化而已，这些功能都可以在constructor中执行，除此之外，如果我们在willMount中订阅事件，但在服务端这并不会执行willUnMount事件，也就是说服务端会导致内存泄漏

所以componentWillMount完全可以不使用，但使用者有时候难免因为各种各样的情况（如作者犯浑）在componentWillMount中做一些操作，那么React为了约束开发者，干脆就抛掉了这个API

#### componentWillReceiveProps

> 在老版本的 React 中，如果组件自身的某个 state 跟其 props 密切相关的话，一直都没有一种很优雅的处理方式去更新 state，而是需要在 componentWillReceiveProps 中判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。类似的业务需求也有很多，如一个可以横向滑动的列表，当前高亮的 Tab 显然隶属于列表自身的状态，但很多情况下，业务需求会要求从外部跳转至列表时，根据传入的某个值，直接定位到某个 Tab。

本段引用自React v16.3 版本新生命周期函数浅析及升级方案

为了解决这些问题，React引入了第一个新的生命周期

```reasonml
static getDerivedStateFromProps(nextProps, prevState) .//返回一个对象 和调用setState一样
```

可以先看一下两者在使用上的区别：

原有的代码

```isbl
componentWillReceiveProps(nextProps){
 if(nextProps.tab!=this.props.tab){
  this.setState({
    tab:nextProps.tab
  });
  this.tabChange();
 }
}
```

新的代码

```wren
static getDerivedStateFromPorps (nextProps,prevState){
 //2
 if(nextProps.tab!=prevState.tab){
   return {
    tab:nextProps.tab
   };
 }
 return null;
}

componentDidUpdate(prevProps,prevState){
  this.tabChange();
}
```

这样看似乎没有什么改变，特别是当我们把this,tabChange也放在didUpdate中执行时（正确做法），完全没有不同，但这也是我们一开始想说的，React通过API来约束开发者写出更好的代码，而新的使用方法有以下的优点

1. getDSFP是静态方法，在这里不能使用this，也就是一个纯函数，开发者不能写出副作用的代码
2. 开发者只能通过prevState而不是prevProps来做对比，保证了state和props之间的简单关系以及不需要处理第一次渲染时prevProps为空的情况
3. 基于第一点，将状态变化（setState）和昂贵操作（tabChange）区分开，更加便于 render 和 commit 阶段操作或者说优化。

#### componentWillUpdate（）

> 与 componentWillReceiveProps 类似，许多开发者也会在 componentWillUpdate 中根据 props 的变化去触发一些回调。但不论是 componentWillReceiveProps 还是 componentWillUpdate，都有可能在一次更新中被调用多次，也就是说写在这里的回调函数也有可能会被调用多次，这显然是不可取的。与 componentDidMount 类似，componentDidUpdate 也不存在这样的问题，一次更新中 componentDidUpdate 只会被调用一次，所以将原先写在 componentWillUpdate 中的回调迁移至 componentDidUpdate 就可以解决这个问题。

本段引用自React v16.3 版本新生命周期函数浅析及升级方案

另外一种情况则是我们`需要获取DOM元素状态`，但是由于在fiber中，render可打断，可能在willMount中获取到的元素状态很可能与实际需要的不同，这个通常可以使用第二个新增的生命函数的解决

```reasonml
getSnapshotBeforeUpdate(prevProps, prevState) // 返回的
值作为componentDidUpdate的第三个参数
```

与willMount不同的是， getSnapshotBeforeUpdate会在最终`确定的render执行之前执行`，也就是`能保证其获取到的元素状态与didUpdate中获取到的元素状态相同`，这里官方提供了一段参考代码：

![image](https://segmentfault.com/img/remote/1460000021272662)

## 总结：

随着React Fiber的落地，许多功能都将开始改变，但本质上是换汤不换药，很多时候都是React为了开发者写出更好的代码而做的改变，当然这也是React的厉害之处，通过框架来约束开发者！