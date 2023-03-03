## 二维数组中的查找

- 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```javascript
function Find(target, array)
{
    var row = array.length;
    var col = array[0].length;
    var i, j=0;
    for(i = row-1; i>=0&&j<col; ) {
        if(target > array[i][j]) {//如果检索值大于左下角元素
            j++;
            continue;
        }else if(target < array[i][j]) {//检索值小于左下角元素
            i--;
            continue;
        }else {
            return true;
        }
    }
    return false;
}
```

> **思路讲解**：
> 矩阵是有序的，从左下角来看，向上数字递减，向右数字递增，因此从左下角（倒数第一个子数组头部开始）开始查找，当要查找数字比左下角数字大时右移，要查找数字比左下角数字小时，上移。

## 替换空格

- 请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy

  ```javascript
  function replaceSpace(str) {
      return str.split(" ").join("%20");
  }
  
  function replaceSpace(str) {
      var reg = new RegExp(" ", "g");
      return str.replace(reg, "%20");
  }
  ```

  > **思路讲解**：我第一反应就是分割为数组然后拼接起来即可，也可以用正则表达式的形式实现，代码如下：

## 从尾到头打印二叉树

- 输入一个链表，从尾到头打印链表每个节点的值。

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    var containerArr = new Array();
    var temp = head;
    while(temp) {
        containerArr.push(temp.val);
        temp = temp.next;
    }
    return containerArr.reverse();
}
```

> **思路讲解**：
> JavaScript中实现该题目优先考虑数组翻转，将链表值先顺序存入数组，然后将数组逆序即可实现题目要求，而且性能较高，时间复杂度较低。

## 重建二叉树

- 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin) {
    if(!pre || pre.length == 0) {
        return null;
    }
    var TreeNode = {
        val:pre[0]
    };
    for(var i=0; i<pre.length; i++) {
        if(vin[i] === pre[0]) {//找到中序遍历根节点位置
            //对于中序遍历，根节点左边的节点位于二叉树的左边，根节点右边的节点位于二叉树的右边
            TreeNode.left = reConstructBinaryTree(pre.slice(1, i+1), vin.slice(0,i));
            TreeNode.right = reConstructBinaryTree(pre.slice(i+1), vin.slice(i+1));
        }
    }
    return TreeNode;
}
```

> 思路讲解：
> 前序遍历时根节点一定是第一个元素，因此此题中根节点为pre[0]。对于中序遍历，根节点左边的节点位于二叉树的左边，根节点右边的节点位于二叉树的右边，因此代码中递归时第二个参数的索引要注意！！！
> 注意：
>
> JavaScript中slice方法可从已有的数组中返回选定的元素，它返回的是一个新的数组，包含从 start 到 end（不包括该元素）的 arrayObject中的元素。请注意，该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。
>
> 另外，需要注意，如果题目只给出前序遍历和后序遍历，是不能重建该二叉树的！！！

## 用两栈实现队列

- 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

```javascript
var stack1 = [], stack2 = [];
function push(node)
{
    stack1.push(node);
}
function pop()
{
    if(stack2.length === 0) {//栈B为空
        if(stack1.length === 0) {
            return false;
        }else {
            var stack1Len = stack1.length;
            for(var i=0; i<stack1Len; i++) {
                stack2.push(stack1.pop());
            }
            return stack2.pop();
        }
    }else {
        return stack2.pop();
    }
}
```

> 思路讲解：
> 1. 栈A用作入队列
> 2. 栈B用作出队列，当栈B为空时，栈A全部出栈到栈B，栈B再出栈
> 注意：此处刚开始犯了低智商错误，在for循环前未声明变量var stack1Len = stack1.length; 将for循环的条件控制变量直接写成了stack1.length，导致程序运行错误，因为栈A出栈后length会变化，此处注意！！！

## 旋转数组的最小数字
* 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

```javascript
function minNumberInRotateArray(rotateArray)
{
    if(rotateArray.length == 0) {
        return 0;
    }
    for(var i=0; i<rotateArray.length-1; i++) {
        if(rotateArray[i] > rotateArray[i+1]) {
            return rotateArray[i+1];
        }
    }
    return rotateArray[0];//非递减数组的话直接显示第一个元素
}
```

