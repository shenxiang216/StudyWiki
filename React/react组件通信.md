# react组件通信

## 前言

React 中组件间的通信有以下几种情况：

父组件向子组件通信，可以通过 props 方式传递数据；也可以通过 ref 方式传递数据；
子组件向父组件通信，通过回调函数方式传递数据；
父组件向后代所有组件传递数据，如果组件层级过多，通过 props 的方式传递数据很繁琐，可以通过 Context.Provider 的方式；
一个数据源实现跨组件通信，通过指定 contextType 的方式来实现；
多个数据源实现跨组件通信，使用 Context.Consumer 方式实现；

## 一、父组件向子组件通信

> 父组件向子组件通信有两种方式，一是父组件通过属性进行传递，子组件通过 props 接收；二是父组件通过 ref 获取到子组件的实例或者元素，调用子组件的方法进行数据传递。

### 1.1通过 props 方式传递数据

父组件中通过给子组件设置属性，将数据传递给子组件，子组件通过 props 来接收，当父组件更改自己状态的时候，子组件接收到的属性就会发生改变。

```react
import React, { Component } from 'react'
import ReactDOM from 'react-dom';

//子组件
class Child extends Component{
  render(){
    return <h1>接收到数据为:{this.props.num}</h1>
  }
}
//父组件
class Parent extends Component{
  num=3;
  render(){
    return <Child num={this.num}></Child>
  }
}

ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);
```

### 1.2通过 ref 传递数据

React 提供的这个ref属性，表示为对组件真正实例的引用，其实就是 ReactDOM.render() 返回的组件实例，ref 可以挂载到组件上也可以挂载到dom元素上。

- 挂到组件(class声明的组件)上的 ref 表示对组件实例的引用。不能在函数式组件上使用 ref 属性，因为它们没有实例。

- 挂载到dom元素上时表示具体的dom元素节点。

使用方法：

- 父组件使用 ref 属性对子组件做标记，获取到子组件的实例或者dom元素，可以调用子组件的方法，传递数据。
- 在 React 最新的版本中，要使用 ref ，需要通过 React.createRef() 方法生成一个ref。

```react
import React, { Component ,createRef} from 'react'
import ReactDOM from 'react-dom';

//子组件
class Child extends Component{
  state={
    name:"admin"
  }
  childClickHandle=(city)=>{
    this.setState({
      address:city
    })
  }
  render(){
    return (
      <div>name:{this.state.name},address:{this.state.address}</div>
    )
  }
}

//父组件
class Parent extends Component{
  constructor(){
    super();
    //通过 createRef() 生成ref
    this.childComp=createRef()
  }
 
  clickHandle=()=>{
    //调用子组件的方法，并传递数据
    this.childComp.current.childClickHandle("beijing");
  }

  render(){
    return (
      <div>
        <button onClick={this.clickHandle}>按钮</button>
        //给子组件设置ref属性
        <Child ref={this.childComp}></Child>
      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);

```
## 二、子组件向父组件通信

子组件通过 `回调函数` 向父组件传递数据。父组件将自己的某个方法传递给子组件，子组件通过`this.props`接收到父组件的方法后进行调用。

**如果子组件内需要修改父组件传递过来的数据，需要通过调用父组件的方法，在父组件中对数据进行修改。**

```react
import React, { Component ,createRef} from 'react'
import ReactDOM from 'react-dom';

//子组件
class Child extends Component{
   state={
     name:"admin",
     age:18
  }
  childClickHandle=()=>{
    this.props.showInfo({address:"beijing"})
  }
  render(){
    return (
	    <div>
	    	//方式一：直接调用父组件的方法
		    <button onClick={this.props.showInfo.bind(this,this.state)}>按钮</button>
		    //方式二：先调用自身的方法，再调用父组件的方法
		    <button onClick={this.childClickHandle}>按钮</button>
	    </div>
	)
  }
}

//父组件
class Parent extends Component{
  clickHandle(data){
    //data为子组件中传递过来的数据
    //{address: "beijing"}
    //{name: "admin", age: 18, sex: "woman"}
	console.log(data);
  }

  render(){
    return <Child showInfo={this.clickHandle.bind(this)}></Child>
  }
}

ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);

```

## 三、跨组件通信 Context

在 react 中没有类似 vue 中的事件总线来解决这个问题，我们只能借助它们共同的父级组件来实现，将非父子关系装换成多维度的父子关系。

react 中数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于多层级父子关系的组件传值是极其繁琐的。react 提供了context api 来实现在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。React 16.3之后的contextapi 较之前的好用。

### 3.1父组件向后代组件通信

使用 Context.Provider ，具体使用方法如下：

1. 使用 createContext() 创建一个context 对象（内容为需要传递的数据），参数为默认值；
2. 在父组件外层使用 <.Provider> 将当前 context 的值传递给内部所有的组件树。当使用了 <.Provider> 后，不再读取上面的默认值，需要设置 value 属性来进行数据传递。
3. 当组件需要读取数据时，指定 contextType 读取当前的 context 对象（即刚开始创建的 context）；
4. 通过 this.context，获取到当前 context 内的数据；

