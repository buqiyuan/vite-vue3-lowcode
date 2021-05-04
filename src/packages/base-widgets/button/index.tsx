import { Button } from 'vant'
import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'

export default {
  key: 'button',
  moduleName: 'baseWidgets',
  label: '按钮',
  preview: () => <Button type={'primary'}>按钮</Button>,
  render: ({ props, block, size }) => {
    const { registerRef } = useGlobalProperties()

    return (
      <Button
        ref={(el) => registerRef(el, block._vid)}
        style={{
          height: size.height ? `${size.height}px` : null,
          width: size.width ? `${size.width}px` : null
        }}
        {...props}
      ></Button>
    )
  },
  resize: {
    height: true,
    width: true
  },
  props: {
    text: createEditorInputProp({ label: '按钮文字', defaultValue: '按钮' }),
    type: createEditorSelectProp({
      label: '按钮类型',
      options: [
        {
          label: '主要按钮',
          val: 'primary'
        },
        {
          label: '成功按钮',
          val: 'success'
        },
        {
          label: '默认按钮',
          val: 'default'
        },
        {
          label: '警告按钮',
          val: 'warning'
        },
        {
          label: '危险按钮',
          val: 'danger'
        }
      ],
      defaultValue: 'default'
    }),
    size: createEditorSelectProp({
      label: '按钮尺寸',
      options: [
        {
          label: '大型',
          val: 'large'
        },
        {
          label: '普通',
          val: 'normal'
        },
        {
          label: '小型',
          val: 'small'
        },
        {
          label: '迷你',
          val: 'mini'
        }
      ],
      defaultValue: 'normal'
    }),
    'native-type': createEditorSelectProp({
      label: '原生button的type属性',
      options: [
        { label: '普通button', val: 'button' },
        {
          label: '表单提交按钮',
          val: 'submit'
        }
      ],
      defaultValue: 'button'
    }),
    square: createEditorSwitchProp({ label: '是否为方形按钮' }),
    block: createEditorSwitchProp({ label: '是否为块级元素', defaultValue: false }),
    color: createEditorInputProp({
      label: '按钮颜色',
      tips: '按钮颜色，支持传入 linear-gradient 渐变色'
    }),
    disabled: createEditorSwitchProp({ label: '是否禁用按钮' }),
    hairline: createEditorSwitchProp({ label: '是否使用 0.5px 边框' }),
    icon: createEditorInputProp({ label: '左侧图标名称或图片链接' }),
    'icon-position': createEditorSelectProp({
      label: '图标展示位置',
      options: [
        {
          label: '左侧',
          val: 'left'
        },
        {
          label: '右侧',
          val: 'right'
        }
      ]
    }),
    'icon-prefix': createEditorInputProp({
      label: '图标类名前缀',
      tips: '图标类名前缀，同 Icon 组件的 class-prefix 属性'
    }),
    loading: createEditorSwitchProp({ label: '是否显示为加载状态' }),
    'loading-size': createEditorInputProp({ label: '加载图标大小' }),
    'loading-text': createEditorInputProp({ label: '加载状态提示文字' }),
    'loading-type': createEditorSelectProp({
      label: '加载图标类型',
      options: [
        { label: 'circular', val: 'circular' },
        { label: 'spinner', val: 'spinner' }
      ],
      defaultValue: 'circular'
    }),
    plain: createEditorSwitchProp({ label: '是否为朴素按钮' }),
    replace: createEditorSwitchProp({ label: '是否在跳转时替换当前页面历史' }),
    round: createEditorSwitchProp({ label: '是否为圆形按钮' }),
    to: createEditorInputProp({ label: '路由跳转' }),
    url: createEditorInputProp({ label: '跳转链接' })
  }
} as VisualEditorComponent
