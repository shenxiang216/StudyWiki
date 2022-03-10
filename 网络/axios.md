# axios

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
>
> npm axios
>
> yarn add axios
>
> npm install --save axios vue-axios
>
> import axios from 'axios';
>
> 暂不涉及一些拦截请求、取消请求等

## 特性

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

## 案例

- 执行 `GET` 请求

```javascript
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
// 上面的请求也可以这样做
axios.get('/user', {
        params: {
            ID: 12345
        }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
```

- 执行 `POST` 请求

```javascript
axios.post('/user', {
        firstname: 'Fred',
        lastName: 'Flintstone'
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
```

- 执行多个并发请求

```javascript
function getUserAccount () {
    return axios.get('/user/12345');
}
function getUserPermissions () {
    return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermission()])
    .then(axios.spread(function (acct, perms) {
        // 两个请求都执行完成
    }));
```

## Axios API

* 可以通过向 `axios` 传递相关配置来创建请求：axios(config)

  ```javascript
  // 发送 POST 请求
  axios({
      method: 'post',
      url: '/user/12345',
      data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
      }
  })
  ```

  ```javascript
  // 获取远端图片
  axios({
      method: 'get',
      url: 'http://bit.ly/2mTM3nY',
      responseType: 'stream'
  })
      .then(function(response){
          response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
      })
  ```
  
  ```javascript
  //axios(url [, config])
  // 发送 GET 请求（默认的方法）
  axios('/user/12345');
  ```
## 请求方法的别名

  > 为方便起见，为所有支持的请求方法提供了别名
  >
  > **注意：**在使用别名方法时， `url`、`method`、`data` 这些属性都不必在配置中指定。

  ```javascript
  axios.request(config)
  axios.get(url [, config])
  axios.delete(url [, config])
  axios.head(url [, config])
  axios.options(url [, config])
  axios.post(url [, data[, config]])
  axios.put(url [, data[, config]])
  axios.patch(url [, data[, config]])
  ```

## 并发

  > 处理并发请求的助手函数：

  ```javascript
  axios.all(iterable)
  axios.spread(callback)
  ```

## **创建实例**

  > 可以使用自定义配置创建一个 axios 实例
  >
  > **axios.create([config])**
  >
  > **注意：使用创建的 axios 实例请求时，请求的配置项将与实例的配置合并。**

  ```javascript
  const instance = axios.create({
      baseURL: 'https://some-domain.com/api/',
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
  })
  ```

