import { Field, Rate } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'

export default {
  key: 'rate',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 评分',
  preview: () => (
    <Field
      name="rate"
      label="评分"
      labelWidth={50}
      v-slots={{ input: () => <Rate modelValue={3} /> }}
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
            <Rate
              ref={(el) => registerRef(el, block._vid)}
              {...props}
              v-model={props.modelValue}
            ></Rate>
          )
        }}
      />
    )
  },
  props: {
    modelValue: createEditorInputNumberProp({ label: '默认值', defaultValue: 0 }),
    name: createEditorInputProp({ label: '字段名', defaultValue: 'rate' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '评分' }),
    count: createEditorInputNumberProp({ label: '图标总数' }),
    size: createEditorInputProp({ label: '图标大小' }),
    'allow-half': createEditorSwitchProp({ label: '是否允许半选' }),
    ...createFieldProps()
  },
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
