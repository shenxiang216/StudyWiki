# 深入浅出 webpack 之基础配置篇

## 前言

前端工程化经历过很多优秀的工具，例如 `Grunt`、`Gulp`、`webpack`、`rollup` 等等，每种工具都有自己适用的场景，而现今应用最为广泛的当属 `webpack` 打包了，因此学习好 `webpack` 也成为一个优秀前端的必备技能。

由于 `webpack` 技术栈比较复杂，因此作者打算分两篇文章进行讲解：

1. 基础应用篇：讲解各种基础配置；
2. 高级应用篇：讲解 `webpack` 优化以及原理。

[注] 本文是基于 `webpack 4.x` 版本

## webpack 是什么

> webpack 是模块打包工具。

`webpack` 可以在不进行任何配置的情况下打包如下代码：

**[注] 不进行任何配置时，webpack 会使用默认配置。**

```javascript
// moduleA.js
function ModuleA(){
  this.a = "a";
  this.b = "b";
}

export default ModuleA


// index.js
import ModuleA from "./moduleA.js";

const module = new ModuleA();
复制代码
```

我们知道浏览器是不认识 `import` 语法的，直接在浏览器中运行这样的代码会报错。我们就可以借助 `webpack` 来打包这样的代码，赋予 `JavaScript` 模块化的能力。

最初版本的 `webpack` 只能打包 `JavaScript` 代码，随着发展 `css` 文件，图片文件，字体文件都可以被 `webpack` 打包。

本文将主要讲解 `webpack` 是如何打包这些资源的，属于比较基础的文章主要是为了后面讲解性能优化和原理做铺垫，如果已经对 `webpack` 比较熟悉的同学可以跳过本文。

## 初始化安装 webpack

```javascript
mkdir webpackDemo // 创建文件夹
cd webpackDemo // 进入文件夹
npm init -y // 初始化package.json

npm install webpack webpack-cli -D // 开发环境安装 webpack 以及 webpack-cli
复制代码
```

通过这样安装之后，我们就可以在项目中使用 `webpack` 命令了。

## 打包第一个文件

```
webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // {1}
  entry: { // {2}
  	main:'./src/index.js'
  }, 
  output: { // {3}
    publicPath:"", // 所有dist文件添加统一的前缀地址，例如发布到cdn的域名就在这里统一添加
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  }
}
复制代码
```

代码分析：

* {1} `mode` 打包模式是开发环境还是生成环境， `development | production`
* {2} `entry` 入口文件为 `index.js`
* {3} `output` 输出到 `path` 配置的 `dist` 文件夹下，输出的文件名为 `filename` 配置的 `bundle.js`

创建文件进行简单打包：

```javascript
src/moduleA.js

const moduleA = function () {
  return "moduleA"
}

export default moduleA;

--------------------------------

src/index.js

import moduleA from "./moduleA";

console.log(moduleA());
复制代码
```

修改 `package.json` 的 `scripts`，增加一条命令：

```javascript
"scripts": {
  "build": "webpack --config webpack.config.js"
}
复制代码
```

执行 `npm run build` 命令

