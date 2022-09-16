# ts-2021-7-8复习

* 如果语句写在同一行则一定需要使用分号来分隔，否则会报错

* ```
  // 在元素类型后面加上[]
  let arr: number[] = [1, 2];
  
  // 或者使用数组泛型
  let arr: Array<number> = [1, 2];
  ```

* ```css
  .box {
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
  
  .inset {
    /* 内阴影 | x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
  /* inset：如果没有指定inset，默认阴影在边框外，即阴影向外扩散。 使用 inset 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。 此时阴影会在边框之内 (即使是透明边框）、背景之上、内容之下。
  offset-x、offset-y：这是头两个 length 值，用来设置阴影偏移量。x,y 是按照数学二维坐标系来计算的，只不过y垂直方向向下。offset-x 设置水平偏移量，正值阴影则位于元素右边，负值阴影则位于元素左边。 offset-y 设置垂直偏移量，正值阴影则位于元素下方，负值阴影则位于元素上方。如果两者都是0，那么阴影位于元素后面。
  blur-radius：这是第三个 length 值。值越大，模糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利。本规范不包括如何计算模糊半径的精确算法。
  spread-radius：这是第四个 length 值。取正值时，阴影扩大；取负值时，阴影收缩。默认为0，此时阴影与元素同样大。
  color：指定阴影颜色。*/
  ```

* never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）

* 在 JavaScript 中 null 表示 "什么都没有"。null是一个只有一个值的特殊类型。表示一个空对象引用。**<u>用 typeof 检测 null 返回是 object。</u>**

* 在 JavaScript 中, undefined 是一个没有设置值的变量。typeof 一个没有值的变量会返回 undefined。

* 常用的数组方法：

  | 序号 |                         方法 & 描述                          | 实例                                                         |
  | :--: | :----------------------------------------------------------: | :----------------------------------------------------------- |
  |  1.  |          concat()连接两个或更多的数组，并返回结果。          | `var alpha = ["a", "b", "c"];  var numeric = [1, 2, 3]; var alphaNumeric = alpha.concat(numeric);  console.log("alphaNumeric : " + alphaNumeric );    // a,b,c,1,2,3   ` |
  |  2.  |        every()检测数值元素的每个元素是否都符合条件。         | `function isBigEnough(element, index, array) {         return (element >= 10);  }          var passed = [12, 5, 8, 130, 44].every(isBigEnough);  console.log("Test Value : " + passed ); // false` |
  |  3.  |     filter()检测数值元素，并返回符合条件所有元素的数组。     | `function isBigEnough(element, index, array) {    return (element >= 10);  }            var passed = [12, 5, 8, 130, 44].filter(isBigEnough);  console.log("Test Value : " + passed ); // 12,130,44` |
  |  4.  |          forEach()数组每个元素都执行一次回调函数。           | `let num = [7, 8, 9]; num.forEach(function (value) {    console.log(value); }); `编译成 JavaScript 代码：`var num = [7, 8, 9]; num.forEach(function (value) {    console.log(value);  // 7   8   9 });` |
  |  5.  | indexOf()搜索数组中的元素，并返回它所在的位置。如果搜索不到，返回值 -1，代表没有此项。 | `var index = [12, 5, 8, 130, 44].indexOf(8);  console.log("index is : " + index );  // 2` |
  |  6.  |            join()把数组的所有元素放入一个字符串。            | `var arr = new Array("Google","Runoob","Taobao");            var str = arr.join();  console.log("str : " + str );  // Google,Runoob,Taobao           var str = arr.join(", ");  console.log("str : " + str );  // Google, Runoob, Taobao           var str = arr.join(" + ");  console.log("str : " + str );  // Google + Runoob + Taobao` |
  |  7.  | lastIndexOf()返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。 | `var index = [12, 5, 8, 130, 44].lastIndexOf(8);  console.log("index is : " + index );  // 2` |
  |  8.  |  map()通过指定函数处理数组的每个元素，并返回处理后的数组。   | `var numbers = [1, 4, 9];  var roots = numbers.map(Math.sqrt);  console.log("roots is : " + roots );  // 1,2,3` |
  |  9.  |        pop()删除数组的最后一个元素并返回删除的元素。         | `var numbers = [1, 4, 9];            var element = numbers.pop();  console.log("element is : " + element );  // 9           var element = numbers.pop();  console.log("element is : " + element );  // 4` |
  | 10.  |    push()向数组的末尾添加一个或更多元素，并返回新的长度。    | `var numbers = new Array(1, 4, 9);  var length = numbers.push(10);  console.log("new numbers is : " + numbers );  // 1,4,9,10  length = numbers.push(20);  console.log("new numbers is : " + numbers );  // 1,4,9,10,20` |
  | 11.  |         reduce()将数组元素计算为一个值（从左到右）。         | `var total = [0, 1, 2, 3].reduce(function(a, b){ return a + b; });  console.log("total is : " + total );  // 6` |
  | 12.  |      reduceRight()将数组元素计算为一个值（从右到左）。       | `var total = [0, 1, 2, 3].reduceRight(function(a, b){ return a + b; });  console.log("total is : " + total );  // 6` |
  | 13.  |                reverse()反转数组的元素顺序。                 | `var arr = [0, 1, 2, 3].reverse();  console.log("Reversed array is : " + arr );  // 3,2,1,0` |
  | 14.  |             shift()删除并返回数组的第一个元素。              | `var arr = [10, 1, 2, 3].shift();  console.log("Shifted value is : " + arr );  // 10` |
  | 15.  |        slice()选取数组的的一部分，并返回一个新数组。         | `var arr = ["orange", "mango", "banana", "sugar", "tea"];  console.log("arr.slice( 1, 2) : " + arr.slice( 1, 2) );  // mango console.log("arr.slice( 1, 3) : " + arr.slice( 1, 3) );  // mango,banana` |
  | 16.  |         some()检测数组元素中是否有元素符合指定条件。         | `function isBigEnough(element, index, array) {    return (element >= 10);            }            var retval = [2, 5, 8, 1, 4].some(isBigEnough); console.log("Returned value is : " + retval );  // false           var retval = [12, 5, 8, 1, 4].some(isBigEnough);  console.log("Returned value is : " + retval );  // true` |
  | 17.  |                 sort()对数组的元素进行排序。                 | `var arr = new Array("orange", "mango", "banana", "sugar");  var sorted = arr.sort();  console.log("Returned string is : " + sorted );  // banana,mango,orange,sugar` |
  | 18.  |               splice()从数组中添加或删除元素。               | `var arr = ["orange", "mango", "banana", "sugar", "tea"];   var removed = arr.splice(2, 0, "water");   console.log("After adding 1: " + arr );    // orange,mango,water,banana,sugar,tea  console.log("removed is: " + removed);            removed = arr.splice(3, 1);   console.log("After removing 1: " + arr );  // orange,mango,water,sugar,tea  console.log("removed is: " + removed);  // banana` |
  | 19.  |          toString()把数组转换为字符串，并返回结果。          | `var arr = new Array("orange", "mango", "banana", "sugar");          var str = arr.toString();  console.log("Returned string is : " + str );  // orange,mango,banana,sugar` |
  | 20.  |  unshift()向数组的开头添加一个或更多元素，并返回新的长度。   | `var arr = new Array("orange", "mango", "banana", "sugar");  var length = arr.unshift("water");  console.log("Returned array is : " + arr );  // water,orange,mango,banana,sugar  console.log("Length of the array is : " + length ); // 5` |

