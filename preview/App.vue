<template>
  <router-view #="{ Component, route }">
    <keep-alive ref="keepAliveRef">
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const keepAliveRef = ref()
    const route = useRoute()

    watch(
      () => route.fullPath,
      () => {
        // 获取keep-alive缓存
        const routeCaches = keepAliveRef.value?.$?.__v_cache
        console.log('keep-alive cache', routeCaches)
        routeCaches.delete('/')
      }
    )

    return { keepAliveRef }
  }
})
</script>

<style>
body::-webkit-scrollbar {
  width: 0;
}
</style>
