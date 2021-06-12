import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { setupVant } from '@/plugins/vant'

import 'animate.css'

const app = createApp(App)

// 安装vant插件
setupVant(app)

app.config.globalProperties.$$refs = {}

// if (import.meta.env.DEV) {
window.$$refs = app.config.globalProperties.$$refs
// }

app.use(router).mount('#app')
