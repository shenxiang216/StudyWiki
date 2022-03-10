---
title: nginx代理后刷新显示404
date: 
tags:
categories: bug解决
---

<meta name="referrer" content="no-referrer"/>



## 一、现象

通过首页进入访问页面正常，刷新之后出404页面

## 二、原因

原因是因为web单页面开发模式，只有一个index.html入口，其他路径是前端路由去跳转的，nginx没有对应这个路径，当然就是404了。

## 三、解决方案

```awk
location / {
    root   /usr/nginx/app/dist/;
    index  index.html;
    try_files  $uri $uri/ /index.html;
}
```

## 四、总结

在配置中加上try_files，意思跟翻译差不多，“尝试读取文件”。u r i 这 个 是 n g i n x 的 一 个 变 量 ， 存 放 着 用 户 访 问 的 地 址 , 例 如 h t t p : / / l o c a l h o s t : 8200 / c h o o s e S i z e 那 么 uri 这个是nginx的一个变量，存放着用户访问的地址,例如[http://localhost](https://link.segmentfault.com/?enc=8%2B7%2BdzCL22qSCxPI%2FparEQ%3D%3D.RH4FysOQoKYlW0entouxAdswJquO%2BV3R2ew5Cxdf0S8%3D):8200/chooseSize 那么uri这个是nginx的一个变量，存放着用户访问的地址,例如[http://localhost](https://link.segmentfault.com/?enc=j5MtiLwAdsQsOWZzqzMIjA%3D%3D.GZjk1Ef3nliSmhFjSjdtBW2PXHvCFitG4qKoWopafwc%3D):8200/chooseSize那么uri就是/chooseSize；u r i / 代 表 访 问 的 是 一 个 目 录 例 如 h t t p : / / l o c a l h o s t : 8200 / c h o o s e S i z e / 那 么 uri/ 代表访问的是一个目录 例如[http://localhost](https://link.segmentfault.com/?enc=hgkza7Aj3DpAZH2%2FKeQ9Uw%3D%3D.ROFbM%2F8xtnPYGRASpkTNBMWmD5vauOrO2oK6dUctyT0%3D):8200/chooseSize/ 那么uri/代表访问的是一个目录例如[http://localhost](https://link.segmentfault.com/?enc=fskbfyx5QK8yQ9JcpUBTAA%3D%3D.NdoYQOh2ISKqISGyOLimEYnNRxPQ2lewzvauYUIiyQk%3D):8200/chooseSize/那么uri/就是/chooseSize/；最后/index.html就是我们首页的地址。
最终上面的意思是如果第一个存在，直接返回；不存在的话读取第二个，如果存在，读取返回；如果还是不存在，就会fall back到 try_files 的最后一个选项 /index.html,发起一个内部 “子请求”，也就是相当于 nginx 发起一个 HTTP 请求[http://localhost](https://link.segmentfault.com/?enc=hF4iUdOIWdxnhFwYUszNeg%3D%3D.bLzWSEspL%2BS4PX7W78xayENe%2F%2BFBkpZ8Ix81%2Fyjcp3o%3D):8200/index.html，再通过前端路由到/chooseSize