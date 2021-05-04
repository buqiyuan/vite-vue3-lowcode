<!--页面树-->
<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span @click.stop>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-plus" @click="addPage(data)"
                  >添加子页面</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-delete" @click="delPage(data)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { treeData } from './treeData'

export default defineComponent({
  name: 'PageTree',
  setup() {
    const state = reactive({
      data: treeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    })

    const handleNodeClick = (data) => {
      console.log(data)
    }
    // 添加子页面
    const addPage = (data) => {
      console.log('子页面数据：', data)
    }
    // 删除子页面
    const delPage = (data) => {
      console.log('删除子页面数据', data)
    }

    return {
      ...toRefs(state),
      handleNodeClick,
      addPage,
      delPage
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
