<template>
  <SearchBlock 
    :isAddNew="true"
    :searchMsg="searchTagMsg" 
    @getData="getData" 
    @addNew="addNew" 
  />
  <DataTableBlock 
    :tableMenu="tagTableMenu" 
    :tableList="tableList" 
    @edit="edit" 
    @remove="remove" 
  >
    <!-- 插槽 -->
    <template #color ="{data}: any">
      <el-tag :color= data.color effect="dark">
        {{ data.color }}
      </el-tag>
    </template>
  </DataTableBlock>
  <PaginationBlock 
    :total="total" 
    :paginationData="paginationData" 
    @changePage="changePage" 
  />
  <DialogBlock
    :Visible="Visible"
    :rules="tagRules" 
    :isEditTableMenu="isEditTableMenu" 
    :data="dialogData.data"
    @closeDialog="closeDialog" 
    @editDialog="editDialog" 
  >
    <!-- 插槽 -->
    <template #color ="{data}: any">
      <el-color-picker v-model="data.color"></el-color-picker>
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
import { ITableRowData, InitTagData } from '../types/tag'
import { tagTableMenu, searchTagMsg, initTagEditData, tagRules } from '../utils/constant'

const { dialogData } = reactive(new InitTagData)
const store = useStore()
const tagAbout = store.state.tagAbout

/* SearchBlock组件start */
const getData = (data: IPagination) => store.dispatch('tagAbout/getTagsData', data)
const addNew = () => store.dispatch('tagAbout/editDialog', initTagEditData)
/* SearchBlock组件end */

/* DataTableBlock组件start */
const tableList = computed(() => tagAbout.tableData.list)
if(tableList.value.length === 0) {
  store.dispatch('tagAbout/getTagsData')
}
const edit = (index:number, data: ITableRowData) => store.dispatch('tagAbout/editDialog', { index, data })
const remove = (index:number, data: ITableRowData) => store.dispatch('tagAbout/removeTag', { index, data })
/* DataTableBlock组件end */

/* PaginationBlock组件start */
const paginationData = computed(() => tagAbout.paginationData)
const total = computed(() => tagAbout.tableData.total)
const changePage = (data: IPagination) => store.dispatch('tagAbout/getTagsData', data)
/* PaginationBlock组件end */

/* DialogBlock组件start */
watchEffect(() => {
  const obj = tagAbout.editData
  dialogData.index = obj.index
  for(let item in dialogData.data){
    dialogData.data[item] = obj.data[item]
  }
})
const Visible = computed(() => tagAbout.dialogVisible)
const isEditTableMenu = tagTableMenu.filter(item => item.isEdit === true)
const closeDialog = () => store.commit('tagAbout/DIALOG_TRIGGER', false)
const editDialog = () => store.dispatch('tagAbout/editTag', dialogData)
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
