## git教程

* ```
  * git init  #初始化仓库
  * git add . #把文件添加进这个仓库文件夹后，敲这个命令，意思是把文件添加进本地仓库
  * git commit -m "某次提交"  # 提交这个文件到本地版本管理库
  * git remote add origin git@github.com:shengxiang216/xxx.git  # 将本地仓库与远程仓库关联，如果已经关联，则无需敲这个命令
  * git push -u origin main #第一次推送时，加上-u
  ```

* `git config --global http.sslVerify "false"`

* 令牌:`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`

* 修改远程仓库地址

  ```
  1.直接修改
  git remote set-url origin url
  
  2.先删后加
  git remote rm origin
  git remote add origin git@github.com:shengxiang216/demo.git
   
  git remote set-url origin  https://<your_token>@github.com/<USERNAME>/<REPO>.git
   git remote set-url origin  https://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@github.com/shenxiang216/weihu.git
  git clone https://<TOKEN>@github.com/<user_name>/<repo_name>.git
  ```

* git强制覆盖本地

  ```
  git fetch --all
  git reset --hard origin/master
  git reset --hard origin/develop
  git pull origin master
  ```

* 通过`git init`命令把这个目录变成Git可以管理的仓库

* `git status`命令可以让我们时刻掌握仓库当前的状态

* `git diff`顾名思义就是查看difference

* `HEAD`指向的版本就是当前版本

* `git checkout -- file`可以丢弃工作区的修改

