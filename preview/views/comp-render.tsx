import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CompRender',
  props: {
    element: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
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
