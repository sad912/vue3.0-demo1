<template>
  <div>
    <router-link to="/">首页</router-link>
    |
    <router-link to="/about">关于</router-link>
  </div>
  <router-view v-slot="{ Component, route }">
    <transition name="route" mode="out-in">
      <div :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<style scoped>
  .route-enter-from,
  .route-leave-to {
    opacity: 0;
  }
  .route-enter-active,
  .route-leave-active {
    transition: opacity 0.5s linear;
  }
</style>
