<template>
  <SearchBlock 
    :searchMsg="searchMsg" 
    @getData="getData" 
    @addNew="addNew" 
  />
  <DataTableBlock 
    :tableMenu="tableMenu" 
    :tableList="tableList" 
    @edit="edit" 
    @remove="remove" 
  >
    <!-- 插槽 -->
    <template #default ="{data}: any">
      <el-link :color= data.color effect="dark">
        {{ data.color }}
      </el-link>
    </template>
  </DataTableBlock>
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
    <template #default ="{data}: any">
      <el-color-picker v-model="data.color"></el-color-picker>
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
import { ITableRowData } from '../types/link'

const store = useStore()
const linkAbout = store.state.linkAbout
const tableMenu = [
  { 
    title: '链接名称',
    propName: 'linkName',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '链接地址',
    propName: 'href',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '图标地址',
    propName: 'img',
    isEdit: true,
    hasSlot: false,
    width: 180
  }
]

/* SearchBlock组件start */
const searchMsg = {
  searchName: 'linkName',
  placeholderName: '链接'
}
const initEditData = {
  index: -1,
  data: {
    _id: 0,
    linkName: '',
    href: '',
    img: ''
  }
}
const getData = (data: IPagination) => store.dispatch('linkAbout/getLinksData', data)
const addNew = () => store.dispatch('linkAbout/editDialog', initEditData)
/* SearchBlock组件end */

/* DataTableBlock组件start */
const tableList = computed(() => linkAbout.tableData.list)
if(tableList.value.length === 0) {
  store.dispatch('linkAbout/getLinksData')
}
const edit = (index:number, data: ITableRowData) => store.dispatch('linkAbout/editDialog', { index, data })
const remove = (index:number, data: ITableRowData) => store.dispatch('linkAbout/removeLink', { index, data })
/* DataTableBlock组件end */

/* PaginationBlock组件start */
const paginationData = computed(() => linkAbout.paginationData)
const total = computed(() => linkAbout.tableData.total)
const changePage = (data: IPagination) => store.dispatch('linkAbout/getLinksData', data)
/* PaginationBlock组件end */

/* DialogBlock组件start */
const rules = {
  linkName: [
    { required: true, message: '请输入链接名', trigger: 'blur' },
    { min: 1, max: 24, message: '账号长度需要在1~24之间', trigger: 'blur' }
  ],
  href: [
    { required: true, message: '请输入链接地址', trigger: 'blur' },
    { min: 1, max: 124, message: '账号长度需要在1~124之间', trigger: 'blur' }
  ]
}
let dialogData = reactive({
  index: -1,
  data: {
    _id: 0,
    linkName: '',
    href: '',
    img: ''
  }
})
watchEffect(() => {
  const obj = linkAbout.editData
  /* 
    拷贝对象，用JSON方法或者解构赋值都会丢失响应性，只能用for循环，且不能深拷贝
    1.  dialogData = reactive(JSON.parse(JSON.stringify(obj)))
    2.  const {...a} = linkAbout.editData
        dialogData = a 
  */
  dialogData.index = obj.index
  for(let item in dialogData.data){
    dialogData.data[item] = obj.data[item]
  }
})
const Visible = computed(() => linkAbout.dialogVisible)
const isEditTableMenu = tableMenu.filter(item => item.isEdit === true)
const closeDialog = () => store.commit('linkAbout/DIALOG_TRIGGER', false)
const editDialog = () => store.dispatch('linkAbout/editLink', dialogData)
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
