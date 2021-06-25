/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-06-24 21:57:31
 * @LastEditors: 卜启缘
 * @Description: 公用的工具函数
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\utils\index.ts
 */

/**
 * @description 部署应用时的基本URL
 */
export const BASE_URL = import.meta.env.BASE_URL

/**
 * @description 生成UUID
 * @param {boolean} [noSymbol=false] 是否需要 - 分隔符
 * @returns {string}
 */
export function generateUUID(noSymbol = false) {
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  if (noSymbol) {
    uuid = uuid.replace(/-/g, '')
  }
  return uuid
}
