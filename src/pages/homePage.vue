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
