import { VisualEditorProps } from './visual-editor.props'
import { inject, provide } from 'vue'
import { useDotProp } from '@/visual-editor/hooks/useDotProp'

export interface VisualEditorBlockData {
  _vid: string // 组件id 时间戳
  moduleName: keyof ComponentModules // 组件所属的模块（基础组件、容器组件）
  componentKey: string // 映射 VisualEditorConfig 中 componentMap 的 component对象
  label: string // 组件标签名称
  top: number // 组件的top定位
  left: number // 组件的left定位
  adjustPosition: boolean // 是否需要调整位置
  focus: boolean // 当前是否为选中状态
  zIndex: number // z-index值
  width: number // 组件宽度
  height: number // 组件高度
  hasResize: boolean // 是否调整过宽度或者高度
  props: Record<string, any> // 组件的设计属性
  model: Record<string, string> // 绑定的字段
  slotName?: string // 组件唯一标识
  [prop: string]: any
}

export interface VisualEditorPage {
  title: string // 页面标题
  path: string // 页面路径
  isDefault?: boolean // 404是重定向到默认页面
  blocks: VisualEditorBlockData[] // 当前页面的所有组件
}

export interface VisualEditorPages {
  [path: string]: VisualEditorPage
}

export interface VisualEditorModelValue {
  container: {
    width: number
    height: number
  }
  // 页面
  pages: VisualEditorPages
}

export interface VisualEditorComponent {
  key: string // 组件名称
  moduleName: keyof ComponentModules // 模块名称
  _vid?: string // 组件id 时间戳
  label: string
  preview: () => JSX.Element
  render: (data: {
    props: any
    model: any
    block: VisualEditorBlockData
    size: { width?: number; height?: number }
    custom: Record<string, any>
  }) => JSX.Element
  props?: Record<string, VisualEditorProps>
  model?: Record<string, string>
  resize?: { width?: boolean; height?: boolean }
}

export interface VisualEditorMarkLines {
  x: { left: number; showLeft: number }[]
  y: { top: number; showTop: number }[]
}

export function createNewBlock({
  component,
  left,
  top
}: {
  component: VisualEditorComponent
  top: number
  left: number
}): VisualEditorBlockData {
  component._vid = `${component._vid}`.startsWith('vid_') ? component._vid : `vid_${component._vid}`

  return {
    top,
    left,
    _vid: component._vid!,
    moduleName: component.moduleName,
    componentKey: component!.key,
    label: component!.label,
    adjustPosition: true,
    focus: false,
    zIndex: 0,
    width: 0,
    height: 0,
    hasResize: false,
    props: Object.keys(component.props || {}).reduce((prev, curr) => {
      const { propObj, prop } = useDotProp(prev, curr)
      if (component.props![curr]?.defaultValue) {
        propObj[prop] = prev[curr] = component.props![curr]?.defaultValue
      }
      return prev
    }, {}),
    model: {}
  }
}

export interface VisualDragEvent {
  dragstart: {
    on: (cb: () => void) => void
    off: (cb: () => void) => void
    emit: () => void
  }
  dragend: {
    on: (cb: () => void) => void
    off: (cb: () => void) => void
    emit: () => void
  }
}

export const VisualDragProvider = (() => {
  const VISUAL_DRAG_PROVIDER = '@@VISUAL_DRAG_PROVIDER'
  return {
    provide: (data: VisualDragEvent) => {
      provide(VISUAL_DRAG_PROVIDER, data)
    },
    inject: () => {
      return inject(VISUAL_DRAG_PROVIDER) as VisualDragEvent
    }
  }
})()

// 组件模块
export interface ComponentModules {
  baseWidgets: VisualEditorComponent[] // 基础组件
  containerComponents: VisualEditorComponent[] // 容器组件
}

export function createVisualEditorConfig() {
  const componentModules: ComponentModules = {
    baseWidgets: [],
    containerComponents: []
  }
  // const componentList: VisualEditorComponent[] = []
  const componentMap: Record<string, VisualEditorComponent> = {}
  return {
    componentModules,
    componentMap,
    registry: <
      _,
      Props extends Record<string, VisualEditorProps> = {},
      Model extends Record<string, string> = {}
    >(
      moduleName: keyof ComponentModules,
      key: string,
      component: {
        label: string
        preview: () => JSX.Element
        render: (data: {
          props: { [k in keyof Props]: any }
          model: Partial<{ [k in keyof Model]: any }>
          block: VisualEditorBlockData
          size: { width?: number; height?: number }
          custom: Record<string, any>
        }) => JSX.Element
        props?: Props
        model?: Model
        resize?: { width?: boolean; height?: boolean }
      }
    ) => {
      const comp = { ...component, key, moduleName }
      componentModules[moduleName].push(comp)
      componentMap[key] = comp
    }
  }
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>
