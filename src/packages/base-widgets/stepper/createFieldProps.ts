import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'

/**
 * @name: createFieldProps
 * @author: 卜启缘
 * @date: 2021/5/4 13:57
 * @description：createFieldProps
 * @update: 2021/5/4 13:57
 */
export const createFieldProps = () => ({
  colon: createEditorSwitchProp({ label: '是否在 label 后面添加冒号' }),
  'error-message': createEditorInputProp({ label: '底部错误提示文案' }),
  'error-message-align': createEditorSelectProp({
    label: '错误提示文案对齐方式',
    options: [
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '居中',
        value: 'center'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ],
    defaultValue: 'left'
  }),
  border: createEditorSwitchProp({ label: '是否显示内边框', defaultValue: true }),
  readonly: createEditorSwitchProp({ label: '是否为只读状态' }),
  required: createEditorSwitchProp({ label: '是否显示表单必填星号' }),
  rules: createEditorInputProp({ label: '表单校验规则' })
})
