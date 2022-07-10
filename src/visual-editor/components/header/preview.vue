<template>
  <el-dialog v-model="dialogVisible" custom-class="h5-preview" :show-close="false" width="360px">
    <iframe
      v-if="dialogVisible"
      :style="{ width: '100%', height: '100%' }"
      :src="previewUrl"
      frameborder="0"
      scrolling="auto"
    ></iframe>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useVModel } from '@vueuse/core';
  import { BASE_URL } from '@/visual-editor/utils';

  defineOptions({
    name: 'Preview',
  });

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['update:visible']);

  const dialogVisible = useVModel(props, 'visible', emits);
  const previewUrl = `${BASE_URL}preview/${location.hash}`;
</script>

<style lang="scss">
  .h5-preview {
    overflow: hidden;

    .el-dialog__body {
      width: 360px;
      height: 640px;
      padding: 0;
    }

    .el-dialog__header {
      display: none;
    }

    .simulator {
      padding-right: 0;

      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }
</style>
