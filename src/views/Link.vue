<template>
  <SearchBlock 
    :isAddNew="true"
    :searchMsg="searchLinkMsg" 
    @getData="getData" 
    @addNew="addNew" 
  />
  <DataTableBlock 
    :tableMenu="linkTableMenu" 
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
    :rules="linkRules" 
    :isEditTableMenu="isEditTableMenu" 
    :data="dialogData.data"
    @closeDialog="closeDialog" 
    @editDialog="editDialog" 
  />
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import { useStore } from '../store'
import SearchBlock from '../components/SearchBlock.vue'
import DataTableBlock from '../components/DataTableBlock.vue'
import PaginationBlock from '../components/PaginationBlock.vue'
import DialogBlock from '../components/DialogBlock.vue'
import { IPagination } from '../types/common'
import { ITableRowData, InitLinkData } from '../types/link'
import { linkTableMenu, searchLinkMsg, initLinkEditData, linkRules } from '../utils/constant'

const { dialogData } = reactive(new InitLinkData)
const store = useStore()
const linkAbout = store.state.linkAbout

/* SearchBlock组件start */
const getData = (data: IPagination) => store.dispatch('linkAbout/getLinksData', data)
const addNew = () => store.dispatch('linkAbout/editDialog', initLinkEditData)
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
watchEffect(() => {
  const obj = linkAbout.editData
  dialogData.index = obj.index
  for(let item in dialogData.data){
    dialogData.data[item] = obj.data[item]
  }
})
const Visible = computed(() => linkAbout.dialogVisible)
const isEditTableMenu = linkTableMenu.filter(item => item.isEdit === true)
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
