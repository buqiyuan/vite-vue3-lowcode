/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:39:52
 * @LastEditTime: 2021-06-24 18:50:16
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\tabs.ts
 */
export const tabs = [
  {
    icon: 'el-icon-tickets',
    label: '页面',
    componentName: 'PageTree'
  },
  {
    icon: 'el-icon-data-board',
    label: '数据源',
    componentName: 'data-source'
  },
  {
    icon: 'el-icon-edit',
    label: '基础控件',
    componentName: 'BaseWidgets'
  },
  {
    icon: 'el-icon-suitcase',
    label: '容器组件',
    componentName: 'ContainerComponent'
  },
  {
    icon: 'el-icon-upload',
    label: '自定义组件',
    componentName: 'custom-component'
  }
]
