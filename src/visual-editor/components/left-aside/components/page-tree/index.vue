<!--页面树-->
<template>
  <el-button
    type="primary"
    size="small"
    class="!my-10px !mx-6px"
    icon="el-icon-plus"
    @click="addPage"
    >添加页面</el-button
  >
  <el-tree
    :data="pages"
    :props="defaultProps"
    node-key="path"
    highlight-current
    :current-node-key="currentNodeKey"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span
          >{{ node.label }}（{{ data.path }}）
          <template v-if="data.isDefault">
            <el-tag size="mini">默认</el-tag>
          </template>
        </span>
        <span @click.stop>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-edit" @click="editPage(data)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-delete" @click="delPage(data)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-link" @click="setDefaultPage(data)"
                  >设为首页</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>
  <el-dialog
    v-model="dialogFormVisible"
    width="380px"
    :title="operatePageData ? '编辑页面' : '新增页面'"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules">
      <el-form-item prop="title" label="页面标题" label-width="80px">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="path" label="页面路径" label-width="80px">
        <el-input v-model="form.path" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useVisualData, createNewPage } from '@/visual-editor/hooks/useVisualData'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const rules = {
  title: [{ required: true, message: '请输入页面标题', trigger: 'blur' }],
  path: [{ required: true, message: '请输入页面路径', trigger: 'blur' }]
}

export default defineComponent({
  name: 'PageTree',
  label: '页面',
  order: 1,
  icon: 'el-icon-tickets',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const { jsonData, setCurrentPage, deletePage, updatePage, incrementPage } = useVisualData()

    const state = reactive({
      ruleForm: null as any,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      currentNodeKey: route.path,
      dialogFormVisible: false, // 表单弹窗显隐
      operatePageData: null as any, // 当前要增加或修改的页面
      form: {
        // 增改页面表单数据
        title: '',
        path: ''
      }
    })

    // 所有的页面
    const pages = computed(() =>
      Object.keys(jsonData.pages).map((key) => ({
        title: jsonData.pages[key].title,
        path: key
      }))
    )

    // 点击当前节点
    const handleNodeClick = (data) => {
      setCurrentPage(data.path)
      router.push(data.path)
    }
    // 新增页面
    const addPage = () => {
      state.operatePageData = null
      state.form = {
        title: '',
        path: ''
      }
      state.dialogFormVisible = true
    }
    // 编辑页面
    const editPage = (data) => {
      state.operatePageData = data
      state.form = {
        title: data.title,
        path: data.path
      }
      state.dialogFormVisible = true
      console.log('子页面数据：', data)
    }
    // 删除子页面
    const delPage = (data) => {
      console.log('删除子页面数据', data)
      deletePage(data.path, '/')
    }
    // 设置为默认页面
    const setDefaultPage = (data) => {
      console.log('设置该页面为默认页面', data)
    }

    // 新增或编辑页面
    const onSubmit = () => {
      state.ruleForm?.validate(async (valid) => {
        if (valid) {
          const { title, path } = state.form
          if (title.trim() == '' || path.trim() == '') {
            return ElMessage.error('标题或路径不能为空！')
          }
          if (state.operatePageData) {
            updatePage({
              newPath: path,
              oldPath: state.operatePageData.path || path,
              page: { title }
            })
            await router.replace(path)
            state.currentNodeKey = path
          } else {
            incrementPage(path, createNewPage({ title }))
          }
          state.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    return {
      ...toRefs(state),
      pages,
      rules,
      setCurrentPage,
      onSubmit,
      setDefaultPage,
      handleNodeClick,
      addPage,
      editPage,
      delPage
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  padding-right: 8px;
  font-size: 14px;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}
</style>
