## 为什么需要使用PM2

因为node.js 是单进程，进程被杀死后整个服务就跪了，所以需要进程管理工具，但是pm2 远远不止这些。

## 介绍

PM2 是一个带有负载均衡功能的 Node 应用的进程管理器。

当你要把你的独立代码利用全部的服务器上的所有 CPU，并保证进程永远都活着，0 秒的重载， PM2 是完美的。

### 特性

- 内建负载均衡（使用Node cluster 集群模块）
- 后台运行
- 0秒停机重载(维护升级的时候不需要停机).
- 具有Ubuntu和CentOS 的启动脚本
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供 HTTP API
- 远程控制和实时的接口API ( Nodejs 模块,允许和PM2进程管理器交互 )

## 安装

> 首先确保有node.js 的环境

```undefined
npm install -g pm2
```

## 运行

```bash
 pm2 start app.js --name my-api # 命名进程
```

### 其他运行方式：

```css
 pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目
 pm2 start app.js -i 3      # 启动3个进程
 pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
 pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
 pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
 pm2 stop serverone       # 停止 serverone 进程
 pm2 start app.json        # 启动进程, 在 app.json里设置选项
 pm2 start app.js -i max -- -a 23                   #在--之后给 app.js 传递参数
 pm2 start app.js -i max -e err.log -o out.log  # 启动 并 生成一个配置文件，你也可以执行用其他语言编写的app  ( fork 模式):
 pm2 start my-bash-script.sh    -x --interpreter bash
 pm2 start my-python-script.py -x --interpreter python

 
```

### npm 运行

```undefined
pm2 start npm -- start
```

动一个进程并把它命名为 test

```bash
pm2 start npm --name test -- start
```

## 使用

```php
 npm install pm2 -g     # 命令行安装 pm2 
 pm2 start app.js -i 4 #后台运行pm2，启动4个app.js 
                               # 也可以把'max' 参数传递给 start
                               # 正确的进程数目依赖于Cpu的核心数目
 pm2 start app.js --name my-api # 命名进程
 pm2 list               # 显示所有进程状态
 pm2 monit              # 监视所有进程
 pm2 logs               #  显示所有进程日志
 pm2 stop all           # 停止所有进程
 pm2 restart all        # 重启所有进程
 pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
 pm2 stop 0             # 停止指定的进程
 pm2 restart 0          # 重启指定的进程
 pm2 startup            # 产生 init 脚本 保持进程活着
 pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
 pm2 delete 0           # 杀死指定的进程
 pm2 delete all         # 杀死全部进程
```

## 参考

- [https://www.douban.com/note/314200231/](https://link.jianshu.com?t=https://www.douban.com/note/314200231/)
- [https://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script](https://link.jianshu.com?t=https://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script)