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
