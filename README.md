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
# 08 | 组件化：如何像搭积木一样开发网页？

开发一个简单的「评级分数」组件。

```other
touch src/components/Rate.vue
```

```other
// src/components/Rate.vue

<script setup>
  import { computed, defineProps } from 'vue'
  const props = defineProps({
    value: Number,
  })
  let rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value))
</script>

<template>
  {{ rate }}
</template>
```

```other
// src/pages/homePage.vue

<script setup>
  import { ref } from 'vue'
  import Rate from '../components/Rate.vue'
  const rate = ref(3)
</script>

<template>
  <Rate :value="rate" />
</template>
```

此时，评级分数组件可以通过 rate 值进行响应式变化，这里用到了组件传参的基本方式。

我们继续为这个评级分数组件添加功能，例如，添加一个主题的功能，用于修改评级分数组件的样式。

```other
// src/components/Rate.vue

<script setup>
  import { computed, defineProps } from 'vue'
  const props = defineProps({
    value: Number,
    theme: {
      type: String,
      default: 'orange',
    },
  })
  let rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value))
  let fontStyle = computed(() => `color:${props.theme};`)
</script>

<template>
  <div :style="fontStyle">
    {{ rate }}
  </div>
</template>
```

```other
// src/pages/homePage.vue

<script setup>
  import { ref } from 'vue'
  import Rate from '../components/Rate.vue'
  const rateList = ref([
    {
      score: 1,
    },
    {
      score: 3,
      theme: 'red',
    },
    {
      score: 5,
      theme: 'blue',
    },
  ])
</script>

<template>
  <Rate v-for="rate in rateList" :key="rate" :value="rate.score" :theme="rate.theme" />
</template>
```

这还不够智能，我们换一种方式实现评级分数组件的主体，五个空心五角星和五个实心五角星通过绝对定位进行重叠，通过修改实心五角星的宽度实现评级分数的效果。

同时，实现鼠标移入时修改实心五角星宽度实现hover评级效果，移出时恢复原先评级分数时的实心五角星宽度，点击时出发组件事件，修改副组件的评级分数值。

代码如下：

```other
// src/components/Rate.vue

<script setup>
  import { computed, defineEmits, ref } from 'vue'
  const props = defineProps({
    score: Number,
    theme: {
      type: String,
      default: 'orange',
    },
  })
  let fontStyle = computed(() => `color:${props.theme};`)
  let width = ref(props.score)
  const mouseOver = (num) => {
    width.value = num
  }
  const mouseOut = () => {
    width.value = props.score
  }
  let fontWidth = computed(() => `width:${width.value}em;`)
  const emits = defineEmits(['update:score'])
  const updateScore = (num) => {
    emits('update:score', num)
  }
</script>

<template>
  <div class="rate" :style="fontStyle" @mouseout="mouseOut">
    <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)">☆</span>
    <span class="solid" :style="fontWidth">
      <span v-for="num in 5" :key="num" @click="updateScore(num)" @mouseover="mouseOver(num)">★</span>
    </span>
  </div>
</template>

<style scoped>
  .rate {
    position: relative;
  }
  .rate > .solid {
    position: absolute;
    display: inline-block;
    overflow: hidden;
    left: 0;
    top: 0;
  }
</style>
```

```other
// src/pages/homePage.vue

<script setup>
  import { ref } from 'vue'
  import Rate from '../components/Rate.vue'
  const rateList = ref([
    {
      score: 1,
    },
    {
      score: 3,
      theme: 'red',
    },
    {
      score: 4.5,
      theme: 'blue',
    },
  ])
</script>

<template>
  <h1>这是首页</h1>
  <TodoList />
  <Rate v-for="rate in rateList" :key="rate" v-model:score="rate.score" :theme="rate.theme" />
</template>
```

这里用到了 v-model 配合事件的语法糖，具体可以查阅官方文档「事件-配合 v-model 使用」章节。

接着，我们新增插槽功能，为评级分数组件添加可插入的名称。

