<template>
  <div class="__slot-item">
    <comp-render :element="element" :config="config">
      <template v-for="(value, key) in element.props?.slots" :key="key" #[key]>
        <template v-for="item in value?.children" :key="item._vid">
          <slot-item :element="item" :config="config" />
        </template>
      </template>
    </comp-render>
  </div>
</template>

<script lang="ts">
/**
 * @name: slot-item
 * @author:卜启缘
 * @date: 2021/5/3 13:18
 * @description：slot-item
 * @update: 2021/5/3 14:18
 */
import { defineComponent, onMounted, PropType } from 'vue'
import CompRender from './comp-render'
import { useAnimate } from '@/hooks/useAnimate'
import { VisualEditorBlockData } from '@/visual-editor/visual-editor.utils'

export default defineComponent({
  name: 'SlotItem',
  components: { CompRender },
  props: {
    element: {
      type: [Object] as PropType<VisualEditorBlockData>,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    onMounted(() => {
      const animations = props.element.animations
      if (animations?.length) {
        let animateEl =
          (window.$$refs[props.element._vid]?.$el as HTMLElement) ??
          (window.$$refs[props.element._vid] as HTMLElement)

        animateEl = animateEl?.closest('.__slot-item')?.firstChild as HTMLElement

        if (animateEl) {
          useAnimate(animateEl, animations)
        }
      }
    })

    return {}
  }
})
</script>

<style scoped></style>
