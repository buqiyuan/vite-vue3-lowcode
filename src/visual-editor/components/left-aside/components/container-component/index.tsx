/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 13:22:14
 * @LastEditTime: 2021-06-25 09:10:19
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\components\container-component\index.tsx
 */
import { defineComponent } from 'vue'
import { cloneDeep } from 'lodash'
import { visualConfig } from '@/visual.config'
import Draggable from 'vuedraggable'
import styles from './index.module.scss'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'

export default defineComponent({
  name: 'ContainerComponent',
  setup() {
    const log = (evt) => {
      window.console.log(evt)
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
        <Draggable
          class={styles.listGroup}
          sort={false}
          forceFallback={false}
          list={visualConfig.componentModules.containerComponents}
          group={{ name: 'components', pull: 'clone', put: false }}
          clone={cloneDog}
          item-key="_vid"
          onChange={log}
        >
          {{
            item: ({ element }: { element: VisualEditorComponent }) => (
              <div class={styles.listGroupItem} data-label={element.label}>
                {element.preview()}
              </div>
            )
          }}
        </Draggable>
      </>
    )
  }
})
