<template>
  <!--  <router-view #="{ Component }">-->
  <!--    <component :is="Component" />-->
  <!--  </router-view>-->
  <visual-editor
    v-model="jsonData"
    :config="visualConfig"
    :form-data="formData"
    :custom-props="customProps"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import VisualEditor from '@/visual-editor/index.vue'
import { visualConfig } from './visual.config'

export default defineComponent({
  name: 'App',
  components: { VisualEditor },
  setup() {
    const state = reactive({
      jsonData: {
        container: {
          height: 500,
          width: 800
        },
        blocks: JSON.parse(sessionStorage.getItem('blocks') || '[]')
      },
      formData: [],
      customProps: {}
    })

    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('blocks', JSON.stringify(state.jsonData.blocks))
    })

    return {
      ...toRefs(state),
      visualConfig
    }
  }
})
</script>

<style lang="scss">
@import 'style/common';
</style>
