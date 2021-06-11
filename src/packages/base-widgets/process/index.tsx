import { Progress } from 'vant'
import {
  createEditorColorProp,
  createEditorSwitchProp,
  createEditorInputProp,
  createEditorInputNumberProp
} from '@/visual-editor/visual-editor.props'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'

export default {
  key: 'divider',
  moduleName: 'baseWidgets',
  label: '进度条',
  preview: () => <Progress style="width:190px" percentage={0} />,
  render: ({ props }) => {
    return <Progress {...props} pivotText={props.pivotText || undefined} />
  },
  props: {
    percentage: createEditorInputNumberProp({ label: '进度百分比', defaultValue: 50 }),
    strokeWidth: createEditorInputNumberProp({ label: '线条粗细', defaultValue: 5 }),
    inactive: createEditorSwitchProp({ label: '是否置灰', defaultValue: false }),
    color: createEditorColorProp('进度条颜色', '#1989fa'),
    trackColor: createEditorColorProp('轨道颜色', '#e5e5e5'),
    pivotText: createEditorInputProp({ label: '进度文字内容' }),
    pivotColor: createEditorColorProp('进度文字背景色', '#1989fa'),
    textColor: createEditorColorProp('进度文字颜色', '#ffffff'),
    showPivot: createEditorSwitchProp({ label: '是否显示进度文字', defaultValue: true })
  }
} as VisualEditorComponent
