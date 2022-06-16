<script setup>
  const props = defineProps({
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
  })
  const emits = defineEmits(['update:state'])
  function onBeforeEnter(el) {
    el.style.transform = `translate(${props.x}px, ${props.y}px)`
  }
  function onEnter(el, done) {
    el.offsetWidth
    el.style.transform = `translate(${window.innerWidth - 46}px, ${window.innerHeight - 60}px)`
    el.addEventListener('transitionend', done)
  }
  function onAfterEnter(el) {
    emits('update:state', false)
    el.style.display = 'none'
  }
</script>
<template>
  <span class="dustbin">🗑</span>
  <Transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter">
    <span v-show="state" class="document">📄</span>
  </Transition>
</template>
<style scoped>
  .dustbin {
    font-size: 2em;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  .document {
    font-size: 1.2em;
    position: fixed;
    left: 0px;
    top: 0px;
    transition: all 0.8s linear;
  }
</style>
