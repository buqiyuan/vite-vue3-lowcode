<template>
  <el-container>
    <el-header height="80px" class="flex items-center shadow-md">
      <!-- 顶部start -->
      <Header />
      <!-- 顶部end -->
    </el-header>
    <el-container class="layout-container">
      <el-aside class="shadow-sm" width="350px">
        <!-- 左侧组件start -->
        <left-aside />
        <!-- 左侧组件end -->
      </el-aside>
      <el-main>
        <!-- 中间编辑区域start -->
        <simulator>
          <simulator-editor @on-selected="onSelected" />
        </simulator>
        <!-- 中间编辑区域end -->

        <!-- 右侧属性面板start -->
        <right-attribute-panel v-model:block="currentBlock" />
        <!-- 右侧属性面板end -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Header from './components/header/index.vue'
import LeftAside from './components/left-aside/index.vue'
import RightAttributePanel from './components/right-attribute-panel'
import SimulatorEditor from './components/simulator-editor/simulator-editor.vue'
import Simulator from './components/common/simulator.vue'
import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils'

interface IState {
  currentBlock: VisualEditorComponent
}

export default defineComponent({
  name: 'Layout',
  components: { Header, LeftAside, RightAttributePanel, SimulatorEditor, Simulator },
  setup() {
    const state: IState = reactive({
      currentBlock: {} as VisualEditorComponent
    })

    // 当前选中的组件
    const onSelected = (comp) => {
      state.currentBlock = comp
      console.log('currentBlock:', state.currentBlock)
    }

    return {
      ...toRefs(state),
      onSelected
    }
  }
})
</script>

<style lang="scss">
.el-header,
.el-footer {
  position: relative;
  background-color: white;
  z-index: 99;
}

.el-aside {
  background-color: white;
}
.layout-container {
  height: calc(100vh - 80px);
}
.el-main {
  position: relative;
  padding: 12px;
  background-color: #f5f5f5;
  @media (min-width: 1111px) {
    overflow-x: hidden;
  }
}
</style>
