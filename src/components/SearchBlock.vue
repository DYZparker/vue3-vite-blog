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
  import { useStore } from '../store'
  import { ITableData } from '../types/user'
  
  const store = useStore()
  const props = defineProps({
    placeholderName: String,
  })
  const emit = defineEmits(['search', 'addNew', 'reset'])
  const formInline = reactive({
    searchName: ''
  })

  const onSubmit = () => {
    emit('search',formInline.searchName)
  }


  const onReset = () => {
    formInline.searchName = ''
    emit('reset')
  }
  const onAdd = () => store.commit('userAbout/SHOWDIALOG')

</script>

<style scoped lang="scss">
  .form-inline {
    padding: 20px 20px 0 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
