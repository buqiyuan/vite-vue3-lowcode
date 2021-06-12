/**
 * @name: MonacoEditor
 * @author: 卜启缘
 * @date: 2021/4/30 0:01
 * @description：MonacoEditor
 * @update: 2021/4/30 0:01
 */
import { Monaco } from './monaco'
import { defineComponent, onMounted, PropType, shallowRef, ref, onBeforeUnmount, watch } from 'vue'
import styles from './MonacoEditor.module.scss'
let subscription: Monaco.IDisposable | undefined
let preventTriggerChangeEvent = false

export default defineComponent({
  name: 'MonacoEditor',
  props: {
    code: {
      // 代码
      type: String as PropType<string>,
      required: true
    },
    layout: {
      // 布局
      type: Object as PropType<Monaco.editor.IDimension>,
      required: true,
      default: () => ({})
    },
    options: {
      type: Object as PropType<Monaco.editor.IStandaloneEditorConstructionOptions>,
      default: () => ({})
    },
    vid: [String, Number],
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >
    },
    title: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    // 需要一个shallowRef: 只监听value，不关心实际对象
    const editorRef = shallowRef<Monaco.editor.IStandaloneCodeEditor | null>(null)

    // 需要生成编辑器的Dom
    const containerDomRef = ref(null)

    // 格式化代码
    const formatCode = () => {
      window.requestIdleCallback(
        () => {
          editorRef.value!.getAction('editor.action.formatDocument').run()
        },
        { timeout: 800 }
      )
    }

    onMounted(() => {
      // 组件初始化时创建一个MonacoEditor的实例
      editorRef.value = Monaco.editor.create(containerDomRef.value!, {
        value: props.code, // 初始值
        theme: 'vs-dark', // vs, hc-black, or vs-dark
        language: 'json', // 代码生成语言
        formatOnPaste: true, // 当粘贴的时候自动进行一次格式化代码
        tabSize: 2, // tab缩进长度
        minimap: {
          enabled: false // 不需要小的缩略图
        },
        fontFamily: '微软雅黑', //字体
        // automaticLayout: true, //编辑器自适应布局，可能会影响性能
        overviewRulerBorder: false,
        scrollBeyondLastLine: false, //滚动配置，溢出才滚动
        ...props.options
      })

      // 如果代码有变化，会在这里监听到，当受到外部数据改变时，不需要触发change事件
      subscription = editorRef.value.onDidChangeModelContent((event) => {
        if (!preventTriggerChangeEvent) {
          // getValue: 获取编辑器中的所有文本
          props.onChange?.(editorRef.value!.getValue(), event)
        }
      })
      formatCode()
      editorRef.value.layout(props.layout)
    })

    onBeforeUnmount(() => {
      // 组件销毁时卸载编辑器
      if (subscription) {
        subscription.dispose()
      }
    })
    // 更新编辑器
    const refreshEditor = () => {
      if (editorRef.value) {
        const editor = editorRef.value
        // 获取编辑器的textModel文本
        const model = editor.getModel()

        // 如果代码发生变化 这里需要更新一版
        if (model && props.code !== model.getValue()) {
          // 这是进行一次常规化的操作 文档原文：Push an "undo stop" in the undo-redo stack.
          editor.pushUndoStop()
          preventTriggerChangeEvent = true
          /**
           * @function 开始编辑编辑器, 文档原文：Push edit operations, basically editing the model. This is the preferred way of editing the model. The edit operations will land on the undo stack.
           * @param 编辑操作之前的光标状态。调用撤销或重做时，将返回此光标状态
           * @param 需要编辑的内容 range: 编辑的内容范围，这里选择的是全部范围
           * @param 在编辑器质性完成之后可以计算光标状态的一个回调参数
           */
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: props.code
              }
            ],
            () => null
          )
        }

        editor.pushUndoStop()
        preventTriggerChangeEvent = false
        formatCode()
      }
    }

    watch(() => props.vid, refreshEditor, { immediate: true })

    return () => {
      return (
        <div class={styles.container}>
          {props.title && (
            <div class={styles.title}>
              <span>{props.title}</span>
            </div>
          )}
          <div class={styles.code} ref={containerDomRef}></div>
        </div>
      )
    }
  }
})
