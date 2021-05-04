import { ElOption, ElSelect } from 'element-plus'
import { createEditorTableProp } from '@/visual-editor/visual-editor.props'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'

export default {
  key: 'select',
  moduleName: 'baseWidgets',
  label: '下拉框',
  preview: () => <ElSelect />,
  render: ({ props, model, custom }) => (
    <ElSelect
      {...custom}
      key={(props.options || []).map((opt: any) => opt.value).join(',')}
      {...model.default}
    >
      {(props.options || []).map((opt: { label: string; value: string }, index: number) => (
        <ElOption label={opt.label} value={opt.value} key={index} />
      ))}
    </ElSelect>
  ),
  props: {
    options: createEditorTableProp({
      label: '下拉选项',
      option: {
        options: [
          { label: '显示值', field: 'label' },
          { label: '绑定值', field: 'value' },
          { label: '备注', field: 'comments' }
        ],
        showKey: 'label'
      }
    })
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
