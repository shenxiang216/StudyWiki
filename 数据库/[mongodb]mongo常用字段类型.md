## 1、json和bson

**JSON**

JSON是一种简单的数据表示方式，它易于理解、易于解析、易于记忆。但从另一方面来说，因为只有null、布尔、数字、字符串、数组和对象这几种数据类型，所以JSON有一定局限性。例如，JSON没有日期类型，JSON只有一种数字类型，无法区分浮点数和整数，更别说区分32为和64位数字了。再者，JSON无法表示其他一些通用类型，如正则表达式或函数。

**BSON**

BSON（Binary Serialized Document Format）是一种类JSON的二进制形式的存储格式，简称Binary JSON。它和JSON一样，支持内嵌的文档对象和数组对象，但是BSON有JSON没有的一些数据类型，如Date和BinData类型。它支持下面数据类型。每个数据类型对应一个数字，在[MongoDB](https://cloud.tencent.com/product/mongodb?from=10680)中可以使用$type操作符查看相应的文档的BSON类型

**MongoDB无须声明数据类型，全自动匹配**

每种BSON类型都具有整数和字符串标识符，如下表所示：

| Type                    | Number | Alias                 | Notes                      |
| :---------------------- | :----- | :-------------------- | :------------------------- |
| Double                  | 1      | “double”              |                            |
| String                  | 2      | “string”              |                            |
| Object                  | 3      | “object”              |                            |
| Array                   | 4      | “array”               |                            |
| Binary data             | 5      | “binData”             |                            |
| Undefined               | 6      | “undefined”           | Deprecated.                |
| ObjectId                | 7      | “objectId”            |                            |
| Boolean                 | 8      | “bool”                |                            |
| Date                    | 9      | “date”                |                            |
| Null                    | 10     | “null”                |                            |
| Regular Expression      | 11     | “regex”               |                            |
| DBPointer               | 12     | “dbPointer”           | Deprecated.                |
| JavaScript              | 13     | “javascript”          |                            |
| Symbol                  | 14     | “symbol”              | Deprecated.                |
| JavaScript (with scope) | 15     | “javascriptWithScope” | Deprecated in MongoDB 4.4. |
| 32-bit integer          | 16     | “int”                 |                            |
| Timestamp               | 17     | “timestamp”           |                            |
| 64-bit integer          | 18     | “long”                |                            |
| Decimal128              | 19     | “decimal”             | New in version 3.4.        |
| Min key                 | -1     | “minKey”              |                            |
| Max key                 | 127    | “maxKey”              |                            |

## 2、数据类型

### 2.1、double类型

mongo shell 客户端默认将数字看成浮点数。

### 2.2、 64-bit integer（long）

BSON有两种整型数据类型：32位有符号整型数据(INT); 64位有符号型整型数据(LONG)

转换函数为 NumberLong（），

### 2.3、 32-bit integer （int）

32-bit integer （int）和64-bit integer（long）差不多，不同的是，其转换函数由NumberLong（）变成了 **`NumberInt()`** ，其接受的参数，也当成string类型来处理。

### 2.4、decimal

Decimal 这个数据类型是在Mongo 3.4 才开始引入的。新增Decimal数值类型主要是为了记录、处理货币数据 ，例如 财经数据、税率数据等。有时候，一些科学计算也采用Decimal类型。

因为mongo shell默认将数字当成double类型，所以也是需要显式的**转换函数NumberDecimal()**，其接受参数是string值。

```javascript
mongos> db.testnum01.insert({_id:231,calc:NumberDecimal("1000.55")})
```

复制

**说明：**

int/long/decimal，**参数接受类型是string**，如果是数字（默认是double类型）也可以，但是有精度丢失的风险，会把数字变成15位（小数点不计算在内）

### 2.5 数字类型相加测试

以上4中都为数字类型，进行decimal与个类型数字的相加测试，如果如下：

Decimal  与decimal/int/long类型相加，小数位不变；

decimal与double类型相加，小数位会变成14位。

```javascript
mongos> db.testnum01.find({_id:231})
{ "_id" : 231, "calc" : NumberDecimal("1004.55") }
mongos> db.testnum01.updateOne({_id:231},{$inc:{calc:2}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
mongos> db.testnum01.find({_id:231})
{ "_id" : 231, "calc" : NumberDecimal("1006.55000000000000") }
```

复制

### 2.6 object ID

**类似于唯一的主键，包含12个字节**：总共有24位16进制数构成，也就是12个字节。

```javascript
{ "_id" : ObjectId("5f2a22f7aa56fc2fc978b159"), "calc" : 123456789012345680 }
5f2a22f7 aa56fc 2fc9 78b159
```

复制

```javascript
#"5f2a22f7" 代指的是unix时间戳,这条数据的产生时间
#"aa56fc" 代指某台机器的机器码,存储这条数据时的机器编号
#"2fc9" 代指进程ID,多进程存储数据的时候,非常有用的
#"78b159" 代指随机数,这里要注意的是,随机数的数字可能会出现重复,不是唯一的
#以上四种标识符拼凑成世界上唯一的ObjectID
#只要是支持MongoDB的语言,都会有一个或多个方法,对ObjectID进行转换
#可以得到以上四种信息

#注意:这个类型是不可以被JSON序列化的
这是MongoDB生成的类似关系型DB表主键的唯一key，具体由24个bit组成：
0-8字节是unix时间戳,
9-14字节的机器码，表示MongoDB实例所在机器的不同；
15-18字节的进程id，表示相同机器的不同MongoDB进程。
19-24字节是随机数
```

复制

由于ObjectId中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段， 可以通过"getTimestamp()"来获取文档的创建时间戳, 返回时间戳

```javascript
--返回时间戳
mongos> ObjectId("5f2a22f7aa56fc2fc978b159").getTimestamp()
ISODate("2020-08-05T03:09:43Z")
--返回字符串
mongos> ObjectId("5f2a22f7aa56fc2fc978b159").str
5f2a22f7aa56fc2fc978b159
```

复制

### 2.7 string

utf-8字符串，记住一定是utf-8字符串

### 2.8 arrays

数组或者列表，多个值存储到一个键 (list)

```javascript
"hobby" : [ "羽毛球","足球","篮球"]
```

复制

### 2.9 Object字典

```javascript
"course" : {"name" : "MongoDB","price" : 1000}
```

复制

### 2.10 Null

空数据类型 , 一个特殊的概念,None Null

### 2.11 timetamp时间戳

```javascript
"date" : 1528183743111
```

复制

### 2.12 data

存储当前日期或时间格式

```javascript
 "date" : ISODate("2019-01-05T15:28:33.705+08:00")
```

复制

## 3、mongo中使用大整数精度丢失问题

**Mongo shell中使用大整数字面量，但默认整数字面量类型却是双精度浮点数，导致丢失精度**

- **问题描述：**

通过mongo shell插入或更新一个大整数（长度约大于等于16位数字）时，例如：

```javascript
mongos> db.testnum01.insert([{_id:100,calc:12345678901111111111},{_id:101,calc:NumberLong("1234567890123456789")}])
```

复制

实际上插入的是

```javascript
> db.testnum01.find()
{ "_id" : 100, "calc" : 12345678901111112000 }
{ "_id" : 206, "calc" : 12345678902222221000 }
{ "_id" : 207, "calc" : 12345678903333333000 }
{ "_id" : 101, "calc" : NumberLong("1234567890123456789") }
```

复制

- **分析：**

由于mongo shell实际上是一个js引擎，而在javascript中，基本类型中并没有int或long，所有整数字面量实际上都以双精度浮点数表示（IEEE754格式）。64位的双精度浮点数中，实际是由1bit符号位，11bit的阶码位，52bit的尾数位构成。

11bit的余-1023阶码使得双精度浮点数提供大约-1.7E308～+1.7E308的范围，52bit的尾数位大概能表示15~16位数字（部分16位长的整数已经超出52bit能表示的范围）。

所以当我们在mongo shell中直接使用整数时，实际上它是以double表示的，而当这个整数字大约超过16位数字时，就可能发生有些整数无法精确表示的情况，只能使用一个接近能表示的整数来替代。如上面例子中，存入20位的数字，实际上能有效表示的数字只有16位，另外4位发生精度丢失的情况。

- **解决方法：**

使用NumberLong()函数构造长整型的类型，记住传入的参数一定要加双引号，否则使用整数的话又会被当做double而可能丢失精度。

*注意*：long类型：64bit，8字节有符号型，最大可存2^63-1=9223372036854775807

超过64位可存储为字符串：> db.testnum01.insert({_id:222,calc:"12345678901234567890"})

```javascript
mongos> db.testnum01.insert({_id:200,calc:NumberLong(1234567890123456789)})
mongos> db.testnum01.insert({_id:201,calc:NumberLong("1234567890123456789")})
mongos> db.testnum01.find()
{ "_id" : 200, "calc" : NumberLong("1234567890123456768") }   //最后2位精度不对
{ "_id" : 201, "calc" : NumberLong("1234567890123456789") }

mongos> db.testnum01.insert({_id:202,calc:NumberLong("9223372036854775808")})    --无法写入
2020-08-05T13:39:48.422+0800 E QUERY    [js] Error: could not convert string to long long :
@(shell):1:35
mongos> db.testnum01.insert({_id:202,calc:NumberLong("9223372036854775807")})   --可以写入
WriteResult({ "nInserted" : 1 })
mongos>
```

复制

注意，除了在mongo shell（javascript语言环境中），在其他不支持长整型而默认使用浮点数代替表示的编程语言中也会存在类似问题，操作时一定要留意。

## 4、判断某字段类型/长度

```javascript
// 字段类型为2（string），表示有此字段，或者用: $exists: true  ，长度大于100
mongos> db.testnum01.find({calc: {$type:2,$regex: /^.{100,}$/ }});
mongos> db.testnum01.find({calc: {$exists: true, $regex: /^.{10,}$/ }});
// 查询字段类型为long、double的
mongos> db.testnum01.find({calc:{$type:"double"}})    --db.testnum01.find({calc:{$type:1}})
mongos> db.testnum01.find({calc:{$type:"long"}})    --db.testnum01.find({calc:{$type:18}})
```