### map()

* `map()`方法定义在JavaScript的`Array`中，它返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。

* `map()`不会对空数组进行检测

* `map()`不会改变原始数组

* 语法：`array.map(function(currentValue, index, arr), thisIndex)`

* **参数说明：**

  - `function(currentValue, index, arr)`：**必须**。为一个函数，数组中的每个元素都会执行这个函数。其中函数参数：

  > 1. `currentValue`：**必须**。当前元素的的值。
  > 2. `index`：**可选**。当前元素的索引。
  > 3. `arr`：**可选**。当前元素属于的数组对象。

  - `thisValue`：**可选**。对象作为该执行回调时使用，传递给函数，用作"`this`"的值。

* 返回由原数组中每个元素的平方组成的新数组：

  ```javascript
  let array = [1, 2, 3, 4, 5];
  
  let newArray = array.map((item) => {
      return item * item;
  })
  
  console.log(newArray)  // [1, 4, 9, 16, 25]
  ```



### join()

* join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
* 语法:·`arrayObject.join(separator)`
* separator:可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。
* 返回值：返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 *separator* 字符串而生成的。