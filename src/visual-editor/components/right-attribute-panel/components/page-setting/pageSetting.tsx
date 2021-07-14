/*
 * @Author: 卜启缘
 * @Date: 2021-06-13 22:07:29
 * @LastEditTime: 2021-07-13 21:25:59
 * @LastEditors: 卜启缘
 * @Description: 当前页面配置
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\page-setting\pageSetting.tsx
 */
import { defineComponent } from 'vue'
import { ElForm, ElFormItem, ElInput, ElUpload, ElColorPicker, ElSwitch } from 'element-plus'
import styles from './styles.module.scss'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'

export const PageSetting = defineComponent({
  setup() {
    const { currentPage } = useVisualData()

    const pageConfig = currentPage.value.config

    const beforeUpload = (file: File) => {
      console.log(file, '要上传的文件')
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        pageConfig.bgImage = event.target?.result as string
      }
      fileReader.readAsDataURL(file)
    }

    return () => (
      <>
        <ElForm>
          <ElFormItem label="路由切换时缓存本页面">
            <ElSwitch v-model={pageConfig.keepAlive} />
          </ElFormItem>
          <ElFormItem label="背景颜色">
            <ElColorPicker v-model={pageConfig.bgColor} />
          </ElFormItem>
          <ElFormItem label="背景图片">
            <ElInput v-model={pageConfig.bgImage} placeholder={'图片地址'} clearable />
          </ElFormItem>
          <ElUpload action={''} beforeUpload={beforeUpload} class={styles.upload}>
            {pageConfig.bgImage ? (
              <img src={pageConfig.bgImage} />
            ) : (
              <i class="el-icon-plus uploader-icon"></i>
            )}
          </ElUpload>
        </ElForm>
      </>
    )
  }
})
