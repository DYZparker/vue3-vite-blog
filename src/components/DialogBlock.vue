<template>
  <el-dialog
    v-model="Visible"
    width="30%"
    :before-close="handleClose"
    center
  >
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      label-width="100px"
      :model="data"
      :rules="rules"
      style="max-width: 460px"
    >
      <el-form-item 
        v-for="item in isEditTableMenu" 
        :key="item.propName"
        :label="item.title" 
        :prop="item.propName"
      >
        <!-- 判断可编辑项是否用插槽的样式展示，默认用input -->
        <div v-if="item.hasSlot">
          <slot :data="data"></slot>
        </div>
        <div v-else>
          <el-input v-model="data[item.propName]"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button 
          type="primary" 
          @click="editDialog(ruleFormRef)"
        >确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { ElForm } from 'element-plus'

  defineProps<{
    Visible: Boolean
    rules: Object,
    isEditTableMenu: Array<any>,
    data: Object
  }>()
  const emit  = defineEmits(['closeDialog', 'editDialog'])
  type FormInstance = InstanceType<typeof ElForm>
  const ruleFormRef = ref<FormInstance>()
  const labelPosition = ref('right')
  
  const closeDialog = () => emit('closeDialog')
  const editDialog = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        emit('editDialog')
      } else {
        console.log('error submit!', fields)
      }
    })
  }
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