![img](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fcc7fce5f8342419d03a3a72e4b9570~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp#align=left&display=inline&height=229&margin=%5Bobject%20Object%5D&originHeight=229&originWidth=802&status=done&style=none&width=802)

## 打包后的 bundle.js 源码分析

源码经过简化，只把核心部分展示出来，方便理解：

```javascript
 (function(modules) {
 	var installedModules = {};

 	function __webpack_require__(moduleId) {
		// 缓存文件
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
		// 初始化 moudle，并且也在缓存中存入一份
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
		// 执行 "./src/index.js" 对应的函数体
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// 标记"./src/index.js"该模块以及加载
 		module.l = true;
    
 		// 返回已经加载成功的模块
 		return module.exports;
 	}
	// 匿名函数开始执行的位置，并且默认路径就是入口文件
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
	// 传入匿名执行函数体的module对象，包含"./src/index.js"，"./src/moduleA.js"
	// 以及它们对应要执行的函数体
 ({
   "./src/index.js": (function(module, __webpack_exports__, __webpack_require__) {
"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moduleA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduleA */ \"./src/moduleA.js\");\n\n\nconsole.log(Object(_moduleA__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\n\n\n//# sourceURL=webpack:///./src/index.js?");
   
  }),

   "./src/moduleA.js": (function(module, __webpack_exports__, __webpack_require__) {
"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst moduleA = function () {\n  return \"moduleA\"\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (moduleA);\n\n\n//# sourceURL=webpack:///./src/moduleA.js?");

  })

 });
复制代码
```

再来看看`"./src/index.js"` 对应的执行函数

```javascript
(function(module, __webpack_exports__, __webpack_require__) {
	"use strict";
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moduleA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduleA */ \"./src/moduleA.js\");\n\n\nconsole.log(Object(_moduleA__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\n\n\n//# sourceURL=webpack:///./src/index.js?");
})
复制代码
```

你会发现就是一个 `eval` 执行方法。

我们拆开 `eval` 来仔细看看里面是什么内容，简化后代码如下：

```javascript
var moduleA = __webpack_require__("./src/moduleA.js");
console.log(Object(moduleA["default"])());
复制代码
```

上面源码中其实已经调用了 `__webpack_require__(__webpack_require__.s = "./src/index.js");` ，然后 `"./src/index.js"` 又递归调用了去获取 `"./src/moduleA.js"` 的输出对象。

我们看看 `"./src/moduleA.js"` 代码会输出什么：

```javascript
const moduleA = function () {
  return "moduleA"
}
__webpack_exports__["default"] = (moduleA);
复制代码
```

再回头看看上面的代码就相当于：

```javascript
console.log(Object(function () {
  return "moduleA"
})());
复制代码
```

最后执行打印了 `"moduleA"`

通过这段源码的分析可以看出：

1. 打包之后的模块，都是通过 `eval` 函数进行执行的；
2. 通过调用入口函数 `./src/index.js` 然后递归的去把所有模块找到，由于递归会进行重复计算，因此 `__webpack_require__` 函数中有一个缓存对象 `installedModules`。

## loader

我们知道 `webpack` 可以打包 `JavaScript` 模块，而且也早就听说 `webpack` 还可以打包图片、字体以及 `css`，这个时候就需要 `loader` 来帮助我们识别这些文件了。

**[注意] 碰到文件不能识别记得找 loader 。**

### 打包图片文件

修改配置文件：`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: { 
    main:'./src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:{
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath:"images", // 打包该资源到 images 文件夹下
            limit: 2048 // 如果图片的大小，小于2048KB则时输出base64，否则输出图片
          }
        }
      }
    ]
  }
}
复制代码
```

修改：`src/index.js`

```javascript
import moduleA from "./moduleA";
import header from "./header.jpg";

function insertImg(){
  const imageElement = new Image();
  imageElement.src = `dist/${header}`;
  document.body.appendChild(imageElement);
}

insertImg();
复制代码
```

执行打包后，发现可以正常打包，并且 `dist` 目录下也多出了一个图片文件。

我们简单分析：

`webpack` 本身其实只认识 `JavaScript` 模块的，当碰到图片文件时便会去 `module` 的配置 `rules` 中找，发现 `test:/\.(png|svg|jpg|gif)$/` ，正则匹配到图片文件后缀时就使用 `url-loader`  进行处理，如果图片小于 `2048KB` （这个可以设置成任意值，主要看项目）就输出 `base64` 。

### 打包样式文件

```javascript
{
  test:/\.scss$/, // 正则匹配到.scss样式文件
    use:[
      'style-loader', // 把得到的CSS内容插入到HTML中
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2, // scss中再次import scss文件，也同样执行 sass-loader 和 postcss-loader
          modules: true // 启用 css module
        }
      },
      'sass-loader', // 解析 scss 文件成 css 文件
      'postcss-loader'// 自动增加厂商前缀 -webket -moz，使用它还需要创建postcss.config.js配置文件
    ]
}
复制代码
postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
复制代码
```

打包解析：

1. 当 `webpack` 遇到 `xx.scss` 样式文件是；
2. 依次调用 `postcss-loader` 自动增加厂商前缀 `-webket -moz` ；
3. 调用 `sass-loader` 把 `scss` 文件转换成 `css` 文件；
4. 调用 `css-loader` 处理 `css` 文件，其中 `importLoaders:2` ，是 `scss` 文件中引入了其它 `scss` 文件，需要重复调用 `sass-loader` `postcss-loader` 的配置项；
5. 最后调用 `style-loader` 把前面编译好的 `css` 文件内容以 `<style>...</style>` 形式插入到页面中。

**[注意] loader的执行顺序是数组后到前的执行顺序。**

### 打包字体文件

```javascript
{
  test: /\.(woff|woff2|eot|ttf|otf)$/, // 打包字体文件
  use: ['file-loader'] // 把字体文件移动到dist目录下
}
复制代码
```

### plugins

`plugins` 可以在 `webpack` 运行到某个时刻帮你做一些事情，相当于 `webpack` 在某一个生命周期，调用插件做一些辅助的事情。

#### html-webpack-plugin

作用：

会在打包结束后，自动生成一个 `HTML` 文件（也可通过模板生成），并把打包生成的 `js` 文件自动引入到 `HTML` 文件中。

使用：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin({
    template: 'src/index.html' // 使用模板文件
  })
]
复制代码
```

#### clean-webpack-plugin

作用：

每次输出打包结果时，先自动删除 `output` 配置的文件夹

使用：

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
  ...
  new CleanWebpackPlugin() // 使用这个插件在每次生成dist目录前，先删除dist目录
]
复制代码
```

### source map

