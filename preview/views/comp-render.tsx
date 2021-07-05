/*
 * @Author: 卜启缘
 * @Date: 2021-05-04 05:36:58
 * @LastEditTime: 2021-07-04 17:21:34
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\preview\views\comp-render.tsx
 */
import { defineComponent, PropType } from 'vue'
import type { VisualEditorBlockData, VisualEditorConfig } from '@/visual-editor/visual-editor.utils'
import { visualConfig } from '@/visual.config'

export default defineComponent({
  name: 'CompRender',
  props: {
    element: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({})
    }
  },
  setup(props) {
    return () =>
      visualConfig.componentMap[props.element.componentKey].render({
        size: {},
        props: props.element.props || {},
        model: {},
        block: props.element,
        custom: {}
      })
  }
})