>**思路讲解**：
>注意题目：输入一个*非递减排序*的数组的***一个\***旋转，说明原始数组的值递增或者有重复，如{1，2，3，6，7} 或者{1， 2，2，2，3，6，7}等。旋转之后原始数组的最小值必然与某一个元素相邻且不满足递增条件。

## 斐波那契数列

- 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项。
  n<=39

```javascript
//时间复杂度为O(N)，空间复杂度为O(1)
function Fibonacci(n) {
    if(n <= 1) {
        return n;
    }else {
        var first = 0, second = 1, third = 0;
        for(var i=2; i<=n; i++) {
        third = first + second;
        first = second;
        second = third;
        }
        return third;
    }
}
```

> 思路讲解：
> 由于斐波纳挈数列是以兔子的繁殖引入的，因此也叫“兔子数列”。它指的是这样一个数列：0,1,1,2,3,5,8,13……从这组数可以很明显看出这样一个规律：从第三个数开始，后边一个数一定是在其之前两个数的和。在数学上，斐波纳挈数列可以以这样的公式表示：F(0) = 0；F(1) = 1 ；F(n) = F(n-1) + F(n-2),(n>=2)。本题目在求解的时候尽可能避免使用递归，因为递归空间复杂度呈指数级增长。

## 跳台阶

- 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

```javascript
function jumpFloor(number)
{
    if(number <= 1) {
        return number;
    }else if(number == 2) {
        return 2;
    }else {
        var result = 0;
        var first = 1;
        var second = 2;
        for(var i=3; i<=number; i++) {
            result = first + second;
            first = second;
            second = result;
        }
        return result;
    }
}
```

> 思路讲解:
> 比较倾向于找规律的解法，f(1) = 1, f(2) = 2, f(3) = 3, f(4) = 5， 可以总结出f(n) = f(n-1) + f(n-2)的规律，但是为什么会出现这样的规律呢？假设现在6个台阶，我们可以从第5跳一步到6，这样的话有多少种方案跳到5就有多少种方案跳到6，另外我们也可以从4跳两步跳到6，跳到4有多少种方案的话，就有多少种方案跳到6，其他的不能从3跳到6什么的啦，所以最后就是f(6) = f(5) + f(4)；这样子也很好理解变态跳台阶的问题了。

## 变态跳台阶

- 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

```javascript
function jumpFloorII(number)
{
    if(number <= 1) {
        return number;
    }else {
        return 2 * jumpFloorII(number-1);
    }
}

//或者可以用一句代码是实现：

function jumpFloorII(number)
{
    return 1<<(--number);
}
```

> 思路讲解：
> 因为n级台阶，第一步有n种跳法：跳1级、跳2级、到跳n级
> 跳1级，剩下n-1级，则剩下跳法是f(n-1)
> 跳2级，剩下n-2级，则剩下跳法是f(n-2)
> 所以f(n)=f(n-1)+f(n-2)+…+f(1)
> 因为f(n-1)=f(n-2)+f(n-3)+…+f(1)
> 所以f(n)=2*f(n-1)

## 矩形覆盖

- 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

```javascript
function rectCover(number)
{
    if(number < 1) {
        return number;
    }else if(number==1 || number == 2){
        return number;
    }else {
        return rectCover(number-1) + rectCover(number-2);
    }
}
```

> 思路讲解：
> 依旧是斐波那契数列
> 2*n的大矩形，和n个2*1的小矩形
> 其中target*2为大矩阵的大小
> 有以下几种情形：
> 1⃣️target <= 0 大矩形为<= 2*0,直接return 1；
> 2⃣️target = 1大矩形为2*1，只有一种摆放方法，return1；
> 3⃣️target = 2 大矩形为2*2，有两种摆放方法，return2；
> 4⃣️target = n 分为两步考虑：
> 第一次摆放一块 2*1 的小矩阵，则摆放方法总共为f(target - 1)
>
> 1	2	3	4	…
> √				
> √				
> 第一次摆放一块1*2的小矩阵，则摆放方法总共为f(target-2)
> 因为，摆放了一块1*2的小矩阵（用√√表示），对应下方的1*2（用××表示）摆放方法就确定了，所以为f(targte-2)
>
> 1	2	3	4	…
> √	√			
> ×	×			

