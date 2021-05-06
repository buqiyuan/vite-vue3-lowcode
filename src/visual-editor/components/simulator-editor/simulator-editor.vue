<template>
  <draggable-transition-group v-model:drag="drag" v-model="currentPage.blocks">
    <template #item="{ element: outElement }">
      <div
        class="list-group-item"
        :data-label="outElement.label"
        :class="{
          focus: outElement.focus,
          focusWithChild: outElement.focusWithChild,
          drag,
          ['no-child']: !Object.keys(outElement.props.slots || {}).length
        }"
        @contextmenu.stop.prevent="onContextmenuBlock($event, outElement)"
        @mousedown="selectComp(outElement)"
      >
        <comp-render
          :config="visualConfig"
          :element="outElement"
          :style="{
            pointerEvents: Object.keys(outElement.props?.slots || {}).length ? 'auto' : 'none'
          }"
        >
          <template v-for="(value, slotKey) in outElement.props?.slots" :key="slotKey" #[slotKey]>
            <slot-item
              v-model:children="value.children"
              :slot-key="slotKey"
              :config="visualConfig"
              :on-contextmenu-block="onContextmenuBlock"
              :select-comp="selectComp"
            />
          </template>
        </comp-render>
      </div>
    </template>
  </draggable-transition-group>
</template>

<script lang="tsx">
import { defineComponent, reactive, toRefs, SetupContext } from 'vue'
import { VisualEditorBlockData } from '@/visual-editor/visual-editor.utils'
import DraggableTransitionGroup from './draggable-transition-group.vue'
import { $$dropdown, DropdownOption } from '@/visual-editor/utils/dropdown-service'
import CompRender from './comp-render'
import SlotItem from './slot-item.vue'
import { cloneDeep } from 'lodash'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'

export default defineComponent({
  name: 'SimulatorEditor',
  components: {
    DraggableTransitionGroup,
    CompRender,
    SlotItem
  },
  emits: ['on-selected'],
  setup(_, { emit }: SetupContext) {
    const { globalProperties } = useGlobalProperties()

    const { currentPage, visualConfig } = useVisualData()

    const state = reactive({
      compRefs: [],
      drag: false
    })

    //递归实现
    //@leafId  为你要查找的id，
    //@nodes   为原始Json数据
    //@path    供递归使用，不要赋值
    const findPathByLeafId = (
      leafId,
      nodes: VisualEditorBlockData[] = [],
      path: VisualEditorBlockData[] = []
    ) => {
      for (let i = 0; i < nodes.length; i++) {
        const tmpPath = path.concat()
        tmpPath.push(nodes[i])
        if (leafId == nodes[i]._vid) {
          return tmpPath
        }
        const slots = nodes[i].props?.slots || {}
        const keys = Object.keys(slots)
        for (let j = 0; j < keys.length; j++) {
          const children = slots[keys[j]]?.children
          if (children) {
            const findResult = findPathByLeafId(leafId, children, tmpPath)
            if (findResult) {
              return findResult
            }
          }
        }
      }
    }

    const handleSlotsFocus = (block, _vid) => {
      const slots = block.props?.slots || {}
      if (Object.keys(slots).length > 0) {
        Object.keys(slots).forEach((key) => {
          slots[key]?.children?.forEach((item) => {
            item.focusWithChild = false
            item.focus = item._vid == _vid
            if (item.focus) {
              const arr = findPathByLeafId(_vid, currentPage.value.blocks)
              arr.forEach((n) => (n.focusWithChild = true))
            }
            if (Object.keys(item.props?.slots || {}).length) {
              handleSlotsFocus(item, _vid)
            }
          })
        })
      }
    }

    const selectComp = (element) => {
      emit('on-selected', element)
      currentPage.value.blocks.forEach((block) => {
        block.focus = element._vid == block._vid
        block.focusWithChild = false
        handleSlotsFocus(block, element._vid)
        element.focusWithChild = false
      })
    }

    const onContextmenuBlock = (
      e: MouseEvent,
      block: VisualEditorBlockData,
      parentBlocks = currentPage.value.blocks
    ) => {
      $$dropdown({
        reference: e,
        content: () => (
          <>
            <DropdownOption
              label="复制节点"
              icon="el-icon-document-copy"
              {...{
                onClick: () => {
                  const index = parentBlocks.findIndex((item) => item._vid == block._vid)
                  if (index != -1) {
                    const setBlockVid = (block, index = -1) => {
                      block._vid = `vid_${Date.now() + index}`
                      const slots = block?.props?.slots || {}
                      const slotKeys = Object.keys(slots)
                      if (slotKeys.length) {
                        slotKeys.forEach((slotKey) => {
                          slots[slotKey]?.children?.forEach((child, index) =>
                            setBlockVid(child, index)
                          )
                        })
                      }
                    }
                    const blockCopy = cloneDeep(parentBlocks[index])
                    setBlockVid(blockCopy)
                    parentBlocks.splice(index, 0, blockCopy)
                  }
                }
              }}
            />
            <DropdownOption
              label="删除节点"
              icon="el-icon-delete"
              {...{
                onClick: () => {
                  const index = parentBlocks.findIndex((item) => item._vid == block._vid)
                  if (index != -1) {
                    delete globalProperties.$$refs[parentBlocks[index]._vid]
                    parentBlocks.splice(index, 1)
                  }
                }
              }}
            />
          </>
        )
      })
    }

    return {
      ...toRefs(state),
      currentPage,
      visualConfig,
      selectComp,
      onContextmenuBlock
    }
  }
})
</script>
<style lang="scss" scoped>
.list-group-item {
  position: relative;
  cursor: move;
  transform: translate(0);
  padding: 3px;

  &.focus {
    content: '';
    outline: 2px solid #006eff;
    outline-offset: -2px;
  }
  &.drag::after {
    display: none;
  }
  &.no-child {
    content: '';
  }
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

  i {
    cursor: pointer;
  }
}
</style>
