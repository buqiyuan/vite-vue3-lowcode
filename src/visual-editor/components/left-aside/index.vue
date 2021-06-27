<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 00:35:17
 * @LastEditTime: 2021-06-27 14:44:35
 * @LastEditors: 卜启缘
 * @Description: 左侧边栏
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\index.vue
-->
<template>
  <el-tabs v-model="activeName" tab-position="left" class="left-aside">
    <template v-for="tabItem in tabs" :key="tabItem.componentName">
      <el-tab-pane :name="tabItem.componentName" lazy>
        <template #label>
          <div :ref="(el) => el && (tabItemRef[tabItem.componentName] = el)" class="tab-item">
            <i :class="tabItem.icon"></i>
            {{ tabItem.label }}
          </div>
        </template>
        <component :is="tabItem.componentName" v-bind="$attrs" />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ComponentInternalInstance } from 'vue'
import { tabs } from './tabs'
import components from './components'

/**
 * @description 左侧边栏
 */
export default defineComponent({
  name: 'LeftAside',
  components,
  setup() {
    const state = reactive({
      activeName: tabs[0].componentName,
      tabItemRef: {} as { [prop: string]: ComponentInternalInstance | Element }
    })

    return {
      ...toRefs(state),
      tabs
    }
  }
})
</script>

<style lang="scss" scoped>
.left-aside {
  height: 100%;

  > ::v-deep(.el-tabs__header) {
    margin-right: 0;

    .el-tabs__item {
      height: 80px;
      padding: 20px 16px;

      .tab-item {
        @apply flex flex-col items-center justify-center;

        [class^='el-icon-'] {
          font-size: 20px;
        }
      }
    }
  }

  > ::v-deep(.el-tabs__content) {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
