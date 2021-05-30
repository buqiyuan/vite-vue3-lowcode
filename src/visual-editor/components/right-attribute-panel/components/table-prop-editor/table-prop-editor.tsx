import { defineComponent, PropType, SetupContext } from 'vue'
import { VisualEditorProps } from '@/visual-editor/visual-editor.props'
import { ElButton, ElTag } from 'element-plus'
import { $$tablePropEditor } from './table-prop-edit.service'
import { useVModel } from '@vueuse/core'

export const TablePropEditor = defineComponent({
  props: {
    modelValue: { type: Array as PropType<any[]> },
    propConfig: { type: Object as PropType<VisualEditorProps>, required: true }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }: SetupContext) {
    const model = useVModel(props, 'modelValue', emit)

    const onClick = async () => {
      const data = await $$tablePropEditor({
        config: props.propConfig,
        data: props.modelValue || []
      })
      model.value = data
    }

    return () => (
      <div>
        {(!model.value || model.value.length == 0) && (
          <ElButton {...({ onClick } as any)}>添加</ElButton>
        )}
        {(model.value || []).map((item) => (
          <ElTag {...({ onClick } as any)}>{item[props.propConfig.table!.showKey]}</ElTag>
        ))}
      </div>
    )
  }
})
