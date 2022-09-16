## JavaScript数据类型

JavaScript有八种内置类型，除对象外，其他统称为“基本类型”。

- 空值（null)
- 未定义(undefined)
- 布尔值（boolean)
- 数字（number)
- 字符串（string)
- 对象 (object)
- 符号（symbol, ES6中新增)
- 大整数（BigInt, ES2020 引入）
- Symbol： 是ES6中引入的一种原始数据类型，表示独一无二的值。
- BigInt：是 ES2020 引入的一种新的数据类型，用来解决 JavaScript中数字只能到 53 个二进制位（JavaScript 所有数字都保存成 64 位浮点数，大于这个范围的整数，无法精确表示的问题。具体可查看：新数据类型 — BigInt 复制代码

## 一、typeof

typeof是一个操作符而不是函数，其右侧跟一个一元表达式，并返回这个表达式的数据类型。返回的结果用该类型的字符串(全小写字母)形式表示，包括以下 8 种：number、boolean、symbol、string、object、undefined、function 、bigInt等。 typeof原理是不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息。

- 000: 对象
- 010: 浮点数
- 100：字符串
- 110：布尔
- 1：整数

```javascript
console.log(typeof undefined) // undefind
console.log(typeof null)      // object
console.log(typeof true)      // boolean
console.log(typeof 43)        // number
console.log(typeof '21')      // string
console.log(typeof {a:1})     // object
console.log(typeof Symbol())  // symbol
console.log(typeof 123n)      // bigint
function a() {}
console.log(typeof a)         // function
var date = new Date()
var error = new Error()
console.log(typeof date)      // object
console.log(typeof error)     // object
```

## 二、instanceof

instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。 在这里需要特别注意的是：instanceof 检测的是原型 通俗一些讲，instanceof 用来比较一个对象是否为某一个构造函数的实例。注意，instanceof可以准确的判断复杂数据类型，但是不能正确判断基本数据类型

```javascript
console.log(12 instanceof Number)  // false
console.log('22' instanceof String)  // false
console.log(true instanceof Boolean) // false
console.log(null instanceof Object) // false
console.log(undefined instanceof Object) // false

console.log([] instanceof Array)   // true
console.log({a: 1} instanceof Object) // true
console.log(json instanceof Object) // true
function a() {}
console.log(a instanceof Function)  // true
console.log(new Date() instanceof Date)  //true
console.log(reg instanceof RegExp) //true
console.log(error instanceof Error) // true
```

## 三、Object.prototype.toString.call()

toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。 对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

```javascript
console.log(Object.prototype.toString.call(1))          // [object Number]
console.log(Object.prototype.toString.call(1n))         // [object BigInt]
console.log(Object.prototype.toString.call('123'))      // [object String]
console.log(Object.prototype.toString.call(true))       // [object Boolean]
console.log(Object.prototype.toString.call(undefined))  // [object Undefined]
console.log(Object.prototype.toString.call(null))       // [object Null]
console.log(Object.prototype.toString.call({}))         // [object Object]
console.log(Object.prototype.toString.call([]))         // [object Array]
console.log(Object.prototype.toString.call(function a() {}))  // [object Function]
console.log(Object.prototype.toString.call(Symbol()))         // [object Symbol]
console.log(Object.prototype.toString.call(Math))             // [object Math]
console.log(Object.prototype.toString.call(JSON))             // [object JSON]
console.log(Object.prototype.toString.call(new Date()))       // [object Date]
console.log(Object.prototype.toString.call(new RegExp()))     // [object RegExp]
console.log(Object.prototype.toString.call(new Error))        // [object Error]
console.log(Object.prototype.toString.call(window)            // [object Window]
console.log(Object.prototype.toString.call(document)          // [object HTMLDocument]
```

使用该方法我们可以封装一个isType方法来对类型进行判断

```javascript
let isType = (type, obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
}
console.log(isType('Number', 12))   // true
console.log(isType('Number', '12')) // false
```

或者

```javascript
let type = function(o) {
    let s = Object.prototype.toString.call(o);
    return s.match(/[object (.*?)]/)[1].toLowerCase();
};
console.log(type(12)) // number
console.log(type('12')) // string
console.log(type({})) // object
console.log(type([])) // array
```

## 四、constructor

constructor属性，可以得知某个实例对象，到底是哪一个构造函数产生的。 constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。所以，修改原型对象时，一般要同时修改constructor属性的指向。

```javascript
console.log('22'.constructor === String)             // true
console.log(true.constructor === Boolean)            // true
console.log([].constructor === Array)                // true
console.log(document.constructor === HTMLDocument)   // true
console.log(window.constructor === Window)           // true
console.log(new Number(22).constructor === Number)   // true
console.log(new Function().constructor === Function) // true
console.log((new Date()).constructor === Date)       // true
console.log(new RegExp().constructor === RegExp)     // true
console.log(new Error().constructor === Error)       // true
```

注意： 1、null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。 2、函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object

## 参考资料

[JavaScript类型判断的四种方法](http://caibaojian.com/check-data-type.html)