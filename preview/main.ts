import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import '@/plugins/vant'

const app = createApp(App)

app.config.globalProperties.$$refs = {}

// if (import.meta.env.DEV) {
window.$$refs = app.config.globalProperties.$$refs
// }

app.use(router).mount('#app')
