/*
 * @Author: 卜启缘
 * @Date: 2021-05-04 05:36:58
 * @LastEditTime: 2021-07-13 20:34:46
 * @LastEditors: 卜启缘
 * @Description: 导航栏
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\tabbar\index.tsx
 */
import { Tabbar, TabbarItem } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import {
  createEditorCrossSortableProp,
  createEditorInputProp,
  createEditorSwitchProp,
  createEditorColorProp
} from '@/visual-editor/visual-editor.props'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import tabbarItem from './tabbar-item'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'
import { BASE_URL } from '@/visual-editor/utils'
import { onMounted, onBeforeUnmount } from 'vue'

export default {
  key: 'tabbar',
  moduleName: 'baseWidgets',
  label: '底部标签栏',
  preview: () => (
    <Tabbar>
      <TabbarItem icon="home-o">首页</TabbarItem>
      <TabbarItem icon="apps-o">导航</TabbarItem>
      <TabbarItem icon="user-o">我的</TabbarItem>
    </Tabbar>
  ),
  render: ({ props, block }) => {
    const { registerRef } = useGlobalProperties()

    onMounted(() => {
      const compEl = window.$$refs[block._vid]?.$el
      const draggableEl = compEl?.closest('div[data-draggable]')
      const dragArea: HTMLDivElement = document.querySelector(
        '.simulator-editor-content > .dragArea '
      )!
      const tabbarEl = draggableEl?.querySelector('.van-tabbar') as HTMLDivElement
      if (draggableEl && tabbarEl && dragArea) {
        tabbarEl.style.position = 'unset'
        draggableEl.style.position = 'fixed'
        draggableEl.style.bottom = '0'
        draggableEl.style.left = '0'
        draggableEl.style.width = '100%'
        draggableEl.style.zIndex = '1000'
        dragArea.style.paddingBottom = '56px'
      } else {
        document.body.style.paddingBottom = '50px'
        const slotEl = compEl?.closest('__slot-item')
        if (slotEl) {
          slotEl.style.position = 'fixed'
          slotEl.style.bottom = '0'
        }
      }
    })

    onBeforeUnmount(() => {
      const dragArea: HTMLDivElement = document.querySelector(
        '.simulator-editor-content > .dragArea '
      )!
      if (dragArea) {
        dragArea.style.paddingBottom = ''
      }
    })

    return () => (
      <Tabbar ref={(el) => registerRef(el, block._vid)} v-model={props.modelValue} {...props}>
        {props.tabs?.map((item) => {
          const itemProps = item.block?.props
          const url = `${BASE_URL}${props.baseUrl}${itemProps.url}`.replace(/\/{2,}/g, '/')
          return (
            <TabbarItem name={item.value} key={item.value} {...itemProps} url={url}>
              {item.label}
            </TabbarItem>
          )
        })}
      </Tabbar>
    )
  },
  props: {
    modelValue: createEditorInputProp({
      label: '当前选中标签的名称或索引值',
      defaultValue: ''
    }),
    tabs: createEditorCrossSortableProp({
      label: '默认选项',
      labelPosition: 'top',
      multiple: false,
      showItemPropsConfig: true,
      defaultValue: [
        { label: '首页', value: 'index', component: tabbarItem, block: createNewBlock(tabbarItem) },
        {
          label: '导航',
          value: 'navigation',
          component: tabbarItem,
          block: createNewBlock(tabbarItem)
        },
        { label: '我的', value: 'user', component: tabbarItem, block: createNewBlock(tabbarItem) }
      ]
    }),
    fixed: createEditorSwitchProp({ label: '是否固定在底部', defaultValue: true }),
    border: createEditorSwitchProp({ label: '是否显示外边框', defaultValue: true }),
    zIndex: createEditorInputProp({ label: '元素 z-index', defaultValue: '1' }),
    baseUrl: createEditorInputProp({ label: '路由路径前缀', defaultValue: '/preview/#/' }),
    activeColor: createEditorColorProp({ label: '选中标签的颜色', defaultValue: '#1989fa' }),
    inactiveColor: createEditorColorProp({ label: '未选中标签的颜色', defaultValue: '#7d7e80' }),
    route: createEditorSwitchProp({ label: '是否开启路由模式', defaultValue: false }),
    // placeholder: createEditorSwitchProp({
    //   label: '固定在底部时，是否在标签位置生成一个等高的占位元素',
    //   defaultValue: true
    // }),
    safeAreaInsetBottom: createEditorSwitchProp({
      label: '是否开启底部安全区适配，设置 fixed 时默认开启',
      defaultValue: false
    })
  },
  events: [
    { label: '点击左侧按钮时触发', value: 'click-left' },
    { label: '点击右侧按钮时触发', value: 'click-right' }
  ],
  draggable: false,
  resize: {
    width: true
  }
} as VisualEditorComponent
