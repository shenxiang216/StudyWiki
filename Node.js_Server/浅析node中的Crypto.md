### 浅析node.JS中的Crypto模块

> 包括hash算法，HMAC算法，加密算法知识，SSL协议

#### hash算法

```js
1.创建hash实例
通过crypto.createHash()函数,，创建一个hash实例，但是需要调用md5，sha1，sha256，sha512算法来实现实例的创建。
const hash = crypto.createHash('md5')
MD5是最常用的，但是他有一定的碰撞的问题，也可以使用更新的sha1算法
2.加密数据
通过hash.update('需要加密的字符串')函数，实现加密
hash.update('需要加密的字符串')
注意：hash.update()方法是有记忆功能的，实际就是将字符串相加
3.获取hash对象
可以通过hash.digest()函数实现字符串加密返回
hash.digest()
直接运行 hash.digest(); 出现了乱码，因为它默认返回的是2进制的数据
hash.digest('hex')//以16进制的形式显示出来
md5.digest();这个方法被调用了，hash 对象就被清空了,是不能被重用的

```

```js
const crypto = require('crypto');
const hash = crypto.createHash('md5');

hash.update('HEllo World');
hash.update('hhhhhhh');//hash.update()方法是有记忆功能

console.log(hash.digest('hex'));
```

#### HMAC算法

> 翻译之后的就是"哈希运算消息认证码"

* 利用哈希算法，以一个密钥和一个消息为输入，生成一个加密串作为输出

* HMAC可以有效防止一些类似md5的彩虹表等攻击，比如一些常见的密码直接MD5存入数据库的，可能被反向破解

* ```
  crypto.createHmac(algorithm, key)
  //这个方法返回和createHash一样，返回一个HMAC的实例，有update和digest方法
  ```

* 但是这个key怎么获取呢？这个要说一下SSL，**利用openssl命令来创建一个key.pem**，这个key.pem就是key，就是这个秘钥,这样我们就生成了一个秘钥key.pem

* ```js
  var crypto = require('crypto')
  var fs = require('fs')
  
  var pem = fs.readFileSync('key.pem')//读取了key.pem密钥
  var key = pem.toString('ascii')//将它转为ascii码
  
  var hmac = crypto.createHmac('sha1', key)//获得HMAC实例
  
  hmac.update('foo')
  hmac.digest('hex')//生成一串密钥字符串
  //输出：
  '7b058f2f33ca28da3ff3c6506c978825718c7d42'
  
  ```

* 由于key的不同，所以同样的字符串经过hmac加密后生成的16进制字符串也是不同的，从而更加保障了数据的安全性

####　加密算法知识

* 加密算法：

  * 加密算法很容易理解，就是把明文变成人家看不懂的东西，然后送给自己想要的送到的地方，接收方用配套的解密算法又把密文解开成明文，这样就不怕密文给人家截获而泄密

* 加密算法的种类

  * 大致分为2类，一种是基于key的，一种不是基于key的。 不基于key的算法就是消息双方都通过一定的加密和解密算法来进行通信，这种算法缺点很明显如果加密算法被破解了就泄露了

* 基于key的加密算法

  * key是一个什么东西呢？随便你，可以是一个随机产生的数字，或者一个单词，啥都行，只要你用的算法认为你选来做key的东西合法就行。所以基于key的加密算法又分为2类：对称加密和不对称加密。对称加密算法的原理很容易理解，通信一方用KEK加密明文，另一方收到之后用同样的KEY来解密就可以得到明文。

* 不对称加密算法

  * 不对称加密指双方用不同的KEY加密和解密明文，通信双方都要有自己的公共密钥和私有密钥。
  * 举个例子比较容易理解：
  * 我们们假设通信双方分别是A,B. A,拥有KEY_A1,KEY_A2,其中KEY_A1是A的私有密钥，KEY_A2是A的公共密钥。 B,拥有KEY_B1,KEY_B2,其中KEY_B1是B的私有密钥，KEY_B2是B的公共密钥。公共密钥和私有密钥的特点是，经过其中任何一把加密过的明文，只能用另外一把才能够解开。也就是说**经过KEY_A1加密过的明文，只有KEY_A2才能够解密**，反之亦然。