```other
// src/components/Rate.vue

<script setup>
  import { computed, defineEmits, ref } from 'vue'
  const props = defineProps({
    score: Number,
    theme: {
      type: String,
      default: 'orange',
    },
  })
  let fontStyle = computed(() => `color:${props.theme};`)
  let width = ref(props.score)
  const mouseOver = (num) => {
    width.value = num
  }
  const mouseOut = () => {
    width.value = props.score
  }
  let fontWidth = computed(() => `width:${width.value}em;`)
  const emits = defineEmits(['update:score'])
  const updateScore = (num) => {
    emits('update:score', num)
  }
</script>

<template>
  <div :style="fontStyle">
    <slot />
    <div class="rate" @mouseout="mouseOut">
      <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)">☆</span>
      <span class="solid" :style="fontWidth">
        <span v-for="num in 5" :key="num" @click="updateScore(num)" @mouseover="mouseOver(num)">★</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
  .rate {
    position: relative;
    display: inline-block;
  }
  .rate > .solid {
    position: absolute;
    display: inline-block;
    overflow: hidden;
    left: 0;
    top: 0;
  }
</style>
```

```other
// src/pages/homePage.vue

<script setup>
  import { ref } from 'vue'
  import TodoList from '../components/TodoList.vue'
  import Rate from '../components/Rate.vue'
  const rateList = ref([
    {
      score: 1,
      name: '课程评分',
    },
    {
      score: 3,
      theme: 'red',
      name: '综合得分',
    },
    {
      score: 4.5,
      theme: 'blue',
      name: '自我评价',
    },
  ])
</script>

<template>
  <h1>这是首页</h1>
  <TodoList />
  <Rate v-for="rate in rateList" :key="rate" v-model:score="rate.score" :theme="rate.theme">
    {{ rate.name }}
  </Rate>
</template>
```

至此，我们通过一个简单的评级组件的设计，对 Vue 3 的特性和功能有了进阶的认识。

# 10 | 数据流：如何使用Vuex设计你的数据流

> 现代 Web 应用都是由三大件构成，分别是：组件、数据和路由。

由于目前 `Pinia` 逐渐替代 `Vuex` ，我尝试对 `Pinia` 进行一个简单的入门。还是贯彻以往的学习思路，先看文档写demo，再深入原理。

## Pinia vs Vuex

Pinia 原本是使用 Composition API 重新设计的 Vuex。也就是说，从文档来看，Pinia 已经替代了 Vuex。同时，官方文档是这样描述二者的区别的：

> Compared to Vuex, Pinia provides a simpler API with less ceremony, offers Composition-API-style APIs, and most importantly, has solid type inference support when used with TypeScript.

总结如下：

1. 更为精简的 API；
2. 组合式 API；
3. TypeScript 支持；

### 安装

```other
pnpm add pinia
```

本文直接使用 Vue3 和 Composition API `<script setup>` 的开发方式进行学习。

```other
// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).mount('#app')
```

## 一言蔽之，什么是 Pinia?

> it hosts global state.

> It has **three concepts**, the state, getters and actions and it's safe to assume these concepts are the equivalent of `data`, `computed` and `methods` in components.

使用 `data`、`computed` 和 `methods` 三个概念类比 Pinia 的 `state`、`getters` 和 `action`，可以说是很形象了。

## 声明状态管理

使用 `defineStore()` 函数定义一个状态管理实例。第一个参数为实例名称字符串，第二个参数为实例选项组成的对象。

```other
// src/store/sad.ts

import { defineStore } from 'pinia'

export const sad = defineStore('SAD', {
  // other options...
})
```

我们可以在组件内引入所定义实例。

```other
// src/components/test.vue

<script setup>
import { sad } from 'pinia'
const sadStore = sad()
</script>
```

## State

State 即状态，作为 `defineStore()` 函数的第二个选项对象参数的一个选项，值为返回状态对象的函数。声明一个 `mode` 状态，代码如下：

```other
// src/store/sad.ts

import { defineStore } from 'pinia'

export const sadState = defineStore('SAD', {
  state: () => {
    mode: 'learning',
    modeList: [],
  }
})
```

然后，我们在组件中，可以通过解构状态管理实例来访问这个 `mode` 状态。

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const { mode } in sadState()
</script>
<template>
  {{ mode }}
</template>
```

### 响应式

通过直接修改状态管理实例中的 `mode` 是可以生效的，但是这并不能使其保持响应式。如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const { mode } = sadState()
  setTimeout(() => {
    sadState().mode = 'sleeping'
  }, 500)
</script>
<template>
	<div>这里只会显示 learning:</div>
	<div>{{ mode }}</div>
</template>
```

当然，我们可以利用 `computed()` 函数实现其响应式。如下：

