/*
 * @Author: 卜启缘
 * @Date: 2021-05-04 05:36:58
 * @LastEditTime: 2021-06-25 08:49:50
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
  render: ({ model, size, block, props, custom }) => {
    const { registerRef } = useGlobalProperties()

    let rules = []
    try {
      rules = JSON.parse(props.rules)
    } catch (e) {}

    return (
      <Field
        ref={(el) => registerRef(el, block._vid)}
        {...custom}
        {...props}
        {...model.default}
        v-model={props.modelValue}
        rules={rules}
        style={{
          width: size.width ? `${size.width}px` : null
        }}
      />
    )
  },
  props: createFieldProps(),
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
