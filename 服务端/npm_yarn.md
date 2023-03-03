# npm、yarn更换镜像

* 查看源

  `npm config get registry`

* 更换淘宝源

  `npm config set registry https://registry.npm.taobao.org`

* 恢复默认源地址

  `npm config set registry https://registry.npmjs.org`

* 注：据说将默认源地址`https`协议改为`http`协议，可以加快下载速度    如果只是想临时更换源地址，可以进行如下操作

  `npm install packagname -g --registry=https://registry.npm.taobao.org

## npm/yarn发布包



