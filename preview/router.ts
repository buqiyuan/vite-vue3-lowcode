import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

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

export default router
