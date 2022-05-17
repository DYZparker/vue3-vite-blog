<template>
  <el-table :data="tableData" height="100%" border :header-cell-style="cellStyle" :cell-style="rowClass">
    <el-table-column type="index" label="序号" width="180" />
    <el-table-column v-for="item in tableMenu" :prop="item.propName" :label="item.title" :min-width="item.width" />
    <el-table-column label="操作" min-width="180">
      <template #default="scope">
        {{scope.row.date}}
        <el-button size="small" @click="handleEdit()">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete()">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  interface IMenu {
    title: string
    propName: string
    width: Number
  }
  interface ITableData {
    username: string
    password: string
    admin: boolean
    date: string
  }
  const props = defineProps<{
    tableMenu: Array<IMenu>,
    tableData: Array<ITableData>
  }>()
  const emit = defineEmits(['edit', 'addNew', 'reset'])

  const handleEdit = () => {
    emit('edit')
  }
  const handleDelete = () => {
    console.log()
  }
  const cellStyle = () => "text-align:center"
  const rowClass = () => "text-align:center"

</script>

<style scoped lang="scss">
  .el-table {
    margin-top: 20px;
    background: #FFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
