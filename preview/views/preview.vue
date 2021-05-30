<template>
  <template v-for="outItem in currentPage" :key="outItem._vid">
    <slot-item :element="outItem" :config="visualConfig" />
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
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

    const state = reactive({
      currentPage: jsonData.pages[route.value.path]?.blocks
    })
    // 如果当前页面路由匹配不到，则重定向到首页
    if (!state.currentPage) {
      router.replace('/')
    }

    return {
      ...toRefs(state),
      visualConfig
    }
  }
})
</script>

<style lang="scss">
.h5-preview {
  overflow: hidden;

  .el-dialog__header {
    display: none;
  }

  .simulator {
    padding-right: 0;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
