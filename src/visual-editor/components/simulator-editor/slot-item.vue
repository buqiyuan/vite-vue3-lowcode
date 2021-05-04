<template>
  <draggable-transition-group
    v-model="slotChildren"
    v-model:drag="drag"
    class="inner-draggable"
    :class="{ slot: !slotChildren?.length }"
    :data-slot="`插槽（${slotKey}）\n 拖拽组件到此处`"
  >
    <template #item="{ element: innerElement }">
      <div
        class="list-group-item inner"
        :data-label="innerElement.label"
        :class="{ focus: innerElement.focus, focusWithChild: innerElement.focusWithChild }"
        @contextmenu.stop.prevent="onContextmenuBlock($event, innerElement, slotChildren)"
        @mousedown.stop="selectComp(innerElement)"
      >
        <comp-render
          :config="config"
          :element="innerElement"
          :style="{
            pointerEvents: Object.keys(innerElement.props?.slots || {}).length ? 'auto' : 'none'
          }"
        >
          <template v-for="(value, slotKey) in innerElement.props?.slots" :key="slotKey" #[slotKey]>
            <SlotItem
              v-model:children="value.children"
              :slot-key="slotKey"
              :config="config"
              :on-contextmenu-block="onContextmenuBlock"
              :select-comp="selectComp"
            />
          </template>
        </comp-render>
      </div>
    </template>
  </draggable-transition-group>
</template>

<script lang="ts">
/**
 * @name: slot-item
 * @author:卜启缘
 * @date: 2021/5/2 22:36
 * @description：slot-item
 * @update: 2021/5/2 22:36
 */

import { defineComponent, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import DraggableTransitionGroup from './draggable-transition-group.vue'
import CompRender from './comp-render'

export default defineComponent({
  name: 'SlotItem',
  components: { CompRender, DraggableTransitionGroup },
  props: {
    slotKey: String,
    config: {
      type: Object,
      default: () => ({})
    },
    children: {
      type: Array,
      default: () => []
    },
    selectComp: {
      type: Function
    },
    onContextmenuBlock: {
      type: Function
    }
  },
  emits: ['update:children', 'on-selected'],
  setup(props, { emit }) {
    const drag = ref(false)

    return {
      drag,
      slotChildren: useVModel(props, 'children', emit)
    }
  }
})
</script>

<style lang="scss" scoped>
.inner-draggable {
  position: relative;
}
.inner-draggable.slot::after {
  content: attr(data-slot);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  min-height: 40px;
  background: rgba(246, 247, 249, 0.5);
  color: #8591a2;
  font-size: 12px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  outline: 1px dashed #dedede;
  outline-offset: -1px;
}
.list-group-item {
  position: relative;
  cursor: move;
  transform: translate(0);
  padding: 3px;

  &.focusWithChild {
    outline: 2px dashed #b0c1d7;
    outline-offset: -2px;
  }
  &.focusWithChild::before {
    content: attr(data-label);
    position: absolute;
    left: -3px;
    top: 0;
    transform: translate(-100%, 0);
    background-color: #006eff;
    color: white;
    padding: 3px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 3px;
  }

  &.focus {
    outline: 2px solid #006eff;
    outline-offset: -2px;
  }
}
</style>