* Map对象：Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

  * 创建：`let myMap = new Map();`

  * 初始化：

    ```js
    let myMap = new Map([
            ["key1", "value1"],
            ["key2", "value2"]
        ]); 
    ```
    
  * 属性与方法：

    ```js
    map.clear() – 移除 Map 对象的所有键/值对 。
    map.set() – 设置键值对，返回该 Map 对象。
    map.get() – 返回键对应的值，如果不存在，则返回 undefined。
    map.has() – 返回一个布尔值，用于判断 Map 中是否包含键对应的值。
    map.delete() – 删除 Map 中的元素，删除成功返回 true，失败返回 false。
    map.size – 返回 Map 对象键/值对的数量。
    map.keys() - 返回一个 Iterator 对象， 包含了 Map 对象中每个元素的键 。
    map.values() – 返回一个新的Iterator对象，包含了Map对象中每个元素的值 。
    ```

  * 例子：

    ```js
    let nameSiteMapping = new Map();
     
    // 设置 Map 对象
    nameSiteMapping.set("Google", 1);
    nameSiteMapping.set("Runoob", 2);
    nameSiteMapping.set("Taobao", 3);
     
    // 获取键对应的值
    console.log(nameSiteMapping.get("Runoob"));     // 2
     
    // 判断 Map 中是否包含键对应的值
    console.log(nameSiteMapping.has("Taobao"));       // true
    console.log(nameSiteMapping.has("Zhihu"));        // false
     
    // 返回 Map 对象键/值对的数量
    console.log(nameSiteMapping.size);                // 3
     
    // 删除 Runoob
    console.log(nameSiteMapping.delete("Runoob"));    // true
    console.log(nameSiteMapping);
    // 移除 Map 对象的所有键/值对
    nameSiteMapping.clear();             // 清除 Map
    console.log(nameSiteMapping);
    ```

  