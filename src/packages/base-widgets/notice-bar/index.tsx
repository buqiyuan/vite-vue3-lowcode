/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 12:24:12
 * @LastEditTime: 2021-06-14 12:56:23
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\notice-bar\index.tsx
 */
import { NoticeBar } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
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
  render: ({ block, props }) => {
    const { registerRef } = useGlobalProperties()

    return <NoticeBar ref={(el) => registerRef(el, block._vid)} {...props} />
  },
  props: createFieldProps(),
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
