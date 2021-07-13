/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 15:00:45
 * @LastEditTime: 2021-07-12 14:44:29
 * @LastEditors: 卜启缘
 * @Description: 可以拖拽排序的选项列表
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\components\cross-sortable-options-editor\cross-sortable-options-editor.tsx
 */

import { defineComponent, reactive, computed, PropType } from 'vue'
import Draggable from 'vuedraggable'
import {
  ElInput,
  ElCheckboxGroup,
  ElCheckbox,
  ElCollapse,
  ElCollapseItem,
  ElTabs,
  ElTabPane,
  ElForm
} from 'element-plus'
import { useVModel } from '@vueuse/core'
import { isObject } from '@/visual-editor/utils/is'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import { PropConfig } from '../prop-config'
import { VisualEditorBlockData, VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { cloneDeep } from 'lodash'

interface OptionItem extends LabelValue {
  component?: VisualEditorComponent
  block?: VisualEditorBlockData
}

export const CrossSortableOptionsEditor = defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<(string | OptionItem)[]>,
      default: () => []
    },
    multiple: Boolean, // 是否多选
    showItemPropsConfig: Boolean // 是否多选
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

    /**
     * @description 复选框值改变时触发
     */
    const onChange = (val: any[]) => {
      val = val.filter((item) => item !== '')
      val = props.multiple
        ? val
        : val.filter((n) => !currentBlock.value.props.modelValue?.includes(n))
      currentBlock.value.props.modelValue = val.join(',')
    }

    /**
     * @param {number} index - 在某项之前新增一项
     */
    const incrementOption = (index: number) => {
      const length = state.list.length + 1
      const newItem = state.list.some((item) => isObject(item))
        ? Object.assign(cloneDeep(state.list[0]), {
            label: `选项${length}`,
            value: `选项${length}`
          })
        : ''
      state.list.splice(index + 1, 0, newItem)
    }

    return () => (
      <div>
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
                      class={'el-icon-circle-plus-outline hover:text-blue-400 cursor-pointer'}
                      onClick={() => incrementOption(index)}
                    ></i>
                    <i
                      class={'el-icon-remove-outline hover:text-red-500 cursor-pointer'}
                      onClick={() => state.list.splice(index, 1)}
                    ></i>
                  </div>
                </div>
              )
            }}
          </Draggable>
        </ElCheckboxGroup>
        {props.showItemPropsConfig && (
          <ElCollapse>
            <ElCollapseItem title={'选项配置'}>
              <ElTabs type={'border-card'}>
                {state.list.map((item: OptionItem) => (
                  <ElTabPane label={item.label} key={item.label}>
                    <ElForm size="mini" labelPosition={'left'}>
                      <PropConfig component={item.component} block={item.block} />
                    </ElForm>
                  </ElTabPane>
                ))}
              </ElTabs>
            </ElCollapseItem>
          </ElCollapse>
        )}
      </div>
    )
  }
})