## 二进制中1的个数

- 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

```javascript
function NumberOf1(n)
{
    var count = 0;
    while(n) {
        ++count;
        n = (n-1) & n;
    }
    return count;
}
```

> 思路讲解：
> 如果一个整数不为0，那么这个整数至少有一位是1。如果我们把这个整数减1，那么原来处在整数最右边的1就会变为0，原来在1后面的所有的0都会变成1(如果最右边的1后面还有0的话)。其余所有位将不会受到影响。
> 举例：
> 一个二进制数1100，从右边数起第三位是处于最右边的一个1。减去1后，第三位变成0，它后面的两位0变成了1，而前面的1保持不变，因此得到的结果是1011.我们发现减1的结果是把最右边的一个1开始的所有位都取反了。这个时候如果我们再把原来的整数和减去1之后的结果做与运算，从原来整数最右边一个1那一位开始所有位都会变成0。如1100&1011=1000.
> 也就是说，把一个整数减去1，再和原整数做与运算，会把该整数最右边一个1变成0.那么一个整数的二进制有多少个1，就可以进行多少次这样的操作。

- 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

```javascript
function Power(base, exponent)
{
    if(exponent < 0) {
        if(base < 0) {
            throw new Error("分母不能小于等于零");
        }else {
            return 1/Power(base, -exponent);
        }
    }else if(exponent ==0) {
        return 1;
    }else {
        return Power(base, exponent-1) * base;
    }
}
```

> **思路讲解**：
> 1、分类讨论的思想；
> 2、基本数据类型取值范围。

## 调整数组顺序使得奇数位于偶数前面

- 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

```javascript
function reOrderArray(array)
{
    var oddArr = [];
    var evenArr = [];
    array.forEach(function(item, index, array) {
        if(item % 2 == 0) {
            evenArr.push(item);
        }else {
            oddArr.push(item);
        }
    });
    return oddArr.concat(evenArr);
}

// 时间复杂度为O(n）
```

## 链表中倒数第K个节点

- 输入一个链表，输出该链表中倒数第k个结点。

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k)
{
    if(head == null || k <= 0) {
        return false;
    }
    var p1 = head;
    var p2 = head;

    //先将p1指针后移K-1位
    for(var i=1; i<k; i++) {
        if(p1.next != null) {
            p1 = p1.next;
        }else {
            return false;
        }
    }

    //两个同时移动，当p1到链表结尾处时，p2指向的就是链表的倒数第K个位置
    while(p1.next) {
        p1 = p1.next;
        p2 = p2.next;
    }
        return p2;
}
```

> **思路讲解**：
> 两个指针，先让第一个指针和第二个指针都指向头结点，然后再让第一个指正走(k-1)步，到达第k个节点。然后两个指针同时往后移动，当第一个指针到达末尾的时候，第二个指针所在位置就是倒数第k个节点了。

## 反转链表

- 输入一个链表，反转链表后，输出链表的所有元素。

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    if(pHead == null) {
        return false;
    }
    var p1 = pHead;
    var p2 = null, temp = null;
    while(p1) {
        temp = p1.next;
        p1.next = p2;
        p2 = p1;
        p1 = temp;
    }
    return p2;
}
```

## 合并两个排序的链表

- 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2)
{
    if(pHead1 == null) {
        return pHead2;
    }else if(pHead2 == null) {
        return pHead1;
    }
    var result = {};
    if(pHead1.val < pHead2.val) {
        result = pHead1;
        result.next = Merge(pHead1.next, pHead2);
    }else {
        result = pHead2;
        result.next = Merge(pHead1, pHead2.next);
    }
    return result;
}
```

> **思路讲解**：
> 用递归思想，依次将两个链表的每个元素递归对比后实现，注意此题考查代码的鲁棒性，故判断条件不能少！



