/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-06-14 10:17:54
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\text\index.tsx
 */
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorColorProp,
  createEditorInputProp,
  createEditorSelectProp
} from '@/visual-editor/visual-editor.props'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { fontArr } from './fontArr'

export default {
  key: 'text',
  moduleName: 'baseWidgets',
  label: '文本',
  preview: () => <span>预览文本</span>,
  render: ({ props, block }) => {
    const { registerRef } = useGlobalProperties()

    return (
      <div
        ref={(el) => registerRef(el, block._vid)}
        style={{ color: props.color, fontSize: props.size, fontFamily: props.font }}
      >
        {props.text || '默认文本'}
      </div>
    )
  },
  props: {
    text: createEditorInputProp({ label: '显示文本' }),
    font: createEditorSelectProp({ label: '字体设置', options: fontArr }),
    color: createEditorColorProp('字体颜色'),
    size: createEditorSelectProp({
      label: '字体大小',
      options: [
        { label: '14px', value: '14px' },
        { label: '18px', value: '18px' },
        { label: '24px', value: '24px' }
      ]
    })
  }
} as VisualEditorComponent
