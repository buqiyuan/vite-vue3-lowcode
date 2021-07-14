/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 18:20:55
 * @LastEditors: 卜启缘
 * @Description: 表单项类型 - 开关
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\switch\index.tsx
 */
import { Field, Switch } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputProp,
  createEditorSwitchProp,
  createEditorColorProp,
  createEditorModelBindProp
} from '@/visual-editor/visual-editor.props'

export default {
  key: 'switch',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 开关',
  preview: () => (
    <Field name="switch" label="开关" v-slots={{ input: () => <Switch size={20} /> }} />
  ),
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()

    return () => (
      <div style={styles}>
        <Field
          {...props}
          modelValue={''}
          name={Array.isArray(props.name) ? [...props.name].pop() : props.name}
          v-slots={{
            input: () => (
              <Switch
                ref={(el) => registerRef(el, block._vid)}
                {...props}
                v-model={props.modelValue}
              />
            )
          }}
        />
      </div>
    )
  },
  props: {
    modelValue: createEditorInputProp({ label: '默认值', defaultValue: 'false' }),
    name: createEditorModelBindProp({ label: '字段绑定', defaultValue: '' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '开关' }),
    activeColor: createEditorColorProp({ label: '打开时的背景色' }),
    activeValue: createEditorInputProp({ label: '打开时对应的值', defaultValue: 'true' }),
    inactiveColor: createEditorColorProp({ label: '关闭时的背景色' }),
    inactiveValue: createEditorInputProp({ label: '关闭时对应的值', defaultValue: 'false' }),
    disabled: createEditorSwitchProp({ label: '是否为禁用状态' }),
    loading: createEditorSwitchProp({ label: '是否为加载状态' }),
    size: createEditorInputProp({ label: '开关尺寸', defaultValue: '20px' }),
    ...createFieldProps()
  },
  events: [
    { label: '开关状态切换时触发', value: 'change' },
    { label: '点击时触发', value: 'click' }
  ],
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
