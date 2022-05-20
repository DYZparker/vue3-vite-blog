<template>
  <el-table 
    :data="tableData" 
    height="100%" 
    border 
    :header-cell-style="cellStyle" 
    :cell-style="rowClass"
  >
    <el-table-column type="index" label="序号" width="180" />
    <el-table-column 
      v-for="item in tableMenu" 
      :prop="item.propName" 
      :label="item.title" 
      :min-width="item.width" 
    />
    <el-table-column label="操作" min-width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from '../store'
  import { ITableData } from '../types/user'

  const store = useStore()
  const { tableMenu } = store.state.userAbout
  const tableData = computed(() => store.state.userAbout.tableData)
  
  const cellStyle = () => "text-align:center"
  const rowClass = () => "text-align:center"
  const handleEdit = (index:number, data: ITableData) => store.commit('userAbout/SHOW', {index, data})
  const handleDelete = (index:number) => {
    ElMessageBox.confirm('确定要删除此数据吗？')
      .then(() => store.commit('userAbout/DELETE', index))
      .catch(() => {}
    )
  }
</script>

<style scoped lang="scss">
  .el-table {
    margin-top: 20px;
    background: #FFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
