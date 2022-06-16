<script setup>
  import { computed, ref } from 'vue'
  import { useToggle } from '@vueuse/core'
  const showInfo = ref(false)
  const toggleInfo = useToggle(showInfo)
  let title = ref('')
  let todoList = ref([
    {
      title: '学习 Vue 3',
      done: false,
    },
  ])
  const addTodo = () => {
    if (!title.value.trim()) {
      toggleInfo()
      setTimeout(() => {
        toggleInfo()
      }, 1500)
    } else {
      todoList.value.push({
        title: title.value.trim(),
        done: false,
      })
      title.value = ''
    }
  }
  const deleteTodo = (index) => {
    todoList.value.splice(index, 1)
  }
  const clear = () => {
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
    <TransitionGroup name="list" tag="ul">
      <li v-for="(todoItem, index) in todoList" :key="todoItem.title">
        <input v-model="todoItem.done" type="checkbox" />
        <span :class="{ done: todoList.done }">{{ todoItem.title }}</span>
        <span @click="deleteTodo(index)"> ❌ </span>
      </li>
    </TransitionGroup>
    <div>全部完成<input v-model="allDone" type="checkbox" /></div>
    <div>完成情况{{ all - undoneCount }} / {{ all }}</div>
  </template>
  <div v-else>暂无数据</div>
  <Transition name="info">
    <div v-if="showInfo" class="infoWrapper">
      <div class="info">输入为空</div>
    </div>
  </Transition>
</template>

<style scoped>
  .infoWrapper {
    position: fixed;
    top: 12px;
    width: 100%;
  }
  .infoWrapper > .info {
    color: red;
    text-align: center;
  }
  .info-enter-from,
  .info-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .info-enter-active,
  .info-leave-active {
    transition: all 0.3s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all ease 0.3s;
  }
  .list-leave-active {
    position: absolute;
  }
</style>
