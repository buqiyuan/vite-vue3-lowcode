import { createEditorInputProp } from '@/visual-editor/visual-editor.props'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'

export default {
  key: 'image',
  moduleName: 'baseWidgets',
  label: '图片',
  resize: {
    width: true,
    height: true
  },
  render: ({ props, size }) => {
    return (
      <div
        style={{ height: `${size.height || 100}px`, width: `${size.width || 100}px` }}
        class="visual-block-image"
      >
        <img src={props.url || 'https://cn.vuejs.org/images/logo.png'} />
      </div>
    )
  },
  preview: () => (
    <div style="text-align:center;">
      <div style="font-size:20px;background-color:#f2f2f2;color:#ccc;display:inline-flex;width:100px;height:50px;align-items:center;justify-content:center">
        <i class="el-icon-picture" />
      </div>
    </div>
  ),
  props: {
    url: createEditorInputProp({ label: '地址' })
  }
} as VisualEditorComponent
