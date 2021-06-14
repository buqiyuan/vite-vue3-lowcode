/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 12:24:12
 * @LastEditTime: 2021-06-14 12:38:02
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\notice-bar\createFieldProps.ts
 */
import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'

export const createFieldProps = () => ({
  background: createEditorInputProp({ label: '滚动条背景' }),
  color: createEditorInputProp({ label: '通知文本颜色' }),
  delay: createEditorInputProp({ label: '动画延迟时间 (s)' }),
  leftIcon: createEditorInputProp({ label: '左侧图标名称或图片链接', defaultValue: 'volume-o' }),
  mode: createEditorSelectProp({
    label: '通知栏模式',
    options: [
      {
        label: '默认',
        value: ''
      },
      {
        label: '可关闭',
        value: 'closeable'
      },
      {
        label: '链接',
        value: 'link'
      }
    ]
  }),
  scrollable: createEditorSwitchProp({ label: '是否开启滚动播放，内容长度溢出时默认开启' }),
  speed: createEditorInputProp({ label: '滚动速率 (px/s)' }),
  text: createEditorInputProp({
    label: '通知文本内容',
    defaultValue: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'
  }),
  wrapable: createEditorSwitchProp({ label: '是否开启文本换行，只在禁用滚动时生效' })
})
