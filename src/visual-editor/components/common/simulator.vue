<!--
 * @Author: 卜启缘
 * @Date: 2021-06-01 13:30:22
 * @LastEditTime: 2021-06-14 00:21:31
 * @LastEditors: 卜启缘
 * @Description: 手机模拟器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\common\simulator.vue
-->
<template>
  <div class="simulator-container">
    <div class="simulator-editor">
      <div class="simulator-editor-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Simulator'
})
</script>
<style lang="scss" scoped>
.simulator-container {
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 240px;
  align-items: center;
  justify-content: center;

  @media (max-width: 1314px) {
    padding-right: 0;
  }
}

.simulator-editor {
  width: 560px;
  height: 640px;
  min-width: 560px;
  padding: 10px 100px;
  overflow: hidden auto;
  background: #fafafa;
  border-radius: 5px;
  transform: translate(0);
  box-sizing: border-box;
  background-clip: content-box;
  contain: layout;

  &::-webkit-scrollbar {
    width: 0;
  }

  &-content {
    min-height: 100%;
    box-shadow: 0 8px 12px #ebedf0;
  }
}
</style>
