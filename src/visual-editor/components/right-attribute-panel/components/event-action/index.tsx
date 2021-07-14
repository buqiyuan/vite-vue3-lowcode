/*
 * @Author: 卜启缘
 * @Date: 2021-06-24 11:01:45
 * @LastEditTime: 2021-07-08 09:53:27
 * @LastEditors: 卜启缘
 * @Description: 事件-动作
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\event-action\index.tsx
 */
import { computed, ref, defineComponent, reactive } from 'vue'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElCard,
  ElButton,
  ElCascader,
  ElCollapse,
  ElCollapseItem,
  ElPopconfirm
} from 'element-plus'
import type { Action } from '@/visual-editor/visual-editor.utils'
import { generateNanoid } from '@/visual-editor/utils/'
import { useModal } from '@/visual-editor/hooks/useModal'
import { cloneDeep } from 'lodash'

interface IState {
  activeNames: string[]
  ruleForm: Action
}
/**
 * @description 创建一个空的动作处理对象
 */
const createEmptyActionHandle = () => ({
  key: generateNanoid(),
  name: '',
  link: []
})

/**
 * @description 新增一个空的事件
 */
const createEmptyAction = (): Action => ({
  key: generateNanoid(),
  name: '',
  event: '',
  handle: [createEmptyActionHandle()]
})

