<template>
  <el-dialog v-model="dialogVisible" custom-class="h5-preview" :show-close="false" width="30%">
    <simulator class="simulator">
      <template v-for="outItem in jsonDataClone.blocks" :key="outItem._vid">
        <slot-item :element="outItem" :config="config" />
      </template>
    </simulator>
  </el-dialog>
</template>

<script lang="tsx">
import { defineComponent, PropType, reactive, watch, toRefs } from 'vue'
import { useVModel } from '@vueuse/core'
import { VisualEditorConfig } from '@/visual-editor/visual-editor.utils'
import Simulator from '../common/simulator.vue'
import SlotItem from './slot-item.vue'
import { cloneDeep } from 'lodash'
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
    Simulator,
    SlotItem
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    jsonData: {
      type: Object,
      default: () => ({})
    },
    config: { type: Object as PropType<VisualEditorConfig>, required: true }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const state = reactive({
      dialogVisible: useVModel(props, 'visible', emit),
      jsonDataClone: cloneDeep(props.jsonData)
    })

    watch(
      () => state.dialogVisible,
      (val) => {
        if (val) {
          state.jsonDataClone = cloneDeep(props.jsonData)
        }
      }
    )

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
