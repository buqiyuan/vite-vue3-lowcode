/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 21:12:46
 * @LastEditors: 卜启缘
 * @Description: 表单项类型 - 选择器
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\picker\index.tsx
 */
import { Field, Popup, Picker } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorCrossSortableProp,
  createEditorInputProp,
  createEditorModelBindProp
} from '@/visual-editor/visual-editor.props'
import { reactive, useAttrs } from 'vue'

export default {
  key: 'picker',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 选择器',
  preview: () => <Field name="picker" label="选择器" placeholder={'点击选择'}></Field>,
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()

    const attrs = useAttrs()

    const state = reactive({
      showPicker: false,
      text: '',
      defaultIndex: 0
    })
    const customFieldName = {
      text: 'label',
      value: 'value'
    }

    const onConfirm = (value) => {
      props.modelValue = value.value
      state.text = value[props.valueKey || 'text']
      state.showPicker = false
      console.log(props)
    }

    return () => {
      if (props.modelValue) {
        state.defaultIndex = props.columns?.findIndex((item) => item.value == props.modelValue)
        state.text = props.columns[state.defaultIndex]?.label
      }

      return (
        <div style={styles}>
          <Field
            v-model={props.modelValue}
            {...props}
            readonly
            clickable
            onClick={() => (state.showPicker = true)}
            name={Array.isArray(props.name) ? [...props.name].pop() : props.name}
          >
            {{
              input: () =>
                state.text?.trim() == '' ? (
                  <span class={'placeholder'}>{props.placeholder}</span>
                ) : (
                  state.text
                )
            }}
          </Field>
          <Popup v-model={[state.showPicker, 'show']} position={'bottom'}>
            <Picker
              ref={(el) => registerRef(el, block._vid)}
              {...props}
              {...attrs}
              defaultIndex={state.defaultIndex}
              columnsFieldNames={customFieldName}
              onConfirm={onConfirm}
              onCancel={() => (state.showPicker = false)}
            />
          </Popup>
        </div>
      )
    }
  },
  props: {
    modelValue: createEditorInputProp({ label: '默认值' }),
    name: createEditorModelBindProp({ label: '字段绑定', defaultValue: '' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '选择器' }),
    columns: createEditorCrossSortableProp({
      label: '默认选项',
      labelPosition: 'top',
      multiple: false,
      defaultValue: [
        { label: '杭州', value: 'hangzhou' },
        { label: '上海', value: 'shanghai' }
      ]
    }),
    placeholder: createEditorInputProp({ label: '占位符', defaultValue: '请选择' }),
    ...createFieldProps()
  },
  events: [
    { label: '点击完成按钮时触发', value: 'confirm' },
    { label: '点击取消按钮时触发', value: 'cancel' },
    { label: '选项改变时触发', value: 'change' }
  ],
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
