> 从互联网诞生之初起，无时无刻不存在网络攻击，其中XSS攻击和SQL注入攻击是网站应用攻击的最主要的两种手段，全球大约70%的网站应用攻击都来自XSS攻击和SQL注入攻击。此外，常用的网站应用攻击还包括CSRF、Session劫持等。

**1、 XSS攻击**
  XSS攻击即跨站点脚本攻击（Cross Site Script），指的是攻击者通过篡改网页，注入恶意的HTML脚本，在用户浏览网页时，控制用户浏览器进行恶意操作的一种攻击方式。
  常见的XSS攻击类型有两种，一种是反射型，攻击者诱使用户点击一个嵌入恶意脚本的链接，达到攻击目的。另一种XSS攻击是持久型XSS攻击，黑客提交含有恶意脚本的请求，保存在被攻击的web站点的数据库中，用户浏览网页时，恶意脚本被包含在正常的页面中，达到攻击的目的。XSS攻击经常使用在论坛，博客等应用中。攻击者可以偷取用户Cookie、密码等重要数据，进而伪造交易、盗取用户财产、窃取情报。
  反射型攻击流程（如下图）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210405203323238.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMTgzOTk3,size_16,color_FFFFFF,t_70#pic_center)
  （1） 攻击者在微博中发布含有恶意脚本的URL（weibo.com/pub/dd20src=//www.xiaohui.cn/image/type/tt.js，该脚本其实是存在攻击者的服务器中，URL包含脚本链接）。
  （2） 其他用户点击该URL，则会加载恶意脚本。
  （3） 接下来脚本会进行恶意操作，进而达到攻击目的。
持久型攻击流程（如下图）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210405203807541.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMTgzOTk3,size_16,color_FFFFFF,t_70#pic_center)
  （1） 攻击者发送含有恶意脚本的请求。
  （2） 恶意脚本保存在被攻击的服务器中。
  （3） 用户浏览服务器页面，浏览器解析页面，恶意脚本被执行，达到攻击目的。
  **对应的防御策略有：**
  （1） 消毒
  XSS攻击者一般都是在通过请求中嵌入恶意脚本达到攻击的目的，这些脚本是一般用户输入中不使用的，如果进行过滤和消毒处理，即对某些html危险字符转义，如“>”转义为“&gt”、“<”转义为“&lt”等等。消毒几乎是所有网站最必备的XSS防攻击手段了。对于不可信的输入可以采用 apache.commons.lang3.StringEscapeUtils中的escapeHtml4方法对输入字符串进行过滤，也可以自定义过滤工具类进行过滤。

```java
public String[] getParameterValues(String name) {
    
	String[] values = super.getParameterValues(name);
    	if (values != null) {
    
		int length = values.length;
       	String[] escapseValues = new String[length];
        for (int i = 0; i < length; i++) {
    
            escapseValues[i] = 	StringEscapeUtils.escapeHtml4(values[i]);
        }
		return escapseValues;
   	}
	return values;
}
```

  （2） HttpOnly
  如果cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击，窃取cookie内容，这样就增加了cookie的安全性，即便是这样，也不要将重要信息存入cookie。

**2、 SQL注入攻击**
  SQL注入攻击指的是攻击者在HTTP请求中注入恶意SQL命令，服务器用请求参数构造数据库SQL命令时，恶意SQL被一起构造，并在数据库中执行（如下图）。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210405203929230.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMTgzOTk3,size_16,color_FFFFFF,t_70#pic_center)
  SQL注入攻击，需要攻击者对数据库表有所了解才行，攻击者获取数据库表架构信息的手段有以下几种：
  （1） 开源。如果网站采用开源软件搭建，网站的数据库就是公开的，攻击者可以直接获得。
  （2） 错误回显。如果网站开启错误回显，服务器内部的500错误会显示在浏览器上，攻击者可以大概的猜测到数据库表结构。
  （3） 盲注。也就是猜测数据库表结构，这种攻击难度较大。
  **对应的防御策略有：**
  （1） 消毒。
  请求参数消毒是一种比较简单粗暴又有效的手段。通过正则匹配，过滤请求参数中可能存在的注入SQL，如“drop table”，“update/delete”等。
  （2） 参数绑定
  通过预编译手段，绑定参数是最好的防SQL注入方法。值得高兴的是，目前许多数据访问层框架，都实现了SQL预编译和参数绑定，包括mybatis、Hibernate等等。恶意攻击的SQL会被当做SQL的参数，而不是SQL命令被执行。



