<template>
  <div class="simulator-container">
    <div class="simulator-editor">
      <slot></slot>
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
  width: 360px;
  height: 640px;
  min-width: 360px;
  background: #fafafa;
  border-radius: 5px;
  transform: translate(0);
  box-shadow: 0 8px 12px #ebedf0;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
