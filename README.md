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

  <script>
    const decode = () => {
      let dom = document
        .getElementsByClassName("results-panel")[0]
        .getElementsByClassName("matching-post")
      if (!dom) return false
      for (let i = 0; i < dom.length; i++) {
        dom[i].getElementsByTagName("h2")[0].innerHTML = decodeURI(
          dom[i].getElementsByTagName("h2")[0].innerText
        )
      }
    }
    window.addEventListener("load", function () {
      let input = document
        .getElementsByClassName("input-wrap")[0]
        .getElementsByTagName("input")[0]
      input.onchange = function (e) {
        console.log("解码中...")
        decode()
      }
    })
  </script>
```

