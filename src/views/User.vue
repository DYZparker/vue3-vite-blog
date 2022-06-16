<template>
  <SearchBlock 
    :isAddNew="false"
    :searchMsg="searchUserMsg" 
    @getData="getData" 
  />
  <DataTableBlock 
    :tableMenu="userTableMenu" 
    :tableList="tableList" 
    @edit="edit" 
    @remove="remove" 
  >
    <!-- 插槽 -->
    <template #gender ="{data}: any">
      {{ data.gender ? '男' : '女'}}
    </template>
    <template #isAdmin ="{data}: any">
      {{ data.isAdmin ? '管理员' : '普通用户'}}
    </template>
  </DataTableBlock>
  <PaginationBlock 
    :total="total" 
    :paginationData="paginationData" 
    @changePage="changePage" 
  />
  <DialogBlock
    :Visible="Visible"
    :rules="userRules" 
    :isEditTableMenu="isEditTableMenu" 
    :data="dialogData.data"
    @closeDialog="closeDialog" 
    @editDialog="editDialog" 
  >
    <!-- 插槽 -->
    <template #gender ="{data}: any">
      <el-radio-group v-model="data.gender">
        <el-radio :label="0">女</el-radio>
        <el-radio :label="1">男</el-radio>
      </el-radio-group>
    </template>
    <template #isAdmin ="{data}: any">
      <el-radio-group v-model="data.isAdmin">
        <el-radio :label="true">管理员</el-radio>
        <el-radio :label="false">普通用户</el-radio>
      </el-radio-group>
    </template>
  </DialogBlock>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import { useStore } from '../store'
import SearchBlock from '../components/SearchBlock.vue'
import DataTableBlock from '../components/DataTableBlock.vue'
import PaginationBlock from '../components/PaginationBlock.vue'
import DialogBlock from '../components/DialogBlock.vue'
import { IPagination } from '../types/common'
import { ITableRowData, InitUserData } from '../types/user'
import { userTableMenu, searchUserMsg, userRules } from '../utils/constant'

const { dialogData } = reactive(new InitUserData)
const store = useStore()
const userAbout = store.state.userAbout

/* SearchBlock组件start */
const getData = (data: IPagination) => store.dispatch('userAbout/getUsersData', data)
/* SearchBlock组件end */

/* DataTableBlock组件start */
const tableList = computed(() => userAbout.tableData.list)
if(tableList.value.length === 0) {
  store.dispatch('userAbout/getUsersData')
}
const edit = (index:number, data: ITableRowData) => store.dispatch('userAbout/editDialog', { index, data })
const remove = (index:number, data: ITableRowData) => store.dispatch('userAbout/removeUser', { index, data })
/* DataTableBlock组件end */

/* PaginationBlock组件start */
const paginationData = computed(() => userAbout.paginationData)
const total = computed(() => userAbout.tableData.total)
const changePage = (data: IPagination) => store.dispatch('userAbout/getUsersData', data)
/* PaginationBlock组件end */

/* DialogBlock组件start */
watchEffect(() => {
  const obj = userAbout.editData
  /* 
    拷贝对象，用JSON方法或者解构赋值都会丢失响应性，只能用for循环，且不能深拷贝
    1.  dialogData = reactive(JSON.parse(JSON.stringify(obj)))
    2.  const {...a} = userAbout.editData
        dialogData = a 
  */
  dialogData.index = obj.index
  for(let item in dialogData.data){
    dialogData.data[item] = obj.data[item]
  }
})
const Visible = computed(() => userAbout.dialogVisible)
const isEditTableMenu = userTableMenu.filter(item => item.isEdit === true)
const closeDialog = () => store.commit('userAbout/DIALOG_TRIGGER', false)
const editDialog = () => store.dispatch('userAbout/editUser', dialogData)
/* DialogBlock组件end */
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