```other
// src/compnents/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  import { computed } from 'vue'
  const { mode } = sadState()
  setTimeout(() => {
    sadState().mode = 'sleeping'
  }, 500)
  const computedMode = computed(() => sadState().mode)
</script>
<template>
  <div>这里只会显示 learning：</div>
  <div>{{ mode }}</div>
  <div>但这里会在 500ms 后显示 sleeping：</div>
  <div>{{ computedMode }}</div>
</template>
```

但是，Pinia 提供了更方便的方法 `storeToRefs()`，使用这个方法可以使解构后的状态实例变成响应式的。如下：

```other
// src/compnents/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  import { storeToRefs } from 'pinia'
  const { mode } = storeToRefs(sadState())
  setTimeout(() => {
    sadState().mode = 'sleeping'
  }, 500)
</script>
<template>
  <div>这里先显示 learning，500ms 后显示 sleeping:</div>
  <div>{{ mode }}</div>
</template>
```

另外，状态实例化的返回值，是可以保持响应式的。如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  setTimeout(() => {
    store.mode = 'sleeping'
  }, 500)
</script>
<template>
  <div>先显示 learning，500ms 后显示 sleeping</div>
  <div>{{ store.mode }}</div>
</template>
```

### 重置

状态管理实例提供了重置状态函数 `$reset()` 。如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.mode = 'working'
  setTimeout(() => {
    store.$reset()
  }, 500)
</script>
<template>
  <div>先显示 working，500ms 后状态重置，显示 learning</div>
  <div>{{ store.mode }}</div>
</template>
```

### 修改

上述例子中，我们多次使用直接修改的方式来改变 `mode` 的状态，修改状态的方式一共有三种：

1. 直接修改状态值；
2. 通过 `$patch()` 分发要修改的状态组成的对象值，实现修改；
3. 通过 `$patch()` 分发用于修改值的函数，实现修改；

给 `$dispatch()` 函数传递一个多个状态属性和状态值组成的对象，可以实现多个状态值的同时修改。下面是一个传递对象的例子：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$patch({
    mode: 'working',
  })
</script>
<template>
  <div>此时显示 working：</div>
  <div>{{ store.mode }}</div>
</template>
```

但对于状态值为数组类型的状态的修改，出于代价和简易程度的考虑，往往采用给 `$dispatch()` 函数传递一个修改状态的回调函数，回调函数的参数为状态实例。下面是一个传递回调函数的例子：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$patch((store) => {
    store.modeList.push('learning')
    store.modeList.push('working')
    store.modeList.push('sleeping')
  })
</script>
<template>
  <div v-for="mode in store.modeList" :key="mode">{{ mode }}</div>
</template>
```

### 替换

状态管理实例还提供了 `$store` 属性，可以用于替换修改实例的状态。如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  setTimeout(() => {
    store.$state = { mode: 'sleeping' }
  }, 500)
</script>
<template>
  <div>先显示 learning，500ms 后显示 sleeping：</div>
  <div>{{ store.mode }}</div>
</template>
```

### 发布订阅

状态管理实例还提供了 `$subscribe()` 方法，可以用于监听状态的修改。

```other
store.$subscribe((mutation, state) => {
  mutation.type // 'direct' | 'patch object' | 'patch function'
  mutation.storeId // 'SAD'
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to store.$patch()
  state.mode //'learning'
})
```

当直接对状态进行修改时，`mutation.type` 为 `direct`。代码如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$subscribe((mutation, state) => {
    console.log(mutation.type) // 'direct'
    console.log(state.mode) // 'working'
  })
  store.mode = 'working'
</script>
<template></template>
```

```other
// src/components/test.vue
<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$subscribe((mutation, state) => {
    console.log(mutation.type)  // 'direct'
    console.log(state.modeList[0]) // 'sleeping'
  })
  store.modeList.push('sleeping')
</script>
<template></template>
```

当通过 `$patch()` 方法传递状态对象时，`mutation.type` 应为 `patch object`。测试代码如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(state.mode)
  })
  store.$patch({
    mode: 'sleeping',
  })
</script>
<template></template>
```

我期望发布订阅的回调函数执行一次，但是浏览器控制台显示回调函数被执行了两次，一次修改类型为 `patch object`，一次为 `direct`。光看文档找不出其中缘由，看完文档再读源码吧。

```other
// console.log
patch object
sleeping
direct
sleeping
```

接着，尝试给 `$patch()` 方法传递函数，`mutation.type` 应为 `patch function`。测试代码如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(state.mode)
  })
  store.$patch((state) => {
    state.mode = 'reading'
  })
</script>
<template></template>
```

