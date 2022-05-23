<template>
  <SearchBlock placeholderName="账号" @search="searchHandler" @addNew="addNewHandler" @reset="resetHandler" />
  <DataTableBlock />
  <PaginationBlock />
  <DialogBlock>
    <template #default ="{data}">
      <el-form-item  :label="data.title">
        <el-radio-group v-model="data.isAdmin">
          <el-radio :label="true">管理员</el-radio>
          <el-radio :label="false">普通用户</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
  </DialogBlock>
</template>

<script setup lang="ts">
  import SearchBlock from '../components/SearchBlock.vue'
  import DataTableBlock from '../components/DataTableBlock.vue'
  import PaginationBlock from '../components/PaginationBlock.vue'
  import DialogBlock from '../components/DialogBlock.vue'

  const searchHandler = (data: string) => {
    console.log('searchHandler', data)
  }
  const addNewHandler = () => {
    console.log('addNewHandler')
  }
  const resetHandler = () => {
    console.log('resetHandler')
  }
</script>


<style scoped lang="scss">
  .el-table {
    overflow: auto;
  }
  .el-table::before {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0px;
  }
</style>
