## 一、v-model

```vue
	<template>
	    <div>
	        <input class="login-input" type="text"  v-model="username" placeholder="请输入账号">
	        <input class="login-input" type="password" v-model="password" placeholder="请输入密码">
			<div class="login-button" @click="login" type="submit">登陆</div>
	    </div>
	</template>
	<script>
	export default {
       name: 'Login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                   console.log(this.username)
                   console.log(this.password)
            }
        }
    }
	<script/>	
```

## 二、@input 监听输入框

> 输入框只要输入的值变化了就会触发 input 调用 search 数据实时获取通过 event.currentTarget.value 获取到

```vue
	<template>
	  <div class="class">
	    <div>
	      <input type="text" @keyup.enter="search" @input="search($event)"/>
	    </div>
	  </div>
	</template>
	<script>
    export default {
      name: "search",
      data() {
      },
      methods: {
	        search(event){
	          console.log(event.currentTarget.value)
	        }
      	}
    }
   </script>
```

## 三、ref 获取数据

```vue
	<template>
	  <div class="class">
	      <input type="text" ref="getValue" />
	      <button @click="subbmitButton">获取表单数据</button>
	  </div>
	</template>
	<script>
    export default {
      name: "page",
      data() {
      },
      methods: {
	        subbmitButton(){
	          console.log(this.$refs.getValue.value)
	        }
      	}
    }
  </script>
```

