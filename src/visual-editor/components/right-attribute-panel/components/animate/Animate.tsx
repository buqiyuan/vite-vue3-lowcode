/*
 * @Author: 卜启缘
 * @Date: 2021-06-11 18:08:01
 * @LastEditTime: 2021-07-07 21:53:06
 * @LastEditors: 卜启缘
 * @Description: 动画组件
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\animate\Animate.tsx
 */
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { ElTabs, ElTabPane, ElRow, ElCol, ElButton, ElSwitch, ElAlert } from 'element-plus'
import { animationTabs } from './animateConfig'
import styles from './animate.module.scss'
import { onClickOutside } from '@vueuse/core'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import type { Animation } from '@/visual-editor/visual-editor.utils'
import { useAnimate } from '@/hooks/useAnimate'

export const Animate = defineComponent({
  setup() {
    const { currentBlock } = useVisualData()
    const target = ref<InstanceType<typeof HTMLDivElement>>()

    const state = reactive({
      activeName: '',
      isAddAnimates: false, // 是否显示添加动画集
      changeTargetIndex: -1 // 要修改的动画的索引
    })

    onClickOutside(target, () => (state.isAddAnimates = false))

    watchEffect((onInvalidate) => {
      if (state.isAddAnimates) {
        state.activeName = 'in'
      } else {
        state.changeTargetIndex = -1
      }
      onInvalidate(() => {
        console.log('onInvalidate')
      })
    })

    /**
     * @description 运行动画
     */
    const runAnimation = (animation: Animation | Animation[] = []) => {
      let animateEl =
        (window.$$refs[currentBlock.value._vid]?.$el as HTMLElement) ??
        (window.$$refs[currentBlock.value._vid] as HTMLElement)

      animateEl = animateEl?.closest('.list-group-item')?.firstChild as HTMLElement

      if (animateEl) {
        useAnimate(animateEl, animation)
      }
    }

    /**
     * @description 点击要修改的动画名称
     */
    const clickAnimateName = (index) => {
      state.changeTargetIndex = index
      state.isAddAnimates = true
    }

    /**
     * @description 删除动画
     * @param index 要删除的动画的索引
     * @returns
     */
    const delAnimate = (index: number) => currentBlock.value.animations?.splice(index, 1)

    /**
     * @description 添加/修改 动画
     */
    const addOrChangeAnimate = (animateItem: Animation) => {
      const animation: Animation = {
        ...animateItem
      }
      if (state.changeTargetIndex == -1) {
        currentBlock.value.animations?.push(animation)
      } else {
        // 修改动画
        currentBlock.value.animations![state.changeTargetIndex] = animation
        state.changeTargetIndex = -1
      }
      state.isAddAnimates = false
      console.log(currentBlock.value.animations, '当前组件的动画')
    }

    // 已添加的动画列表组件
    const AddedAnimateList = () => (
      <>
        {currentBlock.value.animations?.map((item, index) => (
          <ElAlert
            key={item.value}
            type={'info'}
            style={{ marginTop: '12px' }}
            onClose={() => delAnimate(index)}
          >
            {{
              title: () => (
                <div>
                  <span class={'title'}>{`动画${index + 1}`}</span>
                  <span onClick={() => clickAnimateName(index)} class={'label'}>
                    {item.label}
                  </span>
                  <span
                    onClick={() => runAnimation(item)}
                    class={'el-icon-caret-right play'}
                    title={'播放'}
                  ></span>
                </div>
              ),
              default: () => (
                <>
                  <ElRow gutter={6}>
                    <ElCol span={8}>
                      时间：
                      <input v-model={item.duration} type="number" step={0.1} min={0} />
                    </ElCol>
                    <ElCol span={8}>
                      延迟：
                      <input v-model={item.delay} type="number" step={0.1} min={0} />
                    </ElCol>
                    <ElCol span={8}>
                      次数：
                      <input v-model={item.count} type="number" min={0} />
                    </ElCol>
                  </ElRow>
                  <ElSwitch v-model={item.infinite}></ElSwitch> 循环播放
                </>
              )
            }}
          </ElAlert>
        ))}
      </>
    )

    // 可添加的动画列表组件
    const AnimateList = () => (
      <ElTabs v-model={state.activeName} stretch>
        {Object.keys(animationTabs).map((tabKey) => (
          <ElTabPane label={animationTabs[tabKey].label} name={tabKey} key={tabKey}>
            <ElRow gutter={10}>
              {animationTabs[tabKey].value.map((animateItem: Animation) => (
                <ElCol span={8} key={animateItem.value}>
                  <div
                    class={'animate-item'}
                    onClick={() => addOrChangeAnimate(animateItem)}
                    onMouseenter={() => runAnimation(animateItem)}
                  >
                    {animateItem.label}
                  </div>
                </ElCol>
              ))}
            </ElRow>
          </ElTabPane>
        ))}
      </ElTabs>
    )

    return () => (
      <div ref={target} class={styles.animate}>
        <div v-show={!state.isAddAnimates}>
          <ElButton
            type={'primary'}
            disabled={!currentBlock.value.animations}
            plain
            icon={'el-icon-plus'}
            onClick={() => (state.isAddAnimates = true)}
          >
            添加动画
          </ElButton>
          <ElButton
            type={'primary'}
            disabled={!currentBlock.value.animations?.length}
            plain
            icon={'el-icon-caret-right'}
            onClick={() => runAnimation(currentBlock.value.animations)}
          >
            播放动画
          </ElButton>
          <AddedAnimateList />
        </div>
        <AnimateList v-show={state.isAddAnimates} />
      </div>
    )
  }
})
