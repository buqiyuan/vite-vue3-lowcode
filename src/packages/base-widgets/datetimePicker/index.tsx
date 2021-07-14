import { Field, Popup, DatetimePicker } from 'vant'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorModelBindProp,
  createEditorSelectProp,
  createEditorSwitchProp
} from '@/visual-editor/visual-editor.props'
import { useAttrs, reactive } from 'vue'
import { isDate } from '@/visual-editor/utils/is'
import dayjs from 'dayjs'

const dateType = {
  'month-day': 'MM-DD',
  'year-month': 'YYYY-MM',
  date: 'YYYY-MM-DD',
  datehour: 'YYYY-MM-DD HH',
  datetime: 'YYYY-MM-DD HH:mm:ss'
}

export default {
  key: 'datetimePicker',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 时间选择器',
  preview: () => <Field name="datetimePicker" label="时间选择器" placeholder={'点击选择'}></Field>,
  render: ({ styles, block, props }) => {
    const { registerRef } = useGlobalProperties()

    const attrs = useAttrs()

    const state = reactive({
      showPicker: false,
      text: '',
      currentDate: new Date()
    })

    const onConfirm = (value) => {
      const date = isDate(value) ? dayjs(value).format(props.format || dateType[props.type]) : value
      props.modelValue = date
      state.text = date
      state.showPicker = false
      console.log(props)
    }

    return () => (
      <div style={styles}>
        <Field
          v-model={props.modelValue}
          {...props}
          readonly
          clickable
          onClick={() => (state.showPicker = true)}
          name={Array.isArray(props.name) ? [...props.name].pop() : props.name}
          v-slots={{
            input: () =>
              state.text?.trim() == '' ? (
                <span class={'placeholder'}>{props.placeholder}</span>
              ) : (
                state.text
              )
          }}
        />
        <Popup v-model={[state.showPicker, 'show']} position={'bottom'}>
          <DatetimePicker
            ref={(el) => registerRef(el, block._vid)}
            {...props}
            {...attrs}
            v-model={state.currentDate}
            onConfirm={onConfirm}
            onCancel={() => (state.showPicker = false)}
          />
        </Popup>
      </div>
    )
  },
  props: {
    modelValue: createEditorInputProp({ label: '默认值' }),
    name: createEditorModelBindProp({ label: '字段绑定', defaultValue: '' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '时间选择器' }),
    title: createEditorInputProp({ label: '顶部栏标题', defaultValue: '选择时间' }),
    type: createEditorSelectProp({
      label: '时间类型',
      options: [
        {
          label: 'date',
          value: 'date'
        },
        {
          label: 'datetime',
          value: 'datetime'
        },
        {
          label: 'year-month',
          value: 'year-month'
        },
        {
          label: 'month-day',
          value: 'month-day'
        },
        {
          label: 'datehour',
          value: 'datehour'
        }
      ],
      defaultValue: 'datetime'
    }),
    format: createEditorInputProp({
      label: '自定义日期格式化值',
      tips: 'YYYY-MM-DD HH:mm:ss',
      defaultValue: ''
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
  events: [
    { label: '当值变化时触发的事件', value: 'change' },
    { label: '点击完成按钮时触发的事件', value: 'confirm' },
    { label: '点击取消按钮时触发的事件', value: 'cancel' }
  ],
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
