import { Field } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
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

    return (
      <Field
        ref={(el) => registerRef(el, block._vid)}
        {...custom}
        {...props}
        {...model.default}
        v-model={props.modelValue}
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
