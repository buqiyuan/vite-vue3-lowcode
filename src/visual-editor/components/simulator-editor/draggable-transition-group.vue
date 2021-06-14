<template>
  <draggable
    v-model="list"
    class="dragArea list-group"
    :class="{ isDrag }"
    tag="transition-group"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !isDrag ? 'flip-list' : null
    }"
    item-key="_vid"
    v-bind="dragOptions"
    @start="isDrag = true"
    @end="isDrag = false"
    @change="log"
  >
    <template #item="item">
      <div>
        <slot name="item" v-bind="item"> </slot>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
/**
 * @name: draggable-transition-group
 * @author:卜启缘
 * @date: 2021/5/1 23:15
 * @description：draggable-transition-group
 * @update: 2021/5/1 23:15
 */
import { computed, defineComponent, reactive, toRefs, SetupContext } from 'vue'
import draggable from 'vuedraggable'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  name: 'DraggableTransitionGroup',
  components: { draggable },
  props: {
    moduleValue: {
      type: Array,
      default: () => []
    },
    drag: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:moduleValue', 'update:drag'],
  setup(props, { emit }: SetupContext) {
    const state = reactive({
      list: useVModel(props, 'moduleValue', emit),
      isDrag: useVModel(props, 'drag', emit)
    })

    const dragOptions = computed(() => ({
      animation: 200,
      group: 'components',
      disabled: false,
      ghostClass: 'ghost'
    }))
    const log = () => {
      // console.log('接收的组件：', evt)
      // console.log('全部组件：', state.VMBlocks)
    }
    return {
      ...toRefs(state),
      log,
      dragOptions
    }
  }
})
</script>

<style lang="scss" scoped>
@import './func.scss';

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  background: #c8ebfb;
  opacity: 0.5;
}

.list-group {
  height: 100%;
  min-height: 40px;

  // &.isDrag div[data-draggable='true'] {
  //   padding: 2px 0;
  // }

  &.isDrag:not(.no-child) :deep(.list-group-item.has-slot) {
    @include showContainerBorder;
  }
}
</style>
