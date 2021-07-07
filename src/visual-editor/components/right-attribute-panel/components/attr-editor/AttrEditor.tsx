/*
 * @Author: 卜启缘
 * @Date: 2021-06-10 16:23:06
 * @LastEditTime: 2021-07-07 19:36:45
 * @LastEditors: 卜启缘
 * @Description: 组件属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\AttrEditor.tsx
 */
import { defineComponent, computed, watch } from 'vue'
import {
  ElColorPicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElSelect,
  ElSwitch,
  ElPopover,
  ElCascader,
  ElInputNumber,
  ElRadioGroup,
  ElRadioButton
} from 'element-plus'
import { VisualEditorProps, VisualEditorPropsType } from '@/visual-editor/visual-editor.props'
import { TablePropEditor, CrossSortableOptionsEditor } from './components'
import { useDotProp } from '@/visual-editor/hooks/useDotProp'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'
import { cloneDeep } from 'lodash'
import { FormatInputNumber } from '@/visual-editor/components/common/format-input-number'

export const AttrEditor = defineComponent({
  setup() {
    const { visualConfig, currentBlock, jsonData } = useVisualData()
    /**
     * @description 模型集合
     */
    const models = computed(() => cloneDeep(jsonData.models))

    const compPaddingAttrs = ['paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom']

    /**
     * @description 监听组件padding值的变化
     */
    watch(
      compPaddingAttrs.map((item) => () => currentBlock.value.styles?.[item]),
      (val: string[]) => {
        const isSame = val.every((item) => currentBlock.value.styles?.tempPadding == item)
        if (isSame || new Set(val).size === 1) {
          if (Reflect.has(currentBlock.value, 'styles')) {
            currentBlock.value.styles.tempPadding = val[0]
          }
        } else {
          currentBlock.value.styles.tempPadding = ''
        }
      }
    )

    /**
     * @description 总的组件padding变化时进行的操作
     */
    const compPadding = computed({
      get: () => currentBlock.value.styles?.tempPadding,
      set(val) {
        compPaddingAttrs.forEach((item) => (currentBlock.value.styles[item] = val))
        currentBlock.value.styles.tempPadding = val
      }
    })

    const renderEditor = (propName: string, propConfig: VisualEditorProps) => {
      const { propObj, prop } = useDotProp(currentBlock.value.props, propName)

      propObj[prop] ??= propConfig.defaultValue

      return {
        [VisualEditorPropsType.input]: () => {
          if (!Object.is(propObj[prop], undefined) && !Object.is(propObj[prop], null)) {
            propObj[prop] = `${propObj[prop]}`
          }
          return (
            <ElInput v-model={propObj[prop]} placeholder={propConfig.tips || propConfig.label} />
          )
        },
        [VisualEditorPropsType.inputNumber]: () => <ElInputNumber v-model={propObj[prop]} />,
        [VisualEditorPropsType.switch]: () => <ElSwitch v-model={propObj[prop]} />,
        [VisualEditorPropsType.color]: () => <ElColorPicker v-model={propObj[prop]} />,
        [VisualEditorPropsType.crossSortable]: () => (
          <CrossSortableOptionsEditor v-model={propObj[prop]} multiple={propConfig.multiple} />
        ),
        [VisualEditorPropsType.select]: () => (
          <ElSelect v-model={propObj[prop]} valueKey={'value'} multiple={propConfig.multiple}>
            {propConfig.options?.map((opt) => (
              <ElOption label={opt.label} style={{ fontFamily: opt.value }} value={opt.value} />
            ))}
          </ElSelect>
        ),
        [VisualEditorPropsType.table]: () => (
          <TablePropEditor v-model={propObj[prop]} propConfig={propConfig} />
        ),
        [VisualEditorPropsType.modelBind]: () => (
          <ElCascader
            clearable={true}
            props={{
              checkStrictly: true,
              children: 'entitys',
              label: 'name',
              value: 'key',
              expandTrigger: 'hover'
            }}
            placeholder="请选择绑定的请求数据"
            v-model={propObj[prop]}
            options={models.value}
          ></ElCascader>
        )
      }[propConfig.type]()
    }

    // 表单项
    const FormEditor = () => {
      const content: JSX.Element[] = []
      if (currentBlock.value) {
        const { componentKey } = currentBlock.value
        const component = visualConfig.componentMap[componentKey]
        console.log('props.block:', currentBlock.value)
        content.push(
          <>
            <ElFormItem label="组件ID" labelWidth={'76px'}>
              {currentBlock.value._vid}
              <ElPopover
                width={200}
                trigger="hover"
                content={`你可以利用该组件ID。对该组件进行获取和设置其属性，组件可用属性可在控制台输入：$$refs.${currentBlock.value._vid} 进行查看`}
              >
                {{
                  reference: () => <i class={'el-icon-warning-outline ml-6px'}></i>
                }}
              </ElPopover>
            </ElFormItem>
          </>
        )
        if (!!component) {
          if (!!component.props) {
            content.push(
              ...Object.entries(component.props || {}).map(([propName, propConfig]) => (
                <>
                  <ElFormItem
                    key={currentBlock.value._vid + propName}
                    style={
                      propConfig.labelPosition == 'top'
                        ? {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                          }
                        : {}
                    }
                  >
                    {{
                      label: () => (
                        <>
                          {propConfig.tips && (
                            <ElPopover width={200} trigger={'hover'} content={propConfig.tips}>
                              {{
                                reference: () => <i class={'el-icon-warning-outline'}></i>
                              }}
                            </ElPopover>
                          )}
                          {propConfig.label}
                        </>
                      ),
                      default: () => renderEditor(propName, propConfig)
                    }}
                  </ElFormItem>
                </>
              ))
            )
            content.push(
              <ElFormItem label={'组件对齐方式'} labelWidth={'90px'}>
                <ElRadioGroup v-model={currentBlock.value.styles.justifyContent} size="mini">
                  <ElRadioButton label="flex-start"></ElRadioButton>
                  <ElRadioButton label="center"></ElRadioButton>
                  <ElRadioButton label="flex-end"></ElRadioButton>
                </ElRadioGroup>
              </ElFormItem>
            )
            content.push(
              <>
                <ElFormItem class={'flex flex-col justify-start'}>
                  {{
                    label: () => (
                      <div class={'flex justify-between mb-2'}>
                        <div>组件内边距</div>
                        <FormatInputNumber v-model={compPadding.value} class={'!w-100px'} />
                      </div>
                    ),
                    default: () => (
                      <div class={'grid grid-cols-3 gap-2 w-full bg-gray-100 p-20px items-center'}>
                        <FormatInputNumber
                          v-model={currentBlock.value.styles.paddingTop}
                          class={'!w-100px col-span-full col-start-2'}
                        />
                        <FormatInputNumber
                          v-model={currentBlock.value.styles.paddingLeft}
                          class={'!w-100px col-span-1'}
                        />
                        <div class={'bg-white col-span-1 h-40px'}></div>
                        <FormatInputNumber
                          v-model={currentBlock.value.styles.paddingRight}
                          class={'!w-100px col-span-1'}
                        />
                        <FormatInputNumber
                          v-model={currentBlock.value.styles.paddingBottom}
                          class={'!w-100px col-span-full col-start-2'}
                        />
                      </div>
                    )
                  }}
                </ElFormItem>
              </>
            )
          }
        }
      }
      return (
        <>
          <ElForm size="mini" labelPosition={'left'}>
            {content}
          </ElForm>
        </>
      )
    }

    return () => (
      <>
        <FormEditor />
      </>
    )
  }
})
