# 学习 「玩转 VUE3 全家桶」。

# 01 ｜ 宏观视角：从前端框架发展史聊聊为什么要学 Vue3？

## 前端发展史

- 石器时代：JSP 盛行。
- 铁器时代：jQuery 盛行。
- 工业时代：Angular JS、React、Vue 并举。

## 前端框架

新时代的前端框架虽然百花齐放，但是框架的目标是一致的——利用数据驱动页面，而区别在于，当数据发生变化后，框架是如何通知页面进行更新的。

————

这里留个坑：研究一下，初代前端框架的不同。

————

## 评论精选

> Vue 需不需要 React 的 Fiber 呢？

> Vue 不需要 React 的 Fiber。

> 最早Vue3的提案其实是包含时间切片方案的，最后废弃的主要原因，是时间切片解决的的问题，Vue3基本碰不到 1. Vue3把虚拟Dom控制在组件级别，组件之间使用响应式，这就让Vue3的虚拟Dom不会过于庞大 2. Vue3虚拟Dom的静态标记和自动缓存功能，让静态的节点和属性可以直接绕过Diff逻辑，也大大减少了虚拟Dom的Diff事件 3. 时间切片也会带来额外的系统复杂性 所以引入时间切片对于Vue3来说投入产出比不太理想，在后来的讨论中，Vue3的时间切片方案就被废弃了

> 看了之后有两个点我和大圣老师的观点有点不一样： 1. 引入虚拟dom的核心并不是为了通过diff得出需要更新的节点从而加快速度(有时候甚至会变慢)。而是给各种类型节点提供了一层向上的抽象， 这种抽象扩展了框架能够完成的功能，和简化了一些操作。在大多数情况下，操作最快的永远是直接操作Dom，这个svelte 好像就是这么做的。 2. Vue2.x 中并不是仅仅只有组件级别的watcher ， 每个组件中的响应式数据也有watcher，在对应的deps上。只不过组件内部数据的watcher一般只会通知到组件级别的watcher, 然后由组件级别的watcher通知外部做对应的操作。

> 由于vue只在组件级别diff，单个组件过于庞大会影响diff效率，过小会增加wacher的数量，改如何取舍呢?

> 在设计组件的时候主要考虑功能即可，Vue有点像自动挡，很多优化都帮你做了， 尽量不要拆的太碎，因为虚拟Dom 是做了很多静态优化的，只要按照功能模块拆即可。

# 02 ｜ 上手：一个清单应用帮你入门 Vue.js

此篇简单介绍了 Vue 的基本用法。

## 评论精选

> 涉及到页面状态保存，方法有很多，大概两类：
> 1. 本地储存： a. localstorage b. workers c. router，也可以存到 route 中 d. 存到本地文件
> 2. 服务端：这个就是将状态保存到服务器，通过 axios 等方式和服务器交换数据等。

> 1. 保存时机，在unmount的生命周期进行保存 。 
> 2. 使用浏览器客户端存储，如sessionStorage，LocalStorage等api保存，保存时添加时间戳用于比对新老数据，使用服务端保存接口，将数据持久化到数据库，考虑接口请求失败时重试机制和友好提示。 
> 3. 客户端存储在在data定义时直接从localStorage等获取，服务端接口在created周期请求获取数据并给data赋值。 
> 4. 考虑保存失败的情况，可以监听数据变化做自动保存。

# 03 ｜ 新特性：初探 Vue3 新特性

## Vue 2 历史遗留问题

1. Vue 2 响应式并不是真正意义上的代理，而是基于 Object.defineProperty() 实现的。
2. Option API 在组织代码较多的组件的时候不易维护。

## Vue3 新特性

