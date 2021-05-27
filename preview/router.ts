import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { VisualEditorModelValue } from '@/visual-editor/visual-editor.utils'
import { CacheEnum } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('./views/preview.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 获取本地缓存的页面数据
const jsonData: VisualEditorModelValue = JSON.parse(
  localStorage.getItem(CacheEnum.PAGE_DATA_KEY) as string
)

router.beforeEach((to) => {
  document.title = jsonData?.pages?.[to.path]?.title ?? document.title
  return true
})

export default router
