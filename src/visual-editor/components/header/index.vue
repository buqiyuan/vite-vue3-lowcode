<template>
  <el-row type="flex" class="header">
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <h3 class="font-semibold">H5低代码</h3>
    </el-col>
    <el-col :span="12">
      <div></div>
    </el-col>
    <el-col :span="6" class="right-tools flex flex-row-reverse items-center">
      <el-tooltip class="item" effect="dark" content="运行" placement="bottom">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-video-play"
          circle
          class="flex-shrink-0"
          @click="runPreview"
        />
      </el-tooltip>
      <a href="https://github.com/buqiyuan/vite-vue3-lowcode" target="_blank">
        <img src="/github.svg" width="40" height="40" alt="" />
      </a>
    </el-col>
  </el-row>
  <template v-if="isShowH5Preview">
    <preview v-model:visible="isShowH5Preview" />
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Preview from './preview.vue'
import { useVisualData, localKey } from '@/visual-editor/hooks/useVisualData'

export default defineComponent({
  name: 'Header',
  components: { Preview },
  setup() {
    const state = reactive({
      isShowH5Preview: false
    })

    const { jsonData } = useVisualData()

    const runPreview = () => {
      sessionStorage.setItem(localKey, JSON.stringify(jsonData))
      localStorage.setItem(localKey, JSON.stringify(jsonData))
      state.isShowH5Preview = true
    }

    return {
      ...toRefs(state),
      runPreview
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
  .right-tools > * {
    margin-left: 8px;
  }
}
</style>
