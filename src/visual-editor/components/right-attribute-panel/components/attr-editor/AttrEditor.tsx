/*
 * @Author: 卜启缘
 * @Date: 2021-06-10 16:23:06
 * @LastEditTime: 2021-06-21 10:00:54
 * @LastEditors: 卜启缘
 * @Description: 组件属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\AttrEditor.tsx
 */
import { defineComponent } from 'vue'
import {
  ElColorPicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
  ElSwitch,
  ElPopover
} from 'element-plus'
import { VisualEditorProps, VisualEditorPropsType } from '@/visual-editor/visual-editor.props'
import { TablePropEditor, CrossSortableOptionsEditor } from '../'
import { useDotProp } from '@/visual-editor/hooks/useDotProp'
import { useVisualData } from '@/visual-editor/hooks/useVisualData'

export const AttrEditor = defineComponent({
  setup() {
    const { visualConfig, currentBlock } = useVisualData()

    const renderEditor = (propName: string, propConfig: VisualEditorProps) => {
      const { propObj, prop } = useDotProp(currentBlock.value.props, propName)

      propObj[prop] ??= propConfig.defaultValue

      return {
        [VisualEditorPropsType.input]: () => (
          <ElInput v-model={propObj[prop]} placeholder={propConfig.tips || propConfig.label} />
        ),
        [VisualEditorPropsType.inputNumber]: () => <ElInputNumber v-model={propObj[prop]} />,
        [VisualEditorPropsType.switch]: () => <ElSwitch v-model={propObj[prop]} />,
        [VisualEditorPropsType.color]: () => <ElColorPicker v-model={propObj[prop]} />,
        [VisualEditorPropsType.crossSortable]: () => (
          <CrossSortableOptionsEditor v-model={propObj[prop]} />
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
        )
      }[propConfig.type]()
    }

    // 表单项
    const FormEditor = () => {
      const content: JSX.Element[] = []
      if (!currentBlock.value) {
        content.push(
          <>
            <ElFormItem label="容器宽度">
              <ElInputNumber v-model={currentBlock.value.width} {...({ step: 100 } as any)} />
            </ElFormItem>
            <ElFormItem label="容器高度">
              <ElInputNumber v-model={currentBlock.value.height} {...({ step: 100 } as any)} />
            </ElFormItem>
          </>
        )
      } else {
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
                  reference: () => (
                    <i style={{ marginLeft: '6px' }} class={'el-icon-warning-outline'}></i>
                  )
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
                            'flex-direction': 'column',
                            'align-items': 'flex-start'
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