**3、 CSRF攻击**
  CSRF（Cross Site Request Forgery，跨站点请求伪造），攻击者通过跨站请求，以合法的用户身份进行非法操作，如转账交易、发表评论等。其核心是利用了浏览器Cookie或服务器的Session策略，盗取用户身份（如下图）。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210405204011476.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMTgzOTk3,size_16,color_FFFFFF,t_70#pic_center)
  （1） 用户登录受信任的服务器。
  （2） 用户访问攻击者的服务器。
  （3） 响应消息中保护访问受信任服务器的请求。
  （4） 在用户不知情的情况下，执行来自攻击者的请求。
  **对应的防御策略有：**
  （1） 表单token。在页面表单中增加一个随机数作为token，每次响应页面的token都不同，从正常页面提交的参数会包含token值，而攻击者伪造的请求是无法获得该值的。提交到服务器的时候，服务器检查该参数中token是否合法即可。
  （2） 验证码。即在提交请求时，需要用户输入验证码，以避免在用户不知道的时候被攻击者伪造请求。
  （3） Referer check。在HTTP的请求头的Referer域中记录着请求来源，可通过检查请求来源，判断其是否合法。

**4、 其他攻击和漏洞**
  （1） Error Code，也称作错误回显。即服务器端未处理的异常堆栈信息会直接输出到浏览器，给攻击者造成可乘之机。
  （2） HTML注释。后端的服务器页面（PHP、JSP）程序中使用HTML注释，这些html注释会显示在客户端的浏览器上。
  （3） 上传文件。一般的网站都会有上传文件的功能，如果上传的是可执行的程序，并通过该程序获得服务器端命令的执行能力，那么该程序就可以进行恶意操作。做有效的防疫手段是只允许上传可靠的文件类型。
  （4） 路径遍历。

**5、 Web应用防火墙**
  防火墙能够统一拦截请求，过滤恶意参数，自动消毒、添加token，并且能够根据最新攻击和漏洞情报，不断升级对策，处理掉大多数令人头痛的网站攻击。
  ModSecurity是一个开源的web应用防火墙，可探测攻击并保护web应用程序，即可嵌入到web应用服务器中，也可作为一个独立的应用程序启动。

**6、 网站安全漏洞扫描**
  网站漏洞扫描工具是根据内置规则，构造具有攻击性的URL请求，模拟黑客攻击行为，用以发现网站安全漏洞的工具。

**7、 信息加密技术及秘钥安全管理**
  常见的信息加密技术可分为三类：对称解密、非对称加密、单向散列加密。关于加密的秘钥的管理，秘钥管理得越安全隐蔽，加密的数据也就越安全。通常我们的秘钥会放置在项目的配置文件中，如果对秘钥的安全性要求非常高的话，可以把秘钥放置在单独的服务器，由专人来进行维护，这样安全性就比放在项目的配置文件中要高得多。
  （1） 对称加密
  对称加密：指的是加密和解密用的是同一秘钥，常见的对称加密算法有：DES、3DES、DESX、Blowfish、IDEA、RC4、RC5、RC6等等。
  （2） 非对称加密
  非对称加密：指的是加密和解密用的是不同的秘钥，加密用公钥，解密用私钥，加密解密相对较慢，常见的对称加密算法有：RSA、ECC（移动设备用）、Diffie-Hellman、El Gamal、DSA（数字签名用）等等。
  （3） 散列加密算法
  散列加密算法：MD2、MD4、MD5、HAVAL、SHA、SHA-1、HMAC、HMAC-MD5、HMAC-SHA1
SHA-2下又可再分为六个不同的算法标准：SHA-224、SHA-256、SHA-384、SHA-512、SHA-512/224、SHA-512/256。
散列加密算法不可反解，不可逆。

**8、 信息过滤与反垃圾**
  常见的信息过滤和反垃圾手段有以下几种（在这里不做详细介绍）：
  （1） 文本匹配
  （2） 分类算法
  （3） 黑名单

**9、 总结**
  这个世界没有绝对的安全，正如没有绝对的自由一样。网站的相对安全是通过提高攻击门槛达到的。让攻击者为了获得有限的利益必须付出更大的代价，至使其得不偿失，望而却步。
  所以，没有绝对安全的网站架构，工程师们只能打起100%的精神，预防可能的漏洞或者攻击。

