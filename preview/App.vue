<template>
  <div>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style>
body::-webkit-scrollbar {
  width: 0;
}
</style>
