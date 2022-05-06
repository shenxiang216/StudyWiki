## 一、概述
Context 提供了一种在组件之间共享值的方式，而不必显式地通过组件树的逐层传递 props。如果获取值和使用值的层级相隔很远，或者需要使用这个值的组件很多很分散，则可以使用Context来共享数据，避免使用大量重复的props来传递值。如果只是一个组件需要使用这个值，可以在产生这个值的位置生成这个组件，然后用props层层传递到组件实际展示的位置。

## 二、基本使用方式

### 2.1自定义Context

```react
import React from 'react';

const ThemeContext = React.createContext('light');

export default ThemeContext;
```

上面的代码定义了一个ThemeContext，默认值为'light'。

 

### 2.2在需要的位置使用Context的Provider

```react
import ThemeContext from './context/ThemeContext.js';
import ThemedButton from './ThemedButton.js';
import './App.css';

function App() {
  return (
    <ThemeContext.Provider value='dark'>
      <div className="App">
        <header className="App-header">
          <ThemedButton />
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```

在组件的最外层使用了自定义Context的Provider，传入value覆盖了默认值，之后子组件读到的ThemeContext的值就是'dark'而不是默认值'light'。如果Provider有value定义就会使用value的值（即使值是undefined，即未传入value），只有当Provider未提供时才会使用定义时的默认值。

 

### 2.3定义contextType，使用获取到的Context上的值

```react
import React, { Component } from 'react';
import ThemeContext from "./context/ThemeContext.js";

class ThemedButton extends Component {
	static contextType = ThemeContext;
	render() {
		return <button>{this.context}</button>;
	}
}

export default ThemedButton;
```

ThemedButton声明了contextType是ThemeContext，因此this.context的值就是最近的ThemeContext提供的value，也就是'light'。

效果图：

