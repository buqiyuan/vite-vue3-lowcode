/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 20:26:04
 * @LastEditors: 卜启缘
 * @Description: 表单项类型 - 复选框
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\checkbox\index.tsx
 */
import { computed } from 'vue'
import { Field, Checkbox, CheckboxGroup } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorCrossSortableProp,
  createEditorModelBindProp
} from '@/visual-editor/visual-editor.props'

export default {
  key: 'checkbox',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 复选框',
  preview: () => (
    <CheckboxGroup modelValue={['1']} direction={'horizontal'}>
      <Checkbox name="1" shape="square">
        one
      </Checkbox>
      <Checkbox name="2" shape="square">
        two
      </Checkbox>
    </CheckboxGroup>
  ),
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()

    const checkList = computed({
      get() {
        return typeof props.modelValue === 'string' ? props.modelValue.split(',') : props.modelValue
      },
      set: (val) => (props.modelValue = val)
    })

    return () => (
      <div style={styles}>
        <Field
          {...props}
          modelValue={''}
          name={Array.isArray(props.name) ? [...props.name].pop() : props.name}
          v-slots={{
            input: () => (
              <CheckboxGroup
                ref={(el) => registerRef(el, block._vid)}
                {...props}
                v-model={checkList.value}
              >
                {props.options?.map((item) => (
                  <Checkbox name={item.value} style={{ marginBottom: '5px' }} shape="square">
                    {item.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )
          }}
        />
      </div>
    )
  },
  props: {
    modelValue: createEditorInputProp({
      label: '默认值',
      defaultValue: []
    }),
    name: createEditorModelBindProp({ label: '字段绑定', defaultValue: '' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '复选框' }),
    options: createEditorCrossSortableProp({
      label: '默认选项',
      labelPosition: 'top',
      multiple: true,
      defaultValue: [
        { label: '胡萝卜', value: 'carrot' },
        { label: '白菜', value: 'cabbage' },
        { label: '猪', value: 'pig' }
      ]
    }),
    direction: createEditorSelectProp({
      label: '排列方向',
      options: [
        {
          label: '水平',
          value: 'horizontal'
        },
        {
          label: '垂直',
          value: 'vertical'
        }
      ],
      defaultValue: 'horizontal'
    }),
    ...createFieldProps()
  },
  events: [
    { label: '当绑定值变化时触发的事件', value: 'change' },
    { label: '点击复选框时触发', value: 'click' }
  ],
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
