/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-07 21:45:41
 * @LastEditors: 卜启缘
 * @Description: 全局声明文件
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\types\index.d.ts
 */

declare type LabelValue = {
  label: string
  value: any
}

declare type LabelValueOptions = OptionItem[]

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
