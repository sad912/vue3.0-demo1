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
