/*
 * @Author: 卜启缘
 * @Date: 2021-05-04 05:36:58
 * @LastEditTime: 2021-07-14 10:31:10
 * @LastEditors: 卜启缘
 * @Description: 表单项类型 - 输入框
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\input\index.tsx
 */
import { Field } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'

export default {
  key: 'input',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 输入框',
  preview: () => (
    <Field name="用户名" label="用户名" labelWidth={50} colon placeholder="请输入用户名" />
  ),
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()

    let rules = []
    try {
      rules = JSON.parse(props.rules)
    } catch (e) {}

    return () => (
      <div style={styles}>
        <Field
          ref={(el) => registerRef(el, block._vid)}
          {...props}
          v-model={props.modelValue}
          name={Array.isArray(props.name) ? [...props.name].pop() : props.name}
          rules={rules}
        />
      </div>
    )
  },
  events: [
    { label: '输入框内容变化时触发', value: 'update:model-value' },
    { label: '输入框获得焦点时触发', value: 'focus' },
    { label: '输入框失去焦点时触发', value: 'blur' },
    { label: '点击清除按钮时触发', value: 'clear' },
    { label: '点击组件时触发', value: 'click' },
    { label: '点击输入区域时触发', value: 'click-input' },
    { label: '点击左侧图标时触发', value: 'click-left-icon' },
    { label: '点击右侧图标时触发', value: 'click-right-icon' }
  ],
  props: createFieldProps(),
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