## 请求配置

  > 这些是创建请求时可以用的配置选项。只有 `url` 是必需的，如果没有指定 `method`，请求将默认使用 `get`方法。

  ```javascript
  {
      // url 是用于请求的服务器 URL
      url: '/user'
  
      // method 是创建请求时使用的方法
      method: 'get',    // default
  
      // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
      // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
      baseURL: 'https://some-domain.com/api/',
  
      // transformRequest 允许在向服务器发送前，修改请求数据
      // 只能用在 PUT、POST 和 PATCH 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      transformRequest: [function (data, headers) {
          // 对 data 进行任意转换处理
          return data;
      }],
  
      // transformResponse 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [function (data) {
          // 对 data 进行任意转换处理
          return data;
      }],
  
      // headers 是即将被发送的自定义请求头
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      
      // params 是即将与请求一起发送的 URL 参数
      // 必须是一个无格式对象 (plain object) 或 URLSearchParams 对象
      params: {
          ID: 12345
      },
  
      // paramsSerializer 是一个负责 params 序列化的函数
      // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
      paramsSerializer: function (params) {
          return QS.stringify(params, {arrayFormat: 'brackets'})
      },
      
      // data 是作为请求主体被发送的数据
      // 只适用于这些请求方法 PUT、POST 和 PATCH
      // 在没有设置 transformRequest 时，必须是以下类型之一：
      // - string，plain object，ArrayBuffer，ArrayBufferView，URLSearchParams
      // - 浏览器专属：FormData，File，Blob
      // - Node专属：Stream
      data: {
          firstName: 'Fred'
      },
  
      // timeout 指定请求超时的毫秒数(0 表示无超时时间)
      // 如果请求花费了超过 timeout 的时间，请求将被中断
      timeout: 1000,
  
      // withCredentials 表示跨域请求时是否需要使用凭证
      withCredentials: false,    // default
      
      // adapter 允许自定义处理请求，以使测试更轻松
      // 返回一个 promise 并应用一个有效的响应(查阅 [response docs](#response-api))
      adapter: function (config) {
          /* ... */
      },
  
      // auth 表示应该使用 HTTP 基础验证，并提供凭据
      // 这将设置一个 Authorization 头，覆写掉现有的任意使用 headers 设置的自定义 Authorization 头
      auth: {
          username: 'janedoe',
          password: 's00pers3cret'
      },
  
      // responseType 表示服务器响应的数据类型，可以是 arraybuffer、blob、document、json、text、stream
      responseType: 'json',    // default
  
      // responseEncoding 表示对响应的编码
      // Note：对于 responseType 为 stream 或 客户端请求会忽略
      responseEncoding: 'utf-8',
  
      // xsrfCookieName 是用作 xsrf token 值的 cookie 名称
      xsrfCookieName: 'XSRF-TOKEN',    // default
  
      // xsrfHeaderName 是 xsrf token 值的 http 头名称
      xsrfHeaderName: 'X-XSRF-TOKEN',    // default
          
      // onUploadProgress 允许为上传处理进度事件
      onUploadProgress: function (progressEvent) {
          // ... ...
      },
      
      // onDownloadProgress 允许为下载处理进度事件
      onDownloadProgress: function (progressEvent) {
          // ... ...
      },
  
      // maxContentLength 定义允许的响应内容的最大尺寸
      maxContentLength: 2000,
      
      // validateStatus 定义对于给定的 HTTP 响应状态码是 resolve 或 reject promise。
      // 如果 validateStatus 返回 true (或者设置为 null 或 undefined)，promise 将被 resolve，否则 promise 将被 reject
      validateStatus: function (status) {
          return status >= 200 && status < 300;    // default
      },
  
      // maxRedirects 定义在 node.js 中 follow 的最大重定向数目
      // 如果设置为 0，将不会 follow 任何重定向
      maxRedirects: 5,
  
      // socketPath 用于在 node.js 中定义 UNIX Socket
      // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
      // 只能指定 socketPath 或 proxy，如果两者同时指定，将使用 socketPath
      socketPath: null,
  
      // httpAgent 和 httpsAgent 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。
      // 允许像这样配置选项。keepAlive 默认没有启用
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
  
      // proxy 定义代理服务器的主体名称和端口
      // auth 表示 HTTP 基础验证应当用于连接代理，并提供凭据
      // 这将会设置一个 Proxy-Authorization 头，覆写掉已有的通过使用 header 设置的自定义 Proxy-Authorization 头
      proxy: {
          host: '127.0.0.1',
          port: 9000,
          auth: {
              username: 'mikeymike',
              password: 'rapunz31'
          }
      },
  
      // cancelToken 指定用于取消请求的 cancel token
      cancelToken: new CancelToken(function (cancel) {
          // ... ...
      })
  }
  ```

## 响应结构

  ```
  {
      // data 由服务器提供的响应
      data: {},
      
      // status 来自服务器响应的 HTTP 状态码
      status: 200,
  
      // statusText 来自服务器响应的 HTTP 状态信息
      statusText: 'OK',
  
      // headers 服务器响应的头
      headers: {},
  
      // config 是为请求提供的配置信息
      config: {},
  
      // request 是生成当前响应的请求
      // 在 node.js 中是最后一个 ClientRequest 实例 (在重定向中)
      // 在浏览器中是 XMLHttpRequest 实例
      request: {}
  }
  ```
## 使用 application/x-www-form-urlencoded 格式

	> 默认情况下，axios 将 JavaScript 对象序列化为 JSON。要以 application/x-www-form-urlencoded 格式发送数据，你可以使用以下选项之一。
### 浏览器
* 方式一：使用 URLSearchParams API，如下所示：
	
	>  请注意，不是所有浏览器都支持 URLSearchParams（请参阅 [caniuse.com](https://caniuse.com/)），但可以使用 polyfill（确保填充全局环境）。

  ```javascript
  const params = new URLSearchParams();
	params.append('param1', 'value1');
  params.append('param2', 'value2');
  axios.post('/foo', params);
  ```

* 方式二：使用 qs 库编码数据

  ```
  const qs = require('qs');
  axios.post('/foo', qs.stringify({ 'bar': 123 }));
  ```

### Node.js

> 在 node.js 中，你可以使用 `querystring` 模块，如下所示：

```
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

