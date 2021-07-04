/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-03 09:35:21
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\packages\container-component\form\compProps.ts
 */

import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp,
  createEditorTableProp
} from '@/visual-editor/visual-editor.props'

// 对齐方式
const alignOptions = [
  {
    label: '左对齐',
    value: 'left'
  },
  {
    label: '右对齐',
    value: 'right'
  },
  {
    label: '居中对齐',
    value: 'center'
  }
]

export const compProps = {
  'slots.default.children': createEditorTableProp({
    label: '表单项',
    option: {
      options: [
        { label: '显示值', field: 'label' },
        { label: '绑定值', field: 'value' },
        { label: '备注', field: 'comments' }
      ],
      showKey: 'label'
    },
    defaultValue: []
  }),
  colon: createEditorSwitchProp({ label: '是否在 label 后面添加冒号' }),
  disabled: createEditorSwitchProp({ label: '是否禁用表单中的所有输入框' }),
  errorMessageAlign: createEditorSelectProp({
    label: '错误提示文案对齐方式',
    defaultValue: 'left',
    options: alignOptions
  }),
  inputAlign: createEditorSelectProp({
    label: '输入框对齐方式',
    defaultValue: 'left',
    options: alignOptions
  }),
  labelAlign: createEditorSelectProp({
    label: '表单项 label 对齐方式',
    defaultValue: 'left',
    options: alignOptions
  }),
  labelWidth: createEditorInputProp({ label: '表单项 label 宽度，默认单位为px' }),
  readonly: createEditorSwitchProp({ label: '是否将表单中的所有输入框设置为只读状态' }),
  scrollToError: createEditorSwitchProp({
    label: '在提交表单且校验不通过时滚动至错误的表单项'
  }),
  showError: createEditorSwitchProp({ label: '是否在校验不通过时标红输入框' }),
  showErrorMessage: createEditorSwitchProp({
    label: '是否在校验不通过时在输入框下方展示错误提示'
  }),
  submitOnEnter: createEditorSwitchProp({ label: '是否在按下回车键时提交表单' }),
  validateFirst: createEditorSwitchProp({ label: '是否在某一项校验不通过时停止校验' }),
  validateTrigger: createEditorSelectProp({
    label: '表单校验触发时机',
    options: [
      {
        label: 'onChange',
        value: 'onChange'
      },
      {
        label: 'onSubmit',
        value: 'onSubmit'
      },
      {
        label: 'onBlur',
        value: 'onBlur'
      }
    ],
    defaultValue: 'onBlur'
  })
}
