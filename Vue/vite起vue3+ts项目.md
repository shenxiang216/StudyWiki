今年 2 月份，`vite` 出了 `2.x` 版本，抱着学一学的心态决定出个简单的项目，结合 `element-plus`，以及将会成为每位前端必会的 `typescript`，实现了如下内容。为了能帮到每一位想学习的开发者，代码已开源于 `GitHub` 上

## [#](https://coderly.cn/pages/33b18f/#先放几张效果图)先放几张效果图

源码地址：`https://github.com/coderlyu/vite-frontend-template`（创作不易，欢迎点颗 `star` 再走）

- 💡 `Vue 3.x`
- ⚡️ `Typescript`
- 🛠️ `Vite 2.x`
- 📦 `Vuex 4.x`
- 🔩 `Vue-Router 4.x`
- 🔑 `Md5 And Sign Provide Transmission For Website Security`
- 👍 `Mock In Development`
- 🔖 `Iconfont And Svg`
- 🔍 `Element-plus UI`
- 📌 `And More...`

## [#](https://coderly.cn/pages/33b18f/#初始化项目)初始化项目

创建项目

```text
yarn create @vitejs/app <project-name>

# 或者
npm init @vitejs/app <project-name>
```

以博主这个项目为例：文件名为 `vite-frontend-template`

```text
npm init @vitejs/app vite-frontend-template
```

此时按下回车，可以看到以下页面，博主选择的是 `vue-ts`（上下键可以切换选择的模板），按下回车之后会给你一个配置好了`typescript` 的 `vite` 配置模板
![图片](https://raw.githubusercontent.com/coderlyu/au-blog/master/docs/.vuepress/public/images/blogs/vite-6.png)

之后

```text
  cd vite-frontend-template
  npm install
  npm run dev
```

就可以看到项目模板运行之后的样子，本地访问 `http://localhost:3000/`

## [#](https://coderly.cn/pages/33b18f/#安装-vue-router-vuex)安装 `vue-router`，`vuex`

```text
npm i vue-router@next vuex@next
```

### [#](https://coderly.cn/pages/33b18f/#vue-router)`vue-router`

在 `src` 目录下新建 `router/index.ts`

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: (_) => {
      return { path: '/home' }
    },
  },
  {
    path: '/home',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/about',
    name: 'About', // route level code-splitting // this generates a separate chunk (about.[hash].js) for this route // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "About" */ '../components/About.vue'),
  },
  {
    path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
    redirect: (_) => {
      return { path: '/404' }
    },
  },
]
const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})
export default router
```

在 `src` 目录下再新建一个 `components/About.vue` 文件，内容如下：

```html
<template>
  <h1>{{ msg }}</h1>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'About',
    data() {
      return {
        msg: 'About Page',
      }
    },
    setup() {},
  })
</script>
```

### [#](https://coderly.cn/pages/33b18f/#vuex)`vuex`

在 `src` 目录下创建 `store/index.ts`

```js
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  count: number;
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store =
  createStore <
  State >
  {
    state() {
      return {
        count: 0,
      }
    },
    mutations: {
      increment(state) {
        state.count++
      },
    },
  }
```

最后修改下 `App.vue`

```js
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

运行之后，你可以看到如下页面`http://localhost:3000/home`

`about` 页面 `http://localhost:3000/about`

## [#](https://coderly.cn/pages/33b18f/#安装-element-plus)安装 `element-plus`

```text
npm install element-plus --save
```

### [#](https://coderly.cn/pages/33b18f/#按需引入)按需引入

修改 `main.ts`

```js
import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'

import { ElButton } from 'element-plus'

const app = createApp(App)

app.component(ElButton.name, ElButton)

app.use(store, key)
app.use(router)
app.mount('#app')
```

样式按钮引入可以使用插件 `vite-plugin-style-import`

- 安装 `npm i vite-plugin-style-import -D`
- 修改 `vite.config.ts`

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css` // 按需引入样式
          },
        },
      ],
    }),
  ],
})
```

在 `About.vue` 页面使用

```html
<template>
  <h1>{{ msg }}</h1>
  <el-button type="primary">element-plus按钮</el-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'About',
    data() {
      return {
        msg: 'About Page',
      }
    },
    setup() {},
  })
</script>
```

此时访问 `http://localhost:3000/about`，可以看到按钮已经出来了

## [#](https://coderly.cn/pages/33b18f/#写在最后)写在最后

目前 `vue3.x` 的生态环境在不断完善，使用 vite 开发时，可以在`npm`上搜 `vite-`，里面还是有很多能用的 vite 插件，比如`vite-plugin-mockit`，`vite-svg-loader` ...

- 同时可以多关注 `vue3.x` 官网 `https://v3.vuejs.org/guide/introduction.html`
- `vuex4.x` 官网：`https://next.vuex.vuejs.org/`
- `vue-router4.x` 官网：`https://next.router.vuejs.org/guide/`
- `vite2.x` 官网：`https://vitejs.dev/config/`