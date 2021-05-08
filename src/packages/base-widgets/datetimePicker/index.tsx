import { Field, Popup, DatetimePicker } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'
import { reactive } from 'vue'
import { isDate } from '@/visual-editor/utils/is'
import dayjs from 'dayjs'

export default {
  key: 'datetimePicker',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 选择器',
  preview: () => <Field name="datetimePicker" label="时间选择器" placeholder={'点击选择'}></Field>,
  render: ({ size, block, props }) => {
    const { registerRef } = useGlobalProperties()
    const state = reactive({
      showPicker: false,
      text: ''
    })

    const onConfirm = (value) => {
      const date = isDate(value) ? dayjs(value).format(props.format) : value
      props.modelValue = date
      state.text = date
      state.showPicker = false
      console.log(props)
    }

    const PopupPicker = () => (
      <>
        <Field
          v-model={props.modelValue}
          {...props}
          readonly
          clickable
          onClick={() => (state.showPicker = true)}
          style={{
            width: size.width ? `${size.width}px` : null
          }}
          v-slots={{
            input: () =>
              state.text?.trim() == '' ? (
                <span class={'placeholder'}>{props.placeholder}</span>
              ) : (
                state.text
              )
          }}
        />
        <Popup v-model={[state.showPicker, 'show', ['modifier']]} position={'bottom'}>
          <DatetimePicker
            ref={(el) => registerRef(el, block._vid)}
            {...props}
            onConfirm={onConfirm}
            onCancel={() => (state.showPicker = false)}
          />
        </Popup>
      </>
    )

    return (
      <>
        <PopupPicker />
      </>
    )
  },
  props: {
    modelValue: createEditorInputProp({ label: '默认值' }),
    name: createEditorInputProp({
      label: '名称，提交表单的标识符',
      defaultValue: 'datetimePicker'
    }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '时间选择器' }),
    title: createEditorInputProp({ label: '顶部栏标题', defaultValue: '选择时间' }),
    type: createEditorSelectProp({
      label: '时间类型',
      options: [
        {
          label: 'date',
          val: 'date'
        },
        {
          label: 'time',
          val: 'time'
        },
        {
          label: 'year-month',
          val: 'year-month'
        },
        {
          label: 'month-day',
          val: 'month-day'
        },
        {
          label: 'datehour',
          val: 'datehour'
        }
      ],
      defaultValue: 'time'
    }),
    format: createEditorInputProp({
      label: '选择时间后格式化值',
      tips: 'YYYY-MM-DD HH:mm:ss',
      defaultValue: 'YYYY-MM-DD HH:mm:ss'
    }),
    cancelButtonText: createEditorInputProp({ label: '取消按钮文字' }),
    columnsOrder: createEditorInputProp({
      label: '自定义列排序数组',
      tips: '可选值为：year、month、day、hour、minute，传多个值以英文逗号隔开'
    }),
    confirmButtonText: createEditorInputProp({ label: '确认按钮文字' }),
    filter: createEditorInputProp({ label: '选项过滤函数' }),
    formatter: createEditorInputProp({ label: '选项格式化函数' }),
    itemHeight: createEditorInputProp({
      label: '选项高度',
      tips: '支持 px vw vh rem 单位，默认 px'
    }),
    loading: createEditorSwitchProp({ label: '是否显示加载状态' }),
    showToolbar: createEditorSwitchProp({ label: '是否显示顶部栏' }),
    swipeDuration: createEditorInputProp({ label: '快速滑动时惯性滚动的时长，单位ms' }),
    visibleItemCount: createEditorInputNumberProp({ label: '可见的选项个数' }),
    placeholder: createEditorInputProp({ label: '占位符', defaultValue: '请选择' }),
    ...createFieldProps()
  },
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
