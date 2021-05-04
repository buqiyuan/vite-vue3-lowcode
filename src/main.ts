import { createApp } from 'vue'
import App from './App.vue'

import './plugins/element-plus'
import './plugins/vant'

import 'normalize.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools'

import router from './router/'
import store from './store/'

const app = createApp(App)

app.config.globalProperties.$$refs = {}

// if (import.meta.env.DEV) {
window.$$refs = app.config.globalProperties.$$refs
// }

app.use(router).use(store).mount('#app')
