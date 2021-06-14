import { Field, Popup, Picker } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import { createEditorInputProp, createEditorTableProp } from '@/visual-editor/visual-editor.props'
import { reactive } from 'vue'

export default {
  key: 'picker',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 选择器',
  preview: () => <Field name="picker" label="选择器" placeholder={'点击选择'}></Field>,
  render: ({ size, block, props }) => {
    const { registerRef } = useGlobalProperties()
    const state = reactive({
      showPicker: false,
      text: ''
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

    const PopupPicker = () => (
      <>
        <Field
          v-model={props.modelValue}
          {...props}
          readonly
          clickable
          onClick={() => (state.showPicker = true)}
          style={{
            width: size.width ? `${size.width}px` : null
          }}
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
            columnsFieldNames={customFieldName}
            onConfirm={onConfirm}
            onCancel={() => (state.showPicker = false)}
          />
        </Popup>
      </>
    )

    return <PopupPicker />
  },
  props: {
    modelValue: createEditorInputProp({ label: '默认值' }),
    name: createEditorInputProp({ label: '字段名', defaultValue: 'picker' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '选择器' }),
    columns: createEditorTableProp({
      label: '数据项',
      option: {
        options: [
          {
            label: '显示值',
            field: 'label'
          },
          {
            label: '绑定值',
            field: 'value'
          },
          {
            label: '备注',
            field: 'comments'
          }
        ],
        showKey: 'label'
      },
      defaultValue: [
        {
          label: '杭州',
          value: 'hangzhou'
        },
        {
          label: '上海',
          value: 'shanghai'
        }
      ]
    }),
    valueKey: createEditorInputProp({ label: '选项对象的键名', defaultValue: 'label' }),
    placeholder: createEditorInputProp({ label: '占位符', defaultValue: '请选择' }),
    ...createFieldProps()
  },
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
