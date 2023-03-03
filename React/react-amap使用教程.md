# react-amap使用教程

> 参考链接
>
> [地理/逆地理编码](https://lbs.amap.com/api/webservice/guide/api/georegeo/)
>
> [REACT-AMAP](https://elemefe.github.io/react-amap/articles/start)

## 问题描述

* boss直聘移动端页面展示的是一个地图图片
* 我们决定展示地图，可以缩放，中心坐标为职位工作地点

## 方案

* 管理员发布职位时填写工作地址：`省份＋城市＋区县＋城镇＋乡村＋街道＋门牌号码`

* 根据结构化地址信息请求高德地图接口，返回地理编码

  > 例如：
  >
  > 结构化地址举例：北京市朝阳区阜通东大街6号转换后经纬度：116.480881,39.989410
  > 地标性建筑举例：天安门转换后经纬度：116.397499,39.908722

* 将结构化地址和地址编码存入jobs表的address中

  > {
  >
  > structAddress:北京市朝阳区阜通东大街6号,
  >
  > longitude:116.480881,
  >
  > latitude:39.989410
  >
  > }

* 将address返回给前端，前端根据longitude/latitude去渲染地图

* 优化：通过在`index.html`设置样式覆盖掉高德地图的水印

* 需要注册高德开发者，申请地图key

  > 已申请，请勿外泄
  >
  > | Key 名称 | Key                              | 绑定服务 | 操作             |
  > | :------- | :------------------------------- | :------- | :--------------- |
  > | deeplane | 2961583f62cde1f1489064bc604e2214 | Web服务  | 设置查看配额删除 |

## 代码

>  服务端

```javascript
async GetXY() {
    interface IMapCenter {
      longitude: string
      latitude: string
    }
    const key: string = "2961583f62cde1f1489064bc604e2214"
    let address: string
    address = "北京市朝阳区阜通东大街6号"
    const url =
      "https://restapi.amap.com/v3/geocode/geo?address=" +
      address +
      "&key=" +
      key
    let result = await axios.get(url)
    let XYdata: string[] = result.data.geocodes[0].location.split(",")
    let res: IMapCenter = {
      longitude: XYdata[0],
      latitude: XYdata[1],
    }
    console.log(res)
    return res
  }
//函数调用
await GetXY()
```

> 前端渲染地图

```react
import { Map, Marker } from "react-amap"

render() {
    const mapCenter = { longitude: 114.39316, latitude: 30.48668 }
    return (
      <div style={{ width: "100%", height: "200px" }}>
        <Map
          amapkey={"0dd8d9f741f2d323ac4e725b1de13bda"}   //高德开发者key
          center={mapCenter}
          scrollWheel={true}
          zoom={15}   //地图缩放
        >
          <Marker position={mapCenter} />
        </Map>
      </div>
    )
  }
}
```

## 完整代码

> map.tsx

```
import { Map, Marker } from "react-amap"
import * as React from "react"
import axios from "axios"

export default class App extends React.Component {
  async GetXY() {
    interface IMapCenter {
      longitude: string
      latitude: string
    }
    const key: string = "2961583f62cde1f1489064bc604e2214"
    let address: string
    address = "北京市朝阳区阜通东大街6号"
    const url =
      "https://restapi.amap.com/v3/geocode/geo?address=" +
      address +
      "&key=" +
      key
    let result = await axios.get(url)
    let XYdata: string[] = result.data.geocodes[0].location.split(",")
    let res: IMapCenter = {
      longitude: XYdata[0],
      latitude: XYdata[1],
    }
    console.log(res)
    return res
  }
  async componentDidMount() {
    await this.GetXY()
  }
  render() {
    const mapCenter = { longitude: 114.39316, latitude: 30.48668 }
    return (
      <div style={{ width: "100%", height: "200px" }}>
        <Map
          amapkey={"0dd8d9f741f2d323ac4e725b1de13bda"}
          center={mapCenter}
          scrollWheel={true}
          zoom={15}
        >
          <Marker position={mapCenter} />
        </Map>
      </div>
    )
  }
}

```

## 去除水印

```css
.amap-logo {
  display: none!important;
  visibility: hidden!important;
}
 
.amap-copyright {
  display: none!important;
  visibility: hidden!important;
}
```

