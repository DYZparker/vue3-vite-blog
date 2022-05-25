<template>
  <el-form :inline="true" :model="formInline" class="form-inline">
    <el-form-item label="">
      <el-input v-model="formInline.searchName" :placeholder="placeholderName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="onAdd">新增</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  
  defineProps<{
    placeholderName: String
  }>()
  const emit  = defineEmits(['getData', 'addNew'])
  const formInline = reactive({
    searchName: ''
  })
  const pagination = reactive({
    page: 1,
    size: 10,
    search: {}
  })

  const onSubmit = () => {
    if(formInline.searchName.trim() !== '') {
      pagination.search = {username: formInline.searchName}
      emit('getData', pagination)
    }else{
      ElMessage({
        message: '请输入内容',
        type: 'warning',
      })
    }
  }
  const onAdd = () => emit('addNew')
  const onReset = () => {
    formInline.searchName = ''
    pagination.search = {}
    emit('getData', pagination)
  }

</script>

<style scoped lang="scss">
  .form-inline {
    padding: 20px 20px 0 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
