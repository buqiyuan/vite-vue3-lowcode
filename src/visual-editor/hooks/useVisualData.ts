/**
 * @name: useVisualData
 * @author: 卜启缘
 * @date: 2021/5/6 11:59
 * @description：useVisualData
 * @update: 2021/5/6 11:59
 */
import {
  reactive,
  inject,
  readonly,
  computed,
  watch,
  ComputedRef,
  InjectionKey,
  DeepReadonly
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type {
  VisualEditorModelValue,
  VisualEditorBlockData,
  VisualEditorPage,
  VisualEditorConfig,
  FetchApiItem,
  VisualEditorModel
} from '@/visual-editor/visual-editor.utils'

import { visualConfig } from '@/visual.config'
import { CacheEnum } from '@/enums'

// 保存到本地JSON数据的key
export const localKey = CacheEnum.PAGE_DATA_KEY

// 注入jsonData的key
export const injectKey: InjectionKey<string> = Symbol()

interface IState {
  currentBlock: VisualEditorBlockData // 当前正在操作的组件
  currentPage: VisualEditorPage // 当前正在操作的页面
  jsonData: VisualEditorModelValue // 整棵JSON树
}

export interface VisualData {
  jsonData: DeepReadonly<VisualEditorModelValue> // 保护JSONData避免直接修改
  currentPage: ComputedRef<VisualEditorPage> // 当前正在操作的页面
  currentBlock: ComputedRef<VisualEditorBlockData> // 当前正在操作的组件
  visualConfig: VisualEditorConfig // 组件配置
  overrideProject: (jsonData: VisualEditorModelValue) => void // 使用JSON覆盖整个项目
  updatePage: (data: { newPath?: string; oldPath: string; page: Partial<VisualEditorPage> }) => void // 更新某个页面
  incrementPage: (path: string, page: Omit<VisualEditorPage, 'path'>) => void // 新增页面
  deletePage: (path: string, redirect?: string) => void // 删除页面
  updatePageBlock: (path: string, blocks: VisualEditorBlockData[]) => void // 更新某页面下的所有组件
  setCurrentPage: (path: string) => void // 设置当前正在操作的页面
  setCurrentBlock: (block: VisualEditorBlockData) => void // 设置当前正在操作的组件
  incrementFetchApi: (api: FetchApiItem) => void // 新增api接口
  deleteFetchApi: (key: string) => void // 删除某个api接口
  updateFetchApi: (newApi: FetchApiItem) => void // 更新某个api接口
  incrementModel: (api: VisualEditorModel) => void // 新增模型
  deleteModel: (key: string) => void // 删除某个模型
  updateModel: (newApi: VisualEditorModel) => void // 更新某个模型
}

/**
 * @description 创建空的新页面
 */
export const createNewPage = ({ title = '新页面', path = '/' }) => ({
  title,
  path,
  config: {
    bgColor: '',
    bgImage: ''
  },
  blocks: []
})

const defaultValue: VisualEditorModelValue = {
  pages: {
    // 页面
    '/': createNewPage({ title: '首页' })
  },
  models: [], // 模型实体集合
  actions: {
    // 动作
    fetch: {
      name: '接口请求',
      apis: []
    },
    dialog: {
      name: '对话框',
      handles: []
    }
  }
}

export const initVisualData = (): VisualData => {
  const localData = JSON.parse(sessionStorage.getItem(localKey) as string)
  const jsonData: VisualEditorModelValue = Object.keys(localData?.pages || {}).length
    ? localData
    : defaultValue

  const route = useRoute()
  const router = useRouter()

  console.log('jsonData：', jsonData)
  // 所有页面的path都必须以 / 开发
  const getPrefixPath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

  const currentPage = jsonData.pages[route.path]

  const state: IState = reactive({
    jsonData,
    currentPage,
    currentBlock: currentPage?.blocks?.find((item) => item.focus) ?? ({} as VisualEditorBlockData)
  })
  const paths = Object.keys(jsonData.pages)

  const isExistPath = paths.some((path) => route.path == path)
  // 当前页面是否存在
  if (!isExistPath) {
    router.replace(paths[0] || '/')
    state.currentPage = jsonData.pages[paths[0]] ?? defaultValue.pages['/']
  }

  // 路由变化时更新当前操作的页面
  watch(
    () => route.path,
    (url) => setCurrentPage(url)
  )

  // 更新page
  const updatePage = ({ newPath, oldPath, page }) => {
    console.log(state.jsonData.pages[oldPath], page)
    if (newPath && newPath != oldPath) {
      page.path = newPath
      // 如果传了新的路径，则认为是修改页面路由
      state.jsonData.pages[getPrefixPath(newPath)] = { ...state.jsonData.pages[oldPath], ...page }
      deletePage(oldPath, getPrefixPath(newPath))
    } else {
      Object.assign(state.jsonData.pages[oldPath], page)
    }
  }
  // 添加page
  const incrementPage = (path = '', page: VisualEditorPage) => {
    state.jsonData.pages[getPrefixPath(path)] ??= page ?? createNewPage({ path })
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
    if (!state.currentPage) {
      state.currentPage = jsonData.pages['/']
      router.replace('/')
    }
    const currentFocusBlock = state.currentPage.blocks.find((item) => item.focus)
    setCurrentBlock(currentFocusBlock ?? ({} as VisualEditorBlockData))
  }

  // 设置当前被操作的组件
  const setCurrentBlock = (block: VisualEditorBlockData) => {
    state.currentBlock = block
  }

  // 更新pages下面的blocks
  const updatePageBlock = (path = '', blocks: VisualEditorBlockData[] = []) => {
    state.jsonData.pages[path].blocks = blocks
  }

  /**
   * @description 新建API接口请求
   */
  const incrementFetchApi = (api: FetchApiItem) => {
    state.jsonData.actions.fetch.apis.push(api)
  }

  /**
   * @description 删除某个API接口
   */
  const deleteFetchApi = (key: string) => {
    const index = state.jsonData.actions.fetch.apis.findIndex((item) => item.key == key)
    if (index !== -1) {
      state.jsonData.actions.fetch.apis.splice(index, 1)
    }
  }

  /**
   * @description 更新某个API接口
   */
  const updateFetchApi = (api: FetchApiItem) => {
    const target = state.jsonData.actions.fetch.apis.find((item) => item.key == api.key)
    Object.assign(target, api)
  }

  /**
   * @description 新增模型
   */
  const incrementModel = (model: VisualEditorModel) => {
    state.jsonData.models.push(model)
  }

  /**
   * @description 删除某个模型
   */
  const deleteModel = (key: string) => {
    const index = state.jsonData.models.findIndex((item) => item.key == key)
    if (index !== -1) {
      state.jsonData.models.splice(index, 1)
    }
  }

  /**
   * @description 更新某个模型
   */
  const updateModel = (model: VisualEditorModel) => {
    const index = state.jsonData.models.findIndex((item) => item.key == model.key)
    if (index !== -1) {
      state.jsonData.models.splice(index, 1, model)
    }
  }

  // 使用自定义JSON覆盖整个项目
  const overrideProject = (jsonData) => {
    state.jsonData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
  }

  return {
    visualConfig,
    jsonData: readonly(state.jsonData), // 保护JSONData避免直接修改
    currentPage: computed(() => state.currentPage),
    currentBlock: computed(() => state.currentBlock),
    overrideProject,
    incrementFetchApi,
    deleteFetchApi,
    updateFetchApi,
    incrementModel,
    deleteModel,
    updateModel,
    setCurrentPage,
    setCurrentBlock,
    updatePage,
    incrementPage,
    deletePage,
    updatePageBlock
  }
}

export const useVisualData = () => inject<VisualData>(injectKey)!

/**
 * 实体的字段数据类型
 */
export const fieldTypes = [
  {
    label: '字符串',
    value: 'string'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '数组',
    value: 'array'
  },
  {
    label: '布尔值',
    value: 'boolean'
  }
]
