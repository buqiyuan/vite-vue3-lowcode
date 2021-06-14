/*
 * @Author: 卜启缘
 * @Date: 2021-05-04 05:36:58
 * @LastEditTime: 2021-06-14 10:02:47
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\simulator-editor\comp-render.tsx
 */
import { defineComponent, PropType } from 'vue'
import { VisualEditorBlockData, VisualEditorConfig } from '@/visual-editor/visual-editor.utils'

export default defineComponent({
  name: 'CompRender',
  props: {
    element: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({})
    },
    config: {
      type: Object as PropType<VisualEditorConfig>,
      default: () => ({})
    }
  },
  setup(props) {
    return () => {
      const component = props.config.componentMap[props.element.componentKey]
      return component.render({
        size: {},
        props: props.element.props || {},
        model: {},
        block: props.element,
        custom: {}
      })
    }
  }
})
