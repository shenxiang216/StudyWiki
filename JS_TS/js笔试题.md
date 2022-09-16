* ```js
  <link> 和href配合 加载css，hypertext reference超文本引用，页面加载到href时不会停下来
  <script>和src配合 加载script文件，source资源，页面会停下来等待资源加载完毕（并执行完），所以一般js放在body的最下面
  ```

* ![](https://uploadfiles.nowcoder.com/images/20190513/5304986_1557761241947_781CA53DA27E6B58B8A9670E07E5DC40)

* ◎Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
  ◎Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
  ◎Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数(这也是我们在数学课上学到的舍入规则)。

* 下列选项中，（）不是网页中的事件
  正确答案: D   你的答案: D (正确)
  onclick
  onmouseover
  onsubmit
  onpressbutton

* cookie的有效时间默认为-1，如果不进行设置的话，就会默认在浏览器会话关闭时结束。
  可以通过setMaxAge()方法设置cookie的生命期。
  当setMaxAge(0)表示立刻删除该浏览器上指定的cookie

* 执行以下程序，输出结果为（）
```js
      var arr = [2,1,3,5,9];
      
      var count = 0;
      
      arr.forEach((val1,val2)=>{
          count++;
      
          if(count % 3 == 0){
      
              return;
      
          }
      
          console.log(val1);
          })
```

  正确答案: D   你的答案: A (错误)
  2 1

  0 1

  0 1 3 4

  2 1 5 9

```js
var arr = [2,1,3,5,9];
var count = 0;

arr.forEach((val1,val2)=>{//arr = [2,1,3,5,9];
        count++; //第一次循环count++为0
        if(count % 3 == 0){ //第一次循环count为1，不满足条件，不进入if条件里
            return;
        }
        console.log(val1);//第一次循环val1=2
})

arr.forEach((val1,val2)=>{//arr = [2,1,3,5,9];
        count++; //第二次循环count++为1
        if(count % 3 == 0){ //第二次循环count为2，不满足条件，不进入if条件里
            return;
        }
        console.log(val1);//第二次循环val1=1
})


arr.forEach((val1,val2)=>{//arr = [2,1,3,5,9];
        count++; //第三次循环count++为2
        if(count % 3 == 0){ //第三次循环count为3，满足条件，进入if条件里
            return;     //return跳出本次循环，不执行后续代码
        }
        console.log(val1);//第三次循环没执行到这
})


arr.forEach((val1,val2)=>{//arr = [2,1,3,5,9];
        count++; //第四次循环count++为3
        if(count % 3 == 0){ //第四次循环count为4，不满足条件，不进入if条件里
            return;         
        }
        console.log(val1);//第四次循环val1=5
})

arr.forEach((val1,val2)=>{//arr = [2,1,3,5,9];
        count++; //第五次循环count++为4
        if(count % 3 == 0){ //第五次循环count为5，不满足条件，不进入if条件里
            return;         
        }
        console.log(val1);//第五次循环val1=9
})
```

1. 在forEach中使用 return false 或者 break无法跳出整个循环，并且使用break会直接报错

2. ```jsx
   return false;//仍然会执行完循环，但不再执行循环后面的js代码 let arr = [2,31,3] arr.forEach((val, index) => { if(val===31) { return false } console.log('执行第' + index + '次数') }) 执行第0次数
   执行第2次数
   其中val =31 这一次的循环return false以后的代码不再执行
   ```
* 执行以下代码，alert的输出结果为（）
  var msg = 'hello';
  for (var i = 0; i<10; i++){
      var msg = 'hello' + i * 2 + i;
  }
  alert(msg);

  正确答案: B   你的答案: C (错误)
  hello
  hello189
  hello30
  hello27

  ```js
  这道题的难点不在域.而是String拼接和符号的优先级.
  "hello"+9*2+9  
  
  // "hello"+18+9
  
  // "hello18"+9
  
  // "hello189"    // 结果为String类型字符串
  注意这里只是for循环不是函数，因此for内部定义的msg与for外部定义的msg为在同一块作用域，为同一个变量。
  ```
  
* ```js
  test.innerHTML:
  
  也就是从对象的起始位置到终止位置的全部内容,包括Html标签。
  
  上例中的test.innerHTML的值也就是“<span style="color:red">test1</span> test2 ”。
  
  test.innerText: 
  
  从起始位置到终止位置的内容, 但它去除Html标签 
  
  上例中的text.innerTest的值也就是“test1 test2”, 其中span标签去除了。
  
  test.outerHTML:
  
  除了包含innerHTML的全部内容外, 还包含对象标签本身。
  
  上例中的text.outerHTML的值也就是<div id="test"><span style="color:red">test1</span> test2</div>
  ```
  
* ```text
  ==
  首先会判断两者类型是否相同。相同的话就是比值大小了
  类型不相同的话，那么就会进行类型转换
  会先判断是否在对比 null 和 undefined，是的话就会返回 true
  判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
  判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
  判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断
  
  加法运算：
  如果有一边为字符串，那么+表示字符串连接
  如果两边都没有字符串，那么就是普通的加法运算，不是Number类型的会先隐式转换成数字计算。
  ```
  
* ```js
  下面三个事件都是事件对象的方法：
  
  stopPropagation() 阻止事件冒泡。 这个事件不会阻止定义在元素上的其他事件。
  
  stopImmediatePropagation() 会彻底的阻止事件， 在其之后的绑定在元素上的其他监听事件都不会触发
  
  preventDefault() 阻止事件的默认动作
  
  js没有选项中的其他事件
  ```
  
* [JavaScript 保留关键字](https://www.runoob.com/js/js-reserved.html)

* js中的内置对象：![](https://uploadfiles.nowcoder.com/images/20170106/994851_1483692460207_900B631B37CC71E17DB04673780996DE)

* typeof Date.now() 的值是：
  正确答案: C   你的答案: B (错误)
  'date'
  'object'
  'number'
  'error'
  
* iframe本身就不是动态语言，样式和脚本都需要额外导入。

* 获取原生JS的父节点的是（）
  正确答案: C   你的答案: D (错误)
  element.parent()
  element.getParent()
  element.parentNode
  element.parentNode()
  
* ```js
  以下符合 ES6 写法的有：（）
  正确答案: C   你的答案: D (错误)
  class Foo
  {
  	constructor() {return Object.create(null);}
  }
  Foo()
  var m=1;
  export m;
  export var firstName=’Michael’;
  在A模块中export{readFile}后，在B模块中import readFile from ‘A’可以获取到readFile
  
  
  ES6
  A:类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
  B:export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
  // 报错
  export 1;
  // 报错
  var m = 1;
  export m;
  上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 1，第二种写法通过变量m，还是直接输出 1。1只是一个值，不是接口。正确的写法是下面这样。
  
  // 写法一
  export var m = 1;
  // 写法二
  var m = 1;
  export {m};
  // 写法三
  var n = 1;
  export {n as m};
  D:A模块对外暴露了一个对象，引入的时候需要使用解构赋值
  import {readFile} from ‘A'
  
  ```
  
* JS中
  false、“”（空字符串）、0和NAN、null、undefined进行逻辑运算为false.
  特别注意的是typeof('0')=='string',即'0'是一个字符串对象,对对象进行逻辑运算结果为true
  
* ```js
  执行以下程序，下列选项中，说法错误的是（）
  class Phone{
    constructor(brand){
      this.brand = brand;
  }
    call(){}...①
  }
  function playGame(){console.log("我可以打游戏")};
  function photo(){console.log("我可以拍照")};
  console.log(typeof Phone);...②
  var p = new Phone('华为');
  console.log(p.brand);...③
  
  ①式的call方法是定义在类Phone的prototype对象上
  
  ②式输出结果为Object
  
  ③式输出结果为华为
  
  若想一次性给类添加playGame和photo两个实例方法，可以使用Object.assign(Phone.prototype,{playGame,photo})
  
  正确答案：B
  题目解析：
  类的所有实例方法均定义在类的原型对象上，因此，在类内定义的实例方法和在类的原型对象上定义方法是等价的，call()是实例方法，故A选项说法正确，不符合题意；类的本质是函数，实际上，ES6中的类可以视为ES5中构造函数的另一种写法，所以②式的输出结果为function而不是Object，B选项说法错误，符合题意；p为类的实例对象，该对象有一个属性brand，属性值为华为，C选项说法正确，不符合题意；Object.assign(target, source)可将source源对象所有可枚举的属性（或方法）分配给target对象，所以可以使用Object.assign(Phone.prototype,{playGame,photo})为类一次性添加playGame和photo两个实例方法，D选项说法正确，不符合题意。
  ```
  
* 

  