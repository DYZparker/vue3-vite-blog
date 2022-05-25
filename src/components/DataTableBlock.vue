<template>
  <el-table 
    :data="tableList" 
    height="100%" 
    border 
    :header-cell-style="cellStyle" 
    :cell-style="rowClass"
  >
    <el-table-column type="index" label="序号" width="180" />
    <el-table-column 
      v-for="item in tableMenu" 
      :key="item.propName"
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
        <el-button 
          size="small" 
          @click="handleEdit(scope.$index, scope.row)"
        >编辑</el-button>
        <el-button 
          size="small" 
          type="danger" 
          @click="handleDelete(scope.$index, scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import moment from 'moment'

  defineProps<{
    tableMenu: Array<any>,
    tableList: Array<any>
  }>()
  const emit  = defineEmits(['edit', 'remove'])
  const cellStyle = () => "text-align:center"
  const rowClass = () => "text-align:center"
  // 将数据库自动注册的id转为日期
  const initDate = (data: any)=>{
		// 截取_id的前8位十六进制时间戳转换为十进制
		const timeStr = data._id.toString().slice(0, 8)
    return moment(parseInt(timeStr, 16)*1000).format('YYYY-MM-DD')
  }
  const handleEdit = (index:number, data: any) => emit('edit', index, data)
  const handleDelete = (index:number, data: any) => {
    ElMessageBox.confirm('确定要删除此数据吗？')
      .then(() => emit('remove', index, data))
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
