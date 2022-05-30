<template>
  <SearchBlock 
    placeholderName="账号" 
    @getData="getData" 
    @addNew="addNew" 
  />
  <DataTableBlock 
    :tableMenu="tableMenu" 
    :tableList="tableList" 
    @edit="edit" 
    @remove="remove" 
  />
  <PaginationBlock 
    :total="total" 
    :paginationData="paginationData" 
    @changePage="changePage" 
  />
  <DialogBlock
    :Visible="Visible"
    :rules="rules" 
    :isEditTableMenu="isEditTableMenu" 
    :data="dialogData.data"
    @closeDialog="closeDialog" 
    @editDialog="editDialog" 
  >
    <!-- 插槽 -->
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
import { computed, reactive, watchEffect } from 'vue'
import SearchBlock from '../components/SearchBlock.vue'
import DataTableBlock from '../components/DataTableBlock.vue'
import PaginationBlock from '../components/PaginationBlock.vue'
import DialogBlock from '../components/DialogBlock.vue'
import { useStore } from '../store'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/user'

const store = useStore()
const userAbout = store.state.userAbout
const tableMenu = [
  { 
    title: '账号',
    propName: 'username',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '密码',
    propName: 'password',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '管理员',
    propName: 'isAdmin',
    isEdit: true,
    hasSlot: true,
    width: 180
  }
]

/* SearchBlock组件start */
const initEditData = {
  index: -1,
  data: {
    _id: 0,
    username: '',
    password: '',
    isAdmin: false
  }
}
const getData = (data: IPagination) => store.dispatch('userAbout/getUsersData', data)
const addNew = () => store.dispatch('userAbout/editDialog', initEditData)
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
const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 24, message: '账号长度需要在4~24之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 24, message: '密码长度需要在4~24之间', trigger: 'blur' }
  ]
}
let dialogData = reactive({
  index: -1,
  data: {
    _id: 0,
    username: '',
    password: '',
    isAdmin: false
  }
})
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
const isEditTableMenu = tableMenu.filter(item => item.isEdit === true)
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
