<script setup>
  import { computed, ref } from 'vue'
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