同样的问题，控浏览器控制台显示发布订阅的回调函数被执行两次，日志如下：

```other
// console.log
patch funtion
reading
direct
reading
```

另外，当同时使用直接修改和 `$patch()` 方式修改的时候，也测试出了一些问题。测试代码如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(state.mode)
  })
  store.modeList.push('sleeping')
  store.$patch({
    mode: 'sleeping',
  })
  store.mode = 'working'
  store.$patch((state) => {
    state.mode = 'reading'
  })
</script>
<template></template>
```

我期望回调函数调用四次，但浏览器控制台显示前两次修改调用了一次，后两次修改调用了一次，还莫名其妙调用了一次且 `mutation.type` 为 `direct`。控制台日志如下：

```other
// console.log

patch object
sleeping
patch function
reading
direct
reading
```

另外，我继续分别测试了使用 `$reset()` 和`$state` 修改 state 的情况，两种情况和使用 `$patch()` 传递函数修改 state 时一样。

面对测试的疑问，我开始尝试寻找答案，在官方 issues 中，有这么一个问题。

[`$subscribe` miss mutations with type of `direct` immediately after`patch` mutations · Issue #992 · vuejs/pinia](https://github.com/vuejs/pinia/issues/992)

我尝试在发布订阅函数的第二个选项对象参数中，加入 `flush: sync`。代码如下：

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
  store.$subscribe(
    (mutation, state) => {
      console.log(mutation.type)
      console.log(state.mode)
    },
    { flush: 'sync' }
  )
<template></template>
```

此时上述的期望打印都可以满足了。

而至于为什么会这样。还需要深入研究。本文目的是入门 Pinia，记录看文档时学习和思考的过程，先不做深入研究。

## Getters

Getters 的定义和使用类似于计算属性。

`getters` 作为 `defineStore()` 函数第二个参数的选项属性，用于声明 `Getters` ，值为带有 `state` 参数的函数。

下面是一个简单的例子。

```other
// src/store/sad.js

import { defineStore } from 'pinia'
export const sadState = defineStore('SAD', {
  state: () => {
    return {
      mode: 'learning',
      modeList: [],
    }
  },
  getters: {
    myState: (state) => `I am ${state.mode}.`,
  },
})
```

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
</script>
<template>{{ store.myState }}</template>
```

浏览器显示 `I am learning.`

同时，可以使用 `this` 在一个 `getter` 里调用另一个 `getter`。

```other
// src/store/sad.js

import { defineStore } from 'pinia'
export const sadState = defineStore('SAD', {
  state: () => {
    return {
      mode: 'learning',
      modeList: [],
    }
  },
  actions: {
    setModeToWorking() {
      this.mode = 'working'
    },
  },
  getters: {
    myState: (state) => `I am ${state.mode}.`,
    noTime() {
      return `I have no time because ${this.myState}`
    },
  },
})
```

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
</script>
<template>{{ store.noTime }}</template>
```

浏览器显示 `I have no time because I am learning.`

由于 `getters` 默认传递参数 `state`，如果想为 `getters` 传递其他参数，可以选择给 `getters` 返回带参数的函数。下面是一个简单的例子：

```other
// src/store/sad.js

import { defineStore } from 'pinia'
export const sadState = defineStore('SAD', {
  state: () => {
    return {
      mode: 'learning',
      modeList: ['learning', 'working', 'sleeping', 'reading', 'writing'],
    }
  },
  getters: {
    getModeByIndex: (state) => {
      return (index) => {
        return state.modeList[index]
      }
    },
  },
})
```

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
</script>
<template>modeList 的第一个 mode 值为：{{ store.getModeByIndex(0) }}</template>
```

此时浏览器显示 `modeList 的第一个 mode 值为：learning`。

要注意，此时的 `getters` 是不被缓存的，但是你可以在 `getters` 内部缓存一些数据，用于返回函数中进行处理，来提高性能。

另外，在 `getters` 中还可以使用其他 `store` 的 `getters`。例子如下：

```other
// src/store/test.js

import { defineStore } from 'pinia'

export const testState = defineStore('TEST', {
  state: () => {
    return {
      test: '测试',
    }
  },
  getters: {
    valueOfTest(state) {
      return state.test
    },
  },
})
```

```other
// src/store/sad.js

import { defineStore } from 'pinia'
import { testState } from '@/store/test.ts'
export const sadState = defineStore('SAD', {
  state: () => {
    return {
      mode: 'learning',
    }
  },
  getters: {
    contactStoreState(state) {
      return state.mode + '|' + testState().valueOfTest
    },
  },
})
```

```other
// src/components/test.vue

