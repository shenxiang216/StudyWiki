## 相同点

* 参数都是可以有一个或者两个

语法：substr(start, [length]) start参数必传，length参数不必传

substring(start, [end]) start 参数必传， end参数不必传

* 当两个函数的参数都只有一个时，两者的功能是相同的

## 不同点

* substr第二个参数传的是截取的字符串的长度

当length为0或者为负数时返回空字符串

* substring第二个参数传的是截取最后一个字符串的索引-返回从start位置开始（包含start）到end位置结束（不包含end）的子串

start或end为NaN或者为负数时，将其替换为0