import { Field, Checkbox, CheckboxGroup } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorTableProp
} from '@/visual-editor/visual-editor.props'

export default {
  key: 'checkbox',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 复选框',
  preview: () => (
    <CheckboxGroup modelValue={['1']} direction={'horizontal'}>
      <Checkbox name="1" shape="square">
        one
      </Checkbox>
      <Checkbox name="2" shape="square">
        two
      </Checkbox>
    </CheckboxGroup>
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
            <CheckboxGroup
              ref={(el) => registerRef(el, block._vid)}
              {...props}
              v-model={props.modelValue}
            >
              {props.options?.map((item) => (
                <Checkbox name={item.value} style={{ marginBottom: '5px' }} shape="square">
                  {item.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )
        }}
      />
    )
  },
  props: {
    modelValue: createEditorInputProp({ label: '默认值', defaultValue: [] }),
    name: createEditorInputProp({ label: '名称，提交表单的标识符', defaultValue: 'checkbox' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '复选框' }),
    options: createEditorTableProp({
      label: '默认选项',
      option: {
        options: [
          { label: '显示值', field: 'label' },
          { label: '绑定值', field: 'value' },
          { label: '备注', field: 'comments' }
        ],
        showKey: 'label'
      },
      defaultValue: [
        { label: '萝卜', value: 'radish' },
        { label: '青菜', value: 'greens' }
      ]
    }),
    direction: createEditorSelectProp({
      label: '排列方向',
      options: [
        {
          label: '水平',
          val: 'horizontal'
        },
        {
          label: '垂直',
          val: 'vertical'
        }
      ],
      defaultValue: 'horizontal'
    }),
    ...createFieldProps()
  },
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
