/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 12:24:12
 * @LastEditTime: 2021-07-13 17:14:20
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\notice-bar\index.tsx
 */
import { NoticeBar } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'

export default {
  key: 'NoticeBar',
  moduleName: 'baseWidgets',
  label: '通知栏',
  preview: () => (
    <NoticeBar
      style={{ width: '180px' }}
      leftIcon={'volume-o'}
      text={'在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'}
    />
  ),
  render: ({ block, props, styles }) => {
    const { registerRef } = useGlobalProperties()

    return () => (
      <div style={styles}>
        <NoticeBar ref={(el) => registerRef(el, block._vid)} style={{ width: '100%' }} {...props} />
      </div>
    )
  },
  events: [
    { label: '点击通知栏时触发', value: 'click' },
    { label: '关闭通知栏时触发', value: 'close' },
    { label: '每当滚动栏重新开始滚动时触发', value: 'replay' }
  ],
  props: createFieldProps(),
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
