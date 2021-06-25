import { Form, Field, Button } from 'vant'
import { renderSlot, getCurrentInstance } from 'vue'
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'
import { useGlobalProperties } from '@/hooks/useGlobalProperties'
import { compProps } from './compProps'

export default {
  key: 'form',
  moduleName: 'containerComponents',
  label: '表单容器',
  preview: () => (
    <Form>
      <Field name="用户名" label="用户名" placeholder="用户名" />
      <Field type="password" name="密码" label="密码" placeholder="密码" />
      <div style="margin: 16px;">
        <Button round size={'small'} block type="primary">
          提交
        </Button>
      </div>
    </Form>
  ),
  render: function ({ props, custom, block }) {
    const { slots } = getCurrentInstance()!
    const { registerRef } = useGlobalProperties()

    const onSubmit = (values) => {
      console.log('onSubmit:', values)
    }

    return (
      <Form ref={(el) => registerRef(el, block._vid)} {...custom} {...props} onSubmit={onSubmit}>
        {renderSlot(slots, 'default')}
      </Form>
    )
  },
  resize: {
    height: true,
    width: true
  },
  props: compProps
} as VisualEditorComponent
