<!--
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-06-24 00:19:14
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\preview\views\preview.vue
-->
<template>
  <template v-for="outItem in blocks" :key="outItem._vid">
    <slot-item :element="outItem" :config="visualConfig" />
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { Toast } from 'vant'
import { visualConfig } from '@/visual.config'
import { CacheEnum } from '@/enums'
import { VisualEditorModelValue } from '@/visual-editor/visual-editor.utils'
import SlotItem from './slot-item.vue'
import router from '../router'

/**
 * @name: preview
 * @author: 卜启缘
 * @date: 2021/4/29 23:09
 * @description：preview
 * @update: 2021/4/29 23:09
 */
export default defineComponent({
  name: 'Preview',
  components: {
    SlotItem
  },
  setup() {
    const jsonData: VisualEditorModelValue = JSON.parse(
      localStorage.getItem(CacheEnum.PAGE_DATA_KEY) as string
    )

    if (!jsonData || !Object.keys(jsonData.pages)) {
      Toast.fail('当前没有可以预览的页面！')
    }

    const route = router.currentRoute

    const currentPage = jsonData.pages[route.value.path]
    console.log('currentPage:', currentPage)

    const state = reactive({
      blocks: currentPage?.blocks
    })

    // 如果当前页面路由匹配不到，则重定向到首页
    if (!state.blocks) {
      router.replace('/')
    }

    onMounted(() => {
      const { bgImage, bgColor } = currentPage.config
      document.body.style.setProperty('--image', `url(${bgImage})`)
      document.body.style.setProperty('--bg-color', bgColor)
    })

    return {
      ...toRefs(state),
      visualConfig
    }
  }
})
</script>

<style lang="scss">
body {
  background-color: var(--bg-color);
  background-image: var(--image);
}
</style>