* 不对称加密算法通信过程：

  * 公共密钥互换:

    ```markdown
    A-------->;KEY_A2------------>B
    
    A<--------KEY_B2<------------B
    //这个过程叫做公共密钥交换，老外管这叫keyexchange
    ```

  * 公共密钥解密：之后A和B就分别用对方的公共密钥解密，用自己的私有密钥加密。 一般公共密钥是要发布出去的，这就是SSL使用的验证机制（注意不是数据传输机制）。
  * 常用的不对称加密一般有RSA,DSA,DH等。我们一般使用RSA。

####　SSL协议

* SSL简介：

  * SSL(SecureSocketLayer)是netscape公司提出的主要用于web的安全通信标准
  * TLS(TransportLayerSecurity)是IETF的TLS工作组在SSL3.0基础之上提出的安全通信标准
  * SSL/TLS提供的安全机制可以保证应用层数据在互联网络传输不被监听,伪造和窜改。
  * 一般情况下的网络协议应用中，数据在机器中经过简单的由上到下的几次包装，就进入网络，如果这些包被截获的话，那么可以很容易的根据网络协议得到里面的数据.由网络监听工具可以很容易的做到这一点。
  * SSL就是为了加密这些数据而产生的协议，可以这么理解，它是位与应用层和 TCP/IP之间的一层，数据经过它流出的时候被加密，再往TCP/IP送，而数据从TCP/IP流入之后先进入它这一层被解密，同时它也能够验证网络连接两端的身份（根据我们之前学习的不对称加密算法知识可知）。
  * SSL协议包含2个子协议，一个是包协议，一个是握手协议。包协议位于握手协议更下一层。SSL握手过程说简单点就是：通信双方通过不对称加密算法来协商好一个对称加密算法以及使用的key，然后用这个算法加密以后所有的数据完成应用层协议的数据交换

* SSL通信流程

  > 握手一般都是由client发起的，SSL也不例外

  * 1、client送给server它自己本身使用的ssl的version(ssl一共有三个version)，加密算法的一些配置，和一些随机产生的数据，以及其他在SSL协议中需要用到的信息。

  * 2、server送给client它自己的SSL的version，加密算法的配置，随机产生的数据，还会用自己的私有密钥加密SERVER-HELLO信息。Server还同时把自己的证书文件给送过去。同时有个可选的项目，就是server可以要求需要客户的certificate

  * 3、client就用server送过来的certificate来验证server的身份。如果server身份验证没通过，本次通信结束。通过证书验证之后，得到server的公共密钥，解开server送来的被其用私有密钥加密过的SERVER-HELLO信息，看看对头与否。如果不对，说明对方只有该server的公共密钥而没有私有密钥，必是假的。通信告吹。

  * 4、client使用到目前为止所有产生了的随机数据(sharedsecret)，client产生本次握手中的premastersecret(这个步骤是有可能有server的参与的，由他们使用的加密算法决定)，并且把这个用server的公共密钥加密，送回给server。如果server要求需要验证client,那么client也需要自己把自己的证书送过去，同时送一些自己签过名的数据过去。

    * RSA就是我们上一章说过的一种不对称加密算法。首先server把自己的RSA公共密钥送给client，client于是用这个key加密一个随机产生的值(这个随机产生的值就是sharedsecret)，再把结果送给server.

    5、Server验证完client的身份之后，然后用自己的私有密钥解密得到premastersecret然后双方利用这个premastersecret来共同协商，得到mastersecret. 

    6、双方用master一起产生真正的sessionkey,着就是他们在剩下的过程中的对称加密的key了。这个key还可以用来验证数据完整性。双方再交换结束信息。握手结束。

> [参考链接](https://www.cnblogs.com/chengxs/p/8313598.html)
>
> 未完待续！

