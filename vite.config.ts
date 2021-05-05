import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import ViteComponents, { ElementPlusResolver, VantResolver } from 'vite-plugin-components'
import styleImport from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD)
  return {
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同时支持横线和驼峰
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      ViteComponents({
        // valid file extensions for components.
        extensions: ['vue', 'tsx'],
        customComponentResolvers: [ElementPlusResolver(), VantResolver()]
      }),
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              name = name.slice(3)
              return `element-plus/packages/theme-chalk/src/${name}.scss`
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`
            }
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    },
    base: VITE_BASE_URL, // 设置打包路径
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          preview: resolve(__dirname, 'preview/index.html')
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'element-plus',
        'vant',
        'lodash',
        'vuedraggable'
      ],
      exclude: ['vue-demi']
    },
    server: {
      port: 8080, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'http://xxx.xxx.xxx.xxx:x000',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace('/api/', '/')
      //   }
      // },
    }
  }
}
