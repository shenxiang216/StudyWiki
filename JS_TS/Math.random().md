`**Math.random()**` 函数返回一个浮点数,  伪随机数在范围从**0到**小于**1**，也就是说，从0（包括0）往上，但是不包括1（排除1），然后您可以缩放到所需的范围。实现将初始种子选择到随机数生成算法;它不能被用户选择或重置。

## 语法

```javascript
Math.random()
```

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#parameters)

一个浮点型伪随机数字，在`0`（包括0）和`1`（不包括）之间。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#examples)

请注意, 由于 JavaScript 中的数字是 IEEE 754 浮点数字，具有最近舍入（ round-to-nearest-even）的行为, 因此以下函数的范围 (不包括`Math.random()` 本身) 并不准确。如果选择了非常大的边界 (2^53 或更高), 在极罕见的情况下会计算通常-排除（usually-excluded）的上界。（注：round-to-nearest-even采用最近舍入的去偶数舍入的方式，对.5的舍入上，采用取偶数的方式）

### [得到一个大于等于0，小于1之间的随机数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#得到一个大于等于0，小于1之间的随机数)

```javascript
function getRandom() {
  return Math.random();
}
```

Copy to Clipboard

### [得到一个两数之间的随机数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#得到一个两数之间的随机数)

这个例子返回了一个在指定值之间的随机数。这个值不小于 `min`（有可能等于），并且小于（不等于）`max`。

```javascript
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
```

Copy to Clipboard

### [得到一个两数之间的随机整数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#得到一个两数之间的随机整数)

这个例子返回了一个在指定值之间的随机整数。这个值不小于 `min` （如果 `min` 不是整数，则不小于 `min` 的向上取整数），且小于（不等于）`max`。

```javascript
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
```

Copy to Clipboard

**备注：**也许很容易想到用 `Math.round()` 来实现，但是这会导致你的随机数处于一个不均匀的分布，这可能不符合你的需求。

### [得到一个两数之间的随机整数，包括两个数在内](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#得到一个两数之间的随机整数，包括两个数在内)

上一个例子提到的函数 `getRandomInt()` 结果范围包含了最小值，但不含最大值。如果你的随机结果需要同时包含最小值和最大值，怎么办呢? `getRandomIntInclusive()` 函数可以实现。

```javascript
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
```