在开发过程中有一个功能是很重要的，那就是错误调试，我们在编写代码过程中出现了错误，编译后的包如果提示不友好，将会严重影响我们的开发效率。而通过配置 `source map` 就可以帮助我们解决这个问题。

示例： 修改：`src/index.js`，增加一行错误的代码

```javascript
console.log(a);
复制代码
```

由于`mode: 'development'` 开发模式是默认会打开 `source map` 功能的，我们先关闭它。

```javascript
devtool: 'none' // 关闭 source map 配置
复制代码
```

执行打包来看下控制台的报错信息：

![img](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b67936152c854f91a5bc4493ea92dd4c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp#align=left&display=inline&height=71&margin=%5Bobject%20Object%5D&originHeight=71&originWidth=1430&status=done&style=none&width=1430)

错误堆栈信息，竟然给的是打包之后的 `bundle` 文件中的信息，但其实我们在开发过程中的文件结构并不是这样的，因此我们需要它能指明我们是在 `index.js` 中的多少行发生错误了，这样我们就可以快速的定位到问题。

我们去掉 `devtool:'none'` 这行配置，再执行打包：

![img](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbed819cf62a44a9a0878d24f619daa5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp#align=left&display=inline&height=91&margin=%5Bobject%20Object%5D&originHeight=91&originWidth=1433&status=done&style=none&width=1433)

此时它就把我们在开发中的具体错误在堆栈中输出了，这就是 `source map` 的功能。

总结下：`source map` 它是一个映射关系，它知道 `dist` 目录下 `bundle.js` 文件对应的实际开发文件中的具体行列。

### webpackDevServer

每次修改完代码之后都要手动去执行编译命令，这显然是不科学的，我们希望是每次写完代码，`webpack` 会进行自动编译，`webpackDevServer` 就可以帮助我们。

增加配置：

```javascript
devServer: {
  contentBase: './dist', // 服务器启动根目录设置为dist
  open: true, // 自动打开浏览器
  port: 8081, // 配置服务启动端口，默认是8080
  proxy:{
    '/api': 'http://www.baidu.com' // 当开发环境时发送/api请求时都会代理到http://www.baidu.com host下
  }
},
复制代码
```

它相当于帮助我们开启了一个 `web` 服务，并监听了 `src` 下文件，当文件有变动时，自动帮助我们进行重新执行 `webpack` 编译。

我们在 `package.json` 中增加一条命令：

```javascript
"scripts": {
  "start": "webpack-dev-server"
},
复制代码
```

现在我们执行  `npm start`  命令后，可以看到控制台开始实行监听模式了，此时我们任意更改业务代码，都会触发 `webpack` 重新编译。

### webpack-dev-server 实现请求代理

在前后端分离的项目中进行前端开发时，想必每个同学都会碰到一个棘手的问题就是请求跨域。一般在生产环境下我们通过 `nginx` 进行代理，那么开发环境下我们一般如何处理呢，答案非常简单，配置`webpack-dev-server` 也可以轻易实现

```
devServer: {
  ...
  proxy:{
  	'/api': 'http://www.baidu.com' // 当开发环境时发送/api请求时都会代理到http://www.baidu.com host下
  }
}
复制代码
```

`proxy` 的配置项非常丰富具体可以参考文档，我们只需要记住，它可以提供代理服务器的功能给我们。

### 手动实现简单版 webpack-dev-server

项目根目录下增加：`server.js`

加载包： `npm install express webpack-dev-middleware -D`

```javascript
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js'); // 引入webpack配置文件
const compiler = webpack(config); // webpack 编译运行时

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {}));

// 监听端口
app.listen(3000,()=>{
  console.log('程序已启动在3000端口');
});
复制代码
```

`webpack-dev-middleware` 作用：

1. 通过 `watch mode` 监听资源的变更然后自动打包，本质上是调用 `compiler` 对象上的 `watch` 方法；
2. 使用内存文件系统编译速度快 `compiler.outputFileSystem = new MemoryFileSystem()` ;

`package.json` 增加一条命令：

```javascript
"scripts": {
  "server": "node server.js"
},
复制代码
```

执行命令 `npm run server`  启动我们自定义的服务，浏览器中输入 `http://localhost:3000/`  查看效果。

### 热更新 Hot Moudule Replacement（HMR）

模块热更新功能会在应用程序运行过程中，替换、添加或删除模块，而无需重新加载整个页面。

#### HMR 配置

```javascript
const webpack = require('webpack');
module.exports = {
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8081,
    hot: true // 热更新配置
  },
  plugins:[
      new webpack.HotModuleReplacementPlugin() // 增加热更新插件
  ]
}
复制代码
```

#### 手动编写 HMR 代码

在编写代码时经常会发现热更新失效，那是因为相应的 `loader` 没有去实现热更新，我们看看如何简单实现一个热更新。

```javascript
import moduleA from "./moduleA";

if (module.hot) {
  module.hot.accept('./moduleA.js', function() {
    console.log("moduleA 支持热更新拉");
    console.log(moduleA());
  })
}
复制代码
```

代码解释：

我们引人自己编写的一个普通 `ES6` 语法模块，假如我们想要实现热更新就必须手动监听相关文件，然后当接收到更新回调时，主动调用。

还记得上面讲 `webpack` 打包后的源码分析吗，`webpack` 给模块都建立了一个 `module` 对象，当你开启模块热更新时，在初始化 `module` 对象时增加了(源码经过删减)：

```javascript
function hotCreateModule(moduleId) {
  var hot = {
    active: true,
    accept: function(dep, callback){
      if (dep === undefined) hot._selfAccepted = true;
      else if (typeof dep === "function") hot._selfAccepted = dep;
      else if (typeof dep === "object")
      for (var i = 0; i < dep.length; i++)
 	  hot._acceptedDependencies[dep[i]] = callback || function() {};
 	  else hot._acceptedDependencies[dep] = callback || function() {};
    }
  }
}
复制代码
```

`module` 对象中保存了监听文件路径和回调函数的依赖表，当监听的模块发生变更后，会去主动调用相关的回调函数，实现手动热更新。

[注意] 所有编写的业务模块，最终都会被 `webpack` 转换成 `module` 对象进行管理，如果开启热更新，那么 `module` 就会去增加 `hot` 相关属性。这些属性构成了 `webpack` 编译运行时对象。

### 编译 ES6

显然大家都知道必须要使用 `babel` 来支持了，我们具体看看如何配置

#### 配置

1、安装相关包

```javascript
npm install babel-loader @babel/core @babel/preset-env @babel/polyfill -D
复制代码
```

2、修改配置 `webpack.config.json`

还记得文章上面说过，碰到不认识的文件类型的编译问题要求助 `loader`

```javascript
module:{
  rules:[
    {
      test: /\.js$/, // 正则匹配js文件
      exclude: /node_modules/, // 排除 node_modules 文件夹
      loader: "babel-loader", // 使用 babel-loader
      options:{
        presets:[
          [
            "@babel/preset-env", // {1}
           { useBuiltIns: "usage" } // {2}
          ]
        ]
      }
    }
  ]
}
复制代码
```

`babel` 配置解析：

* {1} 

  ```
  babel presets
  ```

   是一组插件的集合，它的作用是转换 

  ```
  ES6+
  ```

   的新语法，但是一些新 

  ```
  API
  ```

   它不会处理的

  * `Promise` `Generator` 是新语法
  * `Array.prototype.map` 方法是新 `API` ，`babel` 是不会转换这个语法的，因此需要借助 `polyfill` 处理

* {2} 

  ```
  useBuiltIns
  ```

   的配置是处理 

  ```
  @babel/polyfill
  ```

   如何加载的，它有3个值 

  ```
  false
  ```

  ```
  entry
  ```

  ```
  usage
  ```

  * `false`: 不对 `polyfills`做任何操作；
  * `entry`: 根据 `target`中浏览器版本的支持，将`polyfills`拆分引入，仅引入有浏览器不支持的 `polyfill`
  * `usage`：检测代码中`ES6/7/8`等的使用情况，仅仅加载代码中用到的`polyfills`

#### 演示

新建文件 `src/moduleES6.js`

```javascript
const arr = [
  new Promise(()=>{}),
  new Promise(()=>{})
];
function handleArr(){
  arr.map((item)=>{
    console.log(item);
  });
}
export default handleArr;
复制代码
```

修改文件 `src/index.js`

```javascript
import moduleES6 from "./moduleES6";
moduleES6();
复制代码
```

执行打包后的源文件(简化后)：

```javascript
"./node_modules/core-js/modules/es6.array.map.js":
(function(module, exports, __webpack_require__) {
"use strict";
var $export = __webpack_require__("./node_modules/core-js/modules/_export.js");
var $map = __webpack_require__("./node_modules/core-js/modules/_array-methods.js")(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].map, true), 'Array', {
  map: function map(callbackfn) {
    return $map(this, callbackfn, arguments[1]);
  }
});
复制代码
```

看代码就应该能明白了 `polyfill` 相当于是使用 `ES5` 的语法重新实现了 `map` 方法来兼容低版本浏览器。

而 `polyfill` 实现了 `ES6+` 所有的语法，十分庞大，我们不可能全部引入，因此才会有这个配置 `useBuiltIns: "usage"` 只加载使用的语法。

### 编译 React 文件

#### 配置

安装相关依赖包

```javascript
npm install @babel/preset-react -D
npm install react react-dom
复制代码
webpack.config.js
module:{
  rules:[
    {
      test: /\.js$/, // 正则匹配js文件
      exclude: /node_modules/, // 排除 node_modules 文件夹
      loader: "babel-loader", // 使用 babel-loader
      options:{
        presets:[
          [
            "@babel/preset-env",
           { useBuiltIns: "usage" }
          ],
          ["@babel/preset-react"]
        ]
      }
    }
  ]
}
复制代码
```

直接在 `presets` 配置中增加一个 `["@babel/preset-react"]`  配置即可， 那么这个 `preset` 就会帮助我们把 `React` 中 `JSX` 语法转换成 `React.createElement` 这样的语法。

#### 演示

修改文件：`src/index.js`

```javascript
import React,{Component} from 'react';
import ReactDom from 'react-dom';

class App extends Component{
  render(){
    const arr = [1,2,3,4];
    return (
      arr.map((item)=><p>num: {item}</p>)
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
复制代码
```

执行打包命令 `yarn build` 可以正确打包并且显示正常界面。

随着项目的复杂度增加，`babel` 的配置也随之变的复杂，因此我们需要把 `babel` 相关的配置提取成一个单独的文件进行配置方便管理，也就是我们工程目录下的 `.babelrc` 文件。

#### .babelrc

```javascript
{
  "presets":[
    ["@babel/preset-env",{ "useBuiltIns": "usage" }],
    ["@babel/preset-react"]
  ]
}
复制代码
```

[注意] `babel-laoder` 执行 `presets` 配置顺序是数组的后到前，与同时使用多个 `loader` 的执行顺序是一样的。

也就是把 `webpack.config.js` 中的 `babel-loader` 中的 `options` 对象提取成一个单独文件。

![img](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0beb180570ad4535a143ffac0a49076e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp#align=left&display=inline&height=177&margin=%5Bobject%20Object%5D&originHeight=177&originWidth=1226&status=done&style=none&width=1226)

通过编译记录，我们可以发现一个问题就是打包后的 `bundle.js` 文件足足有 `1M` 大，那是因为 `react` 以及 `react-dom` 都被打包进来了。

## Tree Shaking

`Tree shaking` 的本质是消除无用的 `JavaScript` 代码。

```javascript
import { forEach } from "lodash"

forEach([1,2,3],(item)=>{
  console.log(item);
})
复制代码
```

在项目中引入了 `lodash` 库，只使用了其中的 `forEach` 方法，在 `jquery` 时代我们只能引入整个 `lodash` 文件。但通过 `import` 引入则支持 `Tree Shaking` ，下面让我们一起来配置它。

```
webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devServer: {
    contentBase: './dist', // 服务器启动根目录设置为dist
    open: true, // 自动打开浏览器
    port: 8081, // 配置服务启动端口，默认是8080
  },
  entry: { // 入口文件
    main:'./src/index.js'
  },
  output: { // 出口文件
    publicPath:"",
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module:{ // loader 配置
    rules:[
      {
        test: /\.js$/, // 正则匹配js文件
        exclude: /node_modules/, // 排除 node_modules 文件夹
        loader: "babel-loader", // 使用 babel-loader
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' // 使用模板文件
    }),
    new CleanWebpackPlugin()
  ]
}
复制代码
```

只需要配置 `mode: 'production'` 生成环境下会默认 `Tree Shaking` 。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e94b421d92145b7946f013d948bc00e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

打包后依然有 `72kb` 大小，显然 `Tree Shaking` 失败了，这是为什么呢？

`Tree Shaing` 执行的前提是：必须是使用 `import` `export` `ESModule` 语法的类库才能被 `Tree Shaking` ， `lodash` 也提供了相应的库给我们使用 `lodash-es` 。

修改业务代码： `src/index.js`

```javascript
import { forEach } from "lodash-es";

forEach([1,2,3],(item)=>{
  console.log(item);
})
复制代码
```

再次执行打包：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3eb99ab171d444acbf8af225d94c64ec~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

打包后的大小只有 `5.55Kb` ，说明 `Tree Shaking` 生效了。

### 为什么要 ESModule

前面说了必须要使用 `ES6` 提供的模块化语法才可以实现 `Tree Shaking` ，使用 `CommonJs` 的语法能实现 `Tree Shaking` 吗？答案肯定是不能的。

`CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口。

`ES6` 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。所谓静态分析就是不执行代码，从字面量上对代码进行分析。

拿上面代码分析：我们引入了 `lodash-es` 中的 `forEach` ，在静态分析阶段就可以知道，我们只使用了 `forEach` 一个函数，因此没有必要把整个 `lodash-es` 中所有的函数都引入，这个时候就剔除了那些没有用的代码，只保留 `forEach` 。

### sideEffects

在配置 `Tree Shaking` 时必须要配置 `sideEffects`

package.json

```javascript
{
  "sideEffects": false
}
复制代码
```

* `"sideEffects": false` 表示 `webpack` 它可以安全地删除未用到的 `export`；
* `"sideEffects": ["*.css"]` 表示 `*.css` 的引入不做 `Tree Shaking` 处理。

为什么需要对 `css` 做处理呢？因为我们经常这样引入全局 `css`：

```javascript
import "xxx.css"
复制代码
```

如果不进行特殊的配置， `Tree Shaking` 会误认为 `xxx.css` 只导入了，但是没有使用，因此相关 `css` 代码会被删除，当配置为 `["*.css"]` 时，会排除所有 `css` 文件不做 `Tree Shaking` 处理。

## Code Splitting

代码分割，顾名思义就是把打包好的代码的进行分割。

看一个场景：

```javascript
import { forEach } from "lodash-es";

forEach([1,2,3],(item)=>{
  console.log(item);
})
复制代码
```

执行打包命令：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/626603a4dc5942199e19978ec0e77e13~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

我们发现 `lodash` 也被打包进 `bundle.js` 了。

在实际开发中，我们可能会使用多种类库共同工作，如果都打包到 `bundle.js` 中，那么这个文件势必会非常大！

还有另外一个问题就是，我们打包的静态文件都会添加相应的 `hash` 值，如下配置：

```javascript
output: {
  filename: '[hash]_bundle.js', // 打包出的文件类似：07b62441b18e3aaa6c93_bundle.js
  path: path.resolve(__dirname,'dist')
}
复制代码
```

这么做的目的想必大家都知道，就是浏览器会对同一个名字的静态资源进行缓存，假设我们不添加 `hash` 值，但是线上又发现了 `bug`，我再次打包后把静态资源更新到服务器后，用户的浏览器由于有缓存是不会立马显示最新效果的，而需要手动去清空缓存。

一般外部引入的类库文件是不会改变的，而我们的业务代码是会经常变动的。我们把会变动的和不变动的代码都打包到一起，显然是不合理的，至少会造成当我们重新打包后，用户需要加载全部的代码。

假如我们做了代码分割再配合浏览器的缓存机制，用户网站只需要加载更新后的业务代码，而类库的代码则不需要重新加载。

以上就是我们需要做代码分割的理由。接下来我们看看 `webpack` 中可以如何进行代码分割配置。

### SplitChunksPlugin

它的配置应该算是 `webpack` 插件中比较复杂的配置了而且又非常重要，因此本文会详细讲解它的核心配置的含义。

我们有以下两种方式引入一个第三方模块：

同步方式：

```javascript
import { forEach } from "lodash";
import $ from "jquery";

$(function () {
  forEach([1,2,3],(item)=>{
    console.log(item);
  })
});
复制代码
```

异步方式：

```javascript
import("lodash").then(({default:_})=>{
  console.log(_.join(["a","b"],"-"));
})
复制代码
```

`SplitChunksPlugin` 插件已经提供了一套开箱即用的默认配置，让我们可以快速对以上两种模块引入方式进行代码分割打包优化。下面我们来分析下它的默认配置的意思：

```javascript
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
复制代码
```

#### chunks

* `async` 异步模块生效
* `initial` 同步模块生效
* `all` 异步同步都生效

#### minSize

`chunk` 文件最小打包尺码，例如这里默认设置是 `30000 kb` ，假设我们要打包的库小于 `30000kb` 则不会进行分模块打包。

#### maxSize

最大打包尺寸，假设 `lodash` 为 `1MB` ，这里设置为 `500KB` ，`webpack` 会尝试把 `lodash` 拆分成2个文件，但其实 `lodash` 这种类库是不好做拆分的，所以最终结果是一样的，只会打出一个包。

#### minChunks

一个模块被用了多少次才对它进行代码分割。

#### maxAsyncRequests

最多加载的 `chunk` 数量

#### maxInitialRequests

入口文件做代码分割的最大数量

#### automaticNameDelimiter

文件名的连接符

#### name

设置为 `true` 时，`cacheGroups` 中的 `filename` 才能生效

#### cacheGroups

缓存组，该对象里面的 `defaultVendors` 与 `default` 相当于两条模块缓存数组。 一般是同步引入的模块，命中该缓存策略就把该模块 `push` 到该数组中，最后合并输出一个 `chunk`。

缓存策略是这样配置的：

```javascript
cacheGroups: {
  vendors: {
    chunks: 'initial', // 只针对同步模块
    test: /[\\/]node_modules[\\/]/, // 对同步代码进行打包时，会先判断是否在node_modules下面
    priority: -10, // 打包一个模块有可能既符合vendors的规则也符合default的规则，这个时候根据priority的来判断选择哪个值越大优先级越高
    filename: '[name].chunk.js' // 输出的文件名
  },
  default: {
    minChunks: 2, // 当模块被使用了两次
    priority: -20, // 表示权限值
    reuseExistingChunk: true // 会去检查循环引用，避免打包一些无用的模块进来
  }
}
复制代码
```

同步模块打包：

```javascript
import { forEach } from "lodash";
import $ from "jquery";

$(function () {
  forEach([1,2,3],(item)=>{
    console.log(item);
  })
});
复制代码
```

分析：

* `lodash` 模块命中 `vendors` 策略，推入 `vendors` 策略缓存组中；
* `jquery` 模块同样命中 `vendors` 策略，推入 `vendors` 策略缓存组中；
* 没有其它模块了，因此合并输出一个文件名字 `vendors~main.chunk.js` ，其中 `verdors` 是策略的名字，`~` 波浪线是 `automaticNameDelimiter` 的配置， `main` 是 `entry` 入口文件的名字， `chunk.js` 是 `filename` 中设置的后缀。

异步模块打包：

```javascript
import(/* webpackChunkName: "lodash" */"lodash").then(({default:_})=>{
  console.log(_.join(["a","b"],"-"));
})

import(/* webpackChunkName: "jquery" */"jquery").then(({default:$})=>{
  $(function () {
    console.log("jquery 已经加载完成");
  })
})
复制代码
```

分析：

* 首先模块为了满足懒加载需求会根据魔法注释 `webpackChunkName` 打包成单独的模块如 `jquery.bundle.js` 和 `lodash.bundle.js`
* 同样它会去 `cacheGroups` 中查找是否匹配相应的策略，此时发现 `vendors` 匹配不了， `default` 策略可以匹配，但是 `default` 中有一个配置是 `reuseExistingChunk: true` 表示会去已经打包好模块中查找，如果已经被打包了就输出。把它改为 `false` 后，则会把 `jquery.bundle.js` 根据策略重新命名为 `default~jquery.bundle.js` 由于它是异步加载的，首页两个模块不会被合并，分别输出。

`cacheGroups` 中的策略可以根据项目自行添加，因此而且 `webpack` 提供了各种回调方法使得配置更加灵活。

## CSS 文件代码分割

随着项目的增大 `css` 文件是非常的多，如果都打包到 `js` 中，势必是的 `js` 文件过于臃肿，影响加载速度，因此我们要把 `css` 分离打包。

* `MiniCssExtractPlugin` 它会帮助我们创建一个新的 `css` 文件
* `OptimizeCSSAssetsPlugin` 它会帮助我们合并压缩 `css` 文件

我们来看看具体配置：

```javascript
...
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'production', // 只有在production的模式下，才会去执行minimizer里面的配置
  optimization: {
	...
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader, // 这里要使用 MiniCssExtractPlugin 提供的 loader
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
	...
    new MiniCssExtractPlugin({ // 在插件中初始化MiniCssExtractPlugin，并且配置好独立出来的CSS文件的命名规则
      filename: "[name].css",
      chunkFilename: "[id].chunk.css"
    })
  ]
}
复制代码
```

还有一个重点要记得，就是生产环境下，我们默认开启了 `Tree Shaking` ，因此需要配置 `package.json` 中的 `sideEffects` ，否则 css 文件会被 `Tree Shaking` 掉。

```javascript
"sideEffects": ["*.css"] // 所有 .css 的文件都不进行 tree shaking
复制代码
```

配置好后执行打包命令发现可以单独分离出 `css` 文件并且 `css` 文件是经过压缩的。

### 配置 CSS cacheGroups

```javascript
splitChunks: {
	...
      cacheGroups: {
        ...
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        ...
      }
    }
复制代码
```

增加一条 `styles` 策略，这样打包输出的名字为 `styles.css` 就是这条策略的名字 `enforce: true` 表示 `styles` 策略忽略 `splitChunks` 的其它参数配置。

## 模块懒加载

模块懒加载不需要我们再去做 `webpack` 的配置，而是使用 `ES6` 提供的 `import()` 语法来支持

我们来对比下面两段业务代码：

```javascript
document.addEventListener("click",()=>{
  import(/* webpackChunkName: "lodash" */"lodash").then(({default:_})=>{
    console.log(_.join(["a","b"],"-"));
  });
},false);
复制代码
import { join } from "lodash";

document.addEventListener("click",()=>{
  console.log(_.join(["a","b"],"-"));
},false);
复制代码
```

第一段代码表示：点击 `document` 后去异步加载 `lodash` 模块，当模块加载成功后输出一个字符串。

第二段代码表示：进入界面先加载 `lodash` 模块，当点击页面后输出字符串。

显然第一段代码是一个异步加载方式，如果用户没有去点击页面就不必要去加载相应的模块，节省资源。这就是异步加载，只需要 `webpack` 配置 `babel` 支持 `ES6` 语法即可。

## Preload and Prefetch

我们看一张这样的业务场景：

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/418248c0a6864c5084abfa100eaad569~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

用户点击登录，弹出登录框。这个登录弹框模块其实没有必要在最开始就加载完成的，因为它是属于交互性质的内容，是必须在用户看到首页后才会进行的动作，也就意味着这个模块可以在首页加载完成之后再去加载。

如何去实现这一的效果呢？浏览器给我们提供了资源加载的方式：

```javascript
<link rel="preload" href="loginModule.js" as="script">
<link rel="prefetch" href="loginModule.js" as="script">
复制代码
```

* `preload` 会以并行方式开始加载；
* `prefetch` 会在首页模块加载完成之后，再去加载。

实现这样的效果我们并不需要对 `webpack` 的配置做任何改动，依然是利用 `ES6` 提供的 `import()` 语法配合魔法注释来实现。

```javascript
document.addEventListener("click",()=>{
  import(/* webpackPrefetch: true */ /* webpackChunkName: "lodash" */ "lodash").then(({default:_})=>{
    console.log(_.join(["a","b"],"-"));
  });
},false);
复制代码
```

执行打包命令后查看浏览器控制台：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81dac179fe9f4b01a1e5b33db91c8378~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## 文件缓存策略

我们打包的静态资源文件是要发布到服务器上的，例如静态资源名字为 `main.js`  ，此时如果线上有一个 `bug`，我们肯定是立即修复，然后立即打包并把静态资源更新到服务器上，如果不更改文件名，由于浏览器的缓存问题，用户是没有办法立马看到效果的，因此我们可以给文件名添加 `hash` 的配置

```javascript
output: { // 出口文件
  publicPath:"",
  filename: '[name].[hash].js',
  chunkFilename:'[name].[hash].js',
  path: path.resolve(__dirname,'dist')
},
复制代码
```

业务代码：

```javascript
import { forEach } from "lodash";
import $ from "jquery";

$(function () {
  forEach([1,2,3],(item)=>{
    console.log(item);
  })
});
复制代码
```

打包之后会输出两个 `ja` 文件

* `main.[hash].js` 的入口文件
* `vendors~main.[hash].js` 的 `chunk` 文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84d2ae7c2c7941f598fb04ea4af69810~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

它们公用同一个 `hash` 值，此时当我修改了业务代码：

```javascript
$(function () {
  forEach([1,2,3,4,5,6],(item)=>{
    console.log(item);
  })
});
复制代码
```

业务代码变了，但是我们引入的第三方库是没有任何改变的，当再次执行打包，两类文件的 `hash` 值都改变了，此时我们部署到服务器，用户浏览器的确可以重新加载并且立马看到效果，但是用户不应该重新加载第三库的代码呀，这些可是没有变化的。此时我们就应该使用 `webpack` 提供的 `[contenthash]` 配置，它代表的意思是，只有内容改变的模块文件 `hash` 值会变化，内容不改变的文件 `hash` 值保持原样

```javascript
output: {
  publicPath:"",
  filename: '[name].[contenthash].js',
  chunkFilename:'[name].[contenthash].js',
  path: path.resolve(__dirname,'dist')
}
复制代码
```

## 开发环境与生成环境

在 `webpack` 配置中提供了 `mode` 属性配置开发环境与生产环境，我们来总结这两个环境它们在工程配置上有什么区别：

| 功能 \ 环境                  | Develoment（开发）           | Production（生产）      |
| ---------------------------- | ---------------------------- | ----------------------- |
| 代码压缩                     | 不压缩(方便调试)             | 压缩(减小代码体积)      |
| Tree Shaking                 | 默认不开启                   | 默认开启                |
| Source Map                   | cheap-module-eval-source-map | cheap-module-source-map |
| webpackDevServer（本地服务） | 需要开启                     | 不需要                  |
| HMR（热更新）                | 需要配置                     | 不需要                  |

正常我们去编写 `webpack` 配置时，会分文件进行配置的，因为生产环境和开发环境差异还是非常大的。

配置文件分离思路：

1. 提取一个公共配置，例如 `js` 处理，`css` 处理，图片等资源的处理，在开发环境和生产环境都是一样的；
2. 单独配置一个开发环境和生产环境配置，然后通过 `webpack-merge` 合并公共配置：

```javascript
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
  mode: 'development',
  ...
});
复制代码
```

## 配置全局变量

```javascript
plugins: [
  ...
  new webpack.ProvidePlugin({
    $:"jquery",
    _:"loadsh"
  })
]
复制代码
```

配置好了 `$` 与 `_` 的全局变量后，我们在后续编写模块时可以不需要引入而直接使用：

```javascript
export function ui (){
    $('body').css('background','green');
}
复制代码
```

## 使用环境变量

```
package.json
 "scripts": {
    "dev-build": "webpack --env.development --config webpack.common.js",
    "dev": "webpack-dev-server --env.development --config webpack.common.js",
    "build": "webpack --env.production --config webpack.common.js"
  },
复制代码
```

增加了： `--env.development` 、 `--env.production` 。

```
webpack.common.js
module.exports = (env)=>{
  console.log(env); // {development:true} || {production:true}
  if(env && env.production){
    return merge(commonConfig,prodConfig);
  }else{
    return merge(commonConfig,devConfig);
  }
}
复制代码
```

[查看具体配置代码](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fshiyou00%2Fwebpack-end%2Fblob%2Fmaster%2Flesson_16%2Fwebpack.common.js)

## 小结

通过本文的学习并且自己能动手实践一遍的话，相信对于 `webpack` 的基础配置会有一个更加全面的了解，并为之后学习如何优化以及 `webpack` 原理打好坚实的基础。



作者：Lion
链接：https://juejin.cn/post/6844904200774615048
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。