/**
 * @name: useVisualData
 * @author: 卜启缘
 * @date: 2021/5/6 11:59
 * @description：useVisualData
 * @update: 2021/5/6 11:59
 */
import { reactive, inject, readonly, computed, ComputedRef, DeepReadonly } from 'vue'
import {
  VisualEditorModelValue,
  VisualEditorBlockData,
  VisualEditorPage,
  VisualEditorConfig
} from '@/visual-editor/visual-editor.utils'

import { visualConfig } from '@/visual.config'

// 保存到本地JSON数据的key
export const localKey = 'jsonData'

// 注入jsonData的key
export const injectKey = Symbol('injectKey')

interface IState {
  currentPage: VisualEditorPage // 当前正在操作的页面
  jsonData: VisualEditorModelValue // 整颗JSON树
}

export interface VisualData {
  jsonData: DeepReadonly<VisualEditorModelValue> // 保护JSONData避免直接修改
  currentPage: ComputedRef<VisualEditorPage> // 当前正在操作的页面
  visualConfig: VisualEditorConfig // 组件配置
  updatePage: (data: { newPath?: string; oldPath: string; page: Partial<VisualEditorPage> }) => void // 更新某个页面
  incrementPage: (path: string, page: VisualEditorPage) => void // 新增页面
  deletePage: (path: string, redirect?: string) => void // 删除页面
  updatePageBlock: (path: string, blocks: VisualEditorBlockData[]) => void // 更新某页面下的所有组件
  setCurrentPage: (path: string) => void // 设置当前正在操作的页面
}

export const initVisualData = (): VisualData => {
  const jsonData: VisualEditorModelValue = JSON.parse(
    sessionStorage.getItem('jsonData') as string
  ) || {
    container: {
      width: 360,
      height: 960
    },
    pages: {
      '/': {
        title: '首页',
        blocks: []
      }
    }
  }

  console.log('jsonData：', jsonData)
  // 获取当前页面哈希路径
  const getCurrentPath = () => location.hash.slice(1)
  // 所有页面的path都必须以 / 开发
  const getPrefixPath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

  const state: IState = reactive({
    jsonData,
    currentPage: jsonData.pages[getCurrentPath()] ?? jsonData.pages['/']
  })

  // 路由变化时更新当前操作的页面
  window.addEventListener('hashchange', () => {
    setCurrentPage(getCurrentPath())
  })

  // 更新page
  const updatePage = ({ newPath, oldPath, page }) => {
    if (newPath && newPath != oldPath) {
      // 如果传了新的路径，则认为是修改页面路由
      state.jsonData.pages[getPrefixPath(newPath)] = { ...state.jsonData.pages[oldPath], ...page }
      deletePage(oldPath, getPrefixPath(newPath))
    } else {
      Object.assign(state.jsonData.pages[oldPath], page)
    }
  }
  // 添加page
  const incrementPage = (path = '', page: VisualEditorPage = { title: '新页面', blocks: [] }) => {
    state.jsonData.pages[getPrefixPath(path)] = page
  }
  // 删除page
  const deletePage = (path = '', redirectPath = '') => {
    delete state.jsonData.pages[path]
    if (redirectPath) {
      setCurrentPage(redirectPath)
    }
  }
  // 设置当前页面
  const setCurrentPage = (path = '/') => {
    state.currentPage = jsonData.pages[path]
  }

  // 更新pages下面的blocks
  const updatePageBlock = (path = '', blocks: VisualEditorBlockData[] = []) => {
    state.jsonData.pages[path].blocks = blocks
  }

  return {
    jsonData: readonly(state.jsonData), // 保护JSONData避免直接修改
    currentPage: computed(() => state.currentPage),
    visualConfig,
    setCurrentPage,
    updatePage,
    incrementPage,
    deletePage,
    updatePageBlock
  }
}

export const useVisualData = () => inject<VisualData>(injectKey)!
