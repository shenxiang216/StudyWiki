`vue hash`模式下，`URL`中存在`'#'`，用`'history'`模式就能解决这个问题。但是`history`模式会出现刷新页面后，页面出现404。解决的办法是用`nginx`配置一下。
在`nginx`的配置文件中修改

**方法一：**

```awk
location /{
    root   /data/nginx/html;
    index  index.html index.htm;
    if (!-e $request_filename) {
        rewrite ^/(.*) /index.html last;
        break;
    }
}
```

**方法二：**
vue.js官方教程里提到的[https://router.vuejs.org/zh/g...](https://link.segmentfault.com/?enc=x0MBWHA6ca3HH8PdS652VA%3D%3D.4%2FcbrGVsKVcxFdCg%2BuQnGx3LchMlRrbe2dpBLQYfRxdEwjQyllF%2Bpd3AGWIln7I8JYS0mGmkBIpPZVR4i1sj6A%3D%3D)

```nginx
  server {
        listen       8081;#默认端口是80，如果端口没被占用可以不用修改
        server_name  myapp.com;
        root        D:/vue/my_app/dist;#vue项目的打包后的dist
        location / {
            try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
            index  index.html index.htm;
        }
        #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
        #因此需要rewrite到index.html中，然后交给路由在处理请求资源
        location @router {
            rewrite ^.*$ /index.html last;
        }
        #.......其他部分省略
  }
```