import { defineComponent } from 'vue'
import { cloneDeep } from 'lodash'
import { visualConfig } from '@/visual.config'
// @ts-ignore 暂时方案 待官方修复
import Draggable from 'vuedraggable/src/vuedraggable'
import styles from './index.module.scss'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'

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
          item-key="key"
          onChange={log}
        >
          {{
            item: ({ element }) => (
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
