import type { App } from 'vue'
import '@vant/touch-emulator'
import 'vant/lib/index.css'

import { Lazyload } from 'vant'

export const setupVant = (app: App) => {
  app.use(Lazyload)
}
