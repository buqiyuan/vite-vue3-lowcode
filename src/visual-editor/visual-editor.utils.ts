import type { VisualEditorProps } from './visual-editor.props'
import { inject, provide } from 'vue'
import { useDotProp } from '@/visual-editor/hooks/useDotProp'
import type { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'

/**
 * @description 组件属性
 */
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
  animations?: Animation[] // 动画集
  actions: Action[] // 组件动作集合
  events: { label: string; value: string }[] // 组件事件集合
  [prop: string]: any
}
/**
 * @description 组件动作事件处理
 */
export interface ActionHandle {
  key: string
  name: string
  link: string
  data?: {
    bind?: string
    recv?: string
  }
}
/**
 * @description 组件动作
 */
export interface Action {
  key: string
  name: string
  event: string
  handle: ActionHandle[]
}

/**
 * @description 页面配置
 */
export interface PageConfig {
  bgImage: string // 背景图片
  bgColor: string // 背景颜色
}
/**
 * @description 页面对象
 */
export interface VisualEditorPage {
  title: string // 页面标题
  path: string // 页面路径
  isDefault?: boolean // 404是重定向到默认页面
  config: PageConfig // 页面配置
  blocks: VisualEditorBlockData[] // 当前页面的所有组件
}
/**
 * @description 可以认为是 路由=>页面
 */
export interface VisualEditorPages {
  [path: string]: VisualEditorPage
}
/**
 * @description 实体类型
 */
export type EntityType = {
  key: string // 绑定的字段 输入
  name: string // 实体名称 输入
  type: string // 数据类型 选择
  value: string // 默认值 输入
}

/**
 * @description 数据模型
 */
export interface VisualEditorModel {
  name: string // 数据源名称
  key: string // 绑定的字段 该字段创建的时候生成
  entitys: EntityType[] // 实体集合
}
/**
 * @description 接口请求对象
 */
export interface FetchApiItem {
  key: string // 随机生成的key
  name: string // 当前api名字
  options: {
    url: string // 请求的url
    method: keyof typeof RequestEnum // 请求的方法
    contentType: keyof typeof ContentTypeEnum // 请求的内容类型
  }
  data: {
    bind: string // 请求绑定对应的某个实体
    recv: string // 响应的结果绑定到某个实体上
  }
}

/**
 * @description 动作集合
 */
export interface VisualEditorActions {
  fetch: {
    name: '接口请求'
    apis: FetchApiItem[]
  }
  dialog: {
    name: '对话框'
    handlers: []
  }
}
/**
 * @description 总的数据集
 */
export interface VisualEditorModelValue {
  pages: VisualEditorPages // 页面
  models: VisualEditorModel[] // 实体
  actions: VisualEditorActions // 动作
}
/**
 * @description 动画项
 */
export interface Animation {
  label: string // 动画名称
  value: string // 动画类名
  duration: number // 动画持续时间
  delay: number // 动画延迟多久执行
  count: number // 动画执行次数
  infinite: boolean // 是否无限循环动画
}
/**
 * @description 单个组件注册规则
 */
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
  animations?: Animation[] // 动画集
  events?: { label: string; value: string }[] // 组件事件集合
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
    animations: [], // 动画集
    actions: [], // 动作集合
    events: component.events || [], // 事件集合
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
/**
 * @description 创建编辑器配置
 * @returns {} 返回编辑器注册组件的方法等
 */
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
