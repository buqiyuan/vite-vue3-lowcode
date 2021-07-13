/*
 * @Author: 卜启缘
 * @Date: 2021-05-04 05:36:58
 * @LastEditTime: 2021-07-13 20:34:53
 * @LastEditors: 卜启缘
 * @Description: 导航栏
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\nav-bar\index.tsx
 */
import { NavBar } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createEditorInputProp, createEditorSwitchProp } from '@/visual-editor/visual-editor.props'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import { onBeforeUnmount, onMounted } from 'vue'

export default {
  key: 'nav-bar',
  moduleName: 'baseWidgets',
  label: '导航栏',
  preview: () => (
    <NavBar title="标题" left-text="返回" right-text="按钮" left-arrow style={{ width: '100%' }} />
  ),
  render: ({ props, block }) => {
    const { registerRef } = useGlobalProperties()

    onMounted(() => {
      const compEl = window.$$refs[block._vid]?.$el
      const draggableEl = compEl?.closest('div[data-draggable]')
      const navbarEl = draggableEl?.querySelector('.van-nav-bar--fixed') as HTMLDivElement
      const dragArea = document.querySelector(
        '.simulator-editor-content > .dragArea '
      ) as HTMLDivElement
      if (draggableEl && navbarEl && dragArea) {
        navbarEl.style.position = 'unset'
        draggableEl.style.position = 'fixed'
        draggableEl.style.top = '0'
        draggableEl.style.left = '0'
        draggableEl.style.width = '100%'
        dragArea.style.paddingTop = '50px'
      } else {
        document.body.style.paddingTop = '46px'
        const slotEl = compEl?.closest('__slot-item')
        if (slotEl) {
          slotEl.style.position = 'fixed'
          slotEl.style.bottom = '0'
        }
      }
    })

    onBeforeUnmount(() => {
      const dragArea = document.querySelector(
        '.simulator-editor-content > .dragArea '
      ) as HTMLDivElement
      if (dragArea) {
        dragArea.style.paddingTop = ''
      }
    })

    return () => <NavBar ref={(el) => registerRef(el, block._vid)} {...props} />
  },
  props: {
    title: createEditorInputProp({ label: '标题', defaultValue: '标题' }),
    fixed: createEditorSwitchProp({ label: '是否固定', defaultValue: true }),
    // placeholder: createEditorSwitchProp({
    //   label: '是否生成占位元素',
    //   defaultValue: true,
    //   tips: '固定在顶部时，是否在标签位置生成一个等高的占位元素'
    // }),
    zIndex: createEditorInputProp({ label: 'z-index' }),
    border: createEditorSwitchProp({ label: '是否显示下边框', defaultValue: false }),
    leftText: createEditorInputProp({ label: '左侧文案', defaultValue: '返回' }),
    rightText: createEditorInputProp({ label: '右侧文案', defaultValue: '按钮' }),
    leftArrow: createEditorSwitchProp({ label: '是否显示左侧箭头', defaultValue: true })
  },
  events: [
    { label: '点击左侧按钮时触发', value: 'click-left' },
    { label: '点击右侧按钮时触发', value: 'click-right' }
  ],
  showStyleConfig: false,
  draggable: false,
  resize: {
    width: true
  }
} as VisualEditorComponent
