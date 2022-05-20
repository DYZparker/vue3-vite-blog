<template>
  <el-dialog
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
    center
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="editData"
      :rules="rules"
      style="max-width: 460px"
    >
      <el-form-item v-for="item in isEditTableMenu" :label="item.title" :prop="item.propName">
        <!-- 判断可编辑项是否用插槽的样式展示，默认用input -->
        <div v-if="item.hasSlot">
          <slot :editData="editData"></slot>
        </div>
        <div v-else>
          <el-input v-model="editData[item.propName]"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="editDialog">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { computed, ref, reactive, watchEffect } from 'vue'
  import { useStore } from '../store'

  const rules = {
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 4, max: 24, message: '账号长度需要在4~24之间', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 4, max: 24, message: '密码长度需要在4~24之间', trigger: 'blur' }
    ]
  }
  const store = useStore()
  const { tableMenu } = store.state.userAbout
  const labelPosition = ref('right')
  const editData = reactive({
    username: '',
    password: '',
    admin: false,
    date: ''
  })
  const dialogVisible = computed({
    get() {
      return store.state.userAbout.dialogVisible
    },
    set(value: boolean) {
      store.state.userAbout.dialogVisible = value
    }
  })
  watchEffect(() => {
    const obj = store.state.userAbout.editData.data
    for(let item in editData){
      editData[item] = obj[item]
    }
  })
  const isEditTableMenu = computed(() => tableMenu.filter(item => item.isEdit === true))

  const closeDialog = () => store.commit('userAbout/CLOSE')
  const editDialog = () => store.commit('userAbout/EDIT', editData)
  const handleClose = () => {
    ElMessageBox.confirm('确定要取消编辑吗？')
      .then(() => closeDialog())
      .catch(() => {}
    )
  }
</script>

<style scoped lang="scss">
  .form-inline {
    padding: 20px 20px 0 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