1. RFC 机制：[拥抱社区](https://github.com/vuejs/rfcs)。
2. 响应式系统：拥抱 Proxy。
3. 自定义渲染器：类 monorepo 思想独立各个模块和功能。
4. 全部模块使用 TypeScript 重构：拥抱类型系统。
5. Compostion API 组合语法：方便 Tree-shaking、代码复用和维护。
6. 新的组件：Fragment、Teleport、Suspense。
7. 新工程化工具 Vite。

# 04 ｜ 升级： Vue2 项目如何升级到 Vue3？

## 是否选用 Vue 3？

```other
if 新项目
	if 支持 IE11
		Vue 2.7
	else 
		Vue 3 生态
else
	if 长期维护
		Vue 2 升级 Vue 3
	else 
		Vue 2 持续维护
```

# 使用自动化升级工具进行 Vue 的升级

1. 引入 Vue 3 和 vue/compat，并给 vue 设置别名vue/compat，将 compat 作为入口。

```other
"dependencies": {
-  "vue": "^2.6.12",
+  "vue": "^3.2.19",
+  "@vue/compat": "^3.2.19"
   ...
},
"devDependencies": {
-  "vue-template-compiler": "^2.6.12"
+  "@vue/compiler-sfc": "^3.2.19"
}



// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat')
    ......
  }
}
```

此时，你可以在控制台看到很多警告和优化的建议。

2. 自动化替代工具，如 gogocode。

# 05 ｜ 项目启动：搭建 Vue 3 工程化项目第一步

## 使用 Vite 创建项目

对于 Vue 2，官方推荐使用 Vue-cli 创建项目；而对于 Vue 3，官方建议使用 Vite 创建项目。

```other
$ node -v
$ pnpm create vite
? Project name: vite-vue-ts-demo
? Select a framework: vue-ts 
$ cd vite-vue-ts-demo
$ pnpm install
$ pnpm run dev
```

## 引入 `vue-router` 和 `vuex`

```other
$ pnpm install vue-router@next vuex@next
```

## 初始化项目结构

```other
.
├── README.md
├── index.html         入口文件
├── package.json
├── public             资源文件
│   └── favicon.ico
├── src                源码
│   ├── App.vue        单文件组件
│   ├── assets
│   │   └── logo.png  
│   ├── api            数据请求
│   ├── assets         静态资源
│   ├── components     组件
│   │   └── about.vue
│   │   └── home.vue
│   ├── pages          页面
│   ├── router         路由配置
│   │   └── index.ts 
│   ├── store          vuex数据
│   ├── utils          工具函数
│   └── main.ts        入口
└── vite.config.js     vite工程化配置文件
```

## 引入路由系统

```other
// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/homePage.vue'
import About from '../pages/aboutPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
```

## 新建 homePage 组件和 aboutPage 组件

```other
// homePage.vue
<template>
	<h1>这是首页</h1>
</template>

// aboutPage.vue
<template>
	<h1>这是关于页面</h1>
</template>
```

## 配置 ESLint 和 Prettier 规范代码格式

# 06 ｜ 新的代码组织方式 Composition API + `<script setup>` 到底好在哪里？

## 初识 Composition API 和 `<script setup>`

简单实现累加器

```other
// ./src/components/TodoList.vue

<script setup>
  import { ref } from 'vue'

  let count = ref(1)
  function add() {
    count.value++
  }
</script>

<template>
  <div>
    <h1 @click="add">{{ count }}</h1>
  </div>
</template>

<style>
  h1 {
    color: red;
  }
</style>
```

在页面中引用组件

```other
// src/pages/homePage.vue
<script setup>
  import TodoList from '../components/TodoList.vue'
</script>

<template>
  <h1>这是首页</h1>
  <TodoList />
</template>
```

实现 TodoList.vue

```other
// src/components/TodoList.vue

<script setup>
  import { ref } from 'vue'

  let title = ref('')
  let todoList = ref([
    {
      title: '学习 Vue 3',
      done: false,
    },
  ])
  function addTodo() {
    todoList.value.push({
      title: title.value,
      done: false,
    })
    title.value = ''
  }
</script>

<template>
  <input v-model="title" type="text" @keydown.enter="addTodo" />
  <ul v-if="todoList.length">
    <li v-for="todoItem in todoList" :key="todoItem.title">
      <input v-model="todoList.done" type="checkbox" />
      <span :class="{ done: todoList.done }">{{ todoItem.title }}</span>
    </li>
  </ul>
</template>
```

## 计算属性

使用 Composition API 的计算属性来实现几个小功能。

```other
// ./src/components/todoList.vue

<script setup>
  import { computed, ref } from 'vue'

  let title = ref('')
  let todoList = ref([
    {
      title: '学习 Vue 3',
      done: false,
    },
  ])
  function addTodo() {
    todoList.value.push({
      title: title.value,
      done: false,
    })
    title.value = ''
  }
  function clear() {
    todoList.value = todoList.value.filter((todoItem) => !todoItem.done)
  }
  let undoneCount = computed(() => {
    return todoList.value.filter((todoItem) => !todoItem.done).length
  })
  let all = computed(() => todoList.value.length)
  let allDone = computed({
    get: function () {
      return undoneCount.value === 0
    },
    set: function (value) {
      todoList.value.forEach((todoItem) => (todoItem.done = value))
    },
  })
</script>

<template>
  <input v-model="title" type="text" @keydown.enter="addTodo" />
  <button v-if="undoneCount < all" @click="clear">清空完成选项</button>
  <template v-if="todoList.length">
    <ul>
      <li v-for="todoItem in todoList" :key="todoItem.title">
        <input v-model="todoItem.done" type="checkbox" />
        <span :class="{ done: todoList.done }">{{ todoItem.title }}</span>
      </li>
    </ul>
    <div>全部完成<input v-model="allDone" type="checkbox" /></div>
    <div>完成情况{{ all - undoneCount }} / {{ all }}</div>
  </template>
  <div v-else>暂无数据</div>
</template>
```

## Composition API 拆分代码

使用 Compostion API 我们可以在一个 App 应用中，把一个功能相关的数据和方法维护在一个独立的都模块里，而不是揉杂在 data 和 methods 里。这得益于 ref 和 computed 等模块可以从 Vue 全局引入，极大地提高了代码的可维护性和复用性。

## style 样式的特性

- 使用`scoped` 属性，实现组件内的样式设置，避免样式冲突问题。
- 可以在 style 内部使用 v-bind 函数实现绑定变量。

# 07 ｜ 巧妙的响应式：深入理解 Vue 3 的响应式机制

## 什么是响应式

响应式，即数据会根据和此数据有关的数据的变化而响应变化。

下面是一个简单易懂的响应式例子：

```other
let bar = 1
let foo = bar
bar = 2
// 如果数据为响应式的，那么此时的foo = 2
```

## 响应式原理

实现上述响应式的关键，是如何在修改 `bar` 时，自动实现 `foo` 的响应式变化。

我把实现响应式的过程分为三步，一是我们可以监听 `bar` 的修改，这是触发响应式变化的时机，又称「数据劫持」；二是我们可以找出和 `bar` 有关的数据，又称「依赖收集」；三是对和 `bar` 有关的数据进行响应式更新，又称「发布订阅」。

本篇主要介绍第一步，也就是数据劫持。

## 数据劫持

### `Object.defineProperty()` API

Vue 2通过 `Object.defineProperty` API 作为数据劫持的工具。

O`bject.defineProperty` API 可以通过 d`escriptor` 对象参数中的 s`et` 属性和 g`et` 属性分别设置访问对象的属性时的拦截函数。

下面是一个简单的例子。

```other
let foo
const bar = {}
// bar 定义一个 foo 属性
Object.defineProperty(bar, 'foo', {
	get() {
		return foo
	},
	set(value) {
		foo = value
	}
})
// 此时，修改 bar.foo 的同时，也会修改 foo。
// 也就是说 foo 会根据 bar.foo 的更新，而发生响应式变化。 
bar.foo = 2
foo // 2
```

Vue 2 通过 `Object.defineProperty()` API ，可以比较方便地得到实现数据劫持，但 `Object.defineProperty()` API 实现响应式也有一些缺陷。

`Object.defineProperty()` API 是对响应式对象属性进行的数据劫持，每当添加一个属性，我们都需要对其进行数据劫持，这就导致了自动添加劫持这个行为无法通过 JavaScript 原生 API 实现。Vue 2 是通过遍历 Vue 实例的 data 选项中的对象的属性帮我们自动实现了 data 选项中的数据劫持，但有些场景需要在用户直接操作响应式数据时就要实现数据劫持的，这时 Vue2 就提供了一些用于实现数据劫持的 API。

1. 当你想在响应式对象或数组上添加属性时，Vue 2 提供了 `Vue.set(object, propertyName, value)` API 。
2. 使用 `delete` 删除对象属性时，数据劫持也随之消失了。故 Vue 2 提供了 `Vue.delete(target, propertyName/index)` API。

```other
delete bar.foo
foo // 值为 2，理想情况下 foo 的值应该为 undefined
```

1. Vue 2 重写了操作数组的原生 API。

Vue 2 在官方文档的深入响应式原理一节中，说明了 Vue 2 无法自动实现劫持的所有情况，并提供了 API 来处理这些情况。

## Proxy 对象

vue 3 `Rective` 选择 `Proxy` 对象作为数据劫持的工具，一个重要的原因就是`Proxy` 对象解决了 `Object.defineProperty()` 的一些缺陷。

`Proxy` 对象可以通过 `handler` 对象参数中的 `set` 、`get` 和 `deleteProperty` 属性来声明对象对应操作的拦截函数。

下面是一个简单的例子，功能和 `Object.defineProperty` API 实现的类似，但此例可以监听到属性的删除。

```other
let foo
// bar 定义一个 foo 属性
const bar = new Proxy({}, {
	get(target, property) {
		return target[property]
	},
	set(target, property, value) {
		target[property] = value
		if (property === 'foo')
			foo = value
	},
	deleteProperty(target, property) {
		if (property === 'foo')
			foo = undefined
		return true
	}
})
// 此时，修改 bar.foo 的同时，也会修改 foo。
// 也就是说 foo 会根据 bar.foo 的更新，而发生响应式变化。 
bar.foo = 2
foo // 2
delete bar.foo
foo // undefined
```

可以注意到，`Proxy` 对象是针对目标对象来监听，而不是针对对象的某个具体属性，也就是说，`Proxy` 对象可以代理那些定义时不存在的属性，同时可以通过 `deleteProperty` 实现对删除操作的代理。另外，`Proxy` 对象支持的拦截操作有13 种，这为不同情况的数据拦截提供了极大的便利。

### Object setter 和 getter

Vue 3 中的 `ref` 的实现也用到了对象属性的 `set` 和 `get` 函数，来实现对 value 属性的修改时的响应式监听。

```other
let foo
const bar = {
  get foo() {
    return _foo
  },
  set foo(value) {
    _foo = value
    foo = value
  }
}
// 此时，修改 bar.foo 的同时，也会修改 foo。
// 也就是说 foo 会根据 bar.foo 的更新，而发生响应式变化。 
bar.foo = 2
foo // 2
```

至此，关于 Vue 2 和 Vue3 是如何实现数据劫持的，我有了初步的思考的认识。

> 我们可以把日常开发中用到的数据，无论是浏览器的本地存储，还是网络数据，都封装成响应式数据，统一使用响应式数据开发的模式。这样，我们开发项目的时候，只需要修改对应的数据就可以了。

> 基于响应式的开发模式，我们还可以按照类似的原理，把我们需要修改的数据，都变成响应式。

Vue 社区中其实已经有一个类似的工具集合，也就是 VueUse，它把开发中常见的属性都封装成为响应式函数。

```other
npm install @vueuse/core
```
