<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 00:35:17
 * @LastEditTime: 2021-06-25 21:05:57
 * @LastEditors: 卜启缘
 * @Description: 左侧边栏
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\index.vue
-->
<template>
  <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
    <template v-for="tabItem in tabs" :key="tabItem.componentName">
      <el-tab-pane :name="tabItem.componentName">
        <template #label>
          <div class="flex flex-col items-center justify-center">
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
import { defineComponent, reactive, toRefs } from 'vue'
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
      activeName: tabs[0].componentName
    })

    const handleClick = (tab, event) => {
      console.log(tab, event)
    }

    return {
      ...toRefs(state),
      tabs,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.el-tabs {
  height: 100%;

  ::v-deep(.el-tabs__item) {
    height: 80px;
    padding: 20px 16px;

    [class^='el-icon-'] {
      font-size: 20px;
    }
  }

  ::v-deep(.el-tabs__content) {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
