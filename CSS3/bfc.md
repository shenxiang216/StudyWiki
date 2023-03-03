## ● 什么是BFC

BFC也就是常说的块格式化上下文，这是一个独立的渲染区域，规定了内部如何布局，并且这个区域的子元素不会影响到外面的元素，其中比较重要的布局规则有内部box垂直放置，计算BFC的高度的时候，浮动元素也参与计算，触发BFC的规则有根元素，浮动元素，position为absolute或fixed的元素，display为inline-block，table-cell，table-caption，flex，inline-flex，overflow不为visible的元素