* ssh相关：由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：

  第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

  ```
  $ ssh-keygen -t rsa -C "youremail@example.com"
  ```

  

  

  你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

  如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

  第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：

  然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容：

  ![github-addkey-1](https://www.liaoxuefeng.com/files/attachments/919021379029408/0)

  点“Add Key”，你就应该看到已经添加的Key：

  ![github-addkey-2](https://www.liaoxuefeng.com/files/attachments/919021395420160/0)

  为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

  当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

  最后友情提示，在GitHub上免费托管的Git仓库，任何人都可以看到喔（但只有你自己才能改）。所以，不要把敏感信息放进去。

* 本地和远程关联：

 ```
 git remote add origin https://github.com/shenxiang216/university.git
 ```

* ` git push -u origin master`第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

* ```
  git push origin master
  ```

* ` git clone+地址 ` 克隆远程仓库

* ==Git支持多种协议，包括`https`，但`ssh`协议速度最快。==

* ` git checkout ` 切换分支 ` git checkout -b +分支名 ` 表示创建并切换

* `git branch 名字`创建分支`git beanch ` 查看当前分支  

* 删除分支：`git branch -d <name>`

* ### SSH警告

  当你第一次使用Git的`clone`或者`push`命令连接GitHub时，会得到一个警告：

  ```
  The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
  RSA key fingerprint is xx.xx.xx.xx.xx.
  Are you sure you want to continue connecting (yes/no)?
  ```

  这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入`yes`回车即可。

  Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：

  ```
  Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
  ```

  这个警告只会出现一次，后面的操作就不会有任何警告了。

* 搜索时筛选的例子：in：name spring boot stars：>3000

* Git迅速成为最流行的分布式版本控制系统

* 历史就是这么偶然，如果不是当年BitMover公司威胁Linux社区，可能现在我们就没有免费而超级好用的Git了。

* 集中式版本控制系统最大的毛病就是必须联网才能工作，如果在局域网内还好，带宽够大，速度够快，可如果在互联网上，遇到网速慢的话，可能提交一个10M的文件就需要5分钟，这还不得把人给憋死啊。

* ![廖雪峰官方](https://www.liaoxuefeng.com/files/attachments/918921540355872/l)

* ![廖雪峰官方](https://www.liaoxuefeng.com/files/attachments/918921562236160/l)

* 在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已。

* 除了免费的外，还有收费的集中式版本控制系统，比如IBM的ClearCase（以前是Rational公司的，被IBM收购了），特点是安装比Windows还大，运行比蜗牛还慢，能用ClearCase的一般是世界500强，他们有个共同的特点是财大气粗，或者人傻钱多。

## git一些报错及解决方案

#### 0.

> 遇到报错先去翻译英文的报错，抓住错误关键词，明白是在哪个环节出错了（add文件到仓库？commit到本地版本库？push到远程仓库？连接远程仓库是否成功？）。然后尝试用google搜索报错内容的解决方案



> 请特别注意第4条，先pull后push！！！

#### 1.

```
You have not concluded your merge (MERGE_HEAD exists).
Please, commit your changes before you can merge.
```

> 错误可能是因为在你以前pull下来的代码没有自动合并导致的。

 ```
  解决方法：
  
  保留你本地的修改
  
  git merge --abort
  
  git reset --merge
  
  合并后记得一定要提交这个本地的合并
  
  然后在获取线上仓库
  
  git pull
 ```

#### 2.

  ```
  ! [rejected]        master -> master (fetch first)
  ```

> 原因分析：没有同步远程的master

 ```
  git pull origin master
 ```

#### 3.

  ```
  error: src refspec master does not match any
  ```

> 引起该错误的原因是，目录中没有文件，空目录是不能提交上去的

 ```
  解决方法
  touch README
  git add README
  git commit -m 'first commit'
  git push origin maste
 ```
#### 4.
```
git push 错误 `error: failed to push some refs to 'git@github.com:charblus/ ...'`
```
> 本地和远程的文件应该合并后才能上传本地的新文件
```
> 解决办法1： 先拉(pull)后推(push)
> 解决办法2： 导致这种报错2是因为没有git add 就去提交空，一般因为这个出现这个问题，此报错上还有一行: `error: src refspec master does not match any.`
```

#### 5.

```
git pull 错误 fatal: refusing to merge unrelated histories
```

```
后面加上 --allow-unrelated-histories ， 把两段不相干的 分支进行强行合并

git add . && git commit -m "***" && git push origin master
```

#### 6.

```
git branch 错误 fatal: Not a valid object name: 'master'.
```

```
git项目下没有任何文件可以commit，或没有新项目没有一次commit ,是不能创建分支的；只有先commit之后才会真正建立master分支，此时才可以建立其它分支。

由于刚创建的git仓库默认的master分支要在第一次有效的commit之后（可以先不push）才会真正建立，否则就像你声明了个对象但没初始化一样。
```

#### 7.

[[遇到过的github报错和解决方法](https://segmentfault.com/a/1190000016593573)](https://segmentfault.com/a/1190000016593573)

```
如果输入$ git remote add origin （github账号名）/gitdemo（项目名）.git
提示出错信息：fatal: remote origin already exists.
解决办法如下：
1、先输入$ git remote rm origin
2、再输入$ git remote add origin（github账号名）/gitdemo（项目名）.git
3、如果输入$ git remote rm origin还是报错的话，
error: Could not remove config section 'remote.origin'.
需要修改gitconfig文件的内容
4、找到你的github的安装路径
5、找到一个名为gitconfig的文件，找到[remote "origin"]那一行删掉。
```
```
如果输入$ ssh -T git@github.com
出现错误提示：Permission denied (publickey).因为新生成的key不能加入ssh就会导致连接不上github。
解决办法如下：
1、先输入$ ssh-agent，再输入$ ssh-add ~/.ssh/id_key。
2、如果还是不行的话，输入ssh-add ~/.ssh/id_key命令后出现报错
Could not open a connection to your authentication agent.
解决方法是key用GitGui的ssh工具生成，这样生成的时候key就直接保存在ssh中了，不需要再ssh-add命令加入了，其它的user，token等配置都用命令行来做。
3、最好检查一下在你复制id_rsa.pub文件的内容时有没有产生多余的空格或空行，有些编辑器会帮你添加这些的。
```
```
如果输入$ git push origin master
提示出错信息：error:failed to push som refs to .......
解决办法法如下：
1、先输入$ git pull origin master //先把远程服务器github上面的文件拉下来
2、再输入$ git push origin master
3、如果出现报错fatal: Couldn't find remote ref master或者
fatal: 'origin' does not appear to be a git repository以及
fatal:Could not read from remote repository.
4、则需要重新输入$ git remote add （github账号名）/gitdemo（项目名）.git
```
```
使用git在本地创建一个项目的过程
$ makdir ~/hello-world //创建一个项目hello-world
$ cd ~/hello-world //打开这个项目
$ git init //初始化
$ touch README
$ git add README / /更新README文件
$ git commit -m 'first commit' //提交更新，并注释信息「first commit」
$ git remote add origin git@github.com:defnngj/hello-world.git //连接远程github项目
$ git push -u origin master //将本地项目更新到github项目上去
```

#### 8.

```
Changes not staged for commit
```

[git commit常见报错及其解决方案](https://www.jianshu.com/p/d05f71ad0398)

#### 9.

```
fatal: Authentication failed for
```

[git操作及fatal: Authentication failed for错误解决](https://www.huaweicloud.com/articles/ff2fe37466f772ec5abfbe30c0dd6709.html)

#### 10.

```
error: Your local changes to the following files would be overwritten by merge:


    意思是我台式机上新修改的代码的文件，将会被git服务器上的代码覆盖；我当然不想刚刚写的代码被覆盖掉，看了git的手册，发现可以这样解决：


    方法1：如果你想保留刚才本地修改的代码，并把git服务器上的代码pull到本地（本地刚才修改的代码将会被暂时封存起来）

git stash
git pull origin master
git stash pop


如此一来，服务器上的代码更新到了本地，而且你本地修改的代码也没有被覆盖，之后使用add，commit，push 命令即可更新本地代码到服务器了。


方法2、如果你想完全地覆盖本地的代码，只保留服务器端代码，则直接回退到上一个版本，再进行pull：

git reset --hard
git pull origin master


注：其中origin master表示git的主分支。
```

#### 11.

在使用Git的过程中，有些时候我们只想要git服务器中的最新版本的项目，对于本地的项目中修改不做任何理会，就需要用到Git pull的强制覆盖，具体代码如下：

```
$ git fetch --all
$ git reset --hard origin/master 
$ git pull123
```

Git pull的强制覆盖本地文件在自动化部署项目中很有作用，比如用SaltStack部署web项目，强制覆盖可以保持与服务器内容一致。

上面的操作有点复杂，直接用git checkout 就ok了

## 12.

问题引入
git push -u origin main 总是交替循环报错，尤其是从2021年8月13日以来GitHub不允许使用SSL快捷登录只准用token。下面两条err往往出现了一个按照网上的方法解决又出现另一个：
fatal: unable to access ‘https://github.com/AvailableForTheWorld/dnmt-nextjs.git/’: OpenSSL SSL_read: Connection was reset, errno 10054
fatal: unable to access ‘https://github.com/AvailableForTheWorld/dnmt-nextjs.git/’: Failed to connect to github.com port 443: Timed out

问题原因
代理（科学上网）和git总是不兼容，如果你选择登录github免不了科学上网，然后git push 又总是出现上述问题

解决方案
先在命令行输入一下两条命令：
git config --global --unset http.proxy
git config --global --unset https.proxy
上述两条命令如果你执行了成功git push了，那就恭喜你不需要后面的操作了，反正我按照上述两行命令执行仍然报错，客官请往下看:

重启电脑

我认为我电脑中第1个解决方案起作用的机理在于重启电脑后生效，所以这一步很关键

启动代理软件

这里你会有一个疑问，为什么还要打开代理，原因是git在国内没服务器，不开代理我仍然链接不上，打开后重新git push 一下，你发现，它ok了！！！







