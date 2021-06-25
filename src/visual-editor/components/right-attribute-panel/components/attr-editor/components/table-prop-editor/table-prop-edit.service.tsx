import { VisualEditorProps } from '@/visual-editor/visual-editor.props'
import { defineComponent, getCurrentInstance, onMounted, PropType, reactive, createApp } from 'vue'
import { defer } from '@/visual-editor/utils/defer'
import { ElButton, ElDialog, ElTable, ElTableColumn, ElInput } from 'element-plus'
import { cloneDeep } from 'lodash'

export interface TablePropEditorServiceOption {
  data: any[]
  config: VisualEditorProps
  onConfirm: (val: any[]) => void
}

const ServiceComponent = defineComponent({
  props: {
    option: { type: Object as PropType<TablePropEditorServiceOption>, required: true }
  },
  setup(props) {
    const ctx = getCurrentInstance()!

    const state = reactive({
      option: props.option,
      showFlag: false,
      mounted: (() => {
        const dfd = defer()
        onMounted(() => setTimeout(() => dfd.resolve(), 0))
        return dfd.promise
      })(),
      editData: [] as any[]
    })

    const methods = {
      service: (option: TablePropEditorServiceOption) => {
        state.option = option
        state.editData = cloneDeep(option.data || [])
        methods.show()
      },
      show: async () => {
        await state.mounted
        state.showFlag = true
      },
      hide: () => {
        state.showFlag = false
      },
      add: () => {
        state.editData.push({})
      },
      reset: () => {
        state.editData = cloneDeep(state.option.data)
      }
    }

    const handler = {
      onConfirm: () => {
        state.option.onConfirm(state.editData)
        methods.hide()
      },
      onCancel: () => {
        methods.hide()
      },
      onDelete: (index: number) => {
        state.editData.splice(index, 1)
      }
    }

    Object.assign(ctx.proxy!, methods)

    return () => (
      <>
        <ElDialog v-model={state.showFlag}>
          {{
            default: () => (
              <div>
                <div>
                  <ElButton {...({ onClick: methods.add } as any)}>添加</ElButton>
                  <ElButton {...({ onClick: methods.reset } as any)}>重置</ElButton>
                </div>
                <ElTable data={state.editData}>
                  <ElTableColumn {...({ type: 'index' } as any)} />
                  {state.option.config.table!.options.map((item) => (
                    <ElTableColumn {...({ label: item.label } as any)}>
                      {{
                        default: ({ row }: { row: any }) => <ElInput v-model={row[item.field]} />
                      }}
                    </ElTableColumn>
                  ))}
                  <ElTableColumn {...({ label: '操作栏' } as any)}>
                    {{
                      default: ({ $index }: { $index: number }) => (
                        <ElButton
                          type="danger"
                          {...({ onClick: () => handler.onDelete($index) } as any)}
                        >
                          删除
                        </ElButton>
                      )
                    }}
                  </ElTableColumn>
                </ElTable>
              </div>
            ),
            footer: () => (
              <>
                <ElButton {...({ onClick: handler.onCancel } as any)}>取消</ElButton>
                <ElButton type="primary" {...({ onClick: handler.onConfirm } as any)}>
                  确定
                </ElButton>
              </>
            )
          }}
        </ElDialog>
      </>
    )
  }
})

export const $$tablePropEditor = (() => {
  let ins: any
  return (option: Omit<TablePropEditorServiceOption, 'onConfirm'>) => {
    if (!ins) {
      const el = document.createElement('div')
      document.body.appendChild(el)
      const app = createApp(ServiceComponent, { option })
      ins = app.mount(el)
    }
    const dfd = defer<any[]>()
    ins.service({
      ...option,
      onConfirm: dfd.resolve
    })
    return dfd.promise
  }
})()
