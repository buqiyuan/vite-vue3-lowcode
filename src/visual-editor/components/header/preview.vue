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

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useVModel } from '@vueuse/core'
import { BASE_URL } from '@/visual-editor/utils'
/**
 * @name: preview
 * @author: 卜启缘
 * @date: 2021/4/29 23:09
 * @description：preview
 * @update: 2021/4/29 23:09
 */
export default defineComponent({
  name: 'Preview',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const state = reactive({
      dialogVisible: useVModel(props, 'visible', emit),
      previewUrl: `${BASE_URL}preview/${location.hash}`
    })

    return {
      ...toRefs(state)
    }
  }
})
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
