// import { useCommander } from './plugins/command.plugin'
// import { VisualEditorBlockData, VisualEditorModelValue } from './visual-editor.utils'
// import { cloneDeep } from 'lodash'
//
// export function useVisualCommand({
//   focusData,
//   updateBlocks,
//   dataModel,
//   dragstart,
//   dragend
// }: {
//   focusData: { value: { focus: VisualEditorBlockData[]; unFocus: VisualEditorBlockData[] } }
//   updateBlocks: (blocks?: VisualEditorBlockData[]) => void
//   dataModel: { value: VisualEditorModelValue }
//   dragstart: { on: (cb: () => void) => void; off: (cb: () => void) => void }
//   dragend: { on: (cb: () => void) => void; off: (cb: () => void) => void }
// }) {
//   const commander = useCommander()
//
//   /**
//    * 删除命令
//    * @author  卜启缘
//    * @date    2021/4/22 11:37 下午
//    */
//   commander.registry({
//     name: 'delete',
//     keyboard: ['backspace', 'delete', 'ctrl+d'],
//     execute: () => {
//       // console.log('执行删除命令')
//       const data = {
//         before: dataModel.value.blocks,
//         after: focusData.value.unFocus
//       }
//       return {
//         redo: () => {
//           // console.log('重做删除命令')
//           updateBlocks(cloneDeep(data.after))
//         },
//         undo: () => {
//           // console.log('撤回删除命令')
//           updateBlocks(cloneDeep(data.before))
//         }
//       }
//     }
//   })
//
//   /**
//    * 拖拽命令，适用于三种情况：
//    * - 从菜单拖拽组件到容器画布；
//    * - 在容器中拖拽组件调整位置
//    * - 拖拽调整组件的宽度和高度；
//    * @author  卜启缘
//    * @date    2021/4/22 11:38 下午
//    */
//   commander.registry({
//     name: 'drag',
//     init() {
//       this.data = { before: null as null | VisualEditorBlockData[] }
//       const handler = {
//         dragstart: () => (this.data.before = cloneDeep(dataModel.value.blocks)),
//         dragend: () => commander.state.commands.drag()
//       }
//       dragstart.on(handler.dragstart)
//       dragend.on(handler.dragend)
//       return () => {
//         dragstart.off(handler.dragstart)
//         dragend.off(handler.dragend)
//       }
//     },
//     execute() {
//       const before = cloneDeep(this.data.before)
//       const after = cloneDeep(dataModel.value.blocks)
//       return {
//         redo: () => {
//           updateBlocks(cloneDeep(after))
//         },
//         undo: () => {
//           updateBlocks(cloneDeep(before))
//         }
//       }
//     }
//   })
//
//   commander.registry({
//     name: 'clear',
//     execute: () => {
//       const data = {
//         before: cloneDeep(dataModel.value.blocks),
//         after: cloneDeep([])
//       }
//       return {
//         redo: () => {
//           updateBlocks(cloneDeep(data.after))
//         },
//         undo: () => {
//           updateBlocks(cloneDeep(data.before))
//         }
//       }
//     }
//   })
//
//   commander.registry({
//     name: 'placeTop',
//     keyboard: 'ctrl+up',
//     execute: () => {
//       const data = {
//         before: cloneDeep(dataModel.value.blocks),
//         after: cloneDeep(
//           (() => {
//             const { focus, unFocus } = focusData.value
//             const maxZIndex =
//               unFocus.reduce((prev, block) => Math.max(prev, block.zIndex), -Infinity) + 1
//             focus.forEach((block) => (block.zIndex = maxZIndex))
//             return cloneDeep(dataModel.value.blocks)
//           })()
//         )
//       }
//       return {
//         redo: () => {
//           updateBlocks(cloneDeep(data.after))
//         },
//         undo: () => {
//           updateBlocks(cloneDeep(data.before))
//         }
//       }
//     }
//   })
//
//   commander.registry({
//     name: 'placeBottom',
//     keyboard: 'ctrl+down',
//     execute: () => {
//       const data = {
//         before: cloneDeep(dataModel.value.blocks),
//         after: cloneDeep(
//           (() => {
//             const { focus, unFocus } = focusData.value
//             let minZIndex =
//               unFocus.reduce((prev, block) => Math.min(prev, block.zIndex), Infinity) - 1
//             if (minZIndex < 0) {
//               const dur = Math.abs(minZIndex)
//               unFocus.forEach((block) => (block.zIndex += dur))
//               minZIndex = 0
//             }
//             focus.forEach((block) => (block.zIndex = minZIndex))
//             return cloneDeep(dataModel.value.blocks)
//           })()
//         )
//       }
//       return {
//         redo: () => {
//           updateBlocks(cloneDeep(data.after))
//         },
//         undo: () => {
//           updateBlocks(cloneDeep(data.before))
//         }
//       }
//     }
//   })
//
//   commander.registry({
//     name: 'updateBlock',
//     execute: (newBlock: VisualEditorBlockData, oldBlock: VisualEditorBlockData) => {
//       let blocks = cloneDeep(dataModel.value.blocks || [])
//       const data = {
//         before: blocks,
//         after: (() => {
//           blocks = [...blocks]
//           const index = dataModel.value.blocks!.indexOf(oldBlock)
//           if (index > -1) {
//             blocks.splice(index, 1, newBlock)
//           }
//           return cloneDeep(blocks)
//         })()
//       }
//       return {
//         redo: () => {
//           updateBlocks(cloneDeep(data.after))
//         },
//         undo: () => {
//           updateBlocks(cloneDeep(data.before))
//         }
//       }
//     }
//   })
//
//   commander.registry({
//     name: 'updateModelValue',
//     execute: (val: VisualEditorModelValue) => {
//       const data = {
//         before: cloneDeep(dataModel.value),
//         after: cloneDeep(val)
//       }
//       return {
//         redo: () => {
//           dataModel.value = data.after
//         },
//         undo: () => {
//           dataModel.value = data.before
//         }
//       }
//     }
//   })
//
//   commander.registry({
//     name: 'selectAll',
//     followQueue: false,
//     keyboard: 'ctrl+a',
//     execute: () => {
//       return {
//         redo: () => {
//           ;(dataModel.value.blocks || []).forEach((block) => (block.focus = true))
//         }
//       }
//     }
//   })
//
//   commander.init()
//
//   return {
//     undo: () => commander.state.commands.undo(),
//     redo: () => commander.state.commands.redo(),
//     delete: () => commander.state.commands.delete(),
//     clear: () => commander.state.commands.clear(),
//     placeTop: () => commander.state.commands.placeTop(),
//     placeBottom: () => commander.state.commands.placeBottom(),
//     updateBlock: (newBlock: VisualEditorBlockData, oldBlock: VisualEditorBlockData) =>
//       commander.state.commands.updateBlock(newBlock, oldBlock),
//     updateModelValue: (val: VisualEditorModelValue) =>
//       commander.state.commands.updateModelValue(val)
//   }
// }
