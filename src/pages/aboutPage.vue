<script setup>
  import { sadState } from '@/store/sad'
  const store = sadState()
</script>
<template>{{ store.contactStoreState }}</template>
