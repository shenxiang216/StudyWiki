# call、apply、bind区别和使用

## 一、区别

面试当中几乎每次都会问到一个js中关于call、apply、bind的问题，比如…

- 怎么利用call、apply来求一个数组中最大或者最小值
- 如何利用call、apply来做继承
- apply、call、bind的区别和主要应用场景

### 1.1

首先，要明白这三个函数的存在意义是什么？答案是**改变函数执行时的上下文**，再具体一点就是**改变函数运行时的this指向**。有了这个认识，接下来我们来看一下,怎么使用这三个函数。

```javascript
  let obj = {name: 'tony'};
  
  function Child(name){
    this.name = name;
  }
  
  Child.prototype = {
    constructor: Child,
    showName: function(){
      console.log(this.name);
    }
  }
  var child = new Child('thomas');
  child.showName(); // thomas
  
  //  call,apply,bind使用
  child.showName.call(obj);
  child.showName.apply(obj);
  let bind = child.showName.bind(obj); // 返回一个函数
  bind(); // tony
```

我们拿别人的showName方法，并动态改变其上下文帮自己输出了信息，说到底就是实现了复用

### 1.2

bind方法是事先把fn的this改变为我们要想要的结果，并且把对应的参数值准备好，以后要用到了，直接的执行即可，也就是说bind同样可以改变this的指向，但和apply、call不同就是不会马上的执行（如上一个例子）

也就是说，`bind` 是返回对应函数，便于稍后调用

> 注意：bind这个方法在IE6~8下不兼容。

### 1.3

上面看起来三个函数的作用差不多，干的事几乎是一样的，那为什么要存在3个家伙呢，留一个不就可以。所以其实他们干的事从本质上讲都是一样的动态的改变this上下文,但是多少还是有一些差别的..

- call、apply与bind的差别

> call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。

- call、apply的区别

> 他们俩之间的差别在于参数的区别，call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

```javascript
let arr1 = [1, 2, 19, 6];
//例子：求数组中的最值
console.log(Math.max.call(null, 1,2,19,6)); // 19
console.log(Math.max.call(null, arr1)); // NaN
console.log(Math.max.apply(null, arr1)); //  19 直接可以用arr1传递进去
```

例子2:

```javascript
function fn() {
    console.log(this);
}
// apply方法结果同下
fn.call(); // 普通模式下this是window，在严格模式下this是undefined
fn.call(null); // 普通模式下this是window，在严格模式下this是null
fn.call(undefined); // 普通模式下this是window，在严格模式下this是undefined
```

当我们使用一个函数需要改变this指向的时候才会用到`call,apply,bind`
如果你要传递的参数不多，则可以使用`fn.call(thisObj, arg1, arg2 ...)`
如果你要传递的参数很多，则可以用数组将参数整理好调用`fn.apply(thisObj, [arg1, arg2 ...])`
如果你想生成一个新的函数长期绑定某个函数给某个对象使用，则可以使用

```javascript
const newFn = fn.bind(thisObj);
newFn(arg1, arg2...)
```

## 二、应用

- ##### 将伪数组转化为数组（含有length属性的对象，dom节点, 函数的参数arguments）

> js中的伪数组(例如通过document.getElementsByTagName获取的元素、含有length属性的对象)具有length属性，并且可以通过0、1、2…下标来访问其中的元素，但是没有Array中的push、pop等方法。就可以利用call，apply来转化成真正的数组，就可以使用数组的方法了

```javascript
case1: dom节点：

<div class="div1">1</div>
<div class="div1">2</div>
<div class="div1">3</div>

let div = document.getElementsByTagName('div');
console.log(div); // HTMLCollection(3) [div.div1, div.div1, div.div1] 里面包含length属性

let arr2 = Array.prototype.slice.call(div);
console.log(arr2); // 数组 [div.div1, div.div1, div.div1]
```

但是这个不适用于IE6~8，会报错：`SCRIPT5014: Array.prototype.slice: 'this' 不是 JavaScript 对象 (报错)`

那么在IE6~8下就只能通过循环一个个加到数组中了：

```javascript
for (var i = 0; i < oLis.length; i++) {
    ary[ary.length] = oLis[i];
}
```

基于IE6~8和标准浏览器中的区别，抽取出类数组对象转换为数组的工具类：

```javascript
function listToArray(likeAry) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeAry);
    } catch (e) {
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
}
```

**case2**： fn内的arguments

```javascript
function fn10() {
    return Array.prototype.slice.call(arguments);
}
console.log(fn10(1,2,3,4,5)); // [1, 2, 3, 4, 5]
```

> 注意：对于arguments借用数组的方法是不存在任何兼容性问题的。

**case3**: 含有length属性的对象

