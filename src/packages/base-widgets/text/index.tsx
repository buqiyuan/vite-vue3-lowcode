import {
  createEditorColorProp,
  createEditorInputProp,
  createEditorSelectProp
} from '@/visual-editor/visual-editor.props'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'

export default {
  key: 'text',
  moduleName: 'baseWidgets',
  label: '文本',
  preview: () => <span>预览文本</span>,
  render: ({ props }) => (
    <span style={{ color: props.color, fontSize: props.size }}>{props.text || '默认文本'}</span>
  ),
  props: {
    text: createEditorInputProp({ label: '显示文本' }),
    color: createEditorColorProp('字体颜色'),
    size: createEditorSelectProp({
      label: '字体大小',
      options: [
        { label: '14px', val: '14px' },
        { label: '18px', val: '18px' },
        { label: '24px', val: '24px' }
      ]
    })
  }
} as VisualEditorComponent
