<!--
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 21:59:22
 * @LastEditors: 卜启缘
 * @Description: 效果预览页面
 * @FilePath: \vite-vue3-lowcode\preview\views\preview.vue
-->
<template>
  <template v-for="outItem in blocks" :key="outItem._vid">
    <slot-item :element="outItem" :models="models" :actions="actions" />
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { Toast } from 'vant'
import type { VisualEditorModelValue } from '@/visual-editor/visual-editor.utils'
import SlotItem from './slot-item.vue'
import router from '../router'
import { CacheEnum } from '@/enums'

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
      if (currentPage?.config) {
        const { bgImage, bgColor } = currentPage.config
        const bodyStyleStr = `
            body {
                  background-color: ${bgColor};
                  background-image: url(${bgImage});
                }
             `
        document.styleSheets[0].insertRule(bodyStyleStr)
      }
    })

    return {
      ...toRefs(state),
      actions: jsonData.actions,
      models: jsonData.models
    }
  }
})
</script>