export const EventAction = defineComponent({
  setup() {
    const { currentBlock, currentPage, jsonData } = useVisualData()
    /**
     * @description 是否处于编辑状态
     */
    const isEdit = computed(() =>
      currentBlock.value.actions?.some((item) => item.key === state.ruleForm.key)
    )
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()

    const state = reactive<IState>({
      activeNames: [],
      ruleForm: createEmptyAction()
    })

    /**
     * @description 可绑定的动作
     */
    const actionOptions = computed(() => [
      {
        label: '全局',
        value: 'global',
        children: Object.keys(jsonData.actions).map((actionKey) => {
          const item = cloneDeep(jsonData.actions[actionKey])
          item.value = actionKey
          item.label = item.name
          const arrKey = Object.keys(item).find((key) => Array.isArray(item[key]))
          item.children = (item[arrKey] || []).map((item: any) => {
            item.label = item.name
            item.value = item.key
            return item
          })
          return item
        })
      },
      {
        label: '组件',
        value: 'component',
        children: cloneDeep(currentPage.value.blocks)
          .filter((item) => item.actions?.length)
          .map((item) => {
            item.value = item._vid
            item.label = item.label
            item.children = (item.actions || []).map((item: any) => {
              item.label = item.name
              item.value = item.key
              return item
            })
            return item
          })
      }
    ])

    /**
     * @description 获取动作路径
     */
    const getActionPath = (link: string[]) => {
      const result: string[] = []
      link.reduce((prev, curr) => {
        const target = prev?.find((item) => item.value == curr)
        result.push(`${target?.label}`)
        return target?.children
      }, actionOptions.value)
      return result.join(' => ')
    }

    /**
     * @description 删除某个动作
     */
    const deleteActionItem = (index: number) => {
      currentBlock.value.actions.splice(index, 1)
    }
    /**
     * @description 删除事件的某个动作
     */
    const deleteActionHandleItem = (index: number) => {
      state.ruleForm.handle.splice(index, 1)
    }

    /**
     * @description 给组件新增一个事件模型
     */
    const addActionItem = () => {
      state.ruleForm = createEmptyAction()
      showOperateModal()
    }

    /**
     * @description 给事件新增一个空的动作
     */
    const addActionHanleItem = () => {
      state.ruleForm.handle.push(createEmptyActionHandle())
    }

    /**
     * @description 编辑事件
     */
    const showEditActionModal = (action: Action) => {
      state.ruleForm = cloneDeep(action)
      showOperateModal()
    }

    /**
     * @description 显示操作动作的模态框
     */
    const showOperateModal = () => {
      const operateType = isEdit.value ? '编辑' : '新增'
      useModal({
        title: `${operateType}动作`,
        props: { width: 600 },
        content: () => (
          <ElForm model={state.ruleForm} ref={ruleFormRef} label-width="100px" size={'mini'}>
            <ElFormItem
              label="事件"
              prop={'event'}
              rules={[{ required: true, message: '请选择事件', trigger: 'change' }]}
            >
              <ElSelect v-model={state.ruleForm.event} class={'w-full'}>
                {currentBlock.value.events?.map((eventItem) => (
                  <ElOption
                    key={eventItem.value}
                    label={eventItem.label}
                    value={eventItem.value}
                  ></ElOption>
                ))}
              </ElSelect>
            </ElFormItem>
            <ElFormItem
              label="事件名称"
              prop="name"
              rules={[{ required: true, message: '请输入事件名称', trigger: 'change' }]}
            >
              <ElInput v-model={state.ruleForm.name} placeholder={'请输入事件名称'}></ElInput>
            </ElFormItem>
            {!state.ruleForm.handle?.length && (
              <ElFormItem>
                <ElButton onClick={addActionHanleItem} type={'primary'} size={'mini'}>
                  添加动作
                </ElButton>
              </ElFormItem>
            )}
            {state.ruleForm.handle.map((handleItem, index) => (
              <ElCard
                key={handleItem.key}
                shadow={'hover'}
                class={'mt-10px'}
                v-slots={{
                  header: () => (
                    <div class={'flex justify-between'}>
                      <ElFormItem
                        label="动作名称"
                        prop={`handle.${index}.name`}
                        rules={[{ required: true, message: '请输入动作名称', trigger: 'change' }]}
                      >
                        <ElInput v-model={handleItem.name} placeholder={'请输入动作名称'}></ElInput>
                      </ElFormItem>
                      <div>
                        <ElButton
                          onClick={() => deleteActionHandleItem(index)}
                          type={'danger'}
                          size={'mini'}
                        >
                          删除
                        </ElButton>
                        <ElButton onClick={addActionHanleItem} type={'primary'} size={'mini'}>
                          添加
                        </ElButton>
                      </div>
                    </div>
                  )
                }}
              >
                <ElFormItem
                  label="触发的动作"
                  prop={`handle.${index}.link`}
                  rules={[{ required: true, message: '请选择你要触发的动作', trigger: 'change' }]}
                >
                  <ElCascader
                    clearable={true}
                    class={'w-full'}
                    placeholder="请选择你要触发的动作"
                    v-model={handleItem.link}
                    options={actionOptions.value}
                  ></ElCascader>
                </ElFormItem>
              </ElCard>
            ))}
          </ElForm>
        ),
        onConfirm: () => {
          return new Promise((resolve, reject) => {
            ruleFormRef.value?.validate((valid) => {
              if (valid) {
                const index = currentBlock.value.actions.findIndex(
                  (item) => item.key == state.ruleForm.key
                )
                if (index === -1) {
                  currentBlock.value.actions.push(state.ruleForm)
                } else {
                  currentBlock.value.actions.splice(index, 1, state.ruleForm)
                }
                state.ruleForm = createEmptyAction()
                resolve('submit!')
              } else {
                reject()
                console.log('error submit!!')
                return false
              }
            })
          })
        },
        onCancel: () => (state.ruleForm = createEmptyAction())
      })
    }

    return () => (
      <>
        <ElButton
          onClick={addActionItem}
          disabled={!currentBlock.value.actions}
          type={'primary'}
          size={'mini'}
        >
          添加事件
        </ElButton>

        {currentBlock.value.actions?.map((actionItem, index) => (
          <ElCard
            key={index}
            class={'mt-10px'}
            v-slots={{
              header: () => (
                <div class={'flex justify-between'}>
                  {actionItem.name}
                  <div>
                    <ElPopconfirm
                      title={'确定要删除该事件吗？'}
                      onConfirm={() => deleteActionItem(index)}
                    >
                      {{
                        reference: () => (
                          <ElButton type={'danger'} size={'mini'}>
                            删除
                          </ElButton>
                        )
                      }}
                    </ElPopconfirm>
                    <ElButton
                      onClick={() => showEditActionModal(actionItem)}
                      type={'primary'}
                      size={'mini'}
                    >
                      编辑
                    </ElButton>
                  </div>
                </div>
              )
            }}
          >
            <ElCollapse v-model={state.activeNames}>
              {actionItem.handle.map((item, index) => (
                <ElCollapseItem title={`${index + 1}. ${item.name}`} key={item.key} name={item.key}>
                  {{
                    default: () => <div>动作路径：{getActionPath(item.link)}</div>
                  }}
                </ElCollapseItem>
              ))}
            </ElCollapse>
          </ElCard>
        ))}
      </>
    )
  }
})
