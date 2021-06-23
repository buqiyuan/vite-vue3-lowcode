/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 13:22:14
 * @LastEditTime: 2021-06-23 11:40:10
 * @LastEditors: 卜启缘
 * @Description: 基础组件
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\components\base-widgets\index.tsx
 */
import { defineComponent, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { visualConfig } from '@/visual.config'
import styles from './index.module.scss'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'
import DraggableTransitionGroup from '@/visual-editor/components/simulator-editor/draggable-transition-group.vue'

export default defineComponent({
  name: 'BaseWidgets',
  setup() {
    const baseWidgets = ref(visualConfig.componentModules.baseWidgets)

    const log = (evt) => {
      window.console.log('onChange:', evt)
    }
    // 克隆组件
    const cloneDog = (comp) => {
      console.log('当前拖拽的组件：', comp)
      const newComp = cloneDeep(comp)
      newComp._vid = Date.now()
      return createNewBlock({ left: 0, top: 0, component: newComp })
    }

    return () => (
      <>
        <DraggableTransitionGroup
          class={styles.listGroup}
          v-model={baseWidgets.value}
          group={{ name: 'components', pull: 'clone', put: false }}
          clone={cloneDog}
          onChange={log}
          itemKey={'key'}
        >
          {{
            item: ({ element }) => (
              <div class={styles.listGroupItem} data-label={element.label}>
                {element.preview()}
              </div>
            )
          }}
        </DraggableTransitionGroup>
      </>
    )
  }
})
