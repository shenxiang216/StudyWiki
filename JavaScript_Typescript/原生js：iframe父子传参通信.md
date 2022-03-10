### 原生js：[iframe父子传参通信](https://segmentfault.com/a/1190000021683182)

### 非跨域 父调子

```
//父页面
<button class="b" id="b">点击</button>
<iframe src="a.html" name='child' id="f"></iframe>

<script>
    var ob=document.getElementById('b');
    var msg='hellow,i'm your father!!'
    ob.onclick=function(){
        if(child.document.readyState=="complete"){
            child.window.fnChild(msg); //关键
        }
    }
</script>

//子页面
<script>
function fnChild (arg) {
    console.log(arg); //确实得到了 hellow,i'm your father!!
}
</script>
```

父页面调用子页面使用 `childFrameName.window.fnName();`;当然有一点很重要,你需要判断iframe 里面的东西是否加载完成,如果加载未完成就调用的话是会报错的;
判断iframe 加载是否完成有2种方法
1,`childFrameName.document.readyState=="complete"`来判断;
2,`childFrameName.onload=function(){}` 使用onload 回调函数,把调用的方法都写在这个回调函数里面;

### 非跨域 子调父

```
//在父页面
<div id="a" class="a"></div>
<iframe src="a.html" name='child' id="f"></iframe>

<script>
    function changeColor(){
        var oDiv=document.getElementById('a');
        oDiv.style.backgroundColor="red";
    }
</script>

//在子页面
<button class="ob" onclick="c()">anniu</button>
<script>
    function c(){
        parent.window.changeColor(); //关键
    }
</script>
```

同样的,在子页面调用父页面的方法使用 `parent.window.fnName()`就可以了;

这种操作难免会遇到父页面获取子页面的元素,或者子页面获取父页面的元素进行操作;

### 非跨域 父页面获取子页面元素操作

首先,我们有几种方法拿到子页面的window对象或者doucument 对象,(还是使用上面的html)

```
//原生js 获取子页面window对象
1, var childWindow=document.getElementById("f").contentWindow;
2, var childWindow=document.getElementsByTagName('f')[0].contentWindow;
//其实也就是普通的获取方法,只是后面多了一个contentWindow;
//jquery
var childWindow=$('#f').contentWindow;

//获取子页面的document对象 (假设已经通过上面的方法得到了window对象)
var frameDoc=childWindow.document;
var frameBody=frameDoc.body;
//jquery 也是跟上面的一样
var frameDoc=$(childWindow.document);

//原生获取元素
childWindow.document.getElementById('a') //上面都已经拿到了子页面的window对象,所以获取子页面的元素也就只需要想普通操作那样获取就好
childWindow.document.getElementById('a').style.color='red' //改个颜色

//jq拿子页面元素
$('#f').contents().find('#a'); //$('#f').contents 这相当于拿到了iframe 里面所有的dom;
```

### 非跨域 子页面获取父页面元素

```
//原生js
window.parent.document.getElementById('a'); //window.parent获取到父页面的window对象,那么接可以使用一般操作获取元素
window.parent.document.getElementById('a').style.color="red";//dom操作
//jquery
$("#a",parent.document); //$(父页面元素选择器, parent.document);
$("#a",parent.document).css('border','1px solid red');
```

上面的是不存在跨域的情况,但是有时候会遇到跨域情况,在这次的项目里面就是出于跨域状态下,开始看了一些资料,说是在用一个iframe做中间层去做,但是太麻烦,在这里介绍一个十分还用的方法**postMessage**

## postMessage

> window.postMessage() 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机 (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

以上摘自MDN 原文 [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage);

```
otherWindow.postMessage(message, targetOrigin, [transfer]);
//otherWindow 窗口对象
// message 传递的消息,可以是对象,可以是字符串
// target 目标窗口,* 代表所有;
```

postMessage十分强大,既可以子传父,也可以父穿子,并且可以突破同源限制

来看我遇到的使用场景;
我在主页面有个透明遮罩,里面是一个iframe的登录窗口,在子页面点击关闭的时候,需要关掉父页面的这个登陆遮罩;在这里存在跨域,所以使用上面的获取元素,操作元素的方法不能够使用,这里使用postMassage来做

```
//子页面
<div id="loginBox">登录窗口</div>
<div id="close"></div>

//父页面
<div id="loginMask">
    <iframe src="子页面"></iframe>
</div>

//子页面
<script>
    let oClose=document.getElementById('#close');
    oClose.onclick=function(){
        window.parent.postMessage('close','*');
    }
</script>
//父页面
<script>
    window.addEventListener('message',function(event){
        if(event.data=='close'){
            let oLoginMask=document.getElementById('loginMask');
            oLoginMask.style.display="none";
        }
    })
</script>
```

上面的代码其实很简单,在子页面里面获取了元素,该元素触发点击事件的时候,向父窗口发送一个消息,传递了一个消息;(这个消息参数会在接收页面的event.data查到);
在父页面监听**message**事件,监听到了就让登录遮罩消失;

### 父传子

同样,在父窗口也可以使用postMassage 来传递消息到子页面;

```
//父页面
<button id="btn">传递消息</button>
<iframe id='f' src="子页面.html"></iframe>
//子页面
<div id="a"></div>

//父页面
<script>
    let oBtn=document.getElementById('btn');
    let oFrame=document.getElementById('f');
    oBtn.onclick=function(){
        oFrame.contentWindow.postMessage('hello','*');
    }
</script>

//子页面
<script>
    window.addEventListener('message',function(){
        if(event.data=='hello'){
            document.getElementById('#a').innerText=event.data;
        }
    })
</script>
```