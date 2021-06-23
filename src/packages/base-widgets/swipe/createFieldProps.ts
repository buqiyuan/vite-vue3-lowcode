/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 12:24:12
 * @LastEditTime: 2021-06-21 23:04:42
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\swipe\createFieldProps.ts
 */
import {
  createEditorInputProp,
  createEditorSwitchProp,
  createEditorCrossSortableProp
} from '@/visual-editor/visual-editor.props'

export const createFieldProps = () => ({
  images: createEditorCrossSortableProp({
    label: '图片列表',
    labelPosition: 'top',
    defaultValue: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg']
  }),
  // width: createEditorInputProp({ label: '滑块宽度，单位为 px', defaultValue: 'auto' }),
  height: createEditorInputProp({ label: '滑块高度，单位为 px', defaultValue: '200' }),
  autoplay: createEditorInputProp({ label: '自动轮播间隔，单位为 ms', defaultValue: '3000' }),
  duration: createEditorInputProp({ label: '动画时长，单位为 ms', defaultValue: '500' }),
  indicatorColor: createEditorInputProp({ label: '指示器颜色', defaultValue: '#1989fa' }),
  initialSwipe: createEditorInputProp({ label: '初始位置索引值', defaultValue: '0' }),
  lazyRender: createEditorSwitchProp({ label: '是否延迟渲染未展示的轮播', defaultValue: false }),
  loop: createEditorSwitchProp({ label: '是否开启循环播放', defaultValue: true }),
  showIndicators: createEditorSwitchProp({ label: '是否显示指示器', defaultValue: true }),
  stopPropagation: createEditorSwitchProp({ label: '是否阻止滑动事件冒泡', defaultValue: true }),
  touchable: createEditorSwitchProp({ label: '是否可以通过手势滑动', defaultValue: true }),
  vertical: createEditorSwitchProp({ label: '是否为纵向滚动', defaultValue: false })
})
