<template>
  <router-view #="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { initVisualData, injectKey, localKey } from '@/visual-editor/hooks/useVisualData'

const visualData = initVisualData()
// 注入可视化编辑器所有配置
provide(injectKey, visualData)

const { jsonData } = visualData

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem(localKey, JSON.stringify(jsonData))
})
</script>

<style lang="scss">
@import 'style/common';
</style>
