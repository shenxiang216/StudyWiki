## 个人知识库

> 首页暂时还没想好！

- 解决中文搜索结果的 title 未解码问题

```javascript
document.getElementsByClassName(
  "results-panel"
)[0].children[0].children[0].children[0].innerText = decodeURI(
  document.getElementsByClassName("results-panel")[0].children[0].children[0]
    .children[0].innerText
)
```

-
