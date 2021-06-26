<!--
 * @Author: 卜启缘
 * @Date: 2021-06-24 18:36:03
 * @LastEditTime: 2021-06-26 14:15:33
 * @LastEditors: 卜启缘
 * @Description: 数据源管理
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\left-aside\components\data-source\index.vue
-->
<template>
  <el-tabs type="border-card" stretch>
    <el-tab-pane label="数据模型">
      <data-model />
    </el-tab-pane>
    <el-tab-pane label="数据接口">
      <data-fetch />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="tsx">
import DataModel from './data-model.vue'
import DataFetch from './data-fetch.vue'
</script>

<style lang="scss" scoped>
::v-deep(.el-tabs__header) {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
