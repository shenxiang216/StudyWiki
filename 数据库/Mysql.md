aNXbwiwt,4Rw



启动：mysqld --console       net start mysql
关闭：mysqladmin -u root shutdown   
net stop mysql

登录：.\mysql -h localhost -uroot -p
记得 ./
密码：123456



mysql 显示所有的数据库，代码如下：

mysql> show databases
  -> ;

mysql> show tables;

MySQL显示命令
二、显示命令 
1、显示数据库列表。 
show databases; 
2、显示库中的数据表： 
use mysql;
show tables; 
3、显示数据表的结构： 
describe 表名; 
4、建库： 
create database 库名; 
5、建表： 
use 库名； 
create table 表名 (字段设定列表)； 
6、删库和删表: 
drop database 库名; 
drop table 表名； 
7、将表中记录清空： 
delete from 表名; 
8、显示表中的记录： 
select * from 表名



//---------------------------------------

（1）选择使用某个数据库

use xxxdb;

(2)创建数据库

create database xxxdb;



