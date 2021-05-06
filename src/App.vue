<template>
  <visual-editor />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import VisualEditor from '@/visual-editor/index.vue'
import { initVisualData, injectKey, localKey } from '@/visual-editor/hooks/useVisualData'

export default defineComponent({
  name: 'App',
  components: { VisualEditor },
  setup() {
    const visualData = initVisualData()
    // 注入可视化编辑器所有配置
    provide(injectKey, visualData)

    const { jsonData } = visualData

    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem(localKey, JSON.stringify(jsonData))
    })
  }
})
</script>

<style lang="scss">
@import 'style/common';
</style>
