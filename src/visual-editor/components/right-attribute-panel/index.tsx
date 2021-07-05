/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 13:22:14
 * @LastEditTime: 2021-07-05 11:06:49
 * @LastEditors: 卜启缘
 * @Description: 属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\index.tsx
 * RightAttributePanel
 */

import { defineComponent, reactive, watch } from 'vue'
import styles from './index.module.scss'
import { ElTabPane, ElTabs } from 'element-plus'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import { AttrEditor, Animate, PageSetting, EventAction, FormRule } from './components'

export default defineComponent({
  name: 'RightAttributePanel',
  setup() {
    const { currentBlock } = useVisualData()

    const state = reactive({
      activeName: 'attr',
      isOpen: true
    })

    watch(
      () => currentBlock.value.label,
      (newLabel) => {
        if (!newLabel?.startsWith('表单') && state.activeName == 'form-rule') {
          state.activeName = 'attr'
        }
      }
    )

    return () => (
      <>
        <div class={[styles.drawer, { [styles.isOpen]: state.isOpen }]}>
          <div class={styles.floatingActionBtn} onClick={() => (state.isOpen = !state.isOpen)}>
            <i class={`el-icon-d-arrow-${state.isOpen ? 'right' : 'left'}`}></i>
          </div>
          <div class={styles.attrs}>
            <ElTabs
              v-model={state.activeName}
              type="border-card"
              stretch={true}
              class={styles.tabs}
            >
              <ElTabPane label="属性" name="attr">
                <AttrEditor />
              </ElTabPane>
              <ElTabPane label="动画" name="animate" lazy>
                <Animate />
              </ElTabPane>
              <ElTabPane label="事件" name="events">
                <EventAction />
              </ElTabPane>
              {currentBlock.value.label?.startsWith('表单') ? (
                <ElTabPane label="规则" name="form-rule" lazy>
                  <FormRule />
                </ElTabPane>
              ) : null}
              <ElTabPane label="页面设置" name="page-setting">
                <PageSetting />
              </ElTabPane>
            </ElTabs>
          </div>
        </div>
      </>
    )
  }
})
