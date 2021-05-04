import { ref, watch, defineComponent } from 'vue'

export function useModel<T>(getter: () => T, emitter: (val: T) => void) {
  const state = ref(getter()) as { value: T }

  watch(getter, (val) => {
    if (val !== state.value) {
      state.value = val
    }
  })

  return {
    get value() {
      return state.value
    },
    set value(val: T) {
      if (state.value !== val) {
        state.value = val
        emitter(val)
      }
    }
  }
}

export const TestUseModel = defineComponent({
  props: {
    modelValue: { type: String }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const model = useModel(
      () => props.modelValue,
      (val) => ctx.emit('update:modelValue', val)
    )
    return () => (
      <div>
        自定义的输入框
        <input type="text" v-model={model.value} />
      </div>
    )
  }
})
