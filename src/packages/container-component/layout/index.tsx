import { Col, Row } from 'vant'
import { renderSlot, useSlots } from 'vue'
import { createEditorInputProp, createEditorSelectProp } from '@/visual-editor/visual-editor.props'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import styleModule from './index.module.scss'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import { watchEffect } from 'vue'

interface SlotItem {
  value: string
  [prop: string]: any
}

const slotsTemp = {} as any

const createSlots = (str: string): SlotItem =>
  str.split(':').reduce(
    (prev, curr, index) => {
      prev[`slot${index}`] = {
        key: `slot${index}`,
        span: curr,
        children: []
      }
      return prev
    },
    { value: str }
  )

export default {
  key: 'layout',
  moduleName: 'containerComponents',
  label: '布局容器',
  preview: () => (
    <Row gutter="20">
      <Col span="8">span: 8</Col>
      <Col span="8">span: 8</Col>
      <Col span="8">span: 8</Col>
    </Row>
  ),
  render: ({ props, styles, block, custom }) => {
    const slots = useSlots()
    const { registerRef } = useGlobalProperties()

    slotsTemp[block._vid] ??= {}

    watchEffect(() => {
      if (Object.keys(props.slots || {}).length) {
        Object.keys(props.slots).forEach((key) => {
          if (slotsTemp[block._vid][key]?.children) {
            props.slots[key].children = slotsTemp[block._vid][key].children
          }
        })
      }
    })

    return () => (
      <div style={styles}>
        <Row
          ref={(el) => registerRef(el, block._vid)}
          {...custom}
          {...props}
          class={styleModule.vanRow}
        >
          {Object.values(Object.keys(props.slots).length ? props.slots : createSlots('12:12'))
            ?.filter((item) => typeof item !== 'string')
            .map((spanItem: SlotItem, spanIndex) => {
              slotsTemp[block._vid][`slot${spanIndex}`] = spanItem
              return (
                <>
                  <Col span={spanItem.span}>{renderSlot(slots, `slot${spanIndex}`)}</Col>
                </>
              )
            })}
        </Row>
      </div>
    )
  },
  resize: {
    height: true,
    width: true
  },
  props: {
    gutter: createEditorInputProp({ label: '列间隔' }),
    slots: createEditorSelectProp({
      label: '列比例',
      options: [
        { label: '24', value: createSlots('24') },
        { label: '12:12', value: createSlots('12:12') },
        { label: '6:18', value: createSlots('6:18') },
        { label: '18:6', value: createSlots('18:6') },
        { label: '8:8:8', value: createSlots('8:8:8') },
        { label: '6:12:6', value: createSlots('6:12:6') },
        { label: '6:6:6:6', value: createSlots('6:6:6:6') }
      ],
      defaultValue: createSlots('12:12')
    }),
    justify: createEditorSelectProp({
      label: '主轴对齐方式',
      options: [
        { label: '左对齐', value: 'start' },
        { label: '居中排列', value: 'center' },
        { label: '均匀对齐', value: 'space-around' },
        { label: '两端对齐', value: 'space-between' },
        { label: '右对齐', value: 'end' }
      ]
    }),
    align: createEditorSelectProp({
      label: '交叉轴对齐方式',
      options: [
        { label: '顶部对齐', value: 'top' },
        { label: '垂直居中', value: 'center' },
        { label: '底部对齐', value: 'bottom' }
      ]
    })
  }
} as VisualEditorComponent
