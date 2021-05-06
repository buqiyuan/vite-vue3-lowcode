<template>
  <router-view #="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {}
  }
})
</script>

<style>
body::-webkit-scrollbar {
  width: 0;
}
</style>
