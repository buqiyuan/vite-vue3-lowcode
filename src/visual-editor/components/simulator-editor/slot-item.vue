<template>
  <draggable-transition-group
    :key="slotKey"
    v-model="slotChildren"
    v-model:drag="isDrag"
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
          <template v-for="(value, key) in innerElement.props?.slots" :key="key" #[key]>
            <SlotItem
              v-model:children="value.children"
              v-model:drag="isDrag"
              :slot-key="key"
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

import { defineComponent } from 'vue'
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
    drag: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default: () => []
    },
    selectComp: {
      type: Function,
      required: true
    },
    onContextmenuBlock: {
      type: Function,
      required: true
    }
  },
  emits: ['update:children', 'on-selected', 'update:drag'],
  setup(props, { emit }) {
    return {
      isDrag: useVModel(props, 'drag', emit),
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  height: auto;
  min-height: 40px;
  font-size: 12px;
  color: #8591a2;
  text-align: center;
  background: rgba(246, 247, 249, 0.5);
  content: attr(data-slot);
  outline: 1px dashed #dedede;
  outline-offset: -1px;
  flex-direction: column;
  justify-content: center;
}

.list-group-item {
  position: relative;
  padding: 3px;
  cursor: move;
  transform: translate(0);

  &.focusWithChild {
    outline: 2px dashed #b0c1d7;
    outline-offset: -2px;
  }

  &.focusWithChild::before {
    position: absolute;
    top: 0;
    left: -3px;
    padding: 3px;
    font-size: 12px;
    font-weight: 700;
    color: white;
    background-color: #006eff;
    border-radius: 3px;
    content: attr(data-label);
    transform: translate(-100%, 0);
  }

  &.focus {
    outline: 2px solid #006eff;
    outline-offset: -2px;
  }
}
</style>
