/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 13:22:14
 * @LastEditTime: 2021-06-10 16:33:02
 * @LastEditors: 卜启缘
 * @Description: 属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\index.tsx
 * RightAttributePanel
 */

import { defineComponent, reactive } from 'vue'
import styles from './index.module.scss'
import './index.common.scss'
import { ElTabPane, ElTabs } from 'element-plus'

import MonacoEditor from '../common/monaco-editor/MonacoEditor'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import { AttrEditor } from './components'

export default defineComponent({
  name: 'RightAttributePanel',
  setup() {
    const { currentBlock } = useVisualData()

    const state = reactive({
      activeName: 'attr',
      isOpen: true
    })

    const handleSchemaChange = (val) => {
      try {
        const newObj = JSON.parse(val)
        Object.assign(currentBlock.value, newObj)
      } catch (e) {
        console.log('JSON格式有误：', e)
      }
    }

    return () => (
      <>
        <div class={[styles.drawer, { [styles.isOpen]: state.isOpen }]}>
          <div class={styles.floatingActionBtn} onClick={() => (state.isOpen = !state.isOpen)}>
            <i class={`el-icon-d-arrow-${state.isOpen ? 'right' : 'left'}`}></i>
          </div>
          <div class={styles.attrs}>
            <ElTabs v-model={state.activeName}>
              <ElTabPane label="属性面板" name="attr">
                <AttrEditor />
              </ElTabPane>
              <ElTabPane label="JSON" name="json" lazy>
                <MonacoEditor
                  code={JSON.stringify(currentBlock.value)}
                  layout={{ width: 300, height: 800 }}
                  vid={state.activeName == 'json' ? currentBlock.value._vid : -1}
                  onChange={handleSchemaChange}
                  title=""
                />
              </ElTabPane>
            </ElTabs>
          </div>
        </div>
      </>
    )
  }
})
