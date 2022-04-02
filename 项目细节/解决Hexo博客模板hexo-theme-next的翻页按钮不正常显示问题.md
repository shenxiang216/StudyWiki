用Hexo搭了个Gitpage的博客，兴冲冲的发了11篇博文后发现翻页按钮不正常显示，显示为`<i class="fa fa-angle-right"></i>`的HTML编码。如下图：
![HTML编码](https://img-blog.csdnimg.cn/20200310154450109.png)
`<i class="fa fa-angle-right"></i>`这是个什么鬼？
这是一个Font Awesome的字体图标，按道理来说这个图标应该可以正常显示的，现在这个图标不能显示了显示成了html源码。
![Font Awesone图标](https://img-blog.csdnimg.cn/20200310154516827.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1bGxidWc=,size_16,color_FFFFFF,t_70)
**解决办法:**
最简单的办法就是将`<i class="fa fa-angle-right"></i>`这个不能正常显示的字体图标改成一般的字符，我这里就是改成正常的一般左右键字符“>”，“<”。
在 themes\hexo-theme-next\layout_partials 下找到hexo-theme-next的翻页组件，就是pagination.swig
将

```markup
{% if page.prev or page.next %}
  <nav class="pagination">
    {{
      paginator({
        prev_text: '<i class="fa fa-angle-left"></i>',
        next_text: '<i class="fa fa-angle-right"></i>',
        mid_size: 1
      })
    }}
  </nav>
{% endif %}
```

改成

```markup
{% if page.prev or page.next %}
  <nav class="pagination">
    {{
      paginator({
        prev_text: '<',
        next_text: '>',
        mid_size: 1
      })
    }}
  </nav>
{% endif %}
```

重新发布以后可以看到翻页按钮可以正常显示了
![正常显示箭头](https://img-blog.csdnimg.cn/20200310154621131.png)