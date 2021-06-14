import { Field, Stepper } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputNumberProp,
  createEditorInputProp
} from '@/visual-editor/visual-editor.props'

export default {
  key: 'stepper',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 步进器',
  preview: () => (
    <Field
      name="stepper"
      label="步进器"
      labelWidth={50}
      v-slots={{ input: () => <Stepper modelValue={3} /> }}
    ></Field>
  ),
  render: ({ size, block, props }) => {
    const { registerRef } = useGlobalProperties()

    return (
      <Field
        {...props}
        modelValue={''}
        style={{
          width: size.width ? `${size.width}px` : null
        }}
        v-slots={{
          input: () => (
            <Stepper
              ref={(el) => registerRef(el, block._vid)}
              {...props}
              v-model={props.modelValue}
            ></Stepper>
          )
        }}
      />
    )
  },
  props: {
    modelValue: createEditorInputNumberProp({ label: '默认值', defaultValue: 0 }),
    name: createEditorInputProp({ label: '字段名', defaultValue: 'stepper' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '步进器' }),
    min: createEditorInputNumberProp({ label: '最小值' }),
    max: createEditorInputNumberProp({ label: '最大值' }),
    ...createFieldProps()
  },
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
