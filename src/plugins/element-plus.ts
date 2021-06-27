/*
 * @Author: 卜启缘
 * @Date: 2021-04-22 02:10:31
 * @LastEditTime: 2021-06-27 14:58:03
 * @LastEditors: 卜启缘
 * @Description: 按需导入element-plus
 * @FilePath: \vite-vue3-lowcode\src\plugins\element-plus.ts
 */
import 'element-plus/packages/theme-chalk/src/base.scss'
// import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/lib/theme-chalk/el-popper.css'
import type { App } from 'vue'
import { ElInfiniteScroll } from 'element-plus'
export const setupElementPlus = (app: App) => {
  app.use(ElInfiniteScroll)
}
