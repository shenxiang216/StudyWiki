# MongoDB

* 基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

* 一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

* NoSQL(NoSQL = Not Only SQL )，意即"不仅仅是SQL"。

* 分布式系统是建立在网络之上的软件系统。正是因为软件的特性，所以分布式系统具有高度的内聚性和透明性。

* [node中使用MongDB](https://www.runoob.com/nodejs/nodejs-mongodb.html)

* NoSQL的优点/缺点

  优点:

  - \- 高可扩展性
  - \- 分布式计算
  - \- 低成本
  - \- 架构的灵活性，半结构化数据
  - \- 没有复杂的关系

  缺点:

  - \- 没有标准化
  - \- 有限的查询功能（到目前为止）
  - \- 最终一致是不直观的程序
* 启动：`net satart mongodb`

* 停止mogodb服务：`net stop MongoDB`

* 开启mongodb服务:

  ```
  1、安装mongodb
  
  
  2、安装目录--D:\MongoDB\Server\3.6\
  
  3、创建文件夹（必须）
  
      3-1、进入安装目录--cd D:\MongoDB\Server\3.6
  
      3-2、在目录下创建文件夹
  
                  3-2-1、data  文件夹
  
                  3-2-2、log  文件夹 ， 并在log文件夹下创建 mongo.log文件
  
                  3-2-3、mongo.conf文件
  
                  3-2-4、往mongo.conf文件中加入一下内容
  
  dbpath=D:\Program Files\MongoDB\Server\3.2\data #数据库路径  
  logpath=D:\Program Files\MongoDB\Server\3.2\logs\mongo.log #日志输出文件路径  
  logappend=true #错误日志采用追加模式  
  journal=true #启用日志文件，默认启用  
  quiet=true #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false  
  port=27017 #端口号 默认为27017
  4、启动 管理员命令行（一般是右键最下角的windows标志可以看到）
  
      4-1、用命令进入到安装目录下
  
              cd D:\MongoDB\Server\3.6\bin
  
      4-2、用配置启动mongodb，并创建一个mongodb服务
  
               .\mongod.exe --config "D:\MongoDB\Server\3.6\mongo.conf" --install --serviceName "MongoDB"
  
      4-3、启动mongodb服务
  
              net start MongoDB
              启动MongoDB服务              net start MongoDB
  
  关闭MongoDB服务             net stop MongoDB
  
  移除 MongoDB 服务           C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe --remove
  
  5、每次想要访问mongodb都需要用 管理员命令行，否则会报  【发生系统错误 5】
  
  6、访问步骤
  
      6-1、先启动服务
  
      6-2、键入 mongo 即可
      
      * db.createUser({
      user: 'admin',   
      pwd: 'Abc123++', 
      roles:[{
        role: 'root',   
        db: 'admin'  
      }]
    })
    
    mongo -u admin -p Abc123++ --authenticationDatabase admin
  
  
  db.createUser({
    user: 'jobs',         
    pwd: 'Abc123++',      
    roles:[{
      role: 'readWrite', 
      db: 'jobs' 
    }]
  })
      
      
  systemctl daemon-reload
  systemctl status mongod.service
  systemctl start mongod.service
  
  
  
  
  systemctl restart mongod.service
  netstat -lanp | grep "27017"
  netstat -natp | grep 27017
  ```

## Node.js 连接 MongoDB

* 创建数据库：要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 URL 和 端口号。

  如果数据库不存在，MongoDB 将创建数据库并建立连接。

  ```javascript
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/runoob";
   
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
  });
  ```

* 创建集合：我们可以使用 createCollection() 方法来创建集合：

  ```javascript
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/runoob';
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      console.log('数据库已创建');
      var dbase = db.db("runoob");
      dbase.createCollection('site', function (err, res) {
          if (err) throw err;
          console.log("创建集合!");
          db.close();
      });
  });
  ```

* 数据库操作（CURD）：与 MySQL 不同的是 MongoDB 会自动创建数据库和集合，所以使用前我们不需要手动去创建。

  * 插入数据：以下实例我们连接数据库 runoob 的 site 表，并插入一条数据条数据，使用 **insertOne()**：

    ```javascript
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var myobj = { name: "菜鸟教程", url: "www.runoob" };
        dbo.collection("site").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });
    });
    $ node test.js
    文档插入成功
    ```

    从输出结果来看，数据已插入成功。

    我们也可以打开 MongoDB 的客户端查看数据，如：

    ```javascript
    > show dbs
    runoob  0.000GB          # 自动创建了 runoob 数据库
    > show tables
    site                     # 自动创建了 site 集合（数据表）
    > db.site.find()
    { "_id" : ObjectId("5a794e36763eb821b24db854"), "name" : "菜鸟教程", "url" : "www.runoob" }
    > 
    ```

    如果要插入多条数据可以使用 **insertMany()**：

    ```javascript
    //res.insertedCount 为插入的条数。
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var myobj =  [
            { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
            { name: 'Google', url: 'https://www.google.com', type: 'en'},
            { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
           ];
        dbo.collection("site").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();
        });
    });
    ```

  * 查找数据：可以使用 find() 来查找数据, find() 可以返回匹配条件的所有数据。 如果未指定条件，find() 返回集合中的所有数据。

    ```javascript
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    ```

    查询指定条件的数据:

    ```javascript
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
         var whereStr = {"name":'菜鸟教程'};  // 查询条件
        dbo.collection("site").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    执行以下命令输出就结果为：
    [ { _id: 5a794e36763eb821b24db854,
        name: '菜鸟教程',
        url: 'www.runoob' } ]
    ```

  * 更新数据：我们也可以对数据库的数据进行修改，以下实例将 name 为 "菜鸟教程" 的 url 改为 https://www.runoob.com：

    ```javascript
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var whereStr = {"name":'菜鸟教程'};  // 查询条件
        var updateStr = {$set: { "url" : "https://www.runoob.com" }};
        dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
            if (err) throw err;
            console.log("文档更新成功");
            db.close();
        });
    });
    执行成功后，进入 mongo 管理工具查看数据已修改：
    > db.site.find().pretty()
    {
        "_id" : ObjectId("5a794e36763eb821b24db854"),
        "name" : "菜鸟教程",
        "url" : "https://www.runoob.com"     // 已修改为 https
    }
    ```

    如果要更新所有符合条的文档数据可以使用 updateMany()：

    ```javascript
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var whereStr = {"type":'en'};  // 查询条件
        var updateStr = {$set: { "url" : "https://www.runoob.com" }};
        dbo.collection("site").updateMany(whereStr, updateStr, function(err, res) {
            if (err) throw err;
             console.log(res.result.nModified + " 条文档被更新");
            db.close();
        });
    });
    //result.nModified 为更新的条数。
    ```

  * 删除数据：以下实例将 name 为 "菜鸟教程" 的数据删除 :

    ```javascript
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var whereStr = {"name":'菜鸟教程'};  // 查询条件
        dbo.collection("site").deleteOne(whereStr, function(err, obj) {
            if (err) throw err;
            console.log("文档删除成功");
            db.close();
        });
    });
    执行成功后，进入 mongo 管理工具查看数据已删除：
    > db.site.find()
    > 
    ```

    如果要删除多条语句可以使用 deleteMany() 方法.以下实例将 type 为 en 的所有数据删除 :

    ```javascript
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob");
        var whereStr = { type: "en" };  // 查询条件
        dbo.collection("site").deleteMany(whereStr, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " 条文档被删除");
            db.close();
        });
    });
    obj.result.n 删除的条数。
    ```

* 

