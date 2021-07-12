/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-08 16:47:34
 * @LastEditors: 卜启缘
 * @Description: 全局声明文件
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\types\index.d.ts
 */

declare global {
  /** label-value一般用做选项 */
  type LabelValue = {
    label: string
    value: any
  }
  /** label-value 数组 一般用做选项 */
  type LabelValueOptions = OptionItem[]

  type RequestIdleCallbackHandle = any

  type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean
    timeRemaining: () => number
  }

  type RequestIdleCallbackOptions = {
    timeout: number
  }
  interface Window {
    $$refs: any
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $$refs: any
  }
}

declare module '@vue/runtime-dom' {
  export interface CSSProperties {
    /** 临时padding变量. */
    tempPadding?: string
  }
}

export {}
