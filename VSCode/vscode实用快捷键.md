## 1. 批量选中全局匹配项

快捷键：

> Mac : `⌘ command` + `⇧ shift` + `L`
> Windows : `⇧ shift` + `⌃ ctrl` + `L`

鼠标点击变量，然后按快捷键，即可同时编辑多处

1.00

![img](https://pic3.zhimg.com/v2-70c39376e3e7baeb00ad654eaacef3fe_b.jpg)

## 2. 重命名变量

快捷键：`F2`

鼠标点击声明过的变量，然后按`F2`，即可重构变量名，VScode 会自动分析该变量的引用，将用到的地方一起进行修改。

如果代码较多，这种方式比较保险，因为他会分析变量的使用，而上一种方式只是全局的搜素与替换。

![img](https://pic1.zhimg.com/v2-e16b1bf0eda3269cadc247ea9b4fd564_b.webp)

## 3. 批量选中局部匹配项

快捷键：

> Mac : `⌘ command` + `D`
> Windows : `⌃ ctrl` + `D`

鼠标点击变量，然后按快捷键会选中当前匹配项，继续每按一次快捷键，都会向下多选中一个相同匹配项。

![img](https://pic1.zhimg.com/v2-dc89ff56f7beb4f4bbdcf39efc362620_b.webp)

## 4. 多光标自定义批量编辑

1. 按住`⌥ alt`**，**用鼠标左键点击，可以出现多个光标：

![img](https://pic4.zhimg.com/v2-f109c89ef626dc698b9cc6911242c5ab_b.webp)

\2. 按住 `⌘ command` + `⌥ alt` (Windows 为 `⌃ ctrl` + `⌥ alt`)，再按键盘向上或者向下的键，可以使一列上出现多个光标：

![img](https://pic1.zhimg.com/v2-e487470da073857bc8d259474e1e1d64_b.jpg)

\3. 选中一段文字，按`⇧ shift` + `⌥ alt` + `I`，可以在每行末尾出现光标：

![img](https://pic2.zhimg.com/v2-ac7e9e3a32330264a67d7f86082df9ad_b.webp)

\4. 先点击某一位置，按住 `⇧ shift` + `⌥ alt`，再使用鼠标拖动，也可以出现竖直的列光标，可以同时选中多列：

![img](https://pic4.zhimg.com/v2-ab30d62db3fc8dbf879ece0c1a1b9033_b.webp)

## 5. 取消光标操作

抬起快捷键，单击未被选中的位置即可。

或使用 `⌘ command` + `U` (Windows 为 `⌃ ctrl` + `U`) 取消光标操作。

## 参考

[VisualStudio Code怎么同时编辑多处?vscode同时编辑多处的三种方法](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/tengrl/p/11413921.html)

[VS Code局部批量选中操作 - 月球漫步者 - 博客园](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/moonwalker-hank/p/13460929.html)