![](https://img-blog.csdnimg.cn/20210224203733192.png)

### 2.4Context的名字
通过以上方式声明的Context在查看组件树时只会显示Context.Porvider，不会显示ThemeContext：

![](https://img-blog.csdnimg.cn/20210224211234297.png)

这样在存在多个Provider时不方便查看，要定义Context的显示名时可以在定义时用displayName声明：

```react
import React from 'react';

const ThemeContext = React.createContext('light');
ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
```

这样组件树就会显示Context的名字了。

![](https://img-blog.csdnimg.cn/20210224211455514.png)

### 2.5子组件更新context

```react
const { createContext, useContext, useState } = React;

const ThemeContext = createContext(null);

function Content() {
  const { style, visible, toggleStyle, toggleVisible } = useContext(
    ThemeContext
  );

  return (
    <div>
      <p>
        The theme is <em>{style}</em> and state of visibility is
        <em> {visible.toString()}</em>
      </p>
      <button onClick={toggleStyle}>Change Theme</button>
      <button onClick={toggleVisible}>Change Visibility</button>
    </div>
  );
}

function App() {
  const [style, setStyle] = useState("light");
  const [visible, setVisible] = useState(true);

  function toggleStyle() {
    setStyle(style => (style === "light" ? "dark" : "light"));
  }
  function toggleVisible() {
    setVisible(visible => !visible);
  }

  return (
    <ThemeContext.Provider
      value={{ style, visible, toggleStyle, toggleVisible }}
    >
      <Content />
    </ThemeContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```



## 三、Context更新机制
如果Provider的value属性是一个变量，当值变更时，消费这个Provider的子组件会触发更新机制，从而也实现更新。值是否变更使用Object.is的判断方法进行判断，所以不要使用动态生成的对象来作为context的值，如：

```react
<ThemeContext.Provider value={{ theme: 'light' }}><ThemeContext.Provider />
```

由于每次渲染的时候value所指向的值都是新生成的对象，内存指向总是不同，导致每次都触发消费这个Provider的组件更新。所以要用变量去承载这个值。

 

### 3.1Context更新触发的生命周期

```react
App.js

import React, { Component } from 'react';
import ThemeContext from './context/ThemeContext.js';
import ThemedButton from './ThemedButton.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark'
    };
  }

  switchTheme = () => {
    let { theme } = this.state;
    theme = theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme });
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <div className="App">
          <header className="App-header">
            <ThemedButton onClick={this.switchTheme} />
          </header>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
```

```react
ThemedButton.js

import React, { Component } from 'react';
import ThemeContext from "./context/ThemeContext.js";

class ThemedButton extends Component {
	static contextType = ThemeContext;

	componentDidUpdate() {
		console.log('ThemedButton componentDidUpdate');
	}
	 
	shouldComponentUpdate() {
		console.log('ThemedButton shouldComponentUpdate');
		return false;
	}
	 
	render() {
		console.log('ThemedButton render');
		return <button onClick={this.props.onClick}>{this.context}</button>;
	}

}

export default ThemedButton;
```

更新时的输出：

![](https://img-blog.csdnimg.cn/20210224212806372.png)

Context的更新不受父组件和自身shouldComponentUpdate的影响，经过的生命周期是render->componentDidUpdate。

 

### 3.2props更新和Context更新同时触发
props更新触发的生命周期是shouldComponentUpdate->render->componentDidUpdate，如果碰上Context更新的话，会触发两者重合的生命周期，即render->componentDidUpdate。所以如果有触发shouldComponentUpdate生命周期的需要，应避免和Context更新同时触发。

 

## 四、使用Consumer支持获取多个Context上的值

### 4.1基本使用方法
如果需要使用多个Context上的值，只有一个contextType就不够用了，需要使用Context提供的Consumer来获取对应Context上的值。

声明两个Context类型：

```react
import React from 'react';

const ThemeContext = React.createContext('light');
ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
import React from 'react';

const UserContext = React.createContext('guest');
UserContext.displayName = 'UserContext';

export default UserContext;
```

使用Provider赋值：

```react
import React, { Component } from 'react';
import ThemeContext from './context/ThemeContext.js';
import UserContext from './context/UserContext.js';
import ThemedButton from './ThemedButton.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ThemeContext.Provider value={'dark'}>
          <div className="App">
            <UserContext.Provider value={'user'}>
              <header className="App-header">
                <ThemedButton />
              </header>
            </UserContext.Provider>
          </div>
        </ThemeContext.Provider>
    );
  }
}

export default App;
```

在ThemedButton中使用这两个Context提供的值：

```react
import React, { Component } from 'react';
import ThemeContext from "./context/ThemeContext.js";
import UserContext from "./context/UserContext.js";

class ThemedButton extends Component {

	render() {
		return (
			<>
				<ThemeContext.Consumer>
					{theme => <div>{theme}</div>}
				</ThemeContext.Consumer>
				<UserContext.Consumer>
					{user => <div>{user}</div>}
				</UserContext.Consumer>
			</>
		);
	}

}

export default ThemedButton;
```

Consumer包裹范围内，可以使用对应Provider提供的值，用这种方式来实现一个组件中消费多个种类Provider提供的值。

 

### 4.2contextType与Consumer的比较
contextType在一个组件中只能指向一个Context，然后可以通过this.context在组件的任意位置使用对应Provider提供的值。缺点就是只能使用一个Context。Consumer可以使用多个，获取不同类型Provider的值。但是由于使用了标签的语法，只能在render和相关的范围内使用。组件中应尽可能使用Consumer来获取Context上的值，把contextType的位置留出来，避免后续必须用到contextType的时候没有contextType可以用了。

 

## 五、自定义Context
在上面的Context定义中，只定义了Context和对应的展示名称，后续使用时用的是Context.Provider和Context.Consumer，这样的标签语言比较难理解。另外，在给Provider赋值时，用的都是value这个属性，并不能反映确切的含义，尤其是在有多个值要传入时。所以在自定义Context时应有以下几部分：

```react
import React from 'react';
import PropTypes from 'prop-types';

// 枚举值
const THEMES = {
	DARK: 'dark',
	LIGHT: 'light'
};
// 默认值
const defaultValue = THEMES.DARK;
// Context
const ThemeContext = React.createContext(defaultValue);
// Context展示名
ThemeContext.displayName = 'ThemeContext';
// Consumer
const ThemeConsumer = ThemeContext.Consumer;
// Provider
const ThemeProvider = ({ theme, children }) => (
	<ThemeContext.Provider value={theme}>
		{children}
	</ThemeContext.Provider>
);

ThemeProvider.propTypes = {

	theme: PropTypes.oneOf(['dark', 'light']),
	 
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]),

}

export { THEMES, ThemeContext, ThemeConsumer, ThemeProvider };
```

使用时：

```react
import React, { Component } from 'react';
import { ThemeProvider, THEMES } from './context/ThemeContext.js';
import ThemedButton from './ThemedButton.js';
import './App.css';

class App extends Component {

  render() {
    // 不再需要ThemeContext.Provider和value，用更易理解的标签取代
    return (
      <ThemeProvider theme={THEMES.LIGHT}>
        <div className="App">
          <header className="App-header">
            <ThemedButton />
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { ThemeConsumer } from "./context/ThemeContext.js";

class ThemedButton extends Component {

  render() {
    // 用ThemeConsumer取代ThemeContext.Consumer
    // 也可以用contextType = ThemeContext，ThemeContext也有导出
    // 但是如之前所说，不到万不得已不使用只有一个位置的contextType
    return (
      <ThemeConsumer>
        {theme => <div>{theme}</div>}
      </ThemeConsumer>
    );
  }
}

export default ThemedButton;
```

## 六、useContext的使用
React在16.8版本中引入Hook，可以在不编写 class 的情况下使用 state 以及其他的 React 特性。useContext是其中一个原生的Hook，是函数组件也可以使用Context，而且支持使用多个不同类型的Context。所以如果使用函数组件，可以使用useContext来支持使用多个不同类型的Context的值。

提供Context的值还是一样的代码：

```react
import React, { Component } from 'react';
import { ThemeProvider, THEMES } from './context/ThemeContext.js';
import UserContext from './context/UserContext';
import ThemeAndUser from './ThemeAndUser';
import './App.css';

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={THEMES.LIGHT}>
        <UserContext.Provider value={'user'}>
          <div className="App">
            <header className="App-header">
              <ThemeAndUser />
            </header>
          </div>
        </UserContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
```

使用useContext获取Context上的值：

```react
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import UserContext from './context/UserContext';

const ThemeAndUser = () => {
	const theme = useContext(ThemeContext);
	const user = useContext(UserContext);
	return (
		<>
			<div>{theme}</div>
			<div>{user}</div>
		</>
	);
};

export default ThemeAndUser;
```

## 七、小结
context用于提供全局可获取的内容，有可控的更新机制。但非必要的情况下尽量不要使用。
context不仅可以传值，还可以传递函数。可以把值和更新值的函数一起放在context中传递。
contextType只能指向一个Context，使用一个Context的值。使用Context.Consumer可以使用多个Context的值，但只能在render及其相关函数中。
useContext也可以使用多个Context的值，但是只能在函数组件中使用。

## 八、参考资料
1、[React关于使用Context的官方中文文档](https://zh-hans.reactjs.org/docs/context.html)

2、[React关于使用useContext的官方中文文档](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)

3、[React中Context的使用](https://blog.csdn.net/sysukehan/article/details/114039009)

4、[如何在使用useContext的React Hook时更改Context值](https://mlog.club/article/1116444)