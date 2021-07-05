/*
 * @Author: 卜启缘
 * @Date: 2021-04-22 02:10:31
 * @LastEditTime: 2021-07-05 11:39:10
 * @LastEditors: 卜启缘
 * @Description: 按需导入element-plus
 * @FilePath: \vite-vue3-lowcode\src\plugins\element-plus.ts
 */
import 'element-plus/packages/theme-chalk/src/base.scss'
// import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/lib/theme-chalk/el-popper.css'
import type { App } from 'vue'

import { ElInfiniteScroll, locale } from 'element-plus'

import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

// 设置语言
import.meta.env.DEV ? locale(lang) : locale.use(lang)

export const setupElementPlus = (app: App) => {
  app.use(ElInfiniteScroll)
}
