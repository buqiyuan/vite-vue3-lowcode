<template>
  <template v-for="outItem in jsonData" :key="outItem._vid">
    <slot-item :element="outItem" :config="visualConfig" />
  </template>
</template>

<script lang="tsx">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { visualConfig } from '@/visual.config'
import SlotItem from './slot-item.vue'
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
  emits: ['update:visible'],
  setup(props) {
    const state = reactive({
      jsonData: JSON.parse(sessionStorage.getItem('blocks') || '{}')
    })

    // 渲染组件
    const renderCom = (element) => {
      if (Array.isArray(element)) {
        return element.map((item) => renderCom(item))
      }
      const component = props.config.componentMap[element.componentKey]

      return component.render({
        size: {},
        props: element.props || {},
        block: element,
        model: {},
        custom: {}
      })
    }

    return {
      ...toRefs(state),
      visualConfig,
      renderCom
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
