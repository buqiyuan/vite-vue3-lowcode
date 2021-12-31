<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 00:35:17
 * @LastEditTime: 2021-07-07 14:02:29
 * @LastEditors: 卜启缘
 * @Description: 左侧边栏
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\index.vue
-->
<template>
  <el-tabs v-model="activeName" tab-position="left" class="left-aside">
    <template v-for="tabItem in tabs" :key="tabItem.name">
      <el-tab-pane :name="tabItem.name" lazy>
        <template #label>
          <div class="tab-item">
            <el-icon :size="26"><component :is="tabItem.icon" /></el-icon>
            {{ tabItem.label }}
          </div>
        </template>
        <component :is="tabItem.comp" v-bind="$attrs" />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script lang="ts">
  export default {
    name: 'LeftAside',
  };
</script>

<script lang="ts" setup>
  /**
   * @description 左侧边栏
   */
  import { ref } from 'vue';
  import components from './components';

  const tabs = Object.keys(components)
    .map((name) => {
      const { label, icon, order } = components[name];
      return { label, icon, name, order, comp: components[name] };
    })
    .sort((a, b) => a.order - b.order);

  const activeName = ref(tabs[0].name);
</script>

<style lang="scss" scoped>
  .left-aside {
    height: 100%;
    contain: layout;

    > :deep(.el-tabs__header) {
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

    > :deep(.el-tabs__content) {
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
