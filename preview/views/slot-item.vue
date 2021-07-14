<!--
 * @Author: 卜启缘
 * @Date: 2021-06-12 22:18:48
 * @LastEditTime: 2021-07-14 10:17:34
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\preview\views\slot-item.vue
-->
<template>
  <div class="__slot-item">
    <comp-render :element="element" v-on="events">
      <template v-for="(value, key) in element.props?.slots" :key="key" #[key]>
        <template v-for="item in value?.children" :key="item._vid">
          <slot-item :element="item" :models="models" :actions="actions" />
        </template>
      </template>
    </comp-render>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'
import CompRender from './comp-render'
import { useAnimate } from '@/hooks/useAnimate'
import type {
  VisualEditorBlockData,
  VisualEditorActions,
  VisualEditorModel,
  FetchApiItem
} from '@/visual-editor/visual-editor.utils'
import request from '../utils/http/request'
import { ContentTypeEnum } from '../utils/http/httpEnum'

export default defineComponent({
  name: 'SlotItem',
  components: { CompRender },
  props: {
    element: {
      type: [Object] as PropType<VisualEditorBlockData>,
      default: () => ({})
    },
    actions: {
      type: Object as PropType<VisualEditorActions>,
      default: () => ({})
    },
    models: {
      type: Object as PropType<VisualEditorModel[]>,
      default: () => ({})
    }
  },
  setup(props) {
    // TODO 生成组件事件
    const events = props.element.actions.reduce((prev, curr) => {
      prev[curr.event] = async () => {
        for (const handle of curr.handle) {
          const [scopeType, actionType, handleKey] = handle.link
          if (scopeType === 'global') {
            const apis: FetchApiItem[] = props.actions[actionType].apis
            const { data, options } = apis.find((item) => item.key == handleKey)!
            const pramsObj = {}
            await request({
              ...options,
              headers: {
                'Content-Type': ContentTypeEnum[options.contentType]
              },
              data: {
                username: 'admin',
                password: '123456'
              }
            })
          } else if (scopeType === 'component') {
          }
        }
      }
      return prev
    }, {})

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

    return {
      events
    }
  }
})
</script>

<style scoped></style>
