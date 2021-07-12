<template>
  <draggable-transition-group
    v-model="slotChildren"
    v-model:drag="isDrag"
    class="inner-draggable"
    :class="{ slot: !slotChildren?.length }"
    draggable=".item-drag"
    :data-slot="`插槽（${slotKey}）\n 拖拽组件到此处`"
  >
    <template #item="{ element: innerElement }">
      <div
        class="list-group-item inner"
        :data-label="innerElement.label"
        :class="{
          focus: innerElement.focus,
          focusWithChild: innerElement.focusWithChild
        }"
        @contextmenu.stop.prevent="onContextmenuBlock($event, innerElement, slotChildren)"
        @mousedown.stop="selectComp(innerElement)"
      >
        <comp-render
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

import { defineComponent, PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import DraggableTransitionGroup from './draggable-transition-group.vue'
import CompRender from './comp-render'
import type { VisualEditorBlockData } from '@/visual-editor/visual-editor.utils'

export default defineComponent({
  name: 'SlotItem',
  components: { CompRender, DraggableTransitionGroup },
  props: {
    slotKey: {
      type: String as PropType<string>,
      default: ''
    },
    drag: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    children: {
      type: Array as PropType<VisualEditorBlockData[]>,
      default: () => []
    },
    selectComp: {
      type: Function as PropType<(comp: VisualEditorBlockData) => void>,
      required: true
    },
    onContextmenuBlock: {
      type: Function as PropType<
        (
          e: MouseEvent,
          block: VisualEditorBlockData,
          parentBlocks?: VisualEditorBlockData[]
        ) => void
      >,
      required: true
    }
  },
  emits: ['update:children', 'on-selected', 'update:drag'],
  setup(props, { emit }) {
    // 初始化时设置上次选中的组件
    props.children.some((item) => item.focus && !void props.selectComp(item))

    return {
      isDrag: useVModel(props, 'drag', emit),
      slotChildren: useVModel(props, 'children', emit)
    }
  }
})
</script>

<style lang="scss" scoped>
@import './func.scss';

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

  &.focusWithChild {
    @include showContainerBorder;
  }

  &.focus {
    @include showSoliOutline;

    &::after {
      @include showCompLabel(top);

      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover::after {
      opacity: 1;
    }
  }
}
</style>
