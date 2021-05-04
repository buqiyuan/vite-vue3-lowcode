import { defineComponent } from 'vue'
import { useVModel } from '@vueuse/core'
import './number-range.scss'

export const NumberRange = defineComponent({
  props: {
    start: { type: String },
    end: { type: String }
  },
  emits: {
    'update:start': (_?: string) => true,
    'update:end': (_?: string) => true
  },
  setup(props) {
    const startModel = useVModel(props, 'start')
    const endModel = useVModel(props, 'end')

    return () => (
      <div class="number-range">
        <div>
          <input type="text" v-model={startModel.value} />
        </div>
        <span>~</span>
        <div>
          <input type="text" v-model={endModel.value} />
        </div>
      </div>
    )
  }
})