```javascript
let obj4 = {
	0: 1,
	1: 'thomas',
	2: 13,
	length: 3 // 一定要有length属性
};

console.log(Array.prototype.slice.call(obj4)); // [1, "thomas", 13]
```

- ##### 数组拼接，添加

```javascript
let arr1 = [1,2,3];
let arr2 = [4,5,6];

//数组的concat方法：返回一个新的数组
let arr3 = arr1.concat(arr2); 
console.log(arr3); // [1, 2, 3, 4, 5, 6]

console.log(arr1); // [1, 2, 3] 不变
console.log(arr2); // [4, 5, 6] 不变
// 用 apply方法
[].push.apply(arr1,arr2);  // 给arr1添加arr2
console.log(arr1); // [1, 2, 3, 4, 5, 6]
console.log(arr2); // 不变
```

- ##### 判断变量类型

```javascript
let arr1 = [1,2,3];
let str1 = 'string';
let obj1 = {name: 'thomas'};
//
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
console.log(fn1(arr1)); // true

//  判断类型的方式，这个最常用语判断array和object，null(因为typeof null等于object)  
console.log(Object.prototype.toString.call(arr1)); // [object Array]
console.log(Object.prototype.toString.call(str1)); // [object String]
console.log(Object.prototype.toString.call(obj1)); // [object Object]
console.log(Object.prototype.toString.call(null)); // [object Null]
```

- ##### 利用call和apply做继承

```javascript
function Animal(name){      
    this.name = name;      
    this.showName = function(){      
        console.log(this.name);      
    }      
}      

function Cat(name){    
    Animal.call(this, name);    
}      

// Animal.call(this) 的意思就是使用this对象代替Animal对象，那么
// Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了
var cat = new Cat("TONY");     
cat.showName();   //TONY
```

- ##### 多继承

```javascript
  function Class1(a,b) {
    this.showclass1 = function(a,b) {
      console.log(`class1: ${a},${b}`);
    }
  }

  function Class2(a,b) {
    this.showclass2 = function(a,b) {
      console.log(`class2: ${a},${b}`);
    }
  }

  function Class3(a,b,c) {
    Class1.call(this);
    Class2.call(this);
  }

  let arr10 = [2,2];
  let demo = new Class3();
  demo.showclass1.call(this,1); // class1: 1,undefined
  demo.showclass1.call(this,1,2); // class1: 1,1
  demo.showclass2.apply(this,arr10); // class2: 1,2
```

## 三、手写

```javascript
apply的实现：

Function.prototype.myApply= function(context){
    context.fn = this;//1.将函数挂载到传入的对象
    var arg = [...arguments].splice(1)[0];//2.取参数
    if(!Array.isArray(arg)) {
        throw new Error('apply的第二个参数必须是数组') //3.限制参数类型为数组
    }    
    context.fn(arg) //4.执行对象的方法
    delete context.fn; //5.移除对象的方法
}

var obj = {
    name:'obj'
}
function sayName(arr){
    console.log(this.name,arr)
}
sayName.myApply(obj,[1,2,3]) //obj [1, 2, 3]

```

```javascript
apply的实现：

Function.prototype.myApply= function(context){
    context.fn = this;//1.将函数挂载到传入的对象
    var arg = [...arguments].splice(1)[0];//2.取参数
    if(!Array.isArray(arg)) {
        throw new Error('apply的第二个参数必须是数组') //3.限制参数类型为数组
    }    
    context.fn(arg) //4.执行对象的方法
    delete context.fn; //5.移除对象的方法
}

var obj = {
    name:'obj'
}
function sayName(arr){
    console.log(this.name,arr)
}
sayName.myApply(obj,[1,2,3]) //obj [1, 2, 3]

```

```javascript
bind在mdn上的实现：

Function.prototype.myBind = function(oThis){
    if(typeof this !== 'function'){
        throw new TypeError('被绑定的对象需要是函数')
    }
    var self = this
    var args = [].slice.call(arguments, 1)
    fBound = function(){ //this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
        return self.apply(this instanceof fBound ? this : oThis, args.concat([].slice.call(arguments)))
    }
    var func = function(){}
    //维护原型关系
    if(this.prototype){
        func.prototype = this.prototype
    }
    //使fBound.prototype是func的实例，返回的fBound若作为new的构造函数，新对象的__proto__就是func的实例
    fBound.prototype = new func()
    return fBound
}
```

b站哈默版bind

```javascript
// bind函数
// 1.改变this指向
// 2.第一个参数是this的值，后面的参数是函数接收的参数 的值
// 3.返回值不变
Function.prototype.myBind = function(){
    const self = this
    const args = Array.prototype.slice.call(arguments)
    
    const thisValue = args.shift()
   
    
    return function(){
        return self.apply(thisValue,)
    }
}
```