<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
</script>
<template>{{ store.contactStoreState }}</template>
```

浏览器显示 `learning|测试`。

## Actions

`Actions` 相当于组件内的 `methods`。

`actions` 作为 `defineStore()` 函数第二个参数的选项属性，用于声明 `Actions` ，值为用于逻辑操作的函数。

通过 `this` 可以访问 `state` 和 `getters`。

同时，可以在 `actions` 中使用异步操作。

另外，还可以访问其他 `store` 中的 `actions`。

由于 `actions` 和 `methods` 几乎一致，不再用代码展示。

## Plugins

Plugins 的功能，在之后进阶 Pinia 博客中再详细介绍。


# 11 | 路由：新一代vue-router带来什么变化

## 路由控制权的变化

在前端还没有工程化、精细化的年代，路由是由后端控制的。用户访问路由地址后，通过服务器的路由系统来匹配对应的模版，然后加载模版对应的 JavaScript、CSS，然后再到用户端。页面跳转时，重复这个过程。

在一定程度上，这种开发模式，前端部分是为后端进行服务的，前端工作是后端工作的子集。

这种开发模式有其优劣性。它的开发速度会很快，但它开发出来的产品往往用户体验不是很好，页面跳转需要刷新整个页面，页面加载时间往往较长。

而前端控制路由的时代，用户访问路由后，会直接访问项目的入口文件，然后在入口文件中加载 JavaScript、CSS 文件，再通过 JavaScript 获取路由来渲染对应的路由组件。页面跳转时仅仅重复

「再通过 JavaScript 获取路由来渲染对应的路由组件」这个过程。

这种模式，由于路由跳转不需要重新刷新页面，用户体验会好很多。

同时，正是由于前端具有了控制路由的能力，才使得前后端可以完全分离，前后端不再有明确的依赖关系，而是相互配合。一定程度上，这促进了前端行业精细化的发展。

## 前端控制路由的原理

前面提到了，前端控制路由的一大优点就是：路由跳转不需要重新刷新页面。而路由变化往往又伴随浏览器地址 URL 的变化，那怎样才能在改变 URL 时，不会导致页面刷新呢？

方式有二。一种是利用 `hashchange` 事件可以监听到 `window.location.hash` API 导致的 URL 变化，通常称为「hash 模式」；一种是利用 `popstate` 事件可以配合 `pushState` 和 `replaceState` API 进行监听页面会话的历史活动条目的改变，通常称为「history模式」。

### hash 模式

下面是一个简单的例子：

访问 `http://sad912.com` ，在控制台键入以下代码

```javascript
function fn() {
	console.log('路由改变，切换页面函数执行了')
}
window.addEventListener('hashchange', fn)
window.location.hash = '/test'
```

此时，浏览器 URL 变为 `http://sad912.com/#/test`，控制台打印如下：

```other
'test/'
路由改变，切换页面函数执行了
```

在上述例子中，我们可以通过 `fn` 函数，简单实现路由变化且触发切换页面的操作。

### history 模式

HTML 5 标准发布之后，提供了 `pushState` 和 `replaceState` API。利用这两个 API 可以实现不刷新页面修改 URL，同时可以配合 `popstate` 事件进行使用。

下面是一个简单的例子：

访问 `http://sad912.com` ，在控制台键入以下代码

```javascript
history.pushState({page: 1}, '', 'page1')
```

此时，浏览器 URL 变为 `http://sad912.com/page1`。

接着，我尝试配合 `popstate` 事件进行使用。

```javascript
function fn(event) {
  console.log(`state:${JSON.stringify(event.state)}`)
}
window.addEventListener('popstate', fn)
history.pushState({page:2}, '', 'page2')
history.replaceState({page:3}, '', 'page3')
```

此时，浏览器 URL 变为 `http://sad912.com/page3`。

如果点击浏览器的返回按钮，或在控制台执行 `history.back()`，控制台会打印 `state:{“page“: 1}`；继续返回操作，控制台会打印 `state:null`；此时在控制台执行 `history.go(2)`，控制台会打印 `state:{”page“:3}`。

在上述例子中，我们同样可以通过 `fn` 函数，简单实现路由变化时触发切换页面的操作。

## 挖坑

理解原理之后，挖个坑，未来实现一个简易版的 vue-router。
