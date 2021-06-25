<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 18:36:03
 * @LastEditTime: 2021-06-25 21:38:33
 * @LastEditors: 卜启缘
 * @Description: 数据源管理
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\components\data-source\index.vue
-->
<template>
  <el-button class="!my-10px" type="primary" size="small" @click="showModelMoal">添加</el-button>
  <el-collapse v-model="state.activeNames">
    <template v-for="item in models" :key="item.key">
      <el-collapse-item :title="item.name" :name="item.key">
        <template #title>
          <div class="model-item-title">
            <span>{{ item.name }}</span>
            <div class="model-actions">
              <i class="el-icon-edit" @click="editModel(item)"></i>
              <i class="el-icon-delete" @click="deleteModel(item.key)"></i>
            </div>
          </div>
        </template>
        <template v-for="entity in item.entitys" :key="entity.key">
          <div class="low-model-item">
            <pre class="code">{{ JSON.stringify(entity, null, 2) }}</pre>
          </div>
        </template>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script setup lang="tsx">
import { reactive, computed } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElCard,
  ElButton,
  ElMessage
} from 'element-plus'
import { useVisualData, fieldTypes } from '@/visual-editor/hooks/useVisualData'
import type { VisualEditorModel } from '@/visual-editor/visual-editor.utils'
import { useModal } from '@/visual-editor/hooks/useModal'
import { cloneDeep } from 'lodash'
import { generateUUID } from '@/visual-editor/utils/'

interface IState {
  activeNames: string[]
  ruleFormRef: any
  ruleForm: VisualEditorModel
}

const { jsonData, incrementModel, updateModel, deleteModel } = useVisualData()
/**
 * @description 模型集合
 */
const models = computed(() => cloneDeep(jsonData.models))

/**
 * @description 是否处于编辑状态
 */
const isEdit = computed(() => models.value.some((item) => item.key == state.ruleForm.key))

/**
 * @description 创建空的实体对象
 */
const createEmptyEntity = () => ({ field: '', name: '', type: 'string', value: '' })

/**
 * @description 创建空的数据模型
 */
const createEmptyModel = () => ({
  name: '',
  key: generateUUID(),
  entitys: [createEmptyEntity()]
})

const state = reactive<IState>({
  activeNames: [],
  ruleFormRef: null,
  ruleForm: createEmptyModel()
})

/**
 * @param {number} 索引
 * @description 删除实体项
 */
const deleteEntityItem = (index: number) => {
  state.ruleForm.entitys.splice(index, 1)
}

/**
 * @description 添加实体项
 */
const addEntityItem = () => {
  state.ruleForm.entitys.push(createEmptyEntity())
}

/**
 * @description 显示添加接口弹窗
 */
const showModelMoal = () => {
  useModal({
    title: `${isEdit.value ? '编辑' : '新增'}数据源`,
    content: () => (
      <ElForm
        model={state.ruleForm}
        ref={(el) => el && (state.ruleFormRef = el)}
        label-width="100px"
        size={'mini'}
        class="demo-ruleForm"
      >
        <ElFormItem
          label="数据源名称"
          prop="name"
          rules={[{ required: true, message: '请输入数据源名称', trigger: 'change' }]}
        >
          <ElInput v-model={state.ruleForm.name} placeholder={'请输入数据源名称'}></ElInput>
        </ElFormItem>
        {state.ruleForm.entitys.map((entity, index) => (
          <ElCard
            key={index}
            shadow={'hover'}
            v-slots={{
              header: () => (
                <div class={'flex justify-between'}>
                  <ElFormItem
                    label="实体名称"
                    prop={`entitys.${index}.name`}
                    rules={[{ required: true, message: '请输入实体名称', trigger: 'change' }]}
                    showMessage={false}
                    class={'w-300px !mb-0'}
                  >
                    <ElInput v-model={entity.name} placeholder={'请输入实体名称'}></ElInput>
                  </ElFormItem>
                  <div>
                    <ElButton onClick={() => deleteEntityItem(index)} type={'danger'} size={'mini'}>
                      删除
                    </ElButton>
                    <ElButton onClick={addEntityItem} type={'primary'} size={'mini'}>
                      添加
                    </ElButton>
                  </div>
                </div>
              )
            }}
          >
            <ElFormItem
              label="实体字段"
              prop={`entitys.${index}.field`}
              rules={[{ required: true, message: '请输入实体字段', trigger: 'change' }]}
            >
              <ElInput v-model={entity.field} placeholder={'请输入实体字段'}></ElInput>
            </ElFormItem>
            <ElFormItem
              label="数据类型"
              prop={`entitys.${index}.type`}
              rules={[{ required: true, message: '请输入数据类型', trigger: 'change' }]}
            >
              <ElSelect v-model={entity.type}>
                {fieldTypes.map((typeItem) => (
                  <ElOption
                    key={typeItem.value}
                    label={typeItem.label}
                    value={typeItem.value}
                  ></ElOption>
                ))}
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="默认数据" prop={`entitys.${index}.value`}>
              <ElInput
                v-model={entity.value}
                placeholder={'实体默认数据，不填则为对应类型数据'}
              ></ElInput>
            </ElFormItem>
          </ElCard>
        ))}
      </ElForm>
    ),
    onConfirm: () => {
      return new Promise((resolve, reject) => {
        state.ruleFormRef.validate((valid) => {
          if (valid) {
            if (isEdit.value) {
              updateModel(cloneDeep(state.ruleForm))
            } else {
              incrementModel(cloneDeep(state.ruleForm))
            }
            ElMessage.success(`${isEdit.value ? '修改' : '新增'}模型成功！`)
            state.ruleForm = createEmptyModel()
            resolve('submit!')
          } else {
            reject()
            console.log('error submit!!')
            return false
          }
        })
      })
    },
    onCancel: () => (state.ruleForm = createEmptyModel())
  })
}
/**
 * @description 编辑模型
 */
const editModel = (model: VisualEditorModel) => {
  console.log(model)
  state.ruleForm = cloneDeep(model)
  showModelMoal()
}
</script>

<style lang="scss" scoped>
.code {
  padding: 4px 10px;
  font-size: 12px;
  line-height: 1.4;
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
