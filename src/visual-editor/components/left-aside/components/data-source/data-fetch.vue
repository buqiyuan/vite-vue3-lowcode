<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 18:36:03
 * @LastEditTime: 2021-07-09 20:00:22
 * @LastEditors: 卜启缘
 * @Description: 接口请求
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\components\data-source\data-fetch.vue
-->
<template>
  <div class="!mb-10px">
    <el-button type="primary" size="small" @click="showModelMoal">添加</el-button>
    <el-button type="warning" size="small" @click="showImportSwaggerJsonModal"
      >导入swagger</el-button
    >
    <el-popconfirm title="确定要删除全部接口吗？" @confirm="updateFetchApi([], true)">
      <template #reference>
        <el-button type="danger" size="small">清空</el-button>
      </template>
    </el-popconfirm>
  </div>
  <el-collapse v-model="state.activeNames" v-infinite-scroll="() => {}">
    <template v-for="item in apis" :key="item.key">
      <el-collapse-item :title="item.name" :name="item.key">
        <template #title>
          <div class="model-item-title">
            <span class="truncate w-160px">{{ item.name }}</span>
            <div class="model-actions">
              <i class="el-icon-edit" @click="editApiItem(item)"></i>
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除该接口吗？"
                @confirm="deleteFetchApi(item.key)"
              >
                <template #reference>
                  <i class="el-icon-delete"></i>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
        <div class="low-model-item">
          <pre class="code">{{ JSON.stringify(item, null, 2) }}</pre>
        </div>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script setup lang="tsx">
import { reactive, ref, computed } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElMessage,
  ElCascader
} from 'element-plus'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import type { FetchApiItem, VisualEditorModel } from '@/visual-editor/visual-editor.utils'
import { useModal } from '@/visual-editor/hooks/useModal'
import { cloneDeep } from 'lodash'
import { generateNanoid } from '@/visual-editor/utils/'
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { useImportSwaggerJsonModal } from './utils'

interface IState {
  activeNames: string[]
  ruleForm: FetchApiItem
}

const { jsonData, incrementFetchApi, updateFetchApi, deleteFetchApi } = useVisualData()
const { showImportSwaggerJsonModal } = useImportSwaggerJsonModal()
/**
 * @description 接口集合
 */
const apis = computed(() => cloneDeep(jsonData.actions.fetch.apis))

/**
 * @description 模型集合
 */
const models = computed(() => cloneDeep(jsonData.models))

/**
 * @description 是否处于编辑状态
 */
const isEdit = computed(() => apis.value.some((item) => item.key == state.ruleForm.key))

/**
 * @description 创建空的数据接口对象
 */
const createEmptyApiItem = (): FetchApiItem => ({
  key: generateNanoid(),
  name: '',
  options: {
    url: '', // 请求的url
    method: RequestEnum.GET, // 请求的方法
    contentType: 'JSON' // 请求的内容类型
  },
  data: {
    bind: '', // 请求绑定对应的某个实体
    recv: '' // 响应的结果绑定到某个实体上
  }
})
const ruleFormRef = ref<InstanceType<typeof ElForm>>()

const state = reactive<IState>({
  activeNames: [],
  ruleForm: createEmptyApiItem()
})

const rules = {
  name: [{ required: true, message: '请输入接口名称', trigger: 'change' }],
  'options.url': [{ required: true, message: '请输入接口名称', trigger: 'change' }],
  'options.contentType': [{ required: true, message: '请选择内容类型', trigger: 'change' }]
}

const handleBindChange = (e: VisualEditorModel[]) => {
  console.log(e, 'kkk')
}

/**
 * @description 显示添加接口弹窗
 */
const showModelMoal = () => {
  const operateType = isEdit.value ? '编辑' : '新增'
  useModal({
    title: `${operateType}接口`,
    props: {
      width: 600
    },
    content: () => (
      <ElForm
        model={state.ruleForm}
        ref={ruleFormRef}
        label-width="100px"
        size={'mini'}
        rules={rules}
      >
        <ElFormItem label="名称" prop="name">
          <ElInput v-model={state.ruleForm.name} placeholder={'请输入接口名称'}></ElInput>
        </ElFormItem>
        <ElFormItem label="接口" prop={'options.url'}>
          <ElInput v-model={state.ruleForm.options.url} placeholder={'请输入接口地址'}>
            {{
              prepend: () => (
                <ElSelect v-model={state.ruleForm.options.method} class={'w-90px'}>
                  {Object.keys(RequestEnum).map((key) => (
                    <ElOption key={key} label={key} value={key}></ElOption>
                  ))}
                </ElSelect>
              )
            }}
          </ElInput>
        </ElFormItem>
        <ElFormItem label="内容类型" prop={'options.contentType'}>
          <ElSelect v-model={state.ruleForm.options.contentType}>
            {Object.keys(ContentTypeEnum).map((key) => (
              <ElOption key={key} label={key} value={key}></ElOption>
            ))}
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="请求数据" prop={'data.bind'}>
          <ElCascader
            v-model={state.ruleForm.data.bind}
            options={models.value}
            clearable={true}
            props={{
              checkStrictly: true,
              children: 'entitys',
              label: 'name',
              value: 'key',
              expandTrigger: 'hover'
            }}
            placeholder="请选择绑定的请求数据"
            onChange={handleBindChange}
          ></ElCascader>
        </ElFormItem>
        <ElFormItem label="响应数据" prop={'data.recv'}>
          <ElCascader
            clearable={true}
            props={{
              checkStrictly: true,
              children: 'entitys',
              label: 'name',
              value: 'key',
              expandTrigger: 'hover'
            }}
            placeholder="请选择绑定的响应数据"
            onChange={handleBindChange}
            v-model={state.ruleForm.data.recv}
            options={models.value}
          ></ElCascader>
        </ElFormItem>
      </ElForm>
    ),
    onConfirm: () => {
      return new Promise((resolve, reject) => {
        ruleFormRef.value?.validate((valid) => {
          if (valid) {
            if (isEdit.value) {
              updateFetchApi(cloneDeep(state.ruleForm))
            } else {
              incrementFetchApi(cloneDeep(state.ruleForm))
            }
            ElMessage.success(`${operateType}接口成功！`)
            state.ruleForm = createEmptyApiItem()
            resolve('submit!')
          } else {
            reject()
            console.log('error submit!!')
            return false
          }
        })
      })
    },
    onCancel: () => (state.ruleForm = createEmptyApiItem())
  })
}

/**
 * @description 编辑模型
 */
const editApiItem = (apiItem: FetchApiItem) => {
  console.log(apiItem)
  state.ruleForm = cloneDeep(apiItem)
  showModelMoal()
}
</script>

<style lang="scss" scoped>
.low-model-item {
  overflow: auto;

  .code {
    padding: 4px 10px;
    font-size: 12px;
    line-height: 1.4;
  }
}

.model-item-title {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .model-actions {
    i {
      padding: 6px;
      margin: 0 2px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 2px;
      opacity: 0.7;
      transition: all 0.1s;

      &:hover {
        background-color: #f1f1f1;
        opacity: 1;
      }

      &.el-icon-delete {
        color: #f44336;
      }

      &.el-icon-edit {
        color: #2196f3;
      }
    }
  }
}
</style>
