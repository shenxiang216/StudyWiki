```js
var a = 2 
var obj = {
  a:1
}
const test = ()=>{
  console.log(this.a)// 2
}
test.call(obj)   // 箭头函数忽略任何形式的this指向的改变
复
```

我们可以看到实际上通过call可以改变this的指向，理论上来说此时函数内部的this应该指向obj这个对象，但是箭头函数会忽略任何形式的this指向的改变。

