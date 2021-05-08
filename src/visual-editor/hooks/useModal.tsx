/**
 * @name: useModal
 * @author: 卜启缘
 * @date: 2021/5/7 15:26
 * @description：useModal
 * @update: 2021/5/7 15:26
 */
import {
  defineComponent,
  reactive,
  createApp,
  PropType,
  getCurrentInstance,
  ComponentInternalInstance,
  isVNode
} from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { isFunction } from '@/visual-editor/utils/is'

interface ModalOptions {
  title?: string
  footer?: null | (() => JSX.Element)
  content: ComponentInternalInstance | (() => JSX.Element)
  onConfirm?: () => void
  onCancel?: () => void
  props?: {
    [propName: string]: any
  }
}

const Modal = defineComponent({
  props: {
    options: {
      type: Object as PropType<ModalOptions>,
      default: () => ({})
    }
  },
  setup(props) {
    const instance = getCurrentInstance()!

    const state = reactive({
      options: props.options,
      visible: true
    })

    const methods = {
      service: (options: ModalOptions) => {
        state.options = options
        methods.show()
      },
      show: () => (state.visible = true),
      hide: () => (state.visible = false)
    }

    const handler = {
      onConfirm: () => {
        methods.hide()
        state.options.onConfirm?.()
      },
      onCancel: () => {
        methods.hide()
        state.options.onCancel?.()
      }
    }

    Object.assign(instance.proxy, methods)

    return () => (
      <ElDialog
        modelValue={state.visible}
        title={state.options.title}
        {...state.options.props}
        onClose={methods.hide}
      >
        {{
          default: () =>
            isVNode(state.options.content) ? (
              <content />
            ) : isFunction(state.options.content) ? (
              state.options.content()
            ) : null,
          footer: () =>
            state.options.footer === null ? null : (
              <div>
                <ElButton {...({ onClick: handler.onCancel } as any)}>取消</ElButton>
                <ElButton {...({ onClick: handler.onConfirm } as any)}>确定</ElButton>
              </div>
            )
        }}
      </ElDialog>
    )
  }
})

export const useModal = (() => {
  let instance: any
  return (options: ModalOptions) => {
    if (instance) {
      instance.service(options)
      return instance
    }
    const div = document.createElement('div')
    document.body.appendChild(div)
    const app = createApp(Modal, { options })
    instance = app.mount(div)
    return instance
  }
})()
