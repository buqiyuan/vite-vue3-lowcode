/*
 * @Author: 卜启缘
 * @Date: 2021-06-27 13:15:19
 * @LastEditTime: 2021-06-27 15:22:51
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\components\data-source\utils.tsx
 */
import { generateNanoid } from '@/visual-editor/utils'
import type { FetchApiItem } from '@/visual-editor/visual-editor.utils'
import { RequestEnum } from '@/enums/httpEnum'
import MonacoEditor from '@/visual-editor/components/common/monaco-editor/MonacoEditor'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import type { VisualEditorModel } from '@/visual-editor/visual-editor.utils'
import { useModal } from '@/visual-editor/hooks/useModal'
import { ElMessage } from 'element-plus'

/**
 * @description 导入丝袜哥
 * @param {object} swagger 丝袜哥JSON字符串
 * @returns { apis, models }
 */
export const importSwaggerJson = (swagger: any) => {
  swagger = typeof swagger == 'string' ? JSON.parse(swagger) : swagger
  const models: VisualEditorModel[] = []
  Object.keys(swagger.definitions).forEach((model) => {
    const properties = swagger.definitions[model].properties
    const modelItem: VisualEditorModel = {
      name: model,
      key: generateNanoid(),
      entitys: []
    }
    Object.keys(properties).forEach((field) => {
      modelItem.entitys.push({
        key: field,
        name: properties[field].description || field,
        type: properties[field].type,
        value: ''
      })
    })
    models.push(modelItem)
  })
  const apis: FetchApiItem[] = []
  Object.keys(swagger.paths).forEach((url) => {
    Object.keys(swagger.paths[url]).forEach((method) => {
      const apiUrlObj = swagger.paths[url][method]
      const model = apiUrlObj.parameters?.[0]?.schema?.$ref?.split('/').pop()
      const bindTarget = model ? models.find((item) => item.name == model) : undefined
      typeof bindTarget == 'object' && (bindTarget.name = apiUrlObj.summary)
      const api: FetchApiItem = {
        key: generateNanoid(),
        name: apiUrlObj.summary,
        options: {
          url: url, // 请求的url
          method: method.toLocaleUpperCase() as RequestEnum, // 请求的方法
          contentType: apiUrlObj.produces[0] || apiUrlObj.consumes[0] // 请求的内容类型
        },
        data: {
          bind: bindTarget?.key || '', // 请求绑定对应的某个实体
          recv: '' // 响应的结果绑定到某个实体上
        }
      }
      apis.push(api)
    })
  })
  return { apis, models }
}

/**
 * @description 显示导入swagger JSON模态框
 */
export const useImportSwaggerJsonModal = () => {
  const { updateModel, updateFetchApi } = useVisualData()

  const shema = {}
  const handleSchemaChange = (val) => {
    try {
      const newObj = JSON.parse(val)
      Object.assign(shema, newObj)
    } catch (e) {
      console.log('JSON格式有误：', e)
    }
  }
  return {
    showImportSwaggerJsonModal: () =>
      useModal({
        title: '导入swagger JSON (支持swagger: 2.0)',
        props: {
          width: 760
        },
        content: () => (
          <MonacoEditor
            code={''}
            layout={{ width: 700, height: 600 }}
            vid={-1}
            onChange={handleSchemaChange}
            title=""
          />
        ),
        onConfirm: () => {
          try {
            const { models, apis } = importSwaggerJson(shema)
            updateModel(models, true)
            updateFetchApi(apis, true)
            ElMessage.success('导入成功！')
            console.log({ models, apis }, '导入的swagger')
          } catch (e) {
            ElMessage.success('导入失败！请检查swagger JSON是否有误！')
          }
        }
      })
  }
}