```react
import React, { Component ,createContext} from 'react';
import ReactDOM from 'react-dom';

//使用createContext()创建一个context,参数为默认值
const cityContext = createContext("beijing");
cityContext.displayName = "cityContextName"; //devtools中调试用

class Parent extends Component{
 render() {
       return (
       		//使用Provider 将当前context的值传递给下面的组件树
           <cityContext.Provider value="shenzhen">
                   <Child />
           </cityContext.Provider>
       )
   }
}

//中间的组件不需要对数据进行传递
class Child extends Component{
   render() {
       return <Grandson />
   }
}

class Grandson extends Component{
  //指定contextType 读取当前的context
  //react 会往上找到最近的 Provider，然后使用它的值
  static contextType = cityContext;
   render() {
       return <div>{this.context}</div>
       //最终页面上输出 shenzhen
   }
}

ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);

```

上面的方法中，我们实现了跨组件的数据传递，这种方式的缺点是只能有一个共享的数据源，也就是在 Grandson 组件中，指定 contextType 的值只能是一个。那么如果我们有多个数据源都需要进行跨组件传递，应该怎么做呢？这里，我们可以使用 <.Consumer> 来实现对多个数据源进行共享。

### 3.2多个数据源实现跨组件通信

使用 Context.Consumer ，实现多个数据源跨组件通信。具体使用方法如下：

1. 使用 import 导入要读取的数据文件。

2. 使用<.Consumer> ，它里面的语法是函数组件的语法，函数接收的 参数 为当前 createContext() 里的默认值。
3. <.Consumer> 可以嵌套使用，也可以平级使用。

比如现在我们有两个数据文件 CityContext.js 和 WeatherContext.js （注意：共享的数据源文件需要导出 context 对象）。

CityContext.js 文件内容：

```react
/* CityContext.js */
import {createContext} from 'react'
const CityContext = createContext({
    id:1,
    name:"beijing",
    location:"north"
})
export default CityContext;

```

WeatherContext.js 文件内容：

```react
/* WeatherContext.js */
import {createContext} from 'react'
const WeatherContext = createContext({
    status:"sunshine"
})
export default WeatherContext;

```

上面这两个文件需要在多个组件内进行使用，可以使用下面的方式：

```react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//导入需要使用的context对象
import CityContext from './CityContext';
import WeatherContext from './WeatherContext';

class Child extends Component{
 render() {
       return (
           <CityContext.Consumer>	//子元素是函数组件的语法
             {
               (prop)=>{	//参数是当前context对象里的数据
                 return (
                     <div>
                       name:{prop.name},location:{prop.location}
                        <WeatherContext.Consumer>	//可以嵌套使用，也可以同级使用
                          {
                            ({status})=>{
                              return <div>weather:{status}</div>
                            }
                          }
                        </WeatherContext.Consumer>
                     </div>
                 )
               }
             }
           </CityContext.Consumer>
       )
   }
}

ReactDOM.render(
  <Child />,
  document.getElementById('root')
);

```

### 3.3Context 的使用场景

Context 主要应用场景在于**很多不同层级的组件需要访问同样一些的数据**。请谨慎使用，因为这会使得组件的复用性变差。**如果用组件组合可以解决的问题，就不要使用 Context** 。

使用 context 的通用的场景包括管理当前的 locale，theme，或者一些缓存数据。

### 3.4Context 总结

1. React.createContext(defaultValue) 创建一个 Context 对象。

2. Class.contextType，挂载在 class 上的 contextType 属性会被赋值为一个 Context 对象。这能让你使用 this.context 来消费最近的 Context 上的数据。你可以在任何生命周期中访问到它，包括 render 函数中。
3. Context.Provider，接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
4. Context.Consumer，是函数作为子元素（function as a child）这种做法。这个函数参数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
5. Context.displayName，浏览器中调试用。

**Consumer 一般情况下都是和 Provider 同时使用。**

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

## 四、Redux

上面有提到使用 Context 做组件间的通讯会使得组件的复用性变差，如果项目比较复杂、模块比较很多的情况，推荐使用 Redux 来做组件间的通信。

react-redux 提供两个核心的api：

- Provider: 提供store，根据单一store原则 ，一般只会出现在整个应用程序的最顶层。
- connect: 用于连接展示组件和 redux store。

connect 的语法格式为： connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)(component)

一般来说只会用到前面两个，它的作用是：

- 把store.getState()的状态转化为展示组件props上的属性

- 把actionCreators转化为展示组件props上的方法

> 特别强调：
> 官网上的第二个参数为mapDispatchToProps, 实际上就是actionCreators

只要上层中有Provider组件并且提供了store, 那么，子孙级别的任何组件，要想使用store里的状态，都可以通过connect方法进行连接。如果只是想连接actionCreators，可以第一个参数传递为null。

## 参考资料

[React 组件通信的五种方式_props_ref_Context_Redux](https://blog.csdn.net/Charissa2017/article/details/105746685)

