### 一、JS异步编程方法

- 最开始使用回调形式

```stylus
setTimeout(callback, 1000)
```

- 回调形式容易造成回调地狱，故es6发明了promise，采用链式回调的方式

```abnf
const test = new Promise();
test.then(cb1).then(cb2);
```

- 链式回调虽然更加直观了，但还是要将函数通过then传递，更为理想的方式是，用同步的写法去写异步逻辑，于是es7给出了async和await关键字

```javascript
const p1 = () => { return new Promise((res) => {
    setTimout(() => {
        console.log('p1');
        res(2);
    }, 1000);
})};
const p = async () => {
    const p2 = await p1();
    console.log(p2);
}
// 输出 p1 2
```

- 由此可见，async和await处理异步是基于promise的，await后面需要跟一个promise(通常是一个返回promise的函数，跟在await后面并执行)
- 如果await后面不是接的promise而是一个普通的表达式，await会将其promise化，即在会存在异步，见一下例子。

```javascript
async test() {
    console.log('test start');
    await otherTest();
    console.log('test end');
}
async otherTest() {
    console.log('otherTest');
}
test();
console.log('after test');

/*
输出 test start -> otherTest -> after test -> test end
*/

//因为其相当于变成了
test() {
    console.log('test start');
    const p = new Promise((res, rej) => {
        otherTest();
    });
    p.then(() => console.log('test end'));
    return p;
}
```

- async/await是语法糖，用async标记的函数，在其内部遇到await标记的逻辑时，会暂时返回，不执行后续的逻辑，等await内部的逻辑处理完毕后，再继续走await后面的逻辑，这个方式，其实就是es6定义的generator函数。即async与await将标记的函数转换成了生成器。

### 二、原理

- 将p变成一个generator函数，其中遇到await的地方就改写成yield：

```qml
function* p () {
    const p2 = yield p1();
    console.log(p2)
}
```

- 我们可以运行p()，得到一个迭代器，调用迭代器的next()，执行下一步，但这种方式需要手动调用next才会继续执行函数p，所以我们就需要一个自动执行这个函数的函数asyncFunc：

```javascript
asyncFunc(generator) {
    const gen = generator();
    function next(data) {
        const { value, done } = gen.next(data);
        if (done) {
            return value;
        } else if (!(value instanceof Promise)) {
            next(value);
        } else {
            value.then((data) => next(data));
        }
    }
    next();
}
asyncFunc(p);
```

- 通过调用asyncFunc(p)，我们执行了生成器p，得到迭代器gen，通过递归next方法，将gen自动执行到底(即done = true时，每次调用迭代器的next，都会返回value和done标志，value是yield后面表达式的值)；
- 而当yield后面表达式返回一个promise时，通过将迭代器的next方法放到pormise的then中执行，使得yield后面的逻辑要等待p1完成后才继续进行，即达到同步的效果
- 可见async/await是通过将函数变为一个生成器函数，并使用自动执行函数来执行他，在执行过程中，有意地让生成的迭代器放到promise的then中，即异步完成后才执行，从而达到的同步效果。
- 完整流程如下：

```javascript
const p1 = () => { return new Promise((res) => {
    setTimout(() => {
        console.log('p1');
        res(2);
    }, 1000);
})};

function* p () {
    const p2 = yield p1();
    console.log(p2)
}

asyncFunc(generator) {
    const gen = generator();
    function next(data) {
        const { value, done } = gen.next(data);
        if (done) {
            return value;
        } else if (!(value instanceof Promise)) {
            next(value);
        } else {
            value.then((data) => next(data));
        }
    }
    next();
}
asyncFunc(p);
```

- 首先自动执行函数asyncFunc执行生成器p得到迭代器gen
- 调用next函数，执行gen.next，这时迭代器执行到p函数的yield p1()，返回一个promise，该promise一秒后将打印'p1'，并返回2
- 在此之前，自执行函数，在该promise的回调中传入了next方法
- 则一秒后，打印'p1'，返回2，执行next(2)
- 则迭代器执行yield p1()后面的逻辑，并且，把2赋给了p2(generator语法如此)
- 打印'2'
- async/await的实现要比上述的复杂，但核心逻辑就是generator结合自执行函数。