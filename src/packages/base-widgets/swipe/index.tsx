/*
 * @Author: 卜启缘
 * @Date: 2021-06-14 12:24:12
 * @LastEditTime: 2021-06-21 23:06:36
 * @LastEditors: 卜启缘
 * @Description: 轮播图组件
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\swipe\index.tsx
 */
import { Swipe, SwipeItem } from 'vant'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { createFieldProps } from './createFieldProps'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'

const swipeItemStyle = `color: #fff;
font-size: 20px;
line-height: 150px;
text-align: center;
background-color: #39a9ed;`

export default {
  key: 'swipe',
  moduleName: 'baseWidgets',
  label: '轮播图',
  preview: () => (
    <Swipe style={{ width: '180px', height: '80%' }} indicatorColor={'white'}>
      <SwipeItem style={swipeItemStyle}>1</SwipeItem>
      <SwipeItem style={swipeItemStyle}>2</SwipeItem>
      <SwipeItem style={swipeItemStyle}>3</SwipeItem>
      <SwipeItem style={swipeItemStyle}>4</SwipeItem>
    </Swipe>
  ),
  render: ({ block, props }) => {
    const { registerRef } = useGlobalProperties()

    return (
      <Swipe
        ref={(el) => registerRef(el, block._vid)}
        {...props}
        style={{ height: `${props.height}px` }}
      >
        {props.images?.map((item) => (
          <>
            <SwipeItem key={item}>
              <img style={{ width: '100%' }} src={item} />
            </SwipeItem>
          </>
        ))}
      </Swipe>
    )
  },
  props: createFieldProps(),
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
} as VisualEditorComponent
