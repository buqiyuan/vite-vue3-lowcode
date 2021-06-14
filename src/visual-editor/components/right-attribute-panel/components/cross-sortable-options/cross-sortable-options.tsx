/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 15:00:45
 * @LastEditTime: 2021-06-14 17:41:14
 * @LastEditors: 卜启缘
 * @Description: 可以拖拽排序的选项列表
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\cross-sortable-options\cross-sortable-options.tsx
 */

import { defineComponent, reactive, computed, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { ElInput } from 'element-plus'
import { useVModel } from '@vueuse/core'

export const CrossSortableOptionsEditor = defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      list: useVModel(props, 'modelValue', emit),
      drag: false
    })

    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    })

    return () => (
      <Draggable
        tag="ul"
        list={state.list}
        class="list-group"
        component-data={{
          tag: 'ul',
          type: 'transition-group',
          name: !state.drag ? 'flip-list' : null
        }}
        handle=".handle"
        {...dragOptions.value}
        itemKey={''}
        onStart={() => (state.drag = true)}
        onEnd={() => (state.drag = false)}
      >
        {{
          item: ({ element, index }) => (
            <div class={'flex items-center justify-between'}>
              <i class={'el-icon-s-grid handle'}></i>
              <ElInput
                v-model={state.list[index]}
                class={'m-12px'}
                style={{ width: '270px' }}
              ></ElInput>
              <div class={'flex flex-col'}>
                <i class={'el-icon-circle-plus-outline'} onClick={() => state.list.push('')}></i>
                <i class={'el-icon-remove-outline'} onClick={() => state.list.splice(index, 1)}></i>
              </div>
            </div>
          )
        }}
      </Draggable>
    )
  }
})
