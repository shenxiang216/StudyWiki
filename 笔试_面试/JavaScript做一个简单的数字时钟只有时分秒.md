```js
<style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
 
        body {
            background: #333;
        }
 
        .clock {
            width: 450px;
            height: 110px;
            background: #000000;
            margin: 20px auto;
            color: #f7c08a;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 100px;
            font-weight: bold;
        }
    </style>
    <body>
        <div class="clock">
        <div id="clockTime"></div>
    </div>
    </body>
    <script>
        
        showDateTime();
        //设置定时器，自动更新时间显示
        let timer = setInterval(showDateTime,1000);
        
        function showDateTime(){
            //获取系统时间
            let hour = new Date().getHours();
            let minute = new Date().getMinutes();
            let second = new Date().getSeconds();
            //搞一个空字符串
            let showTime = "";
            //把时间显示的格式放进去
            showTime = hour+":"+minute+":"+second;
            //然后在网页上显示出来
            document.getElementById("clockTime").innerHTML = showTime;
        }
 
 
    </script>
```

let time=window.parseInt(prompt("请输入一个正数数字"));
let h=parseInt(time/3600);//小时
let m=parseInt(time%3600/60);//拿到分钟数
let s=parseInt(time%3600%60);//拿到秒数
document.write(h+"小时"+m+"分钟"+s+"秒")