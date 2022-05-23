<template>
  <el-table 
    :data="tableDataList" 
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
    <el-table-column label="添加时间" min-width="180">
      <template #default="scope">
        {{initDate(scope.row)}}
      </template>
    </el-table-column>
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
  import moment from 'moment';
  import { useStore } from '../store'
  import { ITableRowData } from '../types/user'

  const store = useStore()
  const { tableMenu, paginationData } = store.state.userAbout
  const tableDataList = computed(() => store.state.userAbout.tableData.list)
  store.dispatch('userAbout/getUsersData', paginationData)
  
  const cellStyle = () => "text-align:center"
  const rowClass = () => "text-align:center"
  const initDate = (data: ITableRowData)=>{
		// 截取_id的前8位十六进制时间戳转换为十进制
		const timeStr = data._id.toString().slice(0, 8)
    return moment(parseInt(timeStr, 16)*1000).format('YYYY-MM-DD')
  }
  const handleEdit = (index:number, data: ITableRowData) => store.dispatch('userAbout/editDialog',{ index, data })
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
