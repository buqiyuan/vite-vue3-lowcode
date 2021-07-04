import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp,
  createEditorModelBindProp
} from '@/visual-editor/visual-editor.props'

/**
 * @name: createFieldProps
 * @author: 卜启缘
 * @date: 2021/5/4 13:57
 * @description：createFieldProps
 * @update: 2021/5/4 13:57
 */
export const createFieldProps = () => ({
  modelValue: createEditorInputProp({
    label: '默认值',
    defaultValue: ''
  }),
  name: createEditorModelBindProp({ label: '字段绑定', defaultValue: '' }),
  label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '输入框' }),
  type: createEditorSelectProp({
    label: '输入框类型',
    options: [
      { label: '文本', value: 'text' },
      { label: '数字', value: 'number' },
      { label: '文本域', value: 'textarea' },
      { label: '密码', value: 'password' },
      { label: '电话', value: 'tel' },
      { label: '小数点', value: 'digit' }
    ],
    defaultValue: 'text'
  }),
  placeholder: createEditorInputProp({ label: '占位提示文字', defaultValue: '请输入' }),
  colon: createEditorSwitchProp({ label: '是否在 label 后面添加冒号' }),
  disabled: createEditorSwitchProp({ label: '是否禁用输入框' }),
  error: createEditorSwitchProp({ label: '是否将输入内容标红' }),
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
  readonly: createEditorSwitchProp({ label: '是否为只读状态' }),
  required: createEditorSwitchProp({ label: '是否显示表单必填星号' }),
  'right-icon': createEditorInputProp({ label: '右侧图标名称或图片链接' }),
  rules: createEditorInputProp({ label: '表单校验规则' }),
  'left-icon': createEditorInputProp({ label: '左侧图标名称或图片链接' }),
  'arrow-direction': createEditorInputProp({
    label: '箭头方向',
    defaultValue: '',
    tips: '箭头方向，可选值为 left up down'
  }),
  autosize: createEditorSwitchProp({
    label: '自适应内容高度',
    defaultValue: false,
    tips: '是否自适应内容高度，只对 textarea 有效，可传入对象,如 { maxHeight: 100, minHeight: 50 }，单位为px'
  }),
  border: createEditorSwitchProp({ label: '是否显示内边框', defaultValue: true }),
  center: createEditorSwitchProp({ label: '内容垂直居中' }),
  'clear-icon': createEditorInputProp({
    label: '清除图标',
    tips: '清除图标名称或图片链接'
  }),
  'clear-trigger': createEditorSelectProp({
    label: '清除图标显示时机',
    options: [
      { label: '输入框不为空时展示', value: 'always' },
      { label: '输入框聚焦且不为空时展示', value: 'focus' }
    ],
    defaultValue: 'always',
    tips: '显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示'
  }),
  clearable: createEditorSwitchProp({
    label: '是否启用清除图标',
    defaultValue: false,
    tips: '是否启用清除图标，点击清除图标后会清空输入框'
  }),
  clickable: createEditorSwitchProp({ label: '是否开启点击反馈' }),
  'format-trigger': createEditorInputProp({ label: '格式化函数触发的时机' }),
  formatter: createEditorInputProp({ label: '输入内容格式化函数' }),
  'icon-prefix': createEditorInputProp({
    label: '图标类名前缀',
    tips: '图标类名前缀，同 Icon 组件的 class-prefix 属性'
  }),
  'input-align': createEditorSelectProp({
    label: '输入框对齐方式',
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
  'label-align': createEditorSelectProp({
    label: '左侧文本对齐方式',
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
  'label-width': createEditorInputProp({ label: '左侧文本宽度' }),
  maxlength: createEditorInputProp({ label: '输入的最大字符数', defaultValue: 500 }),
  'show-word-limit': createEditorSwitchProp({
    label: '是否显示字数统计',
    tips: '需要设置 maxlength 属性'
  })
})
