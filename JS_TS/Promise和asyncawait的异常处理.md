`Promise` 和 `async/await` 在 JavaScript、TypeScript 中已经很常见了，但你有遇到过这个报错吗？

这篇文章为你分析此类问题的成因和解决办法。

## 先看一个典型的例子

```js
function getList(){
    return new Promise((rs,rj)=>{
        rj('假装发生了错误')
    })
}

try{
    getList();
}
catch(e){
    alert('遇到了些许错误哦~')
}
复制代码
```

一看就是有经验的攻城狮，使用try...catch...捕获异常，发生错误时显示友好的提示。

emmm……可是实际会发生什么呢？

答案是，此处的异常将**无法**捕获到！ 当`getList()`抛出异常后，嗯，流程就失控了。

## Promise的异常捕获方式

打开控制台会发现，上面的例子将会抛出 `Uncaught (in promise)`异常。

这里要提到Promise的异常处理流程。

Promise创建时需要传入一个function，在这个function执行过程中，如果出现了异常则会对外抛出。 外部有2种方式来捕获这个异常：

### 方式一：catch()

```js
let promise = new Promise(...);
promise.catch(e=>{
    // TODO sth with e
})
复制代码
```

### 方式二：`async/await`中的`try...catch...`

```js
let promise = new Promise(...);
async function test(){
    try{
        await promise;
    }
    catch(e){
        // TODO sth with e
    }
}
复制代码
```

### 全局异常

如果这两种方式都没有出现，则异常将会被视为 “Uncaught (in promise)” 被抛出到全局去。 在NodeJS中，你可以通过`process.on('unhandledRejection', e => {...})`来捕获全局异常。 遗憾的是，在浏览器中，尚未发现有效的方式能捕获此类全局异常。 所以应当极力避免出现全局异常的情况，尤其是在前端，可能由异常导致流程中断。

**只要Promise的异常被方式一或方式二捕获，就不会抛出全局异常！**

## 未捕获异常的原因

例子中的Promise异常未被正常捕获，是因为`promise`虽然出现在`try...catch...`中，但是并没有被`await`，如此将不进入上述的异常捕获流程，一旦出现异常并且没有其它有效的catch时，就将抛出至全局。

嗯，看起来似乎你已经了解了，那么把例子1按如下修改一下，你觉得是否可以正常工作呢？

```ts
function getList(){
    return new Promise((rs,rj)=>{
        rj('假装发生了错误')
    })
}

async function main(){
    try{
        getList();
    }
    catch(e){
        alert('遇到了些许错误哦~')
    }
}

main();
```

依旧不行！ 因为 `Promise` 虽然出现在了 `async` 方法中，但由于没有被 `await`，所以其异常视为全局异常。

**此处有神坑！请注意！**

```js
new Promise(rs=>{
    throw new Error('Error')
}).catch(e=>{
    console.log('异常被捕获到了1')
})

new Promise(async rs=>{
    throw new Error('Error')
}).catch(e=>{
    console.log('异常被捕获到了2')
})
```

上面2个 `Promise` 里的异常，能被捕获到吗？

答案是第一个 `Promise` 里的异常能被捕获，因为 `Promise` 里同步抛出的异常，也会被视为`Promise.reject`。 但第二个 `Promise`，由于里面的函数是 `async` 的，异常是异步抛出的，所以并不会触发 `Promise` 的 `reject` ，因此 `Promise.catch` 也就捕获不到。

怎么理解呢？换个方式可能好理解一些。 `async` 函数本身，就是 `Promise` 的另一种写法，二者一定能够互相转化且等效。 转化成Promise的等效写法就是：

```js
new Promise(rs=>{
    // async 相当于同步函数里又包了一层Promise
    return new Promise(()=>{
        // 内层Promise抛出异常
        throw new Error('Error')
    })
}).catch(e=>{  // 这里catch的是外层Promise
    // 由于异常并未向上抛给外层Promise，所以此处catch不到
    console.log('异常被捕获到了2')
})
```

如之前所述，`Promise` 内抛出的异常，无论身在何处，只要未经捕获，就会直接上升为全局“未经捕获的异常”，而不是层层抛出。