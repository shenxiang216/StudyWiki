# 项目难点

## lightjob

* 长列表分页，节流
* 长列表渲染
* 筛选功能
* 项目部署：环境搭建，nginx pm2 node ssl 域名

## lightTools

* load处理markdown

## lightPass

* 线上问题排查---日志，

## lightOrder



全局安装：`npm install -g treer`

使用示例：`treer -e ./result.txt -i node_modules`

> 遍历到result.txt文件，忽略node_modules
>
> **缺陷**:格式固定,参数顺序前后顺序不可随意调换，不能选择目录层级


https://www.npmjs.com/package/treer


* [ES6 入门教程](https://es6.ruanyifeng.com/)
* [Koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)
* [JavaScript语言精粹](https://kingyinliang.github.io/PDF/JavaScript%E8%AF%AD%E8%A8%80%E7%B2%BE%E7%B2%B9.pdf)
* [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
* [深入浅出node.js](http://blog.songqingbo.cn/pdf/nodejs/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BANode.js.pdf)
* 

# 待完成项目

## 1、闪电速传web版  小程序版  app版

## 2、穿搭app版、小程序版

## 3、外卖券

## 4、点餐小程序



# 进度把控

| 项目/日期 | 前端视频 | 面试题 | 算法题 | 《浪潮之巅》 | 《天才在左，疯子在右》 | 《javascript高级程序设计》每天p22 | 教资视频、题目 | 课程预习、刷题 | 饮文项目 | 六级单词、听力、真题 |
| --------- | -------- | ------ | ------ | ------------ | ---------------------- | --------------------------------- | -------------- | -------------- | -------- | -------------------- |
| 8.30      |          |        |        | 完成         | 20                     | 251-278                           |                |                |          |                      |
| 8.31      | 完成     |        |        |              | 181                    | 307                               |                |                |          |                      |
| 9.1       | 完成     |        |        | 4            | 200                    | 326                               |                |                |          |                      |
| 9.17      | 完成     |        |        |              | ✅完结                  | 400                               |                |                |          |                      |
| 9.22      | ❌        | ✅      | ✅      | ✅45          |                        | ✅451                              | ✅              | ✅              | ❌        | ❌                    |
| 9.24      |          |        |        | ✅57          |                        | ✅496                              |                | ✅              |          |                      |
| 9.25      |          |        |        | ✅            |                        | ✅510                              | ✅              |                |          |                      |
| 9.26      |          |        |        | ✅71          |                        | ✅564                              | ✅              | ✅              |          |                      |
| 9.27      |          |        |        |              |                        | ✅594                              |                | ✅              |          | 、                   |
| 10.1      |          |        |        |              |                        | ✅634                              |                |                |          |                      |
| 10.2      |          |        |        |              |                        | ✅681                              | ✅              |                |          |                      |
| 10.3      |          | ✅      | ✅      |              |                        | ✅714                              | ✅              |                |          | ✅                    |
| 10.7      |          |        |        |              |                        | ✅862                              | ✅              |                |          | ✅                    |
| 10.8      |          |        |        |              |                        |                                   | ✅              |                |          |                      |



# 删除console

[^]*console.log[^]*

```
<script>//禁用右键（防止右键查看源代码） 
    window.oncontextmenu = function () {
      return false;
    }
    // //禁止任何键盘敲击事件（防止F12和shift+ctrl+i调起开发者工具） 
    // window.onkeydown = window.onkeyup = window.onkeypress = function () {
    //     window.event.returnValue = false;
    //     return false;
    // }
    window.onkeydown = window.onkeyup = window.onkeypress = function(event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        //判断是否为F12
        if (e && e.keyCode == 123) {
          e.returnValue = false;
          return false;
        }
        //判断shift、ctrl、i同时按下(调用控制台)
        if (e.ctrlKey && e.shiftKey && (e.keyCode == 105 || e.keyCode == 73)) {
          e.returnValue = false;
          return false;
        }
      }</script>
      
      // 破解
      javascript:(function() { function R(a){ona = "on"+a; if(window.addEventListener) window.addEventListener(a, function (e) { for(var n=e.originalTarget; n; n=n.parentNode) n[ona]=null; }, true); window[ona]=null; document[ona]=null; if(document.body) document.body[ona]=null; } R("contextmenu"); R("click"); R("mousedown"); R("mouseup"); R("selectstart");})()
```



**有效** 二叉搜索树定义如下：

- 节点的左子树只包含 **小于** 当前节点的数。
- 节点的右子树只包含 **大于** 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。
