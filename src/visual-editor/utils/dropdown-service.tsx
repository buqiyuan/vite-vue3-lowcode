import {
  defineComponent,
  PropType,
  reactive,
  computed,
  getCurrentInstance,
  createApp,
  onMounted,
  onBeforeUnmount,
  ref,
  provide,
  inject
} from 'vue'
import './dropdown-sservice.scss'
import { defer } from './defer'

interface DropdownServiceOption {
  reference: MouseEvent | HTMLElement
  content: () => JSX.Element
}

const DropdownServiceProvider = (() => {
  const DROPDOWN_SERVICE_PROVIDER = '@@DROPDOWN_SERVICE_PROVIDER'
  return {
    provide: (handler: { onClick: () => void }) => provide(DROPDOWN_SERVICE_PROVIDER, handler),
    inject: () => inject(DROPDOWN_SERVICE_PROVIDER) as { onClick: () => void }
  }
})()

const ServiceComponent = defineComponent({
  props: { option: { type: Object as PropType<DropdownServiceOption>, required: true } },
  setup(props) {
    const ctx = getCurrentInstance()!
    const el = ref<InstanceType<typeof HTMLDivElement>>()

    const state = reactive({
      option: props.option,
      showFlag: false,
      top: 0,
      left: 0,
      mounted: (() => {
        const dfd = defer()
        onMounted(() => setTimeout(() => dfd.resolve(), 0))
        return dfd.promise
      })()
    })

    const service = (option: DropdownServiceOption) => {
      state.option = option

      if ('addEventListener' in option.reference) {
        const { top, left, height } = option.reference.getBoundingClientRect()!
        state.top = top + height
        state.left = left
      } else {
        const { clientX, clientY } = option.reference
        state.left = clientX
        state.top = clientY
      }

      methods.show()
    }

    const methods = {
      show: async () => {
        await state.mounted
        state.showFlag = true
      },
      hide: () => {
        state.showFlag = false
      }
    }

    const classes = computed(() => [
      'dropdown-service',
      {
        'dropdown-service-show': state.showFlag
      }
    ])

    const styles = computed(() => ({
      top: `${state.top}px`,
      left: `${state.left}px`
    }))

    Object.assign(ctx.proxy, { service })

    const onMousedownDocument = (e: MouseEvent) => {
      if (!el.value?.contains(e.target as HTMLElement)) {
        methods.hide()
      }
    }

    onMounted(() => document.body.addEventListener('mousedown', onMousedownDocument, true))
    onBeforeUnmount(() => document.body.removeEventListener('mousedown', onMousedownDocument, true))

    DropdownServiceProvider.provide({ onClick: methods.hide })

    return () => (
      <div class={classes.value} style={styles.value} ref={el}>
        {state.option.content()}
      </div>
    )
  }
})

export const DropdownOption = defineComponent({
  props: {
    label: { type: String },
    icon: { type: String }
  },
  emits: ['click'],
  setup(props, ctx) {
    const { onClick: dropdownClickHandler } = DropdownServiceProvider.inject()

    const handler = {
      onClick: (e: MouseEvent) => {
        ctx.emit('click', e)
        dropdownClickHandler()
      }
    }

    return () => (
      <div class="dropdown-option" onClick={handler.onClick}>
        <i class={props.icon} />
        <span>{props.label}</span>
      </div>
    )
  }
})

export const $$dropdown = (() => {
  let ins: any
  return (option: DropdownServiceOption) => {
    if (!ins) {
      const el = document.createElement('div')
      document.body.appendChild(el)
      const app = createApp(ServiceComponent, { option })
      ins = app.mount(el)
    }
    ins.service(option)
  }
})()
