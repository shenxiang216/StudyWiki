``` js
<script>
      function resize() {
        let doc = document.documentElement
        let width = doc.clientWidth
        let ratio = width / 375
        let fontSize = 16 * ratio
        if (fontSize > 20) fontSize = 20
        doc.style.fontSize = fontSize + 'px'
      }
      // 监听resize事件，调整窗口大小，感受rem的作用，这里只考虑竖屏的情况
      window.onresize = resize
      resize()
    </script>
```

