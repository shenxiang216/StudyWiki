# React hook笔记

> 第一至九阐述hook基本概念，并以useEffect（）为例子辅助理解
>
> 第十和十一讲解react默认提供的四个钩子和创建自己的钩子，所以关于useEffect（）会重复讲，但是代码十里不同，更有利于理解

### 一、React的两套API

* 类（class）和钩子（hooks）API

* 任何一个组件，可以用类来写，也可以用钩子来写

  ```react
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  
  //这个函数只做一件事，就是根据输入的参数，返回组件的 HTML 代码。这种只进行单纯的数据计算（换算）的函数，在函数式编程里面称为 "纯函数"（pure function）
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  } 
  ```

* 钩子更简洁，代码量少，用起来比较"轻"，而类比较"重"。而且，钩子是函数，更符合 React 函数式的本质。

### 二、类和函数的差异

* 不同的写法，代表了不同的编程方法论。

  >**类（class）是数据和逻辑的封装。** 也就是说，组件的状态和操作方法是封装在一起的。如果选择了类的写法，就应该把相关的数据和操作，都写在同一个 class 里面。
  >
  >![img](https://www.wangbase.com/blogimg/asset/202009/bg2020091408.jpg)
  >
  >**函数一般来说，只应该做一件事，就是返回一个值。** 如果你有多个操作，每个操作应该写成一个单独的函数。而且，数据的状态应该与操作方法分离。根据这种理念，React 的函数组件只应该做一件事情：返回组件的 HTML 代码，而没有其他的功能。
  
* 组件类的缺点：

  * React 的核心是组件。v16.8 版本之前，组件的标准写法是类（class）

  * ```react
    import React, { Component } from "react";
    
    export default class Button extends Component {
      constructor() {
        super();
        this.state = { buttonText: "Click me, please" };
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick() {
        this.setState(() => {
          return { buttonText: "Thanks, been clicked!" };
        });
      }
      render() {
        const { buttonText } = this.state;
        return <button onClick={this.handleClick}>{buttonText}</button>;
      }
    }
    
    //这个组件类仅仅是一个按钮，但可以看到，它的代码已经很"重"了。真实的 React App 由多个类按照层级，一层层构成，复杂度成倍增长。再加入 Redux，就变得更复杂。
    ```

  * Redux 的作者 Dan Abramov [总结](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)了组件类的几个缺点:

    * 大型组件很难拆分和重构，也很难测试。
    * 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
    * 组件类引入了复杂的编程模式，比如 render props 和高阶组件。

* 函数组件

  * React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 **组件的最佳写法应该是函数，而不是类。**
  * React很早就支持函数组件，但是，这种写法有重大限制，必须是纯函数，不能包含状态，也不支持生命周期方法，因此无法取代类。
  * **React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。**

### 三、副效应

* 如果纯函数只能进行数据计算，那些不涉及计算的操作（比如生成日志、储存数据、改变应用状态等等）应该写在哪里呢？
* 函数式编程将那些跟数据计算无关的操作，都称为 "副效应" **（side effect）** 
* 纯函数内部只有通过间接的手段（即通过其他函数调用），才能包含副效应。

### 四、hook的含义及作用

* hook含义：
  * **React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。** React Hooks 就是那些钩子。
  * 所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用`use`前缀命名，便于识别。你要使用 xxx 功能，钩子就命名为 usexxx。

* **钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应**
* 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。
* React 为许多常见的操作（副效应），都提供了专用的钩子。
  - `useState()`：保存状态
  - `useContext()`：保存上下文
  - `useRef()`：保存引用
  - ......
* 上面这些钩子，都是引入某种特定的副效应，而 **`useEffect()`是通用的副效应钩子** 。找不到对应的钩子时，就可以用它

### 五、useEffect（）用法

* `useEffect()`本身是一个函数，由 React 框架提供，在函数组件内部调用

* 举例：希望组件加载以后，网页标题（`document.title`）会随之改变。那么，改变网页标题这个操作，就是组件的副效应，必须通过`useEffect()`来实现。

  ```react
  
  import React, { useEffect } from 'react';
  
  function Welcome(props) {
    useEffect(() => {
      document.title = '加载完成';
    });
    return <h1>Hello, {props.name}</h1>;
  }
  
  //useEffect()的参数是一个函数，它就是所要完成的副效应（改变网页标题）。组件加载以后，React 就会执行这个函数
  
  //useEffect()的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。  
  ```


### 六、useEffect() 的第二个参数

* 有时候，我们不希望`useEffect()`每次渲染都执行，这时可以使用它的第二个参数，使用一个数组指定副效应函数的依赖项，只有依赖项发生变化，才会重新渲染。

* ```react
  function Welcome(props) {
    useEffect(() => {
      document.title = `Hello, ${props.name}`;
    }, [props.name]);
    return <h1>Hello, {props.name}</h1>;
  }
  
  //useEffect()的第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项（props.name）。只有该变量发生变化时，副效应函数才会执行。
  
  //如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。因此，副效应函数这时只会在组件加载进入 DOM 后执行一次，后面组件重新渲染，就不会再次执行。这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。
  ```

### 七、useEffect() 的用途

* 只要是副效应，都可以使用`useEffect()`引入。它的常见用途有下面几种。
  - 获取数据（data fetching）
  - 事件监听或订阅（setting up a subscription）
  - 改变 DOM（changing the DOM）
  - 输出日志（logging）
* 下面是从远程服务器获取数据的例子

```react

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;

//useState()用来生成一个状态变量（data），保存获取的数据；useEffect()的副效应函数内部有一个 async 函数，用来从服务器异步获取数据。拿到数据以后，再用setData()触发组件的重新渲染。

//由于获取数据只需要执行一次，所以上例的useEffect()的第二个参数为一个空数组。
```

### 八、useEffect() 的返回值

* 副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应

* `useEffect()`允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，`useEffect()`就不用返回任何值。

  ```react
  useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [props.source]);
  //上面例子中，useEffect()在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。
  
  //实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。
  ```

### 九、useEffect() 的注意点

* 使用`useEffect()`时，有一点需要注意。如果有多个副效应，应该调用多个`useEffect()`，而不应该合并写在一起。

  ```react
  //错误的写法，副效应函数里面有两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起。正确的写法是将它们分开写成两个useEffect()。
  function App() {
    const [varA, setVarA] = useState(0);
    const [varB, setVarB] = useState(0);
    useEffect(() => {
      const timeoutA = setTimeout(() => setVarA(varA + 1), 1000);
      const timeoutB = setTimeout(() => setVarB(varB + 2), 2000);
  
      return () => {
        clearTimeout(timeoutA);
        clearTimeout(timeoutB);
      };
    }, [varA, varB]);
  
    return <span>{varA}, {varB}</span>;
  }
  ```

  ```react
  //正确写法
  function App() {
    const [varA, setVarA] = useState(0);
    const [varB, setVarB] = useState(0);
  
    useEffect(() => {
      const timeout = setTimeout(() => setVarA(varA + 1), 1000);
      return () => clearTimeout(timeout);
    }, [varA]);
  
    useEffect(() => {
      const timeout = setTimeout(() => setVarB(varB + 2), 2000);
  
      return () => clearTimeout(timeout);
    }, [varB]);
  
    return <span>{varA}, {varB}</span>;
  }
  ```

### 十、 React 默认提供的四个最常用的钩子

  #### useState()：状态钩子

  * `useState()`用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。
  
  * 本文前面那个组件类，用户点击按钮，会导致按钮的文字改变，文字取决于用户是否点击，这就是状态。使用`useState()`重写如下。
  
  * ```react
    import React, { useState } from "react";
    
    export default function  Button()  {
      const  [buttonText, setButtonText] =  useState("Click me,   please");
    
      function handleClick()  {
        return setButtonText("Thanks, been clicked!");
      }
    
      return  <button  onClick={handleClick}>{buttonText}</button>;
    }
    ```
  
  * Button 组件是一个函数，内部使用`useState()`钩子引入状态
  
  * `useState()`这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。该函数返回一个数组，数组的第一个成员是一个变量（上例是`buttonText`），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是`set`前缀加上状态的变量名（上例是`setButtonText`）

  #### useContext()：共享状态钩子

  * 如果需要在组件之间共享状态，可以使用`useContext()`。
  
  * 现在有两个组件 Navbar 和 Messages，我们希望它们之间共享状态。
  
  * ```react
    //第一步就是使用 React Context API，在组件外部建立一个 Context。
    const AppContext = React.createContext({});
    //组件封装代码
    <AppContext.Provider value={{
      username: 'superawesome'
    }}>
      <div className="App">
        <Navbar/>
        <Messages/>
      </div>
    </AppContext.Provider>
    //上面代码中，AppContext.Provider提供了一个 Context 对象，这个对象可以被子组件共享
    
    //Navbar 组件
    
    const Navbar = () => {
      const { username } = useContext(AppContext);
      return (
        <div className="navbar">
          <p>AwesomeSite</p>
          <p>{username}</p>
        </div>
      );
    }
    //上面代码中，useContext()钩子函数用来引入 Context 对象，从中获取username属性。
    
    //Message 组件
    const Messages = () => {
      const { username } = useContext(AppContext)
    
      return (
        <div className="messages">
          <h1>Messages</h1>
          <p>1 message for {username}</p>
          <p className="message">useContext is awesome!</p>
        </div>
      )
    }
    ```

  #### useReducer()：action 钩子

  * React 本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 Redux。
  
  * Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是`(state, action) => newState`。
  
  * `useReducers()`钩子用来引入 Reducer 功能。`const [state, dispatch] = useReducer(reducer, initialState);`
  
  * 上面是`useReducer()`的基本用法，它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的`dispatch`函数。
  
  * ```react
    //下面是一个计数器的例子。用于计算状态的 Reducer 函数如下。
    
    
    const myReducer = (state, action) => {
      switch(action.type)  {
        case('countUp'):
          return  {
            ...state,
            count: state.count + 1
          }
        default:
          return  state;
      }
    }
    
    //组件代码
    
    function App() {
      const [state, dispatch] = useReducer(myReducer, { count:   0 });
      return  (
        <div className="App">
          <button onClick={() => dispatch({ type: 'countUp' })}>
            +1
          </button>
          <p>Count: {state.count}</p>
        </div>
      );
    }
    ```
  
  * 由于 Hooks 可以提供共享状态和 Reducer 函数，所以它在这些方面可以取代 Redux。但是，它没法提供中间件（middleware）和时间旅行（time travel），如果你需要这两个功能，还是要用 Redux。

#### useEffect()：副作用钩子

* `useEffect()`用来引入具有副作用的操作，最常见的就是向服务器请求数据。以前，放在`componentDidMount`里面的代码，现在可以放在`useEffect()`。

* `useEffect()`的用法：

  

  ```javascript
  useEffect(()  =>  {
    // Async Action
  }, [dependencies])
  ```

* 上面用法中，`useEffect()`接受两个参数。第一个参数是一个函数，异步操作的代码放在里面。第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，`useEffect()`就会执行。第二个参数可以省略，这时每次组件渲染时，就会执行`useEffect()`。

* ```react
  
  const Person = ({ personId }) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});
  
    useEffect(() => {
      setLoading(true); 
      fetch(`https://swapi.co/api/people/${personId}/`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
          setLoading(false);
        });
    }, [personId])
  
    if (loading === true) {
      return <p>Loading ...</p>
    }
  
    return <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  }
  //每当组件参数personId发生变化，useEffect()就会执行。组件第一次渲染时，useEffect()也会执行。
  ```

### 十一、创建自己的hooks

* 上例的 Hooks 代码还可以封装起来，变成一个自定义的 Hook，便于共享。

* ```react
  const usePerson = (personId) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});
    useEffect(() => {
      setLoading(true);
      fetch(`https://swapi.co/api/people/${personId}/`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
          setLoading(false);
        });
    }, [personId]);  
    return [loading, person];
  };
  //usePerson()就是一个自定义的 Hook。
  //Person 组件就改用这个新的钩子，引入封装的逻辑。
  const Person = ({ personId }) => {
    const [loading, person] = usePerson(personId);
  
    if (loading === true) {
      return <p>Loading ...</p>;
    }
  
    return (
      <div>
        <p>You're viewing: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
      </div>
    );
  };
  ```


  > 参考链接：
  >
  > [轻松学会 React 钩子：以 useEffect() 为例](https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)
  >
  > [React Hooks 入门教程](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

