<!--
 * @Author: 卜启缘
 * @Date: 2021-06-12 22:18:48
 * @LastEditTime: 2021-06-25 08:48:07
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\preview\views\slot-item.vue
-->
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
import { defineComponent, onMounted, PropType } from 'vue'
import CompRender from './comp-render'
import { useAnimate } from '@/hooks/useAnimate'
import type { VisualEditorBlockData } from '@/visual-editor/visual-editor.utils'

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
