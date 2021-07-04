/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 15:00:45
 * @LastEditTime: 2021-07-03 10:00:59
 * @LastEditors: 卜启缘
 * @Description: 可以拖拽排序的选项列表
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\components\cross-sortable-options-editor\cross-sortable-options-editor.tsx
 */

import { defineComponent, reactive, computed, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { ElInput, ElCheckboxGroup, ElCheckbox } from 'element-plus'
import { useVModel } from '@vueuse/core'
import { isObject } from '@/visual-editor/utils/is'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'

export const CrossSortableOptionsEditor = defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<(string | LabelValue)[]>,
      default: () => []
    },
    multiple: Boolean // 是否多选
  },
  setup(props, { emit }) {
    const { currentBlock } = useVisualData()

    const state = reactive({
      list: useVModel(props, 'modelValue', emit),
      drag: false
    })

    const checkList = computed({
      get: () => {
        const value = currentBlock.value.props.modelValue
        return Array.isArray(value) ? value : [...new Set(value?.split(','))]
      },
      set(value) {
        currentBlock.value.props.modelValue = value
      }
    })

    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    })

    const onChange = (val) => {
      val = val.filter((item) => item !== '')
      val = props.multiple
        ? val
        : val.filter((n) => !currentBlock.value.props.modelValue?.includes(n))
      currentBlock.value.props.modelValue = val.join(',')
    }

    const incrementOption = (index) => {
      const newItem = state.list.some((item) => isObject(item))
        ? {
            label: '',
            value: ''
          }
        : ''
      state.list.splice(index + 1, 0, newItem)
    }

    return () => (
      <ElCheckboxGroup
        modelValue={checkList.value}
        style={{ fontSize: 'inherit' }}
        onChange={onChange}
      >
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
                <i class={'el-icon-rank handle cursor-move'}></i>
                {isObject(element) ? (
                  <>
                    <ElCheckbox label={element.value} class={'ml-5px'}>
                      {''}
                    </ElCheckbox>
                    label:
                    <ElInput
                      v-model={element.label}
                      class={'my-12px mx-3px'}
                      style={{ width: '108px' }}
                    ></ElInput>
                    value:
                    <ElInput
                      v-model={element.value}
                      class={'my-12px mx-3px'}
                      style={{ width: '106px' }}
                    ></ElInput>
                  </>
                ) : (
                  <ElInput
                    v-model={state.list[index]}
                    class={'m-12px'}
                    style={{ width: '270px' }}
                  ></ElInput>
                )}
                <div class={'flex flex-col'}>
                  <i
                    class={'el-icon-circle-plus-outline'}
                    onClick={() => incrementOption(index)}
                  ></i>
                  <i
                    class={'el-icon-remove-outline'}
                    onClick={() => state.list.splice(index, 1)}
                  ></i>
                </div>
              </div>
            )
          }}
        </Draggable>
      </ElCheckboxGroup>
    )
  }
})
