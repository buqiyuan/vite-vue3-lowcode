import { NumberRange } from './number-range'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'

export default {
  key: 'number-range',
  moduleName: 'baseWidgets',
  label: '数字范围输入框',
  resize: {
    width: true
  },
  preview: () => <NumberRange style={{ width: '100%' }} />,
  render: ({ model, size }) => {
    return (
      <NumberRange
        style={{
          width: size.width ? `${size.width}px` : null
        }}
        {...{
          start: model.start.value,
          'onUpdate:start': model.start.onChange,
          end: model.end.value,
          'onUpdate:end': model.end.onChange
        }}
      />
    )
  },
  model: {
    start: '起始绑定字段',
    end: '截止绑定字段'
  }
} as VisualEditorComponent
