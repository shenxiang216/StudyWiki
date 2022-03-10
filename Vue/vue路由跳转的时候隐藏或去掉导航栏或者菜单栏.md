## v-show

```vue
<template>
 <div id="app">
      <router-view/>
   <div>{
   {$route}}</div>
   <div id="nav" v-show="$route.meta.istrun">  
     <router-link to="/">首页</router-link>|
     <router-link to='/menu'>菜单</router-link>|
     <router-link to='/serve'>服务</router-link>|  
     <router-link to='/my'>我的</router-link>
   </div>
 </div>
</template>

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      istrun:true
    },
  },
  {
    path: '/menu',
    name: 'About',
    meta:{
      istrun:true
    },
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/serve',
    name: 'Home',
    component: ()=>import('../views/Home.vue'),
    meta:{
      istrun:true
    },
  },
  {
    path: '/my',
    name: 'Home',
    component: ()=>import('../views/my.vue'),
    meta:{
      istrun:true
    },
  },
  {
    path:"/login",
    name:"login",
    component:()=>import('../views/login.vue')
  }
]
```

## 第二种方法，将显示底部菜单栏或者导航的放在一个路由中，不显示的放在一个路由中分开

``` vue
// 首先在主页面中设置渲染的区域：
<template>
  <div id="app">
       <router-view/>
  </div>
</template>
// 然后把需要显示导航栏的路由单独放置在一个组件中；
<template>
    <div>
      <router-link to="/">首页</router-link>|
      <router-link to='/menu'>菜单</router-link>|
      <router-link to='/serve'>服务</router-link>|  
      <router-link to='/my'>我的</router-link>
    <router-view></router-view>
    </div>
</template>
// 最后在router中设置路由的详细信息，其中自加载的 my 组件中,里面又写了一个跳转路由 登录。
const routes = [
  {
    // 需要显示导航的跳转路由
    path:'/',
    name:'zhuye',
    // 需要显示的菜单导航的路由，作为该路由的子路由，并且在子路由中设置具体跳转加载的组件
    component:()=>import('../views/zong.vue'),
    children:[{
      path:'/menu',
      component:()=>import('../views/About.vue')
    },
    {
      path:'/serve',
      component:()=>import('../views/serve.vue')
    },
    {
      path:'/my',
      component:()=>import('../views/my.vue')
    },   
  ]
  },
  // 不需要显示导航的路由
  {
    path:'/login',
    component:()=>import('../views/login.vue')
  }
]
```

## 3

```vue
v-show=`"$route.name!=='login'"
```

