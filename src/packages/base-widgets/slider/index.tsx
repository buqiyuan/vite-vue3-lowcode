import { Field, Slider } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'

export default {
  key: 'slider',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 滑块',
  preview: () => (
    <Field
      name="rate"
      label="滑块"
      labelWidth={50}
      v-slots={{ input: () => <Slider modelValue={3} /> }}
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
            <Slider
              ref={(el) => registerRef(el, block._vid)}
              {...props}
              v-model={props.modelValue}
            ></Slider>
          )
        }}
      />
    )
  },
  props: {
    modelValue: createEditorInputNumberProp({ label: '默认值', defaultValue: 0 }),
    name: createEditorInputProp({ label: '名称，提交表单的标识符', defaultValue: 'slider' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '滑块' }),
    min: createEditorInputNumberProp({ label: '最小值' }),
    max: createEditorInputNumberProp({ label: '最大值' }),
    size: createEditorInputNumberProp({ label: '图标大小' }),
    range: createEditorSwitchProp({ label: '是否开启双滑块模式' }),
    ...createFieldProps()
  },
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
