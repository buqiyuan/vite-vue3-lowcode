<template>
  <el-row type="flex" class="header">
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <h3 class="font-semibold">H5低代码</h3>
    </el-col>
    <el-col :span="12">
      <div></div>
    </el-col>
    <el-col :span="6" class="flex flex-row-reverse items-center">
      <el-tooltip class="item" effect="dark" content="运行" placement="bottom">
        <el-button
          type="primary"
          icon="el-icon-video-play"
          circle
          class="flex-shrink-0"
          @click="isShowH5Preview = true"
        />
      </el-tooltip>
    </el-col>
  </el-row>
  <preview v-model:visible="isShowH5Preview" :json-data="jsonData" :config="config" />
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import Preview from './preview.vue'
import { VisualEditorConfig } from '@/visual-editor/visual-editor.utils'

export default defineComponent({
  name: 'Header',
  components: { Preview },
  props: {
    jsonData: {
      type: Object,
      default: () => ({})
    },
    config: { type: Object as PropType<VisualEditorConfig>, required: true }
  },
  setup() {
    const state = reactive({
      isShowH5Preview: false
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;

  .logo {
    width: 60px;
    height: 60px;
    background-image: url('../../../assets/logo.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .el-button {
    font-size: 22px;
  }
}
</style>
