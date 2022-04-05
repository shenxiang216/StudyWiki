---
title: nginx代理后刷新显示404
date: 
tags:
categories: bug解决
---

<meta name="referrer" content="no-referrer"/>



我们在用nginx部署时候完项目会出现页面刷新会404，而页面上点击跳转（一般比如点击菜单）页面则不会404，为什么呢，因为你没在nginx配置上面加上重定向跳转。
 **先说解决办法，只需要加上这段配置：**
 `try_files $uri $uri/ /index.html;`
 这句配置的意思是每次匹配url路径时候**找不到对应静态资源时候**调制跳转到index.html文件

![img](https:////upload-images.jianshu.io/upload_images/24769903-894ab1d1bc1b2d10.png?imageMogr2/auto-orient/strip|imageView2/2/w/763/format/webp)

如图加在这里即可



> 下面内容需要稍微知道router路由工作原理、nginx原理

#### 解析为什么会这样（针对路由在history模式下）：

**先提出问题:**

> 1、为什么刷新页面会（没有配置情况下且不在首页根目录刷新）
>  2、为什么点击跳转时候会（有时）

**现在来解决问题：**
 1、假设现在在浏览器上的url为 172.1.2.3:7000/test ，此时刷新页面时候会去根据浏览器上的url去服务器（nginx）上面请求对应的静态资源，nginx根据location / 的匹配规则在dist文件夹里没有找到对应的静态文件"test"，所以返回404，合理。
 此时通过配置try_files来重定向返回index.html文件，也就是回去首页“  /  ”,`注意，此时你的页面已经刷新过了`，此时react-router或者vue-router路由发挥作用，会根据当前的url地址来对应匹配上组件，所以此时url即对应组件，页面重新加载完成，完事。
 2、第二个问题，为什么点击跳转时候会而有时候不会，要知道跳转有两种情况：一种页面刷新（属于第一个问题），一种页面不刷新。这取决于你代码的书写情况，请记住：

> 1、push不会刷新页面，只会更改浏览器上的url路由变更，不管是react-router还是vue-router都是运用html的api实现，叫做pushState()
>  2、通过<Link to='/test'> </Link>会刷新页面，它相当于a标签

![img](https:////upload-images.jianshu.io/upload_images/24769903-2a79bf5845ad33e3.png?imageMogr2/auto-orient/strip|imageView2/2/w/544/format/webp)

可自行在浏览器上面试下

所以当你点击跳转时候，有时候你代码用的是push（不刷新）、有时候用的是a标签、Link（刷新），才导致这个问题。

