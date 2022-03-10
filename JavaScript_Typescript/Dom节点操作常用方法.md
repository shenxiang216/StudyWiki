**1.访问/获取节点**

document.getElementById(id);　　　　　　　　 　　//返回对拥有指定id的第一个对象进行访问

document.getElementsByName(name);　　　　　　//返回带有指定名称的节点集合　　 注意拼写:Elements

document.getElementsByTagName(tagname); 　　//返回带有指定标签名的对象集合　 注意拼写：Elements

document.getElementsByClassName(classname); //返回带有指定class名称的对象集合 注意拼写：Elements

**2.创建节点/属性**

document.createElement(eName);　　//创建一个节点

document.createAttribute(attrName); //对某个节点创建属性

document.createTextNode(text);　　　//创建文本节点

**3.添加节点**

document.insertBefore(newNode,referenceNode);　 //在某个节点前插入节点

parentNode.appendChild(newNode);　　　　　　　　//给某个节点添加子节点

**4.复制节点**

cloneNode(true | false);　　//复制某个节点  参数：是否复制原节点的所有属性

**5.删除节点**

parentNode.removeChild(node);　　//删除某个节点的子节点 node是要删除的节点

注意：为了保证兼容性，要判断元素节点的节点类型(nodeType)，若nodeType==1，再执行删除操作。通过这个方法，就可以在 IE和 Mozilla 完成正确的操作。

nodeType 属性可返回节点的类型.最重要的节点类型是：

| 元素类型     | 节点类型 |
| ------------ | -------- |
| 元素element  | 1        |
| 属性attr     | 2        |
| 文本text     | 3        |
| 注释comments | 8        |
| 文档document | 9        |

**6.修改文本节点**

| 方法                            | 作用                                |
| ------------------------------- | ----------------------------------- |
| appendData(data);               | 将data加到文本节点后面              |
| deleteData(start,length);       | 将从start处删除length个字符         |
| insertData(start,data);         | 在start处插入字符,start的开始值是0; |
| replaceData(start,length,data); | 在start处用data替换length个字符     |
| splitData(offset);              | 在offset处分割文本节点              |
| substringData(start,length);    | 从start处提取length个字符           |

**7.属性操作**

getAttribute(name)　　　　//通过属性名称获取某个节点属性的值

setAttribute(name,value); //修改某个节点属性的值

removeAttribute(name);　 //删除某个属性
**8.查找节点**

parentObj.firstChild;　　//如果节点为已知节点的第一个子节点就可以使用这个方法。此方法可以递归进行使用 parentObj.firstChild.firstChild.....

parentObj.lastChild;　　//获得一个节点的最后一个节点，与firstChild一样也可以进行递归使用 parentObj.lastChild.lastChild.....

parentObj.childNodes;  //获得节点的所有子节点，然后通过循环和索引找到目标节点 

**9.获取相邻的节点**

curtNode.previousSibling; //获取已知节点的相邻的上一个节点

curtNode.nextSlbling;　　 // 获取已知节点的下一个节点

**10.获取父节点**

childNode.parentNode;　　//得到已知节点的父节点

**11.替换节点**

replace(newNode,oldNode);