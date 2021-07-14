/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-14 10:32:21
 * @LastEditors: 卜启缘
 * @Description: '表单项类型 - 步进器
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\stepper\index.tsx
 */
import { Field, Stepper } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSwitchProp,
  createEditorSelectProp,
  createEditorModelBindProp
} from '@/visual-editor/visual-editor.props'
import { watchEffect } from 'vue'

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
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()

    watchEffect(() => {
      props.name = Array.isArray(props.name) ? [...props.name].pop() : props.name
    })

    return () => (
      <div style={styles}>
        <Field
          {...props}
          modelValue={''}
          v-slots={{
            input: () => (
              <Stepper
                ref={(el) => registerRef(el, block._vid)}
                v-model={props.modelValue}
                {...props}
              ></Stepper>
            )
          }}
        />
      </div>
    )
  },
  props: {
    modelValue: createEditorInputNumberProp({ label: '默认值', defaultValue: 0 }),
    name: createEditorModelBindProp({ label: '字段绑定', defaultValue: '' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '步进器' }),
    min: createEditorInputNumberProp({ label: '最小值', defaultValue: 0 }),
    max: createEditorInputNumberProp({ label: '最大值' }),
    ...createFieldProps(),
    allowEmpty: createEditorSwitchProp({ label: '是否允许输入的值为空', defaultValue: false }),
    buttonSize: createEditorInputProp({
      label: '按钮大小以及输入框高度，默认单位为 px',
      defaultValue: '28px'
    }),
    decimalLength: createEditorInputProp({ label: '固定显示的小数位数', defaultValue: '' }),
    defaultValue: createEditorInputProp({
      label: '初始值，当 v-model 为空时生效',
      defaultValue: '1'
    }),
    disableInput: createEditorSwitchProp({ label: '是否禁用输入框', defaultValue: false }),
    disableMinus: createEditorSwitchProp({ label: '是否禁用减少按钮', defaultValue: false }),
    disablePlus: createEditorSwitchProp({ label: '是否禁用增加按钮', defaultValue: false }),
    disabled: createEditorSwitchProp({ label: '是否禁用步进器', defaultValue: false }),
    inputWidth: createEditorInputProp({ label: '输入框宽度，默认单位为 px', defaultValue: '32px' }),
    integer: createEditorSwitchProp({ label: '是否只允许输入整数', defaultValue: false }),
    longPress: createEditorSwitchProp({ label: '是否开启长按手势', defaultValue: true }),
    placeholder: createEditorInputProp({ label: '输入框占位提示文字', defaultValue: '' }),
    showInput: createEditorSwitchProp({ label: '是否显示输入框', defaultValue: true }),
    showMinus: createEditorSwitchProp({ label: '是否显示减少按钮', defaultValue: true }),
    showPlus: createEditorSwitchProp({ label: '是否显示增加按钮', defaultValue: true }),
    step: createEditorInputProp({ label: '步长，每次点击时改变的值', defaultValue: '1' }),
    theme: createEditorSelectProp({
      label: '样式风格',
      options: [
        {
          label: '默认',
          value: ''
        },
        { label: '圆角风格', value: 'round' }
      ],
      defaultValue: ''
    })
  },
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
