<template>
  <SearchBlock placeholderName="账号" @search="searchHandler" @addNew="addNewHandler" @reset="resetHandler" />
  <DataTableBlock :tableMenu="tableMenu" :tableData="tableData" @edit="showDialog" />
  <PaginationBlock />
  <DialogBlock :dialogVisible="dialogVisible" @close="showDialog" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SearchBlock from '../components/SearchBlock.vue'
  import DataTableBlock from '../components/DataTableBlock.vue'
  import PaginationBlock from '../components/PaginationBlock.vue'
  import DialogBlock from '../components/DialogBlock.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const tableMenu = [
    { 
      title: '账号',
      propName: 'username',
      width: 180
    },
    { 
      title: '密码',
      propName: 'password',
      width: 180
    },
    { 
      title: '权限',
      propName: 'admin',
      width: 180
    },
    { 
      title: '注册时间',
      propName: 'date',
      width: 180
    }
  ]
  const tableData = [
    {
      username: 'zhangsan',
      password: '123',
      admin: true,
      date: '2016-05-02'
    },
    {
      username: 'lisi',
      password: '456',
      admin: false,
      date: '2016-02-01'
    },
    {
      username: 'wangwu',
      password: '789',
      admin: false,
      date: '2017-06-06'
    }
  ]
  let dialogVisible = ref(false)

  const searchHandler = (data: string) => {
    console.log('searchHandler', data)
  }
  const addNewHandler = () => {
    console.log('addNewHandler')
  }
  const resetHandler = () => {
    console.log('resetHandler')
  }
  const showDialog = () => {
    console.log('showDialog')
    dialogVisible.value = ! dialogVisible.value
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
