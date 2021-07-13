/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 17:14:05
 * @LastEditors: 卜启缘
 * @Description: 图片组件
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\image\index.tsx
 */
import { Image } from 'vant'
import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'

export default {
  key: 'image',
  moduleName: 'baseWidgets',
  label: '图片',
  resize: {
    width: true,
    height: true
  },
  preview: () => (
    <div style="text-align:center;">
      <div style="font-size:20px;background-color:#f2f2f2;color:#ccc;display:inline-flex;width:100px;height:50px;align-items:center;justify-content:center">
        <i class="el-icon-picture" />
      </div>
    </div>
  ),
  render: ({ props, block, styles }) => {
    const { registerRef } = useGlobalProperties()

    return () => (
      <div style={styles}>
        <Image ref={(el) => registerRef(el, block._vid)} {...props} />
      </div>
    )
  },
  props: {
    src: createEditorInputProp({
      label: '图片链接',
      defaultValue: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }),
    width: createEditorInputProp({ label: '宽度', defaultValue: 100 }),
    height: createEditorInputProp({ label: '高度', defaultValue: 100 }),
    errorIcon: createEditorInputProp({ label: '失败时提示的图标名称或图片链接' }),
    fit: createEditorSelectProp({
      label: '图片填充模式',
      options: [
        {
          label: '保持宽高缩放图片，使图片的长边能完全显示出来',
          value: 'contain'
        },
        {
          label: '保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边',
          value: 'cover'
        },
        {
          label: '拉伸图片，使图片填满元素',
          value: 'fill'
        },
        {
          label: '保持图片原有尺寸',
          value: 'none'
        },
        {
          label: '取 none 或 contain 中较小的一个',
          value: 'scale-down'
        }
      ],
      defaultValue: 'fill'
    }),
    iconPrefix: createEditorInputProp({
      label: '图标类名前缀',
      tips: '图标类名前缀，同 Icon 组件的 class-prefix 属性'
    }),
    iconSize: createEditorInputProp({ label: '加载图标和失败图标的大小' }),
    lazyLoad: createEditorSwitchProp({
      label: '是否开启图片懒加载',
      tips: '须配合 Lazyload 组件使用'
    }),
    loadingIcon: createEditorInputProp({ label: '加载时提示的图标名称或图片链接' }),
    radius: createEditorInputProp({ label: '圆角大小', tips: '默认单位为 px' }),
    round: createEditorSwitchProp({ label: '是否显示为圆形' }),
    'show-error': createEditorSwitchProp({ label: '是否展示图片加载失败提示' }),
    'show-loading': createEditorSwitchProp({ label: '是否展示图片加载中提示' }),
    alt: createEditorInputProp({ label: '替代文本' })
  },
  events: [
    { label: '点击图片时触发', value: 'click' },
    { label: '图片加载完毕时触发', value: 'load' },
    { label: '图片加载失败时触发', value: 'error' }
  ]
} as VisualEditorComponent
