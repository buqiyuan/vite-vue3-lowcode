/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 18:51:58
 * @LastEditors: 卜启缘
 * @Description: 分割线
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\divider\index.tsx
 */
import { Divider } from 'vant'
import {
  createEditorColorProp,
  createEditorSwitchProp,
  createEditorInputProp,
  createEditorSelectProp
} from '@/visual-editor/visual-editor.props'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import { computed } from 'vue'

export default {
  key: 'divider',
  moduleName: 'baseWidgets',
  label: '分割线',
  preview: () => <Divider style="width:190px">文本</Divider>,
  render: ({ props, block, styles }) => {
    const { registerRef } = useGlobalProperties()

    const style = computed(() => ({
      width: '100%',
      color: props['text-color'],
      borderColor: props['divider-color']
    }))

    return () => (
      <div style={styles}>
        <Divider ref={(el) => registerRef(el, block._vid)} {...props} style={style.value}>
          {{
            default: () => props.text
          }}
        </Divider>
      </div>
    )
  },
  props: {
    text: createEditorInputProp({ label: '展示文本', defaultValue: '文本' }),
    'content-position': createEditorSelectProp({
      label: '文本位置',
      options: [
        { label: '左边', value: 'left' },
        { label: '中间', value: 'center' },
        { label: '右边', value: 'right' }
      ],
      defaultValue: 'center'
    }),
    dashed: createEditorSwitchProp({ label: '是否为虚线' }),
    'text-color': createEditorColorProp({ label: '文本颜色' }),
    'divider-color': createEditorColorProp({ label: '分割线颜色' })
  }
} as VisualEditorComponent
