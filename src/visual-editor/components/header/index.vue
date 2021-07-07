<template>
  <el-row type="flex" class="header">
    <!--    左侧logo start-->
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <h3 class="font-semibold">H5低代码</h3>
    </el-col>
    <!--    左侧logo end-->
    <!--    中间操作页面部分 start-->
    <el-col class="flex items-center" :span="12">
      <template v-for="(toolItem, toolIndex) in tools" :key="toolIndex">
        <div :class="[`w-1/${tools.length}`]" class="w-1/9">
          <div
            class="tool-item flex flex-col items-center cursor-pointer"
            @click="toolItem.onClick"
          >
            <i :class="toolItem.icon"></i>
            <div class="title">{{ toolItem.title }}</div>
          </div>
        </div>
      </template>
    </el-col>
    <!--    中间操作页面部分 end-->
    <!--    右侧工具栏 start-->
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
      <!--      <el-tooltip class="item" effect="dark" content="github" placement="bottom">-->
      <!--        <a href="https://github.com/buqiyuan/vite-vue3-lowcode" target="_blank">-->
      <!--          <img :src="`${BASE_URL}github.svg`" width="40" height="40" alt="" />-->
      <!--        </a>-->
      <!--      </el-tooltip>-->
      <el-popover placement="bottom" :width="140" trigger="hover">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="github" placement="bottom">
              <a href="https://github.com/buqiyuan/vite-vue3-lowcode" target="_blank">
                <img :src="`${BASE_URL}github.svg`" width="40" height="40" alt="" />
              </a>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="gitee" placement="bottom">
              <a href="https://gitee.com/buqiyuan/vite-vue3-lowcode" target="_blank">
                <img :src="`${BASE_URL}gitee.svg`" width="40" height="40" alt="" />
              </a>
            </el-tooltip>
          </el-col>
        </el-row>
        <template #reference>
          <img :src="`${BASE_URL}github.svg`" width="40" height="40" alt="" />
        </template>
      </el-popover>
    </el-col>
    <!--    右侧工具栏 end-->
  </el-row>
  <preview v-model:visible="isShowH5Preview" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Preview from './preview.vue'
import { useVisualData, localKey } from '@/visual-editor/hooks/useVisualData'
import { BASE_URL } from '@/visual-editor/utils'
import { useTools } from './useTools'

export default defineComponent({
  name: 'Header',
  components: { Preview },
  setup() {
    const state = reactive({
      isShowH5Preview: false
    })

    const tools = useTools()

    const { jsonData } = useVisualData()

    const runPreview = () => {
      sessionStorage.setItem(localKey, JSON.stringify(jsonData))
      localStorage.setItem(localKey, JSON.stringify(jsonData))
      state.isShowH5Preview = true
    }

    return {
      ...toRefs(state),
      BASE_URL,
      tools,
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
    background-image: url('@/assets/logo.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .tool-item {
    .title {
      margin-top: 4px;
      font-size: 12px;
    }
  }

  .el-button {
    font-size: 22px;
  }

  .right-tools > * {
    margin-left: 8px;
  }
}
</